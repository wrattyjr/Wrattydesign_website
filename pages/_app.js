import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const wfPageRef = useRef(pageProps.wfPage)

  // Keep ref current on every render so onLoad and useEffect always read the right page ID
  wfPageRef.current = pageProps.wfPage

  const initWebflow = () => {
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
  }

  // Re-initialize on every client-side navigation
  useEffect(() => {
    initWebflow()
  }, [router.asPath])

  return (
    <>
      {/* onLoad fires right after webflow.js executes — guaranteed correct init order */}
      <Script src="/js/webflow.js" strategy="afterInteractive" onLoad={initWebflow} />
      <Component {...pageProps} />
    </>
  )
}
