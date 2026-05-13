import type { MetadataRoute } from 'next'
import { casinos } from '@/lib/casinos'
import { guides } from '@/lib/guides'
import { CRYPTO_LIST, COUNTRY_LIST } from '@/lib/programmatic'

const BASE_URL = 'https://playmagpie.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/best-crypto-casinos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/fast-withdrawal-casinos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/high-roller-casinos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/no-kyc-casinos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/crypto`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/country`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const casinoReviewPages: MetadataRoute.Sitemap = casinos.map((casino) => ({
    url: `${BASE_URL}/reviews/${casino.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const cryptoPages: MetadataRoute.Sitemap = CRYPTO_LIST.map((crypto) => ({
    url: `${BASE_URL}/crypto/${crypto.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  const countryPages: MetadataRoute.Sitemap = COUNTRY_LIST.map((country) => ({
    url: `${BASE_URL}/country/${country.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  const comparisonPages: MetadataRoute.Sitemap = []
  for (let i = 0; i < casinos.length; i++) {
    for (let j = 0; j < casinos.length; j++) {
      if (i !== j) {
        comparisonPages.push({
          url: `${BASE_URL}/compare/${casinos[i].slug}-vs-${casinos[j].slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.65,
        })
      }
    }
  }

  return [...staticPages, ...casinoReviewPages, ...guidePages, ...cryptoPages, ...countryPages, ...comparisonPages]
}
