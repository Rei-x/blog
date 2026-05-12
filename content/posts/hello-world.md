---
title: "Hello, World — and Goodbye, Ghost"
date: "2026-05-12"
excerpt: "Why I moved this blog from Ghost CMS to a folder of markdown files in git, and what I learned along the way."
coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
coverImageAlt: "A laptop on a wooden desk with a notebook and a cup of coffee."
---

For a few years this blog lived inside a self-hosted [Ghost](https://ghost.org) instance. Ghost is a lovely piece of software, but it turns out I want less software, not more.

## The problem with a CMS

Running Ghost meant running a database, a Node process, an SMTP integration for member emails I never sent, and an S3 bucket for images. Every few months something would drift — a TLS cert, a Docker base image, a backup that quietly stopped — and I'd spend a Sunday afternoon fixing my own blog instead of writing in it.

The content layer was the smallest part of all of this, but it was locked behind an admin UI and an API key.

## What I actually want

When I sat down and listed the features I'd used in the last year, it came out to:

- Write posts in markdown
- Have a cover image
- Get a decent-looking RSS feed
- Not think about it again

That is, almost exactly, [a folder of files](https://daringfireball.net/projects/markdown/).

## The new setup

The whole content layer is now a `content/posts/` directory of `.md` files with YAML frontmatter. The Next.js app reads them at build time with `gray-matter` and renders the body with `remark`. Deploys are just `git push`. There's no database, no API, no admin panel — if I want to edit a post I open my editor like a normal person.

I'll write a follow-up about the rendering pipeline, but the short version is: it's about 60 lines of code, and it replaces roughly a gigabyte of running services.

Goodbye Ghost. It's not you, it's me.
