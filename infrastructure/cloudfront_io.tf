locals {
  s3_origin_id    = "streamduo-landing"
  s3_origin_id_io = "streamduo-landing-io"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.landing_bucket_io.bucket_regional_domain_name
    origin_id   = local.s3_origin_id_io

  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = "aws-cloudtrail-logs-351621728824-96579f16.s3.amazonaws.com"
    prefix          = "landing_page_io"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = ["www.streamduo.io", "streamduo.io"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id_io

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:351621728824:certificate/f0f8f541-6cfe-4b5e-9076-d5e7c3e79753"
    ssl_support_method  = "sni-only"
  }
}



resource "aws_route53_record" "open" {
  zone_id = "Z05800843VIA3DKOQSYZU"
  name    = "streamduo.io"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  zone_id = "Z05800843VIA3DKOQSYZU"
  name    = "www.streamduo.io"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
