import 'dotenv/config';
import { google } from 'googleapis';

export default async function handler(req, res) {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).json({ error: 'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables are missing.' });
  }

  const host = req.headers.host || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/auth/google`;

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirectUri
  );

  const { code } = req.query;

  // Step 1: If no code, redirect to Google Login
  if (!code) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: ['https://www.googleapis.com/auth/drive.file']
    });
    return res.redirect(authUrl);
  }

  // Step 2: Exchange code for Refresh Token
  try {
    const { tokens } = await oauth2Client.getToken(code);
    const refreshToken = tokens.refresh_token;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Google Drive Token Connected - tuaipandang</title>
          <style>
            body { font-family: monospace; background: #0a0a0a; color: #fff; padding: 40px; text-align: center; }
            .box { max-width: 600px; margin: 0 auto; background: #121212; border: 1px solid #333; padding: 30px; border-radius: 16px; }
            .token { background: #222; color: #e2a07a; padding: 15px; border-radius: 8px; word-break: break-all; font-size: 14px; margin: 20px 0; }
            .btn { background: #fff; color: #000; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>✅ GOOGLE DRIVE BERHASIL DIHUBUNGKAN!</h2>
            <p>Salin REFRESH TOKEN di bawah ini ke <b>GOOGLE_REFRESH_TOKEN</b> di <b>.env</b> & <b>Vercel Settings</b>:</p>
            <div class="token">${refreshToken || 'Token sudah ada'}</div>
            <a href="/" class="btn">KEMBALI KE APLIKASI</a>
          </div>
        </body>
      </html>
    `);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to exchange token', details: err.message });
  }
}
