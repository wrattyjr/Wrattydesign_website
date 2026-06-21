import Head from 'next/head'
import { getPageHtml } from '../lib/getPageProps'

export default function Gallipoli({ title, description, bodyHtml }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta content={title} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content={title} name="twitter:title" />
        <meta content={description} name="twitter:description" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  )
}

export async function getStaticProps() {
  const props = getPageHtml('gallipoli.html')
  return { props }
}
