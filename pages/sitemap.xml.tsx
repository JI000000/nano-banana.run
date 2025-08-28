import { GetServerSideProps } from 'next';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Base URL
  const baseUrl = 'https://nano-banana.run';
  
  // Get current date for lastmod
  const now = new Date().toISOString();
  
  // Tutorial slugs (will come from CMS or DB in a real app)
  const tutorialSlugs = [
    'getting-started',
    'text-replacement',
    'scene-transformation',
    'style-matching',
    'batch-processing',
    'product-photography',
  ];
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/tutorials',
    '/examples',
    '/comparison',
    '/faq',
    '/contact',
    '/nano-banana-gemini-2-5-flash-image',
    '/try-generator',
    '/batch-processing',
    '/search',
    '/news/nano-banana-2025-08-26',
  ];
  
  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((path) => `
          <url>
            <loc>${baseUrl}${path}</loc>
            <lastmod>${now}</lastmod>
            <changefreq>${path === '' ? 'daily' : 'weekly'}</changefreq>
            <priority>${path === '' ? '1.0' : '0.8'}</priority>
          </url>
        `)
        .join('')}
      ${tutorialSlugs
        .map((slug) => `
          <url>
            <loc>${baseUrl}/tutorials/${slug}</loc>
            <lastmod>${now}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
          </url>
        `)
        .join('')}
    </urlset>
  `;
  
  // Set headers
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  
  // Write the XML
  res.write(sitemap);
  res.end();
  
  return {
    props: {},
  };
};

export default Sitemap;
