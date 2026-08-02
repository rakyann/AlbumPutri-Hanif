import 'dotenv/config';
import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

if (!global._tuaipandangPhotos) {
  global._tuaipandangPhotos = {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
      maxFileSize: 25 * 1024 * 1024
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const eventId = Array.isArray(fields.eventId) ? fields.eventId[0] : (fields.eventId || 'putri-hanif');
    const guestSessionId = Array.isArray(fields.guestSessionId) ? fields.guestSessionId[0] : (fields.guestSessionId || 'Tamu Acara');
    const caption = Array.isArray(fields.caption) ? fields.caption[0] : (fields.caption || '');

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded under form field "file".' });
    }

    let publicUrl = null;
    let driveFileId = null;

    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
    const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

    // Log diagnostic warning if env variables are missing
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !FOLDER_ID) {
      console.warn("⚠️ Google Drive credentials missing in .env or Vercel environment variables!");
      console.warn(`GOOGLE_CLIENT_ID: ${CLIENT_ID ? 'OK' : 'MISSING'}`);
      console.warn(`GOOGLE_CLIENT_SECRET: ${CLIENT_SECRET ? 'OK' : 'MISSING'}`);
      console.warn(`GOOGLE_REFRESH_TOKEN: ${REFRESH_TOKEN ? 'OK' : 'MISSING'}`);
      console.warn(`GOOGLE_DRIVE_FOLDER_ID: ${FOLDER_ID ? 'OK' : 'MISSING'}`);
    } else {
      // Upload to Google Drive
      try {
        const oauth2Client = new google.auth.OAuth2(
          CLIENT_ID,
          CLIENT_SECRET,
          'https://developers.google.com/oauthplayground'
        );

        oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        const drive = google.drive({ version: 'v3', auth: oauth2Client });

        const fileStream = fs.createReadStream(file.filepath);
        const fileName = `tuaipandang_${eventId}_${Date.now()}_${file.originalFilename || 'photo.jpg'}`;

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

        driveFileId = driveResponse.data.id;

        try {
          await drive.permissions.create({
            fileId: driveFileId,
            requestBody: { role: 'reader', type: 'anyone' }
          });
        } catch (e) {}

        publicUrl = `https://lh3.googleusercontent.com/d/${driveFileId}`;
        console.log(`✅ Successfully uploaded photo to Google Drive! File ID: ${driveFileId}`);
      } catch (driveErr) {
        console.error("❌ Google Drive API Upload Error:", driveErr.message);
      }
    }

    // Save photo record to shared global list
    if (!global._tuaipandangPhotos[eventId]) {
      global._tuaipandangPhotos[eventId] = [];
    }

    const newPhotoRecord = {
      id: `photo_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      eventId: eventId,
      guestName: guestSessionId,
      wish: caption,
      imageUrl: publicUrl || null,
      driveFileId: driveFileId,
      presetId: 'portra400',
      likes: 0,
      timestamp: new Date().toISOString()
    };

    if (publicUrl) {
      global._tuaipandangPhotos[eventId].unshift(newPhotoRecord);
    }

    return res.status(200).json({
      success: true,
      driveFileId: driveFileId,
      url: publicUrl,
      photo: newPhotoRecord,
      message: driveFileId ? 'Foto berhasil diunggah ke Google Drive!' : 'Foto tersimpan secara lokal.'
    });

  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({
      error: 'Failed to upload photo.',
      details: error.message
    });
  }
}
