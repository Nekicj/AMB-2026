import { useTranslations } from "next-intl"

export default function PageLayout() {
  const t = useTranslations("navigation")

  return (
    <div>
      <p>{t("home")}</p>
    </div>
  )
}
