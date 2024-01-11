terraform {
  required_providers {
    aws = {
      version = ">= 2.7.0"
      source  = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket  = "furd-dev-terraform"
    key     = "terraform.tfstate"
    region  = "us-west-1"
  }
}

provider "aws" {
  region = "us-west-1"
}

# Cloudfront requires the certificate be located in us-east-1
# even if our actual site is hosted in a different region
provider "aws" {
  alias = "virginia"
  region = "us-east-1"
}

