import BaseLayout from "@/components/BaseLayout"
import { routing } from "@/i18n/routing"
import NotFoundPage from "@/components/NotFoundPage"

export default function GlobalNotFoundPage() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  )
}
