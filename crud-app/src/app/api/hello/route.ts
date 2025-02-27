import { NextResponse } from 'next/server';
import connectMongo from "~/app/_components/database/conn";

export async function GET() {
    try {
        await connectMongo();
        return NextResponse.json({ text: 'Hello' });
    } catch (error) {
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}
