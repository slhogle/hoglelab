# Instructions/notes for building lab website

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
rm .git
```

Later you will need to turn this into a git repository to deploy to netlify.

## Install Eleventy

[Eleventy](https://www.11ty.dev/) is a simple static site generator that I use to build my lab
webpage. You will need to install it first to use my template.

### 1. Install Node.js
[Node.js](https://nodejs.org/en) is a javascript runtime environment. You will need Node.js to
install Eleventy. Some operating systems come with Node.js preinstalled but I recommend installing
the latest version from the [Node.js webpage.](https://nodejs.org/en/download/package-manager). If
you use Ubuntu I have already gone through this process - see below (YMMV):


#### Dealing with Node.js on Ubuntu
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

### 2. Install Eleventy locally
You may  install Eleventy globally but the package.json installation method below is recommended.
This will allow you to install a single version of Eleventy into the repository for your lab
website, and you won't have to worry so much about subsequent updates breaking your webpage.

You first need a `package.json` file. *If you downloaded this git repo then there is already one
included, but you may want to change a bit of the content.* If you are starting from scratch, the npm command (provided by Node.js) will create one for you with `npm init -y`. -y tells
npm to use default values and skips the command line questionnaire.

Next install Eleventy. @11ty/eleventy is published on npm and we can install and save it into our project’s package.json by running:

```sh
npm install @11ty/eleventy --save-dev
```

This now installs a local version of Eleventy in our project.

### 3. Run Eleventy 
We can use the `npx` command (also provided by Node.js) to run our local project's version of Eleventy. Let’s make sure our installation went okay and try to run Eleventy:

```sh
npx @11ty/eleventy
```

Here’s what your command line might look like after you run Eleventy:

```
[11ty] Wrote 0 files in 0.03 seconds (v2.0.1)
```

### 4. Serve a site

Now you can serve the content in the repo to a browser and preview the content using at `http://localhost:`

```sh
npx @11ty/eleventy --serve
```

Using the command `npx` uses the local Eleventy dependency and not global. The --serve flag in our terminal command instructs Eleventy to serve the dist folder with a local web server and also watch for any file changes. This means that if you change the content of index.md and refresh your browser: you should see the new content.

## Make the webpage yours

News, publication content, and general site content is in the `_data` directory. You will need to
edit these files with the content from your lab.

`_includes` contains general layouts used by Eleventy to structure the website

If you want your own site favicon you can visit a [site like
this](https://realfavicongenerator.net/) and create all the necessary favicon files. Replace the content of
`favicons` with your content.

`images` contains the images for your webpage.

`pdfs` contains copies of the pdf files you want to provide on your page.

`index.njk` is the landing page for your site. The other pages should be more or less self
explanatory from their titles. To edit these pages you will need to use some basic HTML formatting.

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
- Netlify will detect that this is an Eleventy project and will ask you to confirm the basic build settings.
- Make sure the build command is either npm run build or eleventy.
- Under "Publish directory", enter public instead of _site.
- Now click the "Deploy site" button.
- In a few moments Netlify will tell you that your site is live and give you a URL for it.

### Info/tips for setting up custom domain name.

You may want to use [a custom domain name](https://docs.netlify.com/domains-https/custom-domains/) for your site rather than the random url that netlify
makes for you. To do this you will need to [purchase a domain registration.](https://docs.netlify.com/domains-https/netlify-dns/domain-registration/)

Note: that when purchasing DNS from netlify (e.g. hoglelab.org) you need make www.hoglelab.org the primary domain and not just hoglelab.org. [See this answer](https://answers.netlify.com/t/cert-provisioning-error-we-could-not-provision-a-let-s-encrypt-certificate-for-your-custom-domain/19577)