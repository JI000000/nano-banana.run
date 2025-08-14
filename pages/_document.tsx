import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'Nano-Banana.Run',
              'url': 'https://nano-banana.run',
              'logo': 'https://nano-banana.run/logo.png',
              'sameAs': [
                'https://twitter.com/nanobananai',
                'https://github.com/nano-banana'
              ],
              'description': 'The definitive resource for Nano-Banana AI image editing model.'
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
