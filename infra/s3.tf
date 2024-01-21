# primary domain bucket
resource "aws_s3_bucket" "website_bucket" {
  bucket = var.bucket_name

  tags = {
    allow-gh-action-access = "true"
  }
}

data "aws_cloudfront_log_delivery_canonical_user_id" "current" {}
data "aws_canonical_user_id" "current" {}

# Create bucket for CloudFront logs
resource "aws_s3_bucket" "website_log_bucket" {
  bucket = "${var.bucket_name}-logs"
}

resource "aws_s3_bucket_ownership_controls" "website_logs" {
  bucket = aws_s3_bucket.website_log_bucket.id

  rule {
    object_ownership = "ObjectWriter"
  }
}

resource "aws_s3_bucket_public_access_block" "block_public_access" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "access_control" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = data.aws_iam_policy_document.merged_s3_access_control.json
}

data "aws_iam_policy_document" "merged_s3_access_control" {
  source_policy_documents = [
    data.aws_iam_policy_document.access_control.json,
    data.aws_iam_policy_document.github_access_control_bucket.json,
    data.aws_iam_policy_document.github_access_control_objects.json,
  ]
}

data "aws_iam_policy_document" "access_control" {
  statement {
    actions = ["s3:GetObject"]

    resources = ["${aws_s3_bucket.website_bucket.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

# Create redirect bucket to send www.furd.dev requests to furd.dev bucket
resource "aws_s3_bucket" "website_redirect_bucket" {
  bucket = "www.${var.bucket_name}-redirect"
}

resource "aws_s3_bucket_website_configuration" "website_redirect_bucket_configuration" {
  bucket = aws_s3_bucket.website_redirect_bucket.bucket

  redirect_all_requests_to {
    host_name = var.domain_name
    protocol  = "https"
  }
}
