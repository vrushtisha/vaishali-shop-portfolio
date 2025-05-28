import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 


    const role = email === 'vaishali2709@gmail.com' ? 'admin' : 'user';

    
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    return NextResponse.json({ success: true, message: 'Signup successful!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
