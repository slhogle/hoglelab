// for making images work w/ eleventy-img
// see here: https://www.11ty.dev/docs/plugins/image/
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(`./src${src}`, {
        widths: [300, 800, null],
        formats: ["avif", "jpeg"],
        urlPath: "/images/",
        outputDir: "./public/images/"
    });

    let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async"
    };

    return Image.generateHTML(metadata, imageAttributes);
}

// to use markdown-it
const md = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true,
});

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("bundle.js");
};

module.exports = function (eleventyConfig) {
    // Copy these directories and files to public
    eleventyConfig.addPassthroughCopy('./src/css');
    eleventyConfig.addPassthroughCopy("./src/bundle.js");
    eleventyConfig.addPassthroughCopy("./src/images/");
    eleventyConfig.addPassthroughCopy("./src/pdfs/");
    eleventyConfig.addPassthroughCopy({ "./src/favicons": "/" });

    // triggers rebuild when files in any of these directories change
    eleventyConfig.addWatchTarget('./src/css');
    eleventyConfig.addWatchTarget("./src/bundle.js");
    eleventyConfig.addWatchTarget("./src/images/");
    eleventyConfig.addWatchTarget("./src/pdfs/");
    eleventyConfig.addWatchTarget("./src/favicons");

    // make it so that year in footer updates automatically
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // short code for image generation
    eleventyConfig.addNunjucksAsyncShortcode("EleventyImage", imageShortcode);

    //adds jekyll - like markdownify feature. 
    // see here: https://edjohnsonwilliams.co.uk/blog/2019-05-04-replicating-jekylls-markdownify-filter-in-nunjucks-with-eleventy/
    eleventyConfig.addNunjucksFilter("renderUsingMarkdown", (markdownString) =>
        md.render(markdownString)
    );

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
};
