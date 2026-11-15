"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

/** For visitors whose browser has no mail app set up for mailto: links (common with webmail). */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      type="button"
      size="lg"
      variant="outline"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setCopied(true)
          setTimeout(() => setCopied(false), 2500)
        } catch {
          // Clipboard blocked: the address is printed on the page, so there is nothing else to do.
        }
      }}
    >
      {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}
      <span aria-live="polite">{copied ? "Alamat tersalin" : "Salin alamat email"}</span>
    </Button>
  )
}
