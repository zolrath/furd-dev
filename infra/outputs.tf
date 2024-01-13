output "CLOUDFRONT_DISTRO_ID" {
  description = "CloudFront Distribution ID"
  value = aws_cloudfront_distribution.s3_distribution.id
}

output "GH_ACTION_ROLE_ARN" {
  description = "GitHub action role ARN"
  value = aws_iam_role.github_deploy.arn
}

output "GH_TERRAFORM_ROLE_ARN" {
  description = "GitHub terraform role ARN"
  value = aws_iam_role.github_terraform.arn
}

output "SITE_BUCKET" {
  description = "Site bucket"
  value = aws_s3_bucket.website_bucket.bucket
}

