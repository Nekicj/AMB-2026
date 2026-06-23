/* eslint-disable */
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  const [localeMessages, teamMessages] = await Promise.all([
    import(`../../messages/${locale}/locale.json`).then((m) => m.default),
    import(`../../messages/${locale}/team.json`).then((m) => m.default),
  ])

  return {
    locale,
    messages: {
      ...localeMessages,
      ...teamMessages,
    },
  }
})
