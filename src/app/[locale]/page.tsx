"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/routing"

export const dynamic = "auto"

export default function IndexPage() {
  const t = useTranslations("home")
  return (
    <div>
      <div
        style={{
          backgroundImage: "url('/images/homeImage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=""
      >
        <div className="h-full w-full backdrop-brightness-50">
          <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8 lg:py-40 pb-40">
            <p className="text-white lg:text-5xl font-semibold text-3xl">
              {t("mathBattles")}
            </p>
          </div>
        </div>
      </div>
      <div 
        className="h-16"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,1), #1D3AAC)"
        }}
      />
      <div style={{ backgroundColor: "#1D3AAC" }}>
        <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8 pb-12">
          <div className="flex flex-col justify-center items-center">
            <p
              className="font-bold text-4xl text-white mb-8"
              style={{ textShadow: "0 4px 6px #080606" }}
            >
              {t("timeline")}
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr] gap-8">
            <div className="bg-white rounded-3xl p-7 min-h-48">
              <p
                className="text-3xl font-bold mb-3"
                style={{ color: "#200ac9" }}
              >
                {t("register")}
              </p>
              <p className="font-medium text-xl" style={{ whiteSpace: "pre-line" }}>
                {t.rich("registerContext", {
                  link: (chunks) => (
                    <Link
                      href="/registration"
                      className="underline text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
            <div className="bg-white rounded-3xl p-7 min-h-48">
              <p
                className="text-3xl font-bold mb-3"
                style={{ color: "#200ac9" }}
              >
                {t("online")}
              </p>
              <p className="font-medium text-xl" style={{ whiteSpace: "pre-line" }}>
                {t.rich("onlineContext")}
              </p>
            </div>
            <div className="bg-white rounded-3xl p-7 min-h-48">
              <p
                className="text-3xl font-bold mb-3"
                style={{ color: "#200ac9" }}
              >
                {t("final")}
              </p>
              <p className="font-medium text-xl">
                {t.rich("finalContext")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8 py-16">
        <div className="flex-col justify-start w-full">
          <p className="text-5xl font-semibold">{t("numbers")}</p>
          <p className="md:w-1/3 md:mr-12 italic mb-4 md:mb-0">{t("kids")}</p>
        </div>
        <div className="dark:bg-gray-700 h-1 mt-6 mb-6" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="">
            <p className="text-2xl font-bold" style={{ color: "#200ac9" }}>
              700+
            </p>
            <p className="font-medium">{t("onlineParticipants")}</p>
          </div>
          <div className="">
            <p className="text-2xl font-bold" style={{ color: "#200ac9" }}>
              196
            </p>
            <p className="font-medium">{t("offlineParticipants")}</p>
          </div>
          <div className="">
            <p className="text-2xl font-bold" style={{ color: "#200ac9" }}>
              3,000,000₸+
            </p>
            <p className="font-medium">{t("fund")}</p>
          </div>
          <div className="">
            <p className="text-2xl font-bold" style={{ color: "#200ac9" }}>
              30
            </p>
            <p className="font-medium">{t("republicanOlympiadParticipants")}</p>
          </div>
          <div className="">
            <p className="text-2xl font-bold" style={{ color: "#200ac9" }}>
              25
            </p>
            <p className="font-medium">{t("republicanOlympiadJury")}</p>
          </div>
        </div>
        <div className="lg:flex mt-24">
          <div className="md:mr-10">
            <p className="font-semibold text-5xl">{t("ourMission")}</p>
            <p className="mt-8">{t("about")}</p>
            <p className="mt-8 sm:mb-8">{t("ourMissionContext")}</p>
          </div>
          <div>
            <Image
              src="/images/gallery/amb2023_8.jpeg"
              width={4000}
              height={2000}
              alt="3 guys solving a problem"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
