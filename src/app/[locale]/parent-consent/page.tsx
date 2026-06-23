import { useTranslations } from "next-intl";
import ParentConsentForm from "@/components/ParentConsentForm";

export default function ParentConsentPage() {
    const t = useTranslations("registration");

    return (
        <div className="mx-auto max-w-4xl px-6 pt-12 pb-16">
            <p className="font-bold text-4xl mb-3">{t("parentConsent")}</p>
            <p className="text-neutral-500 text-base mb-10">{t("parentConsentSubtitle")}</p>
            <ParentConsentForm />
        </div>
    );
}