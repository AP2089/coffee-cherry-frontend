export function useSeoPage(options: {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  path: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string | undefined>
}) {
  const site = 'https://coffee-cherry.local'
  const localePath = useLocalePath()

  const seo = computed(() => {
    const rawTitle = toValue(options.title)
    const title = rawTitle.includes('coffee cherry') ? rawTitle : `coffee cherry — ${rawTitle}`

    return {
      title,
      description: toValue(options.description),
      canonical: `${site}${localePath(toValue(options.path))}`,
      image: toValue(options.image) || '/images/og-default.svg',
    }
  })

  useSeoMeta(
    computed(() => ({
      title: seo.value.title,
      description: seo.value.description,
      ogTitle: seo.value.title,
      ogDescription: seo.value.description,
      ogType: 'website',
      ogUrl: seo.value.canonical,
      ogImage: seo.value.image,
      twitterCard: 'summary_large_image',
      twitterTitle: seo.value.title,
      twitterDescription: seo.value.description,
    })),
  )

  useHead(
    computed(() => ({
      link: [{ rel: 'canonical', href: seo.value.canonical }],
    })),
  )
}
