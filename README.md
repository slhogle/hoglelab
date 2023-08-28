# Instructions/notes for building lab website

Look into using [Tailwind css](https://tailwindcss.com/) - it might be more pleasing to use than Bulma but also more complicated/steeper learning curve.

Eleventy seems to be moving away from nunjucks in favor of this new templating language called [webc](https://www.11ty.dev/docs/languages/webc/)

https://11ty.rocks/posts/introduction-webc/
https://github.com/11ty/webc
https://11ty.webc.fun/
https://github.com/darthmall/11ty.webc.fun/tree/main
https://www.robincussol.com/optimize-your-img-tags-with-eleventy-image-and-webc/

To make Bulma navbar (and also footer) go to the center and not edges check out the <body> html tag as [shown here](https://github.com/mpa139/allanlab/blob/gh-pages/_layouts/default.html) where the navbar/header is within the <body> tag. Most browser render the body tag by padding 10px or something to each side. Body tag seems to also be used in the eleventy base blog - https://github.com/11ty/eleventy-base-blog


## Resources
- [Freecodecamp - learn Eleventy](https://www.freecodecamp.org/news/learn-eleventy/)
  - https://github.com/gerhynes/eleventy-portfolio
- [Digital Ocean - Create and deploy first Eleventy website](https://www.digitalocean.com/community/tutorials/how-to-create-and-deploy-your-first-eleventy-website)
- [Learn Eleventy from scratch](https://learneleventyfromscratch.com/)
  - This tutorial was made in 2020 and may be slightly out of date
  - [End result](https://issue33.com/)
- The [Allan Lab](http://www.allanlab.org/) is the template we are trying to model after.
  - The source code [is public](https://github.com/mpa139/allanlab)
- [Bulma](https://bulma.io/) is a CSS framework. It is kind of like bootstrap
  - [Modifying columns with Bulma](https://bulma.io/documentation/columns/sizes/). This is how the Allan lab gets the news column on the main page
- [11ty Rocks](https://11ty.rocks/) is a useful colection of tutorials/tips
  - [Smol 11ty starter](https://smol-11ty-starter.netlify.app/)
- [Itsiest, Bitsiest Eleventy Tutorial](https://sia.codes/posts/itsiest-bitsiest-eleventy-tutorial/)

## General steps to install/use Eleventy

### 1. Make a Project directory

```sh
mkdir eleventy-test
cd eleventy-test
```

### 2. Install Eleventy locally
You may also install Eleventy globally but the package.json installation method below is recommended.

First create A package.json. Installing Eleventy into a project requires a package.json file. The npm command (provided by Node.js) will create one for you with npm init -y. -y tells npm to use default values and skips the command line questionnaire.

```sh
npm init -y
```

Next install Eleventy. @11ty/eleventy is published on npm and we can install and save it into our project’s package.json by running:

```sh
npm install @11ty/eleventy --save-dev
```

### 3. Run Eleventy 
We can use the npx command (also provided by Node.js) to run our local project's version of Eleventy. Let’s make sure our installation went okay and try to run Eleventy:

```sh

```

Here’s what your command line might npm init -ylook like after you run Eleventy:
```
[11ty] Wrote 0 files in 0.03 seconds (v2.0.1)
```

If you see (v2.0.1) in your output you know you’re using the newest version. However, Eleventy didn’t process any files! This is expected—we have an empty folder with no templates inside.

### 4. Serve a site

```sh
npx @11ty/eleventy --serve
```

## Dealing with NodeJS
The version of node that comes bundled with Ubuntu is old (in 2023 v12 when stable is v18). The system nodejs must be removed and then updated. This is how I did it in July 2023

```sh
# remove package source
cd /etc/apt/sources.list.d 
sudo rm nodesource.list

# fix the install, update apt
sudo apt-get --fix-broken install
sudo apt-get update

# remove libnode-dev, nodejs and the nodejs-doc packages
sudo apt-get remove libnode-dev
sudo apt-get remove libnode72:amd64
sudo apt-get remove nodejs
sudo apt-get remove nodejs-doc
```

Then I installed the current long-term support NodeJS (18.16.1) using [NodeSource](https://nodesource.com/) and [instructions here](https://github.com/nodesource/distributions#using-ubuntu-2)

```sh
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```
