import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';

// Disable default body parser for Vercel/Node serverless if needed
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    // 1. Parse Multipart Form-Data via formidable
    const form = formidable({
      multiples: false,
      keepExtensions: true,
      maxFileSize: 25 * 1024 * 1024 // 25MB max file size
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const eventId = Array.isArray(fields.eventId) ? fields.eventId[0] : (fields.eventId || 'default');
    const guestSessionId = Array.isArray(fields.guestSessionId) ? fields.guestSessionId[0] : (fields.guestSessionId || 'guest');
    const caption = Array.isArray(fields.caption) ? fields.caption[0] : (fields.caption || '');

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded under form field "file".' });
    }

    // 2. Read Environment Variables
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
    const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

    // Check if env vars are present
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !FOLDER_ID) {
      console.warn('Google Drive credentials missing in environment variables.');
      return res.status(500).json({
        error: 'Google Drive API environment variables (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GOOGLE_DRIVE_FOLDER_ID) are missing.',
        missingEnv: true
      });
    }

    // 3. Setup Google OAuth2 Client
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // 4. Read file stream
    const fileStream = fs.createReadStream(file.filepath);

    const fileName = `SatuFoto_${eventId}_${Date.now()}_${file.originalFilename || 'photo.jpg'}`;

    // 5. Upload File to Google Drive
    const driveResponse = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [FOLDER_ID],
        description: `Uploaded by ${guestSessionId}. Caption: ${caption}`
      },
      media: {
        mimeType: file.mimetype || 'image/jpeg',
        body: fileStream
      },
      fields: 'id, webViewLink, webContentLink'
    });

    const driveFileId = driveResponse.data.id;

    // 6. Make file publicly accessible (optional view permission)
    try {
      await drive.permissions.create({
        fileId: driveFileId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });
    } catch (permErr) {
      console.warn('Permission set warning:', permErr.message);
    }

    const publicUrl = `https://lh3.googleusercontent.com/d/${driveFileId}`;

    // Return success response
    return res.status(200).json({
      success: true,
      driveFileId: driveFileId,
      url: publicUrl,
      webViewLink: driveResponse.data.webViewLink,
      message: 'Foto berhasil diunggah ke Google Drive!'
    });

  } catch (error) {
    console.error('Google Drive Upload Error:', error);
    return res.status(500).json({
      error: 'Failed to upload photo to Google Drive.',
      details: error.message
    });
  }
}
