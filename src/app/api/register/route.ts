import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            teamName, league, language, hasLeader,
            leaderName, leaderEmail, leaderPhone, leaderCountry, leaderCity,
            captainName, captainSchool, captainGrade, captainEmail, captainPhone,
            member1Name, member1School, member1Grade, member1Email, member1Phone,
            member2Name, member2School, member2Grade, member2Email, member2Phone,
            member3Name, member3School, member3Grade, member3Email, member3Phone,
        } = body;

        if (!teamName || !captainName || !member1Name || !member2Name) {
            return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 });
        }

        const members = [
            { role: "captain", name: captainName, school: captainSchool, grade: Number(captainGrade), email: captainEmail, phone: captainPhone },
            { role: "member",  name: member1Name,  school: member1School,  grade: Number(member1Grade),  email: member1Email,  phone: member1Phone },
            { role: "member",  name: member2Name,  school: member2School,  grade: Number(member2Grade),  email: member2Email,  phone: member2Phone },
            ...(member3Name ? [{ role: "member", name: member3Name, school: member3School, grade: Number(member3Grade), email: member3Email, phone: member3Phone }] : []),
        ];

        const team = await db.team.create({
            data: {
                name: teamName,
                league,
                language,
                leaderName:    hasLeader === "yes" ? leaderName    : null,
                leaderEmail:   hasLeader === "yes" ? leaderEmail   : null,
                leaderPhone:   hasLeader === "yes" ? leaderPhone   : null,
                leaderCountry: hasLeader === "yes" ? leaderCountry : null,
                leaderCity:    hasLeader === "yes" ? leaderCity    : null,
                members: { create: members },
            },
        });

        return NextResponse.json({ success: true, teamId: team.id });
    } catch (err: any) {
        console.error("[register]", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}