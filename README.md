# [furd.dev](https://furd.dev)

[![Screenshot](screenshot.png)](https://furd.dev)

## 🚀 Getting Started

## Locally
`npm run dev`

## Build
`npx astro build`

## Infrastructure

This project builds into a static site and is deployed to an Amazon S3 bucket automatically through GitHub Actions. The site is then served via CloudFront to allow `https` connections. 

This infrastructure is defined in the `infra` folder and is managed with [Terraform](https://www.terraform.io). As these files are changed, a separate GitHub Action will run Terraform to update the infrastructure.

| File                    | Description                                  |
| :---------------------- | :------------------------------------------- |
| `main.tf`               | Defines aws providers                        |
| `variables.tf`          | Define variables such as domain name         |
| `outputs.tf`            | Output names of created resources            |
| `github.tf`             | Sets up GitHub Secrets, OIDC, and IAM roles  |
| `route53.tf`            | Provisions TLS Cerficiate and DNS records    |
| `s3.tf`                 | Create buckets and configure access rules    |
| `cloudfront.tf`         | Expose S3 bucket as CloudFront site          |
| `redirect_function.js`  | Teach CloudFront to default to */index.html  |

## ✨ Features:

- ✅ Astro 4.0
- ✅ Dark Mode
- ✅ Full Markdown support
- ✅ SEO-friendly setup with canonical URLs and OpenGraph data
- ✅ RSS 2.0 generation
- ✅ Sitemap.xml generation
- ✅ Terraform provisioned infrastructure

## 🚀 Project Structure

Inside of this project, you'll see the following folders and files:

```
/
├── infra/
│   ├── main.tf
├── public/
│   ├── assets/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Logo.astro
│   ├── pages/
│   │   └── index.astro
│   └── content/
│       ├── blog/
│       └── projects/
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React components.

Any static assets, like images, can be placed in the `public/` directory, though placing images in `src/assets/` allows the Astro `Image` component to optimize them.


### Adding Posts
In order to add a new post, simply create a new markdown file in `src/content/blog/`.

#### Frontmatter

Posts currently support the following frontmatter:

```
---
title: Dynamic Masking Shader in Godot
draft: true
publishDate: 2023-12-02
updatedDate: 2023-12-18
description: How I'm dynamically masking portions of my players sprite in Godot.
coverImage: /src/assets/blog/dynamic-masking/header.png
coverImageAlt: An image of a player character with a mask applied.
category: programming
tags: [godot, shaders]
relatedPosts: [godot-steam]
---
```
`draft`, `updatedDate`, and `relatedPosts` are optional.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:3030`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |


## 👀 Want to learn more?

Feel free to check [Astro's documentation](https://github.com/withastro/astro) or jump into Astro's [Discord server](https://astro.build/chat).  
For more information about [Terraform](https://www.terraform.io) check out their [documentation](https://www.terraform.io/docs/index.html) or other [HashiCorp](https://www.hashicorp.com) tools.
