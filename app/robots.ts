import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/privacy', '/terms'],
      },
    ],
    sitemap: 'https://www.playmagpie.com/sitemap.xml',
  }
}
