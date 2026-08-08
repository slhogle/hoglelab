import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";

// Shared markdown-it instance backing the `renderUsingMarkdown` filter.
// Used by news headlines and team bios so those data files can contain links
// and emphasis without hand-writing HTML.
const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
});

export default async function (eleventyConfig) {
    // Optimises every <img> in the built HTML as a post-processing step, so
    // templates keep writing plain <img src alt>. Generated derivatives go to
    // /img/ to keep them distinct from the passthrough-copied originals.
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // "svg" first + svgShortCircuit means an SVG source is passed through
        // untouched rather than rasterised; the entry is ignored for raster
        // sources, which still get the full avif/webp/jpeg set.
        formats: ["svg", "avif", "webp", "jpeg"],
        widths: [400, 800, 1200, "auto"],
        urlPath: "/img/",
        outputDir: "./public/img/",
        svgShortCircuit: true,
        htmlOptions: {
            imgAttributes: {
                loading: "lazy",
                decoding: "async",
                sizes: "(min-width: 1024px) 50vw, 100vw",
            },
            pictureAttributes: {},
        },
    });

    // Copy these directories and files to public
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addPassthroughCopy("./src/bundle.js");
    eleventyConfig.addPassthroughCopy("./src/pdfs/");
    eleventyConfig.addPassthroughCopy({ "./src/favicons": "/" });

    // src/images is deliberately NOT copied wholesale. The image transform
    // above resolves absolute src paths against the input directory and emits
    // only the images actually referenced by an <img> tag, so unreferenced
    // originals stay in the repo without being deployed.
    //
    // GIFs are the exception: they carry `eleventy:ignore` in the templates
    // because sharp flattens animation to a single frame, so they need a real
    // copy to exist in the output.
    eleventyConfig.addPassthroughCopy("./src/images/*.gif");

    // triggers rebuild when files in any of these directories change
    eleventyConfig.addWatchTarget("./src/css");
    eleventyConfig.addWatchTarget("./src/bundle.js");
    eleventyConfig.addWatchTarget("./src/images/");
    eleventyConfig.addWatchTarget("./src/pdfs/");
    eleventyConfig.addWatchTarget("./src/favicons");

    // make it so that year in footer updates automatically
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // adds jekyll-like markdownify feature.
    // see here: https://edjohnsonwilliams.co.uk/blog/2019-05-04-replicating-jekylls-markdownify-filter-in-nunjucks-with-eleventy/
    eleventyConfig.addNunjucksFilter("renderUsingMarkdown", (markdownString) =>
        md.render(markdownString)
    );

    // Strips block-level wrapping from markdown so short strings (a team
    // member's role, a one-line caption) can be rendered inline.
    eleventyConfig.addNunjucksFilter("renderMarkdownInline", (markdownString) =>
        md.renderInline(markdownString)
    );

    eleventyConfig.setInputDirectory("src");
    eleventyConfig.setOutputDirectory("public");
}
