import Head from 'next/head'
import { getPageHtml } from '../lib/getPageProps'

export default function Custom401({ title, description, bodyHtml }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  )
}

export async function getStaticProps() {
  const props = getPageHtml('401.html')
  return { props }
}
