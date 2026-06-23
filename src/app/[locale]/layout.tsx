/* eslint-disable */
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ReactNode } from "react"
import BaseLayout from "@/components/BaseLayout"
import { routing } from "@/i18n/routing"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"] })

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "LocaleLayout" })

  return {
    title: t("title"),
    description: "Math Battles Community",
    icons: {
      icon: "/favicon.ico"
    },
    manifest: "/site.webmanifest",
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  //Enable static rendering
  setRequestLocale(locale)

  return (
    <BaseLayout locale={locale}>
      <main className={montserrat.className}>{children}</main>
    </BaseLayout>
  )
}
