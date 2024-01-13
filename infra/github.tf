# Set secrets for GitHub Actions
resource "github_actions_secret" "CLOUDFRONT_DISTRO_ID" {
  repository       = var.github_repo_name
  secret_name      = "CLOUDFRONT_DISTRO_ID"
  plaintext_value  = aws_cloudfront_distribution.s3_distribution.id
}
resource "github_actions_secret" "SITE_BUCKET" {
  repository       = var.github_repo_name
  secret_name      = "SITE_BUCKET"
  plaintext_value  = aws_s3_bucket.website_bucket.bucket
}

resource "github_actions_secret" "GH_ACTION_ROLE_ARN" {
  repository       = var.github_repo_name
  secret_name      = "GH_ACTION_ROLE_ARN"
  plaintext_value  = aws_iam_role.github_deploy.arn
}

# Get GitHub TLS certificate
data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com/.well-known/openid-configuration"
}

# Create GitHub OIDC Provider
resource "aws_iam_openid_connect_provider" "github_actions" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [
    data.tls_certificate.github.certificates[0].sha1_fingerprint,
    data.tls_certificate.github.certificates[1].sha1_fingerprint,
  ]
}

# Create IAM Role for GitHub Actions
resource "aws_iam_role" "github_deploy" {
  name                 = "github-actions-furd-dev"
  path                 = "/github-actions/"
  assume_role_policy   = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = ""
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github_actions.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringLike = {
            "token.actions.githubusercontent.com:sub": "repo:${var.github_repo}:ref:refs/heads/main"
          }
          StringEquals = {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
          }
        }
      }
    ]
  })
}

# Assign S3 permissions to get buckets
resource "aws_iam_role_policy" "s3" {
  name   = "s3-get-policy"
  role   = aws_iam_role.github_deploy.name
  policy = data.aws_iam_policy_document.s3_get.json
}

# Deploy role needs to be able to get buckets and objects from S3
data "aws_iam_policy_document" "s3_get" {
  statement {
    sid = "1"

    actions = [
      "s3:ListBucket",
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.website_bucket.arn, "${aws_s3_bucket.website_bucket.arn}*"
    ]

    condition {
      test     = "StringEquals"
      variable = "aws:ResourceTag/allow-gh-action"

      values = ["true"]
    }
  }
}

# Assign CloudFront permissions to invalidate cache after deploy
resource "aws_iam_role_policy" "cf_invalidate_cache" {
  name   = "cf-invalidate-cache"
  role   = aws_iam_role.github_deploy.name
  policy = data.aws_iam_policy_document.cf_invalidate_cache.json
}

data "aws_iam_policy_document" "cf_invalidate_cache" {
  statement {
    sid = "1"

    actions = [
      "CloudFront:CreateInvalidation",
    ]

    resources = [aws_cloudfront_distribution.s3_distribution.arn]
  }
}

# Allow S3 Bucket to be pushed to by GitHub Actions
# This is assigned in s3.tf
data "aws_iam_policy_document" "github_access_control_objects" {
  statement {
    sid = "GithubAccessControlObjects"
    actions = [
      "s3:PutObject",
      "s3:DeleteObject",
    ]
    effect = "Allow"

    resources = ["${aws_s3_bucket.website_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_iam_role.github_deploy.arn]
    }
  }
}

data "aws_iam_policy_document" "github_access_control_bucket" {
  statement {
    sid = "GithubAccessControlBucket"
    actions = [
      "s3:ListBucket",
    ]
    effect = "Allow"

    resources = ["${aws_s3_bucket.website_bucket.arn}"]

    principals {
      type        = "AWS"
      identifiers = [aws_iam_role.github_deploy.arn]
    }
  }
}

# Create another role that can run Terraform apply
resource "aws_iam_role" "github_terraform" {
  name                 = "github-actions-terraform-furd-dev"
  path                 = "/github-actions/"
  assume_role_policy   = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = ""
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github_actions.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringLike = {
            "token.actions.githubusercontent.com:sub": "repo:${var.github_repo}:ref:refs/heads/main"
          }
          StringEquals = {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "github_terraform_role" {
  name   = "github_terraform_role"
  role   = aws_iam_role.github_terraform.name
  policy = data.aws_iam_policy_document.github_terraform_role.json
}

# Overly permissive policy for Terraform, figure out a restrictive policy later
data "aws_iam_policy_document" "github_terraform_role" {
  statement {
    sid = "GithubAccessControlObjects"
    actions = [
      "s3:*",
      "route53:*",
      "cloudfront:*",
      "acm:*",
      "iam:*",
    ]
    effect = "Allow"

    resources = ["*"]
  }
}
