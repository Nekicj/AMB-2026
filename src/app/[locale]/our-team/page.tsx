import { useTranslations } from "next-intl"
import Image from "next/image"
import { SocialIcon } from "react-social-icons"

export default function OurTeamPage() {
  const t = useTranslations("our-team")

  const t_team = useTranslations()
  const teamData = t_team.raw("team")

  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/images/ourTeam1.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-4xl items-center justify-between p-6 lg:px-8 pt-12 pb-16">
          <div className="flex flex-col justify-center items-center mt-10 mb-12">
            <p className="text-4xl font-bold">{t("about")}</p>
            <div
              className="h-2 w-32 rounded-lg"
              style={{ backgroundColor: "#2f6dc0" }}
            />
          </div>
          <div
            className="border-l-8 border-blue-600 pl-4 rounded-lg"
            style={{ borderColor: "#2f6dc0" }}
          >
            <p className="text-3xl font-medium mb-6">{t("weAre")}</p>
            <p className="text-3xl font-medium">{t("primaryGoal")}</p>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#1D3AAC" }}>
        <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8 py-12">
          <div className="flex flex-col justify-center items-center">
            <p
              className="font-bold text-4xl text-white mb-8"
              style={{ textShadow: "0 4px 6px #080606" }}
            >
              {t("goalsValues")}
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-7 min-h-96">
              <p
                className="text-3xl font-bold mb-3"
                style={{ color: "#200ac9" }}
              >
                {t("popularization")}
              </p>
              <p className="font-medium text-xl">
                {t("popularizationContext")}
              </p>
            </div>
            <div className="bg-white rounded-3xl p-7 min-h-96">
              <p
                className="text-3xl font-bold mb-3"
                style={{ color: "#200ac9" }}
              >
                {t("collaboration")}
              </p>
              <p className="font-medium text-xl">{t("collaborationContext")}</p>
            </div>
            <div className="bg-white rounded-3xl p-7 min-h-96">
              <p
                className="text-3xl font-bold mb-3"
                style={{ color: "#200ac9" }}
              >
                {t("fun")}
              </p>
              <p className="font-medium text-xl">{t("funContext")}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto max-w-7xl items-center justify-between px-6 lg:px-8 pt-12">
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-4xl" style={{ color: "#1D3AAC" }}>
              {t("ourTeam")}
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8 py-12 grid gap-8 md:grid-cols-1">
          {teamData.map((member, index) => (
            <div
              key={index}
              className="items-center rounded-3xl shadow-lg sm:flex min-h-72"
              style={{ backgroundColor: "white" }}
            >
              <div className="relative w-80 h-80 flex-shrink-0">
                <Image
                  className="rounded-3xl object-cover w-full h-full"
                  fill
                  src={`/images/${member.photo}`}
                  alt="member photo"
                />
              </div>

              <div className="p-5">
                <h3
                  className="text-xl font-bold tracking-tight"
                  style={{ color: "#1D3AAC" }}
                >
                  <a href="#">{member.name}</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  {member.role}
                </span>
                <p className="mt-3 mb-4 font-medium text-black">
                  {member.description}
                </p>
                <ul className="flex space-x-4 sm:mt-0">
                  <li className="flex">
                    <SocialIcon
                      className="!w-8 !h-8"
                      url={`mailto:${member.mail}`}
                    />
                  </li>
                  {member.inst !== "" ? (
                    <li>
                      <SocialIcon
                        url={member.inst}
                        className="!w-8 !h-8"
                        network="instagram"
                      />
                    </li>
                  ) : (
                    <></>
                  )}
                  {member.linkedin !== "" ? (
                    <li>
                      <SocialIcon
                        url={member.linkedin}
                        className="!w-8 !h-8"
                        network="linkedin"
                      />
                    </li>
                  ) : (
                    <></>
                  )}
                  {member.tg !== "" ? (
                    <li>
                      <SocialIcon
                        url={member.tg}
                        className="!w-8 !h-8"
                        network="telegram"
                      />
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
