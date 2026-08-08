[![Netlify Status](https://api.netlify.com/api/v1/badges/a3441a5f-8eb5-420f-8ddd-34fec63e989e/deploy-status)](https://app.netlify.com/sites/hoglelab/deploys)

Please note that the following licenses apply:

- Source code is licensed [GPL v3](https://opensource.org/license/gpl-3-0)
- Site content is licensed [CC BY NC SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)

# Instructions for building lab website

## Clone Hogle Lab Repo

You will need to first clone this repository to a location your local computer

```sh
# clone the repo from github
git clone https://github.com/slhogle/hoglelab
# probably want to rename the directory
mv hoglelab YOURDIRNAME 
cd YOURDIRNAME
# This is probably easiest way to delete all the git history.
# Most likely you don't care about my git history 
# and want to track your own changes to the template.
rm -rf .git
```

Later you will need to turn this into a git repository to deploy to netlify.

## Install Eleventy

[Eleventy](https://www.11ty.dev/) is a simple static site generator that I use to build my lab
webpage. You will need to install it first to use my template.

### 1. Install Node.js
[Node.js](https://nodejs.org/en) is a javascript runtime environment. You will need Node.js to
install Eleventy.

**This site requires Node.js 22 or newer.** That floor comes from
[`@11ty/eleventy-img`](https://www.11ty.dev/docs/plugins/image/) v7, which is used to optimise
images at build time. The required version is recorded in three places that must stay in sync:
`.nvmrc`, the `engines` field of `package.json`, and `NODE_VERSION` in `netlify.toml`.

The version of Node bundled with your Linux distribution is usually too old. On Ubuntu, install a
current release from [NodeSource](https://nodesource.com/):


```sh
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version   # should print v24.x or newer
```

Alternatively use a version manager such as [nvm](https://github.com/nvm-sh/nvm), which will pick
up the `.nvmrc` file automatically:

```sh
nvm install
nvm use
```

### 2. Install the dependencies

Eleventy is installed locally into this project rather than globally, so the site always builds
against a known version. Everything is already declared in `package.json`; you just need:

```sh
npm install
```

This pulls in Eleventy, `@11ty/eleventy-img` (which compiles a native `sharp` binary, so the first
install takes a minute), and `markdown-it`.

### 3. Build and preview

```sh
npm run build    # build once into public/
npm start        # build, serve at http://localhost:8080, and rebuild on save
```

`npm start` watches the `src` directory and reloads the browser when you change a template, a data
file, or an image.

## Make the webpage yours

Almost all of the content lives in JSON files in `src/_data/`, so routine updates are data edits
rather than HTML edits:

| File | What it drives |
| --- | --- |
| `site.json` | Site title, canonical URL, description, and your scholarly profile links |
| `nav.json` | The navigation bar, including dropdown menus |
| `news.json` | News items (newest first). Headlines accept markdown |
| `bib.json` | Publications and preprints (newest first) |
| `team.json` | Current members, former members, and collaborators |
| `highlights.json` | The research highlights on the Publication highlights page |

Each of `bib`, `team`, and `highlights` has a matching `*_format_example.json` documenting the
expected fields. Those example files are never rendered; they exist purely as a reference.

The remaining directories:

- `src/_includes` — the shared layout, navbar, footer, and the publication macro
- `src/favicons` — replace with your own from a generator such as [realfavicongenerator.net](https://realfavicongenerator.net/); the contents are copied to the site root
- `src/images` — images. Only images actually referenced by an `<img>` tag are built and deployed, so unused files here cost nothing at deploy time
- `src/pdfs` — PDF copies of your publications, linked from `bib.json`
- `src/css/style.css` — overrides layered on top of Bulma

`src/index.njk` is the landing page. The other pages are named after their URLs. Editing those
requires some basic HTML.

### A note on images

You do not need to resize or convert images by hand. Write a plain tag with meaningful alt text:

```html
<img src="/images/example.png" alt="What the image shows">
```

At build time the [Eleventy Image transform](https://www.11ty.dev/docs/plugins/image/) rewrites it
into a `<picture>` element with AVIF, WebP, and JPEG sources at several widths, and adds
`width`/`height` and lazy loading. Animated GIFs are the exception — add `eleventy:ignore` to those
so they are copied verbatim instead of being flattened to a single frame.

## Host on Netlify

[Tutorial is based on information
here.](https://www.freecodecamp.org/news/learn-eleventy/#heading-how-to-deploy-to-netlify)

You can technically do this without using Git and Github, e.g., [using "drag and
drop"](https://docs.netlify.com/site-deploys/create-deploys/#drag-and-drop) but I would recommend
using Git and Github for your project - it will make your life easier. Follow these steps to make
your lab webpage directory a git repository. First you will need to make a github account and
[create a
repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository).
Name it the same as your lab webpage directory, and make sure you create it as blank (don't have github make any of the default files)


```sh
# make sure you are in your lab webpage directory
cd YOURDIRNAME
git init
git add --all
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPONAME.git
git push -u origin main
```

- On Netlify click on the "Import from Git" button. Netlify will ask you to connect a Git provider.
Choose GitHub and authorize Netlify to access your GitHub repositories. Choose the repository that
holds your portfolio site. 
- The build command (`npm run build`), publish directory (`public`), and Node version are all
declared in `netlify.toml`, so you can accept whatever Netlify proposes — the file wins. Pinning
the Node version there matters: without it, Netlify's rolling default will eventually move past
what the build expects and deploys will start failing for no apparent reason.
- Now click the "Deploy site" button.
- In a few moments Netlify will tell you that your site is live and give you a URL for it.

### Info/tips for setting up custom domain name.

You may want to use [a custom domain name](https://docs.netlify.com/domains-https/custom-domains/) for your site rather than the random url that netlify
makes for you. To do this you will need to [purchase a domain registration.](https://docs.netlify.com/domains-https/netlify-dns/domain-registration/)

Note: that when purchasing DNS from netlify (e.g. hoglelab.org) you need make www.hoglelab.org the primary domain and not just hoglelab.org. [See this answer](https://answers.netlify.com/t/cert-provisioning-error-we-could-not-provision-a-let-s-encrypt-certificate-for-your-custom-domain/19577)