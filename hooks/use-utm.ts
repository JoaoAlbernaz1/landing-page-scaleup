"use client"

import { useEffect, useState } from "react"

export interface UtmParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  fbclid?: string
  gclid?: string
}

export function useUtm(): UtmParams {
  const [utms, setUtms] = useState<UtmParams>({})

  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const utmData: UtmParams = {}

    // Capturar UTMs
    const utmKeys: (keyof UtmParams)[] = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ]

    utmKeys.forEach((key) => {
      const value = params.get(key)
      if (value) {
        utmData[key] = value
      }
    })

    // Capturar fbclid e gclid
    const fbclid = params.get("fbclid")
    const gclid = params.get("gclid")

    if (fbclid) {
      utmData.fbclid = fbclid
    }

    if (gclid) {
      utmData.gclid = gclid
    }

    setUtms(utmData)
  }, [])

  return utms
}
