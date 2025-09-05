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
    'style-matching',
    'prompt-engineering',
    'examples',
    'api-guide',
    'comparison',
  ];
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/tutorials',
    '/comparison',
    '/faq',
    '/contact',
    '/image-editor',
    '/showcase',
    '/nano-banana-vs-flux-kontext',
    '/nano-banana-api',
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
