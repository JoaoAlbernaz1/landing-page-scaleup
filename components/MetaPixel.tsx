"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"

const DEFAULT_PIXEL_ID = "924799370104674"

const MetaPixel = () => {
  const pathname = usePathname()
  const [pixelId] = useState<string>(DEFAULT_PIXEL_ID)

  useEffect(() => {
    if (!pixelId) return
    if (typeof window === "undefined") return

    const fbq = (window as any).fbq
    if (typeof fbq !== "function") return

    // Rastreia PageView em cada mudança de rota
    fbq("track", "PageView")
  }, [pathname, pixelId])

  if (!pixelId) {
    return null
  }

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js' );
            fbq('init', '${DEFAULT_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${DEFAULT_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

export default MetaPixel

