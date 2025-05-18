export default function handler(req, res) {
    const baseUrl = "https://spicyrate.app";
  
    const staticPages = [
      "", // homepage
      "about",
      "add-creator",
    ];
  
    const creatorSlugs = [
      "abella-danger",
      "alina-rose",
      "summer-xiris",
      "ava-reyes",
      "aishah-sofey",
      "sophie-rain",
      "lana-lux",
      "brandi-costarica",
      "daiana-doll",
      "angelica-bliss",
      // Add more here manually, or auto-fetch later from Firestore
    ];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((page) => {
        return `
      <url>
        <loc>${baseUrl}/${page}</loc>
      </url>
    `;
      })
      .join("")}
    ${creatorSlugs
      .map((slug) => {
        return `
      <url>
        <loc>${baseUrl}/creator/${slug}</loc>
      </url>
    `;
      })
      .join("")}
  </urlset>`;
  
    res.setHeader("Content-Type", "application/xml");
    res.status(200).end(sitemap);
  }
  