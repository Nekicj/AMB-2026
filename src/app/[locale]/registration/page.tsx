import { useTranslations } from "next-intl";
import RegisterForm from "@/components/RegisterForm";

export default function RegistrationPage() {
    const t = useTranslations("registration");

    return (
        <div className="mx-auto max-w-4xl px-6 pt-12 pb-16">
            <p className="font-bold text-4xl mb-3">{t("registration")}</p>
            <p className="text-neutral-500 text-base mb-10">{t("registrationSubtitle")}</p>
            <RegisterForm />
        </div>
    );
}