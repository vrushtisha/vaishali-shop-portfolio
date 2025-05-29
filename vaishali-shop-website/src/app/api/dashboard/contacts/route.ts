import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import Contact from '@/lib/models/contactform';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

interface JwtPayload {
  email: string;
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch contacts' }, { status: 500 });
  }
}
