#!/usr/bin/env node
/**
 * Reorganize blog posts into individual folders
 * 
 * Before:
 *   blog/posts/
 *     20251119 - How NOT to launch a product.md
 *     Screenshot.png
 *     Image.jpeg
 *
 * After:
 *   blog/posts/
 *     20251119-how-not-to-launch-a-product/
 *       index.md
 *       Screenshot.png
 *       Image.jpeg
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'blog', 'posts');

// Image extensions to look for
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico'];

function slugify(filename) {
  // Remove date prefix and extension, then slugify
  // "20251119 - How NOT to launch a product.md" -> "20251119-how-not-to-launch-a-product"
  const name = filename.replace(/\.md$/, '');
  return name
    .toLowerCase()
    .replace(/\s+-\s+/g, '-')  // " - " -> "-"
    .replace(/\s+/g, '-')       // spaces -> dashes
    .replace(/[^a-z0-9-]/g, '') // remove special chars
    .replace(/-+/g, '-');       // collapse multiple dashes
}

function extractImageReferences(content) {
  const images = new Set();
  
  // Match markdown images: ![alt](src)
  const mdImageRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
  let match;
  while ((match = mdImageRegex.exec(content)) !== null) {
    images.add(match[1]);
  }
  
  // Match Nunjucks image shortcode: {% image "path", ... %}
  const njkImageRegex = /\{%\s*image\s+["']([^"']+)["']/g;
  while ((match = njkImageRegex.exec(content)) !== null) {
    // Extract just the filename from paths like "blog/posts/Screenshot.png"
    const imgPath = match[1];
    const basename = path.basename(imgPath);
    images.add(basename);
  }
  
  return images;
}

function updateImagePaths(content, folderName) {
  // Update Nunjucks shortcode paths: {% image "./file.png" -> {% image "blog/posts/folder/file.png"
  // The shortcode needs paths relative to project root, not to the markdown file
  let updated = content.replace(
    /(\{%\s*image\s+["'])\.\/([^"']+)(["'])/g,
    `$1blog/posts/${folderName}/$2$3`
  );
  
  // Also handle any that still reference blog/posts/ directly (shouldn't happen but just in case)
  updated = updated.replace(
    /(\{%\s*image\s+["'])blog\/posts\/(?!20\d{6}-[^/]+\/)([^"']+)(["'])/g,
    `$1blog/posts/${folderName}/$2$3`
  );
  
  // Markdown images with just filename should work as-is (relative to the index.md)
  // But if they have the full path, update it
  updated = updated.replace(
    /(!\[[^\]]*\]\()blog\/posts\/([^)]+)(\))/g,
    '$1./$2$3'
  );
  
  return updated;
}

function reorganizePosts() {
  console.log('🔄 Reorganizing blog posts...\n');
  
  const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true });
  
  // Find all markdown files (posts)
  const posts = entries.filter(e => e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('posts.'));
  
  // Find all images in the posts directory
  const allImages = entries.filter(e => 
    e.isFile() && IMAGE_EXTENSIONS.includes(path.extname(e.name).toLowerCase())
  );
  
  console.log(`Found ${posts.length} posts and ${allImages.length} images\n`);
  
  // Track which images have been moved
  const movedImages = new Set();
  
  for (const post of posts) {
    const postPath = path.join(POSTS_DIR, post.name);
    const content = fs.readFileSync(postPath, 'utf-8');
    
    // Create folder name from post filename
    const folderName = slugify(post.name);
    const folderPath = path.join(POSTS_DIR, folderName);
    
    console.log(`📁 ${post.name}`);
    console.log(`   -> ${folderName}/`);
    
    // Create the folder
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    
    // Find images referenced in this post
    const referencedImages = extractImageReferences(content);
    console.log(`   📷 Found ${referencedImages.size} image references`);
    
    // Move referenced images to the folder
    for (const imgRef of referencedImages) {
      const imgName = path.basename(imgRef);
      const srcPath = path.join(POSTS_DIR, imgName);
      const destPath = path.join(folderPath, imgName);
      
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        movedImages.add(imgName);
        console.log(`      ✓ ${imgName}`);
      }
    }
    
    // Update image paths in content and save as index.md
    const updatedContent = updateImagePaths(content, folderName);
    const indexPath = path.join(folderPath, 'index.md');
    fs.writeFileSync(indexPath, updatedContent);
    console.log(`   ✓ Created index.md\n`);
  }
  
  // Clean up: remove original post files and moved images
  console.log('\n🧹 Cleaning up original files...');
  
  for (const post of posts) {
    const postPath = path.join(POSTS_DIR, post.name);
    fs.unlinkSync(postPath);
    console.log(`   ✓ Removed ${post.name}`);
  }
  
  for (const imgName of movedImages) {
    const imgPath = path.join(POSTS_DIR, imgName);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
      console.log(`   ✓ Removed ${imgName}`);
    }
  }
  
  // Warn about orphaned images
  const orphanedImages = allImages.filter(img => !movedImages.has(img.name));
  if (orphanedImages.length > 0) {
    console.log('\n⚠️  Orphaned images (not referenced by any post):');
    for (const img of orphanedImages) {
      console.log(`   - ${img.name}`);
    }
  }
  
  console.log('\n✅ Done! Posts reorganized into individual folders.');
}

// Run if called directly
if (require.main === module) {
  reorganizePosts();
}

module.exports = { reorganizePosts, slugify, extractImageReferences };
