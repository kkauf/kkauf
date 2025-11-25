const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = "100vw", widths = [400, 800, 1200], classes = "") {
  let metadata = await Image(src, {
    widths: widths,
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/",
    urlPath: "/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    class: classes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("files");
  eleventyConfig.addPassthroughCopy("favicon.svg");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("decodeEntities", (str) => {
    if (!str) return "";
    return String(str)
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  });

  eleventyConfig.addFilter("firstImageSrc", (content) => {
    if (!content) return "";
    const match = String(content).match(/<img[^>]+src=\"([^\"]+)\"/i);
    return match ? match[1] : "";
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
