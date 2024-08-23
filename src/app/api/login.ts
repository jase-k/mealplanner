import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { login, tenantId, password } = req.body;

  if (!login || !tenantId || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const response = await axios.post('https://api.devii.io/auth', {
      login,
      tenantId,
      password
    });

    const { access_token, refresh_token } = response.data;

    return res.status(200).json({ access_token, refresh_token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Authentication failed' });
  }
}
