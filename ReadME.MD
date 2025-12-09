# kkauf.com

Personal site and portfolio for Konstantin G. M. Kaufmann.

This repository contains the source for the single-page marketing site at `kkauf.com`.

## Overview

The main site is a **vanilla HTML/CSS/JavaScript** single-page app with:

- A hero section with typewriter-style intro animation
- Scroll-snapped sections for About, Recent Work, Work (Vita), and Contact
- Responsive layout with a mobile navigation drawer
- Smooth scrolling between sections
- Simple entrance animations for key content

The `/blog` section is powered by Eleventy (11ty), a static site generator.

## Features

- **Single-page layout** with clearly separated sections for story, case studies, and CV
- **Responsive design** for mobile, tablet, and desktop
- **Accessible-ish navigation**
  - Fixed top nav on larger screens
  - Hamburger menu + overlay on mobile
  - Active link highlighting as you scroll
  - Keyboard focus outlines on nav, CTAs, and cards
- **Typewriter hero animation** with:
  - `prefers-reduced-motion` support (falls back to instant text)
  - Early completion when the user scrolls or taps
- **Contact section** with links to booking (Cal.com), email, and LinkedIn

## Tech stack

- **Frontend**: Plain HTML5, CSS3, vanilla JavaScript
- **Styling**: Custom CSS (no framework), CSS variables, responsive layout via media queries
- **Animations**: Custom keyframes and intersection observers for fade/slide-in effects
- **Icons**: Google Material Icons
- **Analytics**: Google Analytics (gtag.js)
- **Blog**: Eleventy (11ty) static blog under `/blog`.

## Project structure

```text
project-root/
├── index.html          # Main single-page site
├── css/
│   ├── styles.css      # Layout, typography, components
│   └── animations.css  # Reusable animation keyframes/classes
├── js/
│   ├── main.js         # Navigation, scroll handling, observers
│   └── animations.js   # Hero typewriter + section animations
├── img/                # Logos, profile image, etc.
├── blog/               # Eleventy templates and posts
├── .eleventy.js        # Eleventy configuration
├── package.json        # Eleventy devDependency and scripts
└── ReadME.MD           # This README
```

## Local development

You can work on the main site as a static HTML/CSS/JS project, or run everything through Eleventy when working on the blog.

### 1. Main single-page site (no build)

No build step is required.

Options:

- Open `index.html` directly in a modern browser, **or**
- Serve the repo with any static HTTP server, for example:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

Changes to files in `css/` and `js/` will be reflected on refresh.

### 2. Blog (Eleventy)

From the project root:

```bash
npm install        # once
npm run dev        # Eleventy dev server (serves _site/)
```

The blog is available at `/blog`. New posts live in `blog/posts/` as Markdown files with front matter.

### 3. Build

To build the full static site (including blog) into `_site/`:

```bash
npm run build
```

## Deployment

The main site can be deployed to any static host (e.g. GitHub Pages, Netlify, Vercel static export, Cloudflare Pages). Typical setup:

1. Ensure `index.html`, `css/`, `js/`, and `img/` are available to your host.
2. Point your domain (e.g. `kkauf.com`) at the deployed site.

Exact steps depend on your hosting provider.

## Blog Publishing Runbook

To publish a new blog post:

**Method 1: Quick Publish (recommended)**
1. **Create your post** as a markdown file in `blog/` with front matter:
   ```yaml
   ---
   title: Your Post Title
   layout: layouts/post.njk
   tags: post
   date: YYYY-MM-DD
   description: "Brief description"
   ---
   ```

2. **Add images** (if any) to the same `blog/` directory. Reference them in markdown:
   ```markdown
   ![Alt text](image-name.jpeg)
   ```

3. **Test the build**:
   ```bash
   npm run build
   ```

4. **Publish** (commits and pushes to GitHub):
   ```bash
   npm run publish
   ```

**Method 2: Organized Workflow**
1. **Create your post** in `blog/posts/` with filename format `YYYYMMDD - Post Title.md`
2. **Add images** to `blog/posts/` directory
3. **Run organization script**:
   ```bash
   npm run reorganize-posts
   ```
4. **Test and publish**:
   ```bash
   npm run build
   npm run publish
   ```

### Optional: Post Organization

For better organization, you can move posts into individual folders:

```bash
npm run reorganize-posts
```

This converts:
- `blog/posts/YYYYMMDD - Post Title.md` → `blog/posts/yyyy-mmdd-post-title/index.md`
- Moves referenced images into each post's folder
- Updates image paths automatically

**Note**: This only works for posts in `blog/posts/`, not the main `blog/` directory.

## Contributing

This repo is primarily for personal use, but small fixes (typos, accessibility improvements, etc.) are welcome via pull requests.

## License

No explicit license has been added yet. All rights reserved by the site owner unless stated otherwise.

---

## Legacy scaffold (original setup notes)

Certainly, I can help you set up the technical skeleton for your website based on your requirements. Let's break this down into steps and create a structure that accommodates your needs.



```plaintext
project-root/
├── index.html
├── css/
│   ├── styles.css
│   └── animations.css
├── js/
│   ├── main.js
│   └── animations.js
├── img/
├── blog/
│   ├── _config.yml
│   ├── _posts/
│   └── index.html
├── .gitignore
└── README.md

```

This structure sets up your project with the following components:

1. `index.html`: Your main page
2. `css/`: Directory for your stylesheets
   - `styles.css`: For general styles
   - `animations.css`: For animation-specific styles
3. `js/`: Directory for your JavaScript files
   - `main.js`: For general functionality
   - `animations.js`: For animation-specific scripts
4. `img/`: Directory for your images
5. `blog/`: Subdirectory reserved for a future blog (optional)
6. `.gitignore`: To specify which files Git should ignore
7. `README.md`: Project documentation

Now, let's set up the basic HTML structure for your main page:



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/animations.css">
</head>
<body>
    <div class="page" id="home">
        <h1>Welcome</h1>
        <p>Coming Soon</p>
    </div>
    <div class="page" id="about">
        <h2>About</h2>
        <p>Your content here</p>
    </div>
    <div class="page" id="portfolio">
        <h2>Portfolio</h2>
        <p>Your content here</p>
    </div>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="/blog">Blog</a></li>
        </ul>
    </nav>
    <script src="js/main.js"></script>
    <script src="js/animations.js"></script>
</body>
</html>

```

This HTML structure sets up your main page with multiple full-screen sections that can be navigated between, as well as a link to your blog.

For the CSS, let's start with a basic structure that supports both mobile and desktop layouts:



```css
/* styles.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    overflow-x: hidden;
}

.page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    text-align: center;
}

nav {
    position: fixed;
    top: 1rem;
    right: 1rem;
}

nav ul {
    list-style-type: none;
}

nav ul li {
    display: inline;
    margin-left: 1rem;
}

nav ul li a {
    color: #333;
    text-decoration: none;
}

/* Mobile-first approach */
@media (max-width: 768px) {
    .page {
        padding: 1rem;
    }

    nav {
        width: 100%;
        bottom: 0;
        top: auto;
        left: 0;
        background: #f4f4f4;
        padding: 0.5rem;
    }

    nav ul {
        display: flex;
        justify-content: space-around;
    }

    nav ul li {
        margin: 0;
    }
}

```

This CSS provides a responsive layout that works for both mobile and desktop. On desktop, it supports full-screen sections with a navigation menu in the top right. On mobile, it adjusts the layout and moves the navigation to the bottom of the screen.

For animations, you can start with this basic structure:



```css
/* animations.css */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.fade-in {
    animation: fadeIn 1s ease-out;
}

.slide-in {
    animation: slideIn 0.5s ease-out;
}

```

To implement these animations and handle the pagination effect, you'll need some JavaScript. Here's a basic structure to start with:



```javascript
// main.js
document.addEventListener('DOMContentLoaded', (event) => {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    function showPage(index) {
        pages.forEach((page, i) => {
            if (i === index) {
                page.style.display = 'flex';
                page.classList.add('fade-in');
            } else {
                page.style.display = 'none';
                page.classList.remove('fade-in');
            }
        });
    }

    function handleNavigation(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').slice(1);
            const targetIndex = Array.from(pages).findIndex(page => page.id === targetId);
            if (targetIndex !== -1) {
                showPage(targetIndex);
                currentPage = targetIndex;
            }
        }
    }

    document.querySelector('nav').addEventListener('click', handleNavigation);

    showPage(currentPage);
});

```

This JavaScript handles the pagination effect and shows/hides pages based on navigation.