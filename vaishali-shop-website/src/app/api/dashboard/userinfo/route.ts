import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import User from '@/lib/models/user';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);

 
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    } catch {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const email = decoded.email;
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token payload' }, { status: 401 });
    }

    const currentUser = await User.findOne({ email }).select('name email role').lean();
    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }


    if (currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access only' }, { status: 403 });
    }

    
    const users = await User.find({}, 'name email role createdAt').sort({ createdAt: -1 }).lean();

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error in userinfo API:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
