import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  try {
    const response = await axios.post('https://api.devii.io/anonauth', {
      tenantid: 10186,
    });

    const { access_token, refresh_token } = response.data;

    return NextResponse.json({ access_token, refresh_token }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Authentication failed' }, { status: 500 });
  }
}
