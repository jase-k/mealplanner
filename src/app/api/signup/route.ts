import { NextRequest, NextResponse } from 'next/server';
import { useUser } from '@/contexts/UserContext';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const { username, email, password, accessToken } = await request.json();
  console.log(username, email, password, accessToken)
  if (!username || !email || !password || !accessToken) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Create new user
    const createRoleResponse = await axios.post('https://api.devii.io/roles_pbac', {
      query: `
        mutation {
          create_role(input:{
            login: "${email}",
            password: "${password}",
            name: "${username}",
            tenantid:10186
          }){
            roleid
          }
        }
      `,
    },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

    const newUserRoleId = createRoleResponse.data["create_role"]["roleid"];

    // Log in with new user credentials
    const loginResponse = await axios.post('https://api.devii.io/auth', {
      login: email,
      tenantid: 10186,
      password
    });

    const { access_token, refresh_token, roleid } = loginResponse.data;

    // Get user details
    const createUserResponse = await createUser(email, username, newUserRoleId, access_token);
    const user = createUserResponse.data["create_user"];

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
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}

function createUser(email: string, username: string, role_id: string, access_token: string) {
  return axios.post('https://api.devii.io/query', {
    query: `
      mutation {
        create_user(input:{
          email: ${email},
          username: ${username},
          role_id: ${role_id},
        }){
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
  },{
      headers: {
        Authorization: `Bearer ${access_token}`
      }
  });
}
