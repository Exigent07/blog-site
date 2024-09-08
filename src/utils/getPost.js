import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { marked } from "marked";
import { fileURLToPath } from "url";

marked.setOptions({
    highlight: function(code, lang) {
        return hljs.highlight(lang, code).value;
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = path.resolve(__dirname, "posts");

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function generateToC(content) {
    const toc = [];
    const lines = content.split('\n');
    let currentSection = null;

    lines.forEach(line => {
        const headingMatch = /^(#{1,6})\s+(.*)/.exec(line);
        if (headingMatch) {
            const level = headingMatch[1].length;
            const headingText = headingMatch[2].trim();
            const slug = slugify(headingText);

            const headingData = { level, headingText, slug, children: [] };

            if (level === 2) {
                currentSection = headingData;
                toc.push(headingData);
            } else if (level > 2 && currentSection) {
                currentSection.children.push(headingData);
            } else {
                toc.push(headingData);
            }
        }
    });

    return toc;
}

function readFile(filename) {
    const fullPath = path.resolve(BASE_DIR, filename);

    if (!fullPath.startsWith(BASE_DIR)) {
        throw new Error("Access to files outside the allowed directory is not permitted.");
    }

    const file = fs.readFileSync(fullPath, { encoding: "utf-8" });

    const { data, content } = matter(file);

    const premiseEndIndex = content.indexOf('---');
    let premise = '';
    let restOfContent = content;

    if (premiseEndIndex !== -1) {
        premise = content.slice(0, premiseEndIndex).trim();
        restOfContent = content.slice(premiseEndIndex + 3).trim();
    }

    const toc = generateToC(restOfContent);
    let htmlPremise = marked.parse(premise);
    let htmlContent = marked.parse(restOfContent);

    toc.forEach(({ slug, headingText }) => {
        const anchor = `<a id="${slug}" class="anchor-link"></a>`;
        htmlContent = htmlContent.replace(`<h2>${headingText}</h2>`, `<h2>${anchor}${headingText}</h2>`);
    });

    return {
        ...data,
        htmlPremise,
        toc,
        htmlContent,
        filename: filename.replace('.md', ''),
    };
}

function getPostsData() {
    const filenames = fs.readdirSync(BASE_DIR);
    const posts = filenames.map(filename => {
        return readFile(filename);
    });

    return posts;
}

export {
    getPostsData,
    readFile
}
