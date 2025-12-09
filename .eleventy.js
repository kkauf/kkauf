const Image = require("@11ty/eleventy-img");
const path = require("path");
const fs = require("fs");

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

  // Custom markdown-it plugin to transform markdown images to optimized images
  eleventyConfig.amendLibrary("md", (mdLib) => {
    const defaultImageRender = mdLib.renderer.rules.image || function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

    mdLib.renderer.rules.image = function(tokens, idx, options, env, self) {
      const token = tokens[idx];
      const src = token.attrGet("src");
      const alt = token.content || "";

      // Skip external URLs
      if (src && (src.startsWith("http://") || src.startsWith("https://"))) {
        return defaultImageRender(tokens, idx, options, env, self);
      }

      // Resolve the image path relative to the current page
      if (src && env && env.page && env.page.inputPath) {
        const pageDir = path.dirname(env.page.inputPath);
        // Decode URL-encoded characters (e.g., %20 -> space)
        const decodedSrc = decodeURIComponent(src);
        const imagePath = path.join(pageDir, decodedSrc);
        
        // Check if the image exists
        if (fs.existsSync(imagePath)) {
          try {
            // Use synchronous image processing
            const metadata = Image.statsSync(imagePath, {
              widths: [600, 900, 1200],
              formats: ["webp", "jpeg"],
              outputDir: "./_site/img/",
              urlPath: "/img/"
            });
            
            // Queue the image for processing (async but we don't wait)
            Image(imagePath, {
              widths: [600, 900, 1200],
              formats: ["webp", "jpeg"],
              outputDir: "./_site/img/",
              urlPath: "/img/"
            });

            const imageAttributes = {
              alt,
              sizes: "(min-width: 40em) 720px, 100vw",
              loading: "lazy",
              decoding: "async",
            };

            return Image.generateHTML(metadata, imageAttributes);
          } catch (e) {
            console.warn(`Warning: Could not process image ${imagePath}:`, e.message);
          }
        }
      }

      // Fallback to default rendering
      return defaultImageRender(tokens, idx, options, env, self);
    };
  });
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
    // Look for img tags within picture elements first, then regular img tags
    const match = String(content).match(/<picture[^>]*>.*?<img[^>]+src=\"([^\"]+)\"/i) || 
                String(content).match(/<img[^>]+src=\"([^\"]+)\"/i);
    return match ? match[1] : "";
});

  return {
    dir: {
      input: ".",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false,
    // Enable directory-based data files for post folders
    dataTemplateEngine: "njk"
  };
};
