import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const { login, password } = await request.json();

  if (!login || !password) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const response = await axios.post('https://api.devii.io/auth', {
      login,
      tenantid: 10186,
      password
    });

    const { access_token, refresh_token, roleid } = response.data;
    try {
      const user = await getUser(access_token, roleid);
      const return_res = {
        auth: {
          access_token,
          refresh_token,
          roleid
        },
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role_id: user.role_id,
          permission: user.permission.name
        }
      }
      return NextResponse.json(return_res, { status: 200 });
    } catch (error) {
      console.error('User error:', error);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Authentication failed' }, { status: 500 });
  }
}

async function getUser(access_token: string, roleid: string) {
  const response = await axios.post('https://api.devii.io/query', {
    query: `
      query ($filter: String!) {
        users(filter: $filter) {
          user_id
          username
          email
          role_id
          permission {
            name
          }
        }
      }
    `,
    variables: {
      filter: `role_id = ${roleid}`
    }
  },{
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
  console.log("User response", response.data);
  if (response.data.users && response.data.users.length > 0) {
    return response.data.users[0];
  } else {
    throw new Error('User not found');
  }
}