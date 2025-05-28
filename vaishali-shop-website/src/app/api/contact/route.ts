import { NextResponse } from "next/server";
import connectToDatabse from "@/lib/mongo";
import Contact from "@/lib/models/contactform";

export async function POST(req: Request) {
  const { name, number, message } = await req.json();

  try {
    await connectToDatabse();

    const contact = new Contact({
      name,
      number,
      message,
    });

    const result = await contact.save();
    return NextResponse.json({ success: true, id: result._id });
  } catch (error) {
    console.error("Error saving contact", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
