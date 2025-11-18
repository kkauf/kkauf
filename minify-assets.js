const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const htmlMinifier = require('html-minifier');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js');

const siteDir = '_site';

async function minifyAssets() {
    console.log('Starting minification...');
    try {
        // Minify HTML
        const htmlFiles = await glob(`${siteDir}/**/*.html`);
        console.log(`Found ${htmlFiles.length} HTML files`);
        htmlFiles.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const result = htmlMinifier.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            });
            fs.writeFileSync(file, result);
            console.log(`Minified HTML: ${file}`);
        });

        // Minify CSS
        const cssFiles = await glob(`${siteDir}/**/*.css`);
        console.log(`Found ${cssFiles.length} CSS files`);
        const cleaner = new CleanCSS();
        cssFiles.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const output = cleaner.minify(content);
            fs.writeFileSync(file, output.styles);
            console.log(`Minified CSS: ${file}`);
        });

        // Minify JS
        const jsFiles = await glob(`${siteDir}/**/*.js`);
        console.log(`Found ${jsFiles.length} JS files`);
        jsFiles.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const result = UglifyJS.minify(content);
            if (result.error) {
                console.error(`Error minifying ${file}:`, result.error);
                return;
            }
            fs.writeFileSync(file, result.code);
            console.log(`Minified JS: ${file}`);
        });

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

minifyAssets();
