resource "aws_cloudfront_distribution" "s3_distribution_landing_com" {
  origin {
    domain_name = aws_s3_bucket.landing_bucket.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = "aws-cloudtrail-logs-351621728824-96579f16.s3.amazonaws.com"
    prefix          = "landing_page"
  }

  aliases = ["www.streamduo.com", "streamduo.com"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:351621728824:certificate/a10e2bb3-a73b-4a3b-985d-8cc04d094d0d"
    ssl_support_method  = "sni-only"
  }
}



resource "aws_route53_record" "open_com" {
  zone_id = "Z04259191JYTKSDNITMH6"
  name    = "streamduo.com"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.s3_distribution_landing_com.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution_landing_com.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_com" {
  zone_id = "Z04259191JYTKSDNITMH6"
  name    = "www.streamduo.com"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.s3_distribution_landing_com.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution_landing_com.hosted_zone_id
    evaluate_target_health = false
  }
}
