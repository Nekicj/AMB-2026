"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const inputCls = "w-full h-11 border border-neutral-200 rounded-lg px-3 text-sm bg-white text-neutral-900 outline-none focus:ring-2 focus:ring-[#172967] focus:border-transparent transition-all placeholder:text-neutral-400";
const labelCls = "block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide";
const sectionTitle = "text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4 pb-2 border-b border-neutral-100";

export default function RegisterForm() {
    const locale = useLocale();
    const [hasLeader, setHasLeader] = useState("yes");
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
                let errorMessage = `Ошибка сервера (${res.status})`;
                const contentType = res.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    errorMessage = data.error || errorMessage;
                } else {
                    const textError = await res.text();
                    console.error("Полный ответ сервера (HTML/Текст):", textError);
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
        const validateGrade = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value);
            if (league === "junior" && val > 9) {
                e.target.setCustomValidity("Для юниоров класс не может быть больше 9");
            } else if (val < 1) {
                e.target.setCustomValidity("Класс не может быть меньше 1");
            } else {
                e.target.setCustomValidity("");
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
                        <label className={labelCls}>ФИО {!optional && <span className="text-red-400">*</span>}</label>
                        <input name={`${prefix}Name`} type="text" required={!optional} className={inputCls} placeholder="Иванов Иван Иванович" />
                    </div>
                    <div>
                        <label className={labelCls}>Школа {!optional && <span className="text-red-400">*</span>}</label>
                        <input name={`${prefix}School`} type="text" required={!optional} className={inputCls} placeholder="Название школы" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className={labelCls}>
                            Класс {!optional && <span className="text-red-400">*</span>}
                            {league === "junior" && <span className="ml-1 normal-case text-neutral-400">(макс. 9)</span>}
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
                            placeholder={league === "junior" ? "1–9" : "1–11"}
                        />
                    </div>
                    <div>
                        <label className={labelCls}>Email {!optional && <span className="text-red-400">*</span>}</label>
                        <input name={`${prefix}Email`} type="email" required={!optional} className={inputCls} placeholder="email@example.com" />
                    </div>
                    <div>
                        <label className={labelCls}>Телефон {!optional && <span className="text-red-400">*</span>}</label>
                        <input name={`${prefix}Phone`} type="text" required={!optional} className={inputCls} placeholder="+7 (700) 000-00-00" />
                    </div>
                </div>
            </div>
        );
    };

    if (isSubmitted) {
        return (
            <div className="max-w-3xl mx-auto p-8 bg-amber-50 border border-amber-200 rounded-2xl text-neutral-800 space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">Команда зарегистрирована — осталось одно действие!</h3>
                <p className="text-sm text-neutral-700">
                    Чтобы завершить регистрацию, родитель/опекун или доверенное лицо каждого участника должен заполнить отдельную форму согласия на AutoProctor.
                </p>
                <p className="text-sm text-neutral-500">
                    Перешлите ссылку ниже и напомните указать ваш номер телефона или email — так мы свяжем анкеты в базе:
                </p>
                <a
                    href={parentConsentUrl}
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm"
                >
                    Форма согласия →
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto space-y-8 text-neutral-800 bg-white">

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <p className={sectionTitle}>Основная информация</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>Название команды <span className="text-red-400">*</span></label>
                        <input name="teamName" type="text" required className={inputCls} placeholder="Введите название" />
                    </div>
                    <div>
                        <label className={labelCls}>Лига <span className="text-red-400">*</span></label>
                        <select name="league" value={league} onChange={(e) => setLeague(e.target.value)} className={inputCls}>
                            <option value="junior">Юниоры (Junior)</option>
                            <option value="senior">Сениоры (Senior)</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>Язык участия <span className="text-red-400">*</span></label>
                        <select name="language" className={inputCls}>
                            <option value="ru">Русский</option>
                            <option value="kz">Казахский</option>
                        </select>
                        <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                            Все участники команды должны владеть выбранным языком участия.
                        </p>
                    </div>
                    <div>
                        <label className={labelCls}>Наличие руководителя <span className="text-red-400">*</span></label>
                        <select name="hasLeader" value={hasLeader} onChange={(e) => setHasLeader(e.target.value)} className={inputCls}>
                            <option value="yes">Да</option>
                            <option value="no">Нет</option>
                        </select>
                    </div>
                </div>
            </div>

            {hasLeader === "yes" && (
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 space-y-4">
                    <p className={sectionTitle}>Руководитель команды</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className={labelCls}>ФИО <span className="text-red-400">*</span></label>
                            <input name="leaderName" type="text" required className={inputCls} placeholder="Иванов Иван Иванович" />
                        </div>
                        <div>
                            <label className={labelCls}>Email <span className="text-red-400">*</span></label>
                            <input name="leaderEmail" type="email" required className={inputCls} placeholder="email@example.com" />
                        </div>
                        <div>
                            <label className={labelCls}>Телефон <span className="text-red-400">*</span></label>
                            <input name="leaderPhone" type="text" required className={inputCls} placeholder="+7 (700) 000-00-00" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className={labelCls}>Страна <span className="text-red-400">*</span></label>
                            <input name="leaderCountry" type="text" required className={inputCls} placeholder="Казахстан" />
                        </div>
                        <div>
                            <label className={labelCls}>Город <span className="text-red-400">*</span></label>
                            <input name="leaderCity" type="text" required className={inputCls} placeholder="Алматы" />
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                <p className={sectionTitle}>Участники</p>
                <MemberBlock title="Капитан команды" badge="Участник 1" prefix="captain" />
                <MemberBlock title="Участник 2" badge="Обязательно" prefix="member1" />
                <MemberBlock title="Участник 3" badge="Обязательно" prefix="member2" />
                {!showMember4 ? (
                    <button
                        type="button"
                        onClick={() => setShowMember4(true)}
                        className="w-full border border-dashed border-neutral-200 rounded-xl py-3 text-sm text-neutral-400 hover:border-neutral-300 hover:text-neutral-600 transition-colors flex items-center justify-center gap-1.5"
                    >
                        <span className="text-lg leading-none">+</span> Добавить участника 4
                    </button>
                ) : (
                    <MemberBlock
                        title="Участник 4"
                        badge="Необязательно"
                        prefix="member3"
                        optional
                        extra={
                            <button type="button" onClick={() => setShowMember4(false)} className="ml-auto text-xs text-red-400 hover:text-red-600 transition-colors">
                                Убрать
                            </button>
                        }
                    />
                )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#172967] flex-shrink-0" />
                <span className="text-xs text-neutral-500 leading-relaxed">
                    Заполняя форму, члены команды подтверждают, что ознакомлены с{" "}
                    <a href="https://drive.google.com/drive/folders/1KraCtoyMrqVlCTAVRI8POc3iqAXTugrZ" target="_blank" rel="noopener noreferrer" className="underline text-[#172967] hover:text-[#0f1c4a] transition-colors">
                        основным регламентом научных боёв
                    </a>. <span className="text-red-400">*</span>
                </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#172967] flex-shrink-0" />
                <span className="text-xs text-neutral-500 leading-relaxed">
                    Даю согласие на сбор, обработку и хранение Персональных Данных в соответствии с Перечнем №03-08/03. С{" "}
                    <a href="https://drive.google.com/drive/folders/1eG222s_rf3x5S2C8ITp7f4bvpoxTlfxb" target="_blank" rel="noopener noreferrer" className="underline text-[#172967] hover:text-[#0f1c4a] transition-colors">
                        политикой работы с ПД Фонда и перечнем
                    </a>
                    {" "}можно ознакомиться на сайте Фонда. <span className="text-red-400">*</span>
                </span>
            </label>

            <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#172967] hover:bg-[#0f1c4a] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors"
            >
                {loading ? "Отправка..." : "Зарегистрировать команду"}
            </button>
        </form>
    );
}