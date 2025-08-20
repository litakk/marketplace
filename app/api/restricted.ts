import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    return NextResponse.json({
      content:
        "This is protected content. You can access this because you are signed in.",
    });
  } else {
    return NextResponse.json(
      { error: "You must be signed in to view this content." },
      { status: 401 }
    );
  }
}
