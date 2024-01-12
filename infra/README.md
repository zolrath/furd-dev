# Terraform Infrastructure
## Overview
furd.dev is a website that showcases provisioning static site hosting on [AWS](https://aws.amazon.com) using [HashiCorp Terraform](https://www.terraform.io). It uses a combination of AWS services to create a fast, secure, and scalable web presence. The website overview covers the following aspects:

- **Hosting**: The website is hosted on [AWS S3](https://aws.amazon.com/s3/), a reliable and cost-effective storage service, and [AWS CloudFront](https://aws.amazon.com/cloudfront), a global content delivery network that improves performance and security.

- **DNS**: The website uses [AWS Route53](https://aws.amazon.com/route53), a highly available and scalable DNS service, to manage the domain name and routing.

- **SSL**: The website uses [AWS Certificate Manager](https://aws.amazon.com/certificate-manager), a service that automates the provisioning, renewal, and deployment of SSL certificates, to enable HTTPS encryption and protect the website traffic.

- **Deployment**: The website uses [GitHub Actions](https://github.com/features/actions), a workflow automation tool, to build and deploy the site to AWS S3 and CloudFront. It also uses [GitHub OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) authentication, a feature that allows GitHub to securely authenticate with AWS, to grant the necessary permissions for the deployment.

- **Functionality**: The website uses a [CloudFront Function](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html), a lightweight and low-latency way to run custom code at the edge, to serve `index.html` files when accessing a directory. This enables the website to have user-friendly URLs and avoid 404 errors.

This repository contains the Terraform code that creates and configures all the AWS resources needed for the website. Terraform is an infrastructure as code tool that enables declarative and reproducible infrastructure management.
