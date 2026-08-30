export function useSeoPage(options: {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  path: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string | undefined>
  imageAlt?: MaybeRefOrGetter<string | undefined>
  noIndex?: MaybeRefOrGetter<boolean | undefined>
}) {
  const localePath = useLocalePath()
  const { locale } = useI18n()
  const siteUrl = useSiteUrl()

  const seo = computed(() => {
    const rawTitle = toValue(options.title)
    const title = rawTitle.includes('coffee cherry') ? rawTitle : `coffee cherry — ${rawTitle}`
    const description = toValue(options.description)
    const path = localePath(toValue(options.path))
    const imagePath = toValue(options.image) || '/images/og-default.svg'
    const imageAlt = toValue(options.imageAlt) || title
    const noIndex = toValue(options.noIndex) ?? false

    return {
      title,
      description,
      canonical: toAbsoluteUrl(path, siteUrl.value),
      image: toAbsoluteUrl(imagePath, siteUrl.value),
      imageAlt,
      locale: locale.value === 'en' ? 'en_US' : 'ru_RU',
      robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    }
  })

  useSeoMeta(
    computed(() => ({
      title: seo.value.title,
      description: seo.value.description,
      robots: seo.value.robots,
      ogTitle: seo.value.title,
      ogDescription: seo.value.description,
      ogType: 'website',
      ogUrl: seo.value.canonical,
      ogImage: seo.value.image,
      ogImageAlt: seo.value.imageAlt,
      ogSiteName: 'coffee cherry',
      ogLocale: seo.value.locale,
      twitterCard: 'summary_large_image',
      twitterTitle: seo.value.title,
      twitterDescription: seo.value.description,
      twitterImage: seo.value.image,
    })),
  )

  useHead(
    computed(() => ({
      link: [{ rel: 'canonical', href: seo.value.canonical }],
    })),
  )
}
