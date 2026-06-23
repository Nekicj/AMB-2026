import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { childIdentifier, parentName, parentEmail, parentPhone, isRepresentative, poaNumber } = body;

        if (!childIdentifier || !parentName || !parentEmail || !parentPhone) {
            return NextResponse.json({ error: "Заполните все обязательные поля" }, { status: 400 });
        }

        const member = await db.teamMember.findFirst({
            where: {
                OR: [
                    { email: childIdentifier },
                    { phone: childIdentifier },
                ],
            },
        });

        if (!member) {
            return NextResponse.json(
                { error: "Участник с таким email или телефоном не найден. Проверьте данные." },
                { status: 404 }
            );
        }

        const existing = await db.parentConsent.findUnique({
            where: { memberId: member.id },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Согласие для этого участника уже было отправлено ранее." },
                { status: 409 }
            );
        }

        await db.parentConsent.create({
            data: {
                memberId: member.id,
                parentName,
                parentEmail,
                parentPhone,
                isRepresentative,
                poaNumber: isRepresentative ? poaNumber : null,
            },
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("[parent-consent]", err);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}