import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongo';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs'; // Add this

const ADMIN_EMAIL = 'vaishali2709@gmail.com';
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const role = user.email === ADMIN_EMAIL ? 'admin' : user.role;

    const token = jwt.sign(
      {
        email: user.email,
        role,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
