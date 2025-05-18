export default function handler(req, res) {
    const baseUrl = 'https://spicyrate.app';
    const staticPages = [
      '',
      '/about',
      '/add-creator',
    ];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticPages
          .map(
            (page) => `
          <url>
            <loc>${baseUrl}${page}</loc>
          </url>
        `
          )
          .join('')}
      </urlset>`;
  
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).end(sitemap);
  }
  