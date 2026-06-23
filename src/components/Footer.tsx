import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export default function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-white dark:bg-black mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                alt="our logo"
                width="64"
                height="64"
                className=""
                src="/images/icon.png"
                priority={true}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-2">
                Math Battles Community
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("resources")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/problems" className="hover:underline">
                    {t("materials")}
                  </Link>
                </li>
                <li className="mb-4">
                  <a
                    href="https://drive.google.com/file/d/1jjUl488oZaMVsH_zFRXI5VQrGNv9iabK/view?usp=sharing"
                    className="hover:underline"
                  >
                    {t("rules")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("socials")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.instagram.com/maths.battles/"
                    className="hover:underline "
                  >
                    Instagram
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://t.me/almatymathbattle"
                    className="hover:underline "
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("about")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/gallery" className="hover:underline">
                    {t("gallery")}
                  </Link>
                </li>
                <li>
                  <Link href="/our-team" className="hover:underline">
                    {t("ourTeam")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
