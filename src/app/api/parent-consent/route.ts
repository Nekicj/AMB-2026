import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { childIdentifier, parentName, parentEmail, parentPhone, isRepresentative, poaNumber } = body;

        if (!childIdentifier || !parentName || !parentEmail || !parentPhone) {
            return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 });
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
                { error: "Participant with this email or phone number not found. Please check your data." },
                { status: 404 }
            );
        }

        const existing = await db.parentConsent.findUnique({
            where: { memberId: member.id },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Consent for this participant has already been submitted." },
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
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}