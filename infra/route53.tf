# Cloudfront requires the certificate be located in us-east-1
# even if our actual site is hosted in a different region
resource "aws_acm_certificate" "website_acm_certificate" {
  provider          = aws.virginia
  domain_name       = "${var.domain_name}"
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_zone" "furd_dev_zone" {
  name = "${var.domain_name}"
}

# Create an MX Record for Gmail
resource "aws_route53_record" "furd_dev_mx" {
  zone_id = aws_route53_zone.furd_dev_zone.zone_id
  name    = ""
  type    = "MX"
  ttl     = 1800

  records = [
    "1 smtp.google.com.",
    "15 ${var.mx_verification}"
  ]
}

resource "aws_route53_record" "www-a" {
  zone_id = aws_route53_zone.furd_dev_zone.zone_id
  name    = "furd.dev"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.s3_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}

# Verify name with Bluesky for official website account
resource "aws_route53_record" "bluesky" {
  zone_id = aws_route53_zone.furd_dev_zone.zone_id
  name    = "_atproto.${vars.domain_name}"
  type    = "TXT"
  ttl     = 1800

  records = [var.bluesky_verification]
}

resource "aws_route53_record" "furd_dev_certificate_dns" {
  allow_overwrite = true
  name    =  tolist(aws_acm_certificate.website_acm_certificate.domain_validation_options)[0].resource_record_name
  records = [tolist(aws_acm_certificate.website_acm_certificate.domain_validation_options)[0].resource_record_value]
  type    = tolist(aws_acm_certificate.website_acm_certificate.domain_validation_options)[0].resource_record_type
  zone_id = aws_route53_zone.furd_dev_zone.zone_id
  ttl     = 60
}

resource "aws_acm_certificate_validation" "website_certificate_validation" {
  provider = aws.virginia
  certificate_arn = aws_acm_certificate.website_acm_certificate.arn
  validation_record_fqdns = [aws_route53_record.furd_dev_certificate_dns.fqdn]
}
