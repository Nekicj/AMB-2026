"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useLocale } from "next-intl";

const inputCls = "w-full h-11 border border-neutral-200 rounded-lg px-3 text-sm bg-white text-neutral-900 outline-none focus:ring-2 focus:ring-[#172967] focus:border-transparent transition-all placeholder:text-neutral-400";
const labelCls = "block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide";
const sectionTitle = "text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4 pb-2 border-b border-neutral-100";

export default function RegisterForm() {
    const t = useTranslations("registerform");
    const locale = useLocale();
    const [showMember4, setShowMember4] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [league, setLeague] = useState("junior");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const parentConsentUrl = locale === "kz" ? "/kz/parent-consent" : locale === "en" ? "/en/parent-consent" : "/ru/parent-consent";

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const teamData = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(teamData),
            });

            if (!res.ok) {
                let errorMessage = `Server error (${res.status})`;
                const contentType = res.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    errorMessage = data.error || errorMessage;
                } else {
                    const textError = await res.text();
                    console.error("Full server response (HTML/Text):", textError);
                }

                throw new Error(errorMessage);
            }
        
            setIsSubmitted(true);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const MemberBlock = ({
        title,
        badge,
        prefix,
        optional = false,
        extra,
    }: {
        title: string;
        badge?: string;
        prefix: string;
        optional?: boolean;
        extra?: React.ReactNode;
    }) => {
        const validateGrade = (e: React.FormEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            const val = parseInt(target.value);
            
            if (league === "junior" && val > 9) {
                target.setCustomValidity(t("max_grade"));
            } else if (val < 1) {
                target.setCustomValidity(t("min_grade"));
            } else {
                target.setCustomValidity("");
            }
        };

        return (
            <div className="border border-neutral-100 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-800">{title}</span>
                    {badge && (
                        <span className="text-xs bg-neutral-100 text-neutral-500 rounded-full px-2.5 py-0.5 font-medium">{badge}</span>
                    )}
                    {extra}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>{t("fullName")} {!optional && <span className="text-red-400">*</span>}</label>
                        <input name={`${prefix}Name`} type="text" required={!optional} className={inputCls} placeholder={t("namePlaceholder")} />
                    </div>
                    <div>
                        <label className={labelCls}>{t("school")} {!optional && <span className="text-red-400">*</span>}</label>
                        <input name={`${prefix}School`} type="text" required={!optional} className={inputCls} placeholder={t("schoolPlaceholder")} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className={labelCls}>
                            {t("grade")} {!optional && <span className="text-red-400">*</span>}
                            {league === "junior" && <span className="ml-1 normal-case text-neutral-400">{t("gradeHintJunior")}</span>}
                        </label>
                        <input
                            name={`${prefix}Grade`}
                            type="number"
                            min="1"
                            max={league === "junior" ? 9 : 11}
                            required={!optional}
                            onChange={validateGrade}
                            onInput={validateGrade}
                            className={inputCls}
                            placeholder={league === "junior" ? t("gradePlaceholderJunior") : t("gradePlaceholderSenior")}
                        />
                    </div>
                    <div>
                        <label className={labelCls}>{t("email")} {!optional && <span className="text-red-400">*</span>}</label>
                        <input name={`${prefix}Email`} type="email" required={!optional} className={inputCls} placeholder={t("emailPlaceholder")} />
                    </div>
                    <div>
                        <label className={labelCls}>{t("phone")} {!optional && <span className="text-red-400">*</span>}</label>
                        <input name={`${prefix}Phone`} type="text" required={!optional} className={inputCls} placeholder={t("phonePlaceholder")} />
                    </div>
                </div>
            </div>
        );
    };

    if (isSubmitted) {
        return (
            <div className="max-w-3xl mx-auto p-8 bg-amber-50 border border-amber-200 rounded-2xl text-neutral-800 space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">{t("submitted")}</h3>
                <p className="text-sm text-neutral-700">
                    {t("submittedDescription")}
                </p>
                <p className="text-sm text-neutral-500">
                    {t("submittedHint")}
                </p>
                <a
                    href={parentConsentUrl}
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm"
                >
                    {t("parentConsentForm")}
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} className="col-span-12 md:col-span-8 md:col-start-3 w-full max-w-3xl mx-auto space-y-8 text-neutral-800 bg-white relative z-20">

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <p className={sectionTitle}>{t("basicInfo")}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>{t("teamName")} <span className="text-red-400">*</span></label>
                        <input name="teamName" type="text" required className={inputCls} placeholder={t("teamNamePlaceholder")} />
                    </div>
                    <div>
                        <label className={labelCls}>{t("league")} <span className="text-red-400">*</span></label>
                        <select name="league" value={league} onChange={(e) => setLeague(e.target.value)} className={inputCls}>
                            <option value="junior">{t("junior")}</option>
                            <option value="senior">{t("senior")}</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>{t("language")} <span className="text-red-400">*</span></label>
                        <select name="language" className={inputCls}>
                            <option value="ru">{t("russian")}</option>
                            <option value="kz">{t("kazakh")}</option>
                        </select>
                        <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                            {t("languageHint")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 space-y-4">
                <p className={sectionTitle}>{t("teamLeader")}</p>
                <p className="text-xs text-neutral-600 leading-relaxed bg-white p-3 rounded-lg border border-neutral-200">
                    {t("teamLeaderDescription")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className={labelCls}>{t("leaderFullName")} <span className="text-red-400">*</span></label>
                        <input name="leaderName" type="text" required className={inputCls} placeholder={t("namePlaceholder")} />
                    </div>
                    <div>
                        <label className={labelCls}>{t("leaderEmail")} <span className="text-red-400">*</span></label>
                        <input name="leaderEmail" type="email" required className={inputCls} placeholder={t("emailPlaceholder")} />
                    </div>
                    <div>
                        <label className={labelCls}>{t("leaderPhone")} <span className="text-red-400">*</span></label>
                        <input name="leaderPhone" type="text" required className={inputCls} placeholder={t("phonePlaceholder")} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>{t("leaderCountry")} <span className="text-red-400">*</span></label>
                        <input name="leaderCountry" type="text" required className={inputCls} placeholder={t("countryPlaceholder")} />
                    </div>
                    <div>
                        <label className={labelCls}>{t("leaderCity")} <span className="text-red-400">*</span></label>
                        <input name="leaderCity" type="text" required className={inputCls} placeholder={t("cityPlaceholder")} />
                    </div>
                </div>
            </div>
            

            <div className="space-y-3">
                <p className={sectionTitle}>{t("participants")}</p>
                <MemberBlock title={t("teamCaptain")} badge={t("participant1")} prefix="captain" />
                <MemberBlock title={t("participant2")} badge={t("mandatory")} prefix="member1" />
                <MemberBlock title={t("participant3")} badge={t("mandatory")} prefix="member2" />
                {!showMember4 ? (
                    <button
                        type="button"
                        onClick={() => setShowMember4(true)}
                        className="w-full border border-dashed border-neutral-200 rounded-xl py-3 text-sm text-neutral-400 hover:border-neutral-300 hover:text-neutral-600 transition-colors flex items-center justify-center gap-1.5"
                    >
                        <span className="text-lg leading-none">+</span> {t("addParticipant4")}
                    </button>
                ) : (
                    <MemberBlock
                        title={t("participant4")}
                        badge={t("optional")}
                        prefix="member3"
                        optional
                        extra={
                            <button type="button" onClick={() => setShowMember4(false)} className="ml-auto text-xs text-red-400 hover:text-red-600 transition-colors">
                                {t("remove")}
                            </button>
                        }
                    />
                )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#172967] flex-shrink-0" />
                <span className="text-xs text-neutral-500 leading-relaxed">
                    {t("rulesConfirm")}{" "}
                    <a href="https://drive.google.com/drive/folders/1KraCtoyMrqVlCTAVRI8POc3iqAXTugrZ" target="_blank" rel="noopener noreferrer" className="underline text-[#172967] hover:text-[#0f1c4a] transition-colors">
                        {t("rulesLink")}
                    </a>{t("text7")} <span className="text-red-400">*</span>
                </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#172967] flex-shrink-0" />
                <span className="text-xs text-neutral-500 leading-relaxed">
                    {t("dataProcessingConfirm")}{" "}
                    <a
                        href="https://drive.google.com/drive/folders/1uezUXIM8UVWG7S7yJooWESq0c8vyUzCy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[#172967] hover:text-[#0f1c4a] transition-colors"
                    >
                        {t("text1")}
                    </a>
                    {" "}{t("text2")}{" "}
                    <a
                        href="https://bc-pf.org/personaldata"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[#172967] hover:text-[#0f1c4a] transition-colors"
                    >
                        {t("text5")}
                    </a>{t("text6")}
                    <span className="text-red-400"> *</span>
                </span>
            </label>

            <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#172967] hover:bg-[#0f1c4a] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors"
            >
                {loading ? t("submitting") : t("submit")}
            </button>
        </form>
    );
}