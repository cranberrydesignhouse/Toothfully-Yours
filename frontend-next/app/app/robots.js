import { MetadataRoute } from 'next'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://toothfullyyoursdentalcare.com/sitemap.xml',
  }
}
