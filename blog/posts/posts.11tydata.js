function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

module.exports = {
  permalink: (data) => `/blog/${slugify(data.page.fileSlug)}/`,
};
