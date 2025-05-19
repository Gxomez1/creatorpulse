const fs = require("fs");
const path = require("path");

const baseUrl = "https://spicyrate.app";

const staticPages = ["", "about", "add-creator"];
const creatorSlugs = [
  "abella-danger", "alina-rose", "summer-xiris", "ava-reyes",
  "aishah-sofey", "sophie-rain", "lana-lux", "brandi-costarica",
  "daiana-doll", "angelica-bliss",
];

const allUrls = [
  ...staticPages.map((p) => `${baseUrl}/${p}`),
  ...creatorSlugs.map((slug) => `${baseUrl}/creator/${slug}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map((url) => {
      return `
    <url>
      <loc>${url}</loc>
    </url>`;
    })
    .join("")}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemap);
