"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const inputCls = "w-full h-11 border border-neutral-200 rounded-lg px-3 text-sm bg-white text-neutral-900 outline-none focus:ring-2 focus:ring-[#172967] focus:border-transparent transition-all placeholder:text-neutral-400";
const labelCls = "block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide";

export default function ParentConsentForm() {
    const t = useTranslations("parentConsent");
    const [isRepresentative, setIsRepresentative] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatusMessage(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            childIdentifier: formData.get("childIdentifier"),
            parentName: formData.get("parentName"),
            parentEmail: formData.get("parentEmail"),
            parentPhone: formData.get("parentPhone"),
            isRepresentative,
            poaNumber: isRepresentative ? formData.get("poaNumber") : null,
        };

        try {
            const res = await fetch("/api/parent-consent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || t("errorSending"));
            }

            setStatusMessage({ type: "success", text: t("successMessage") });
            (e.target as HTMLFormElement).reset();
            setIsRepresentative(false);
        } catch (err: any) {
            setStatusMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="col-span-12 md:col-span-6 md:col-start-4 w-full max-w-xl mx-auto text-neutral-800 space-y-6 bg-white relative z-20">

            {statusMessage && (
                <div className={`p-4 rounded-xl text-sm font-medium border ${
                    statusMessage.type === "success"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                }`}>
                    {statusMessage.text}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label className={labelCls}>{t("childIdentifier")} <span className="text-red-400">*</span></label>
                    <input name="childIdentifier" type="text" required className={inputCls} placeholder={t("childIdentifierPlaceholder")} />
                    <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                        {t("childIdentifierHint")}
                    </p>
                </div>

                <div className="h-px bg-neutral-100" />

                <div className="space-y-3">
                    <div>
                        <label className={labelCls}>{t("parentName")} <span className="text-red-400">*</span></label>
                        <input name="parentName" type="text" required className={inputCls} placeholder={t("parentNamePlaceholder")} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className={labelCls}>{t("parentEmail")} <span className="text-red-400">*</span></label>
                            <input name="parentEmail" type="email" required className={inputCls} placeholder={t("parentEmailPlaceholder")} />
                        </div>
                        <div>
                            <label className={labelCls}>{t("parentPhone")} <span className="text-red-400">*</span></label>
                            <input name="parentPhone" type="text" required className={inputCls} placeholder={t("parentPhonePlaceholder")} />
                        </div>
                    </div>
                </div>

                <div className="h-px bg-neutral-100" />

                <label className="flex items-start gap-3 p-4 bg-neutral-50 border border-neutral-100 rounded-xl cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={isRepresentative}
                        onChange={(e) => setIsRepresentative(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[#172967] flex-shrink-0"
                    />
                    <div>
                        <p className="text-sm font-medium text-neutral-800">{t("isRepresentative")}</p>
                        <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                            {t("isRepresentativeHint")}
                        </p>
                    </div>
                </label>

                {isRepresentative && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                        <label className={labelCls + " text-blue-700"}>
                            {t("poaNumber")} <span className="text-red-400">*</span>
                        </label>
                        <input name="poaNumber" type="text" required={isRepresentative} className={inputCls} placeholder={t("poaNumberPlaceholder")} />
                    </div>
                )}

                <div className="h-px bg-neutral-100" />

                <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#172967] flex-shrink-0" />
                        <span className="text-xs text-neutral-500 leading-relaxed">
                            {t("autoProcorConsent")} <span className="text-red-400">*</span>
                        </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#172967] flex-shrink-0" />
                        <span className="text-xs text-neutral-500 leading-relaxed">
                            {t("dataProcessingConsent")} <span className="text-red-400">*</span>
                        </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#172967] flex-shrink-0" />
                        <span className="text-xs text-neutral-500 leading-relaxed">
                            {t("fundDataProcessingConsent")}{" "}
                            <a href="https://drive.google.com/drive/folders/1eG222s_rf3x5S2C8ITp7f4bvpoxTlfxb" target="_blank" rel="noopener noreferrer" className="underline text-[#172967] hover:text-[#0f1c4a] transition-colors">
                                {t("text3")}
                            </a>
                            {" "}{t("text4")}<span className="text-red-400">*</span>
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-[#172967] hover:bg-[#0f1c4a] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors"
                >
                    {loading ? t("submitting") : t("submit")}
                </button>
            </form>
        </div>
    );
}