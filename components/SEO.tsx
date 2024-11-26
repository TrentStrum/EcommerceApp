import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title: string
    description: string
    images: { url: string; alt: string }[]
    site_name: string
  }
  twitter?: {
    handle: string
    site: string
    cardType: string
  }
}

export default function SEO({
  title,
  description,
  canonical,
  openGraph,
  twitter,
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {canonical && <link rel="canonical" href={canonical} />}

      {openGraph && (
        <>
          <meta property="og:type" content="website" />
          <meta property="og:title" content={openGraph.title} />
          <meta property="og:description" content={openGraph.description} />
          <meta property="og:site_name" content={openGraph.site_name} />
          {openGraph.images.map((image, index) => (
            <meta key={index} property="og:image" content={image.url} />
          ))}
        </>
      )}

      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.cardType} />
          <meta name="twitter:site" content={twitter.site} />
          <meta name="twitter:creator" content={twitter.handle} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
        </>
      )}

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: title,
          description: description,
          url: canonical,
        })}
      </script>
    </Head>
  )
}

