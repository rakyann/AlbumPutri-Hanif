import 'dotenv/config';
import { google } from 'googleapis';

export default async function handler(req, res) {
  // Helper functions compatible with both Node HTTP ServerResponse & Express/Vercel
  const sendJson = (statusCode, data) => {
    if (typeof res.status === 'function') {
      return res.status(statusCode).json(data);
    }
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  const sendRedirect = (redirectUrl) => {
    if (typeof res.redirect === 'function') {
      return res.redirect(redirectUrl);
    }
    res.statusCode = 302;
    res.setHeader('Location', redirectUrl);
    res.end();
  };

  const sendHtml = (statusCode, htmlContent) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(htmlContent);
  };

  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return sendJson(500, { error: 'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables are missing in .env.' });
  }

  const host = (req.headers && req.headers.host) || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/auth/google`;

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirectUri
  );

  const code = (req.query && req.query.code) || null;

  // Step 1: If no code, redirect to Google Login
  if (!code) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: ['https://www.googleapis.com/auth/drive.file']
    });
    return sendRedirect(authUrl);
  }

  // Step 2: Exchange code for Refresh Token
  try {
    const { tokens } = await oauth2Client.getToken(code);
    const refreshToken = tokens.refresh_token;

    const html = `
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
            <div class="token">${refreshToken || 'Token sudah ada / silakan ulangi koneksi'}</div>
            <a href="/" class="btn">KEMBALI KE APLIKASI</a>
          </div>
        </body>
      </html>
    `;

    return sendHtml(200, html);
  } catch (err) {
    return sendJson(500, { error: 'Failed to exchange token', details: err.message });
  }
}
