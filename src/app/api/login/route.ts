import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const { login, tenantId, password } = await request.json();

  if (!login || !tenantId || !password) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const response = await axios.post('https://api.devii.io/auth', {
      login,
      tenantId,
      password
    });

    const { access_token, refresh_token } = response.data;

    return NextResponse.json({ access_token, refresh_token }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Authentication failed' }, { status: 500 });
  }
}