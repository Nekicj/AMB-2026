import Gallery from "@/components/Gallery"
import { getTranslations } from "next-intl/server"

export default async function GalleryPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/gallery.json`)
  const data = await res.json()
  const t = await getTranslations("gallery")

  return (
    <div className="mx-auto max-w-7xl p-6 py-12 lg:px-8">
      <div className="lg:flex">
        <div className="mb-6 lg:mr-10 lg:w-52">
          <p className="text-2xl font-bold">{t("gallery")}</p>
          <p className="text-base">{t("selection")}</p>
        </div>
        <Gallery gallery={data} />
      </div>
    </div>
  )
}
