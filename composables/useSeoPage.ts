export function useSeoPage(options: {
  title: string
  description: string
  path: string
  image?: string
}) {
  const site = 'https://coffee-cherry.local'
  const title = options.title.includes('coffee cherry')
    ? options.title
    : `coffee cherry — ${options.title}`

  useSeoMeta({
    title,
    description: options.description,
    ogTitle: title,
    ogDescription: options.description,
    ogType: 'website',
    ogUrl: `${site}${options.path}`,
    ogImage: options.image || '/images/og-default.svg',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: options.description,
  })

  useHead({
    link: [{ rel: 'canonical', href: `${site}${options.path}` }],
  })
}
