# Instructions/notes for building lab website

## General steps to install/use Eleventy

### 1. Make a Project directory

```sh
mkdir eleventy-test
cd eleventy-test
```

### 2. Install Eleventy locally
You may also install Eleventy globally but the package.json installation method below is recommended.

First create A package.json. Installing Eleventy into a project requires a package.json file. The npm command (provided by Node.js) will create one for you with `npm init -y`. -y tells npm to use default values and skips the command line questionnaire.

```sh
npm init -y
```

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

If you see (v2.0.1) in your output you know you’re using the newest version. However, Eleventy didn’t process any files! This is expected—we have an empty folder with no templates inside.

### 4. Serve a site

```sh
npx @11ty/eleventy --serve
```

Using the command `npx` uses the local Eleventy dependency and not global. The --serve flag in our terminal command instructs Eleventy to serve the dist folder with a local web server and also watch for any file changes. This means that if you change the content of index.md and refresh your browser: you should see the new content.


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
