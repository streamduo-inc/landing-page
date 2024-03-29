terraform {
  backend "remote" {
    organization = "sfrensch"

    workspaces {
      name = "landing-page"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

variable "domain_name" {
  type    = string
  default = "streamduo.com"
}

resource "aws_s3_bucket" "landing_bucket" {
  bucket = var.domain_name
  acl    = "public-read"
  policy = data.aws_iam_policy_document.website_policy.json
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

data "aws_iam_policy_document" "website_policy" {
  statement {
    actions = [
      "s3:GetObject"
    ]
    principals {
      identifiers = ["*"]
      type        = "AWS"
    }
    resources = [
      "arn:aws:s3:::${var.domain_name}/*"
    ]
  }
}
