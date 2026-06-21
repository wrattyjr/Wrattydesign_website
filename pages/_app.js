import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (pageProps.wfPage) {
      document.documentElement.setAttribute('data-wf-page', pageProps.wfPage)
    }
    if (window.Webflow) {
      window.Webflow.destroy()
      window.Webflow.ready()
      window.Webflow.require('ix2').init()
    }
  }, [router.asPath, pageProps.wfPage])

  return (
    <>
      <Script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=664fbfb72673479a5d7256da"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <Script src="/js/webflow.js" strategy="afterInteractive" />
      <Component {...pageProps} />
    </>
  )
}
