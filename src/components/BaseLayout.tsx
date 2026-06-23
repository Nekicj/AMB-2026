import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ReactNode } from "react"
import Navigation from "./Navigation"
import Footer from "./Footer"
import GoogleAnalytics from "./GoogleAnalytics"

type Props = {
  children: ReactNode
  locale: string
}

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages()

  return (
    <html className="h-full" lang={locale}>
      <body className="flex min-h-screen flex-col">
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <div id="transition">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}