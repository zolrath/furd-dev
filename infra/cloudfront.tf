locals {
  s3_origin_id = "furd_dev_website_origin"
}

resource "aws_cloudfront_origin_access_control" "website_access_control" {
  name                              = "furd-dev"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Create CloudFront distribution
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.website_access_control.id
    origin_id                = local.s3_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["www.${var.domain_name}", "${var.domain_name}"]

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.website_log_bucket.bucket_regional_domain_name
    prefix          = "furd-dev-cf-logs/"
  }

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD"]
    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    viewer_protocol_policy = "redirect-to-https"
    target_origin_id       = local.s3_origin_id
    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.index_redirect.arn
    }
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE"]
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.website_acm_certificate.id
    ssl_support_method  = "sni-only"
  }
}

# Create a CloudFront function to redirect requests for / to /index.html
resource "aws_cloudfront_function" "index_redirect" {
  name    = "index_redirect"
  runtime = "cloudfront-js-1.0"
  comment = "https://docs.astro.build/en/guides/deploy/aws/#cloudfront-functions-setup"
  publish = true
  code    = file("${path.module}/redirect_function.js")
}

