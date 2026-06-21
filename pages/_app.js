import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const wfPageRef = useRef(pageProps.wfPage)
  wfPageRef.current = pageProps.wfPage

  // Re-initialize Webflow on client-side navigation
  useEffect(() => {
    if (wfPageRef.current) {
      document.documentElement.setAttribute('data-wf-page', wfPageRef.current)
    }
    try {
      if (window.Webflow) {
        window.Webflow.destroy()
        window.Webflow.ready()
        window.Webflow.require('ix2').init()
      }
    } catch (e) {}
  }, [router.asPath])

  return (
    <>
      {/* Inline script sets data-wf-page synchronously in the SSR HTML,
          before any deferred scripts run. Webflow reads this attribute
          at init time to load the correct page interactions. */}
      {pageProps.wfPage && (
        <Head>
          <script
            key="wf-page-id"
            dangerouslySetInnerHTML={{
              __html: `document.documentElement.setAttribute('data-wf-page','${pageProps.wfPage}')`,
            }}
          />
        </Head>
      )}
      <Script src="/js/webflow.js" strategy="afterInteractive" />
      <Component {...pageProps} />
    </>
  )
}
