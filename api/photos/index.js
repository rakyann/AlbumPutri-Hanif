// Shared Serverless Photo Memory & Storage Store for tuaipandang

if (!global._tuaipandangPhotos) {
  global._tuaipandangPhotos = {};
}

export default async function handler(req, res) {
  const eventId = req.query.eventId || 'putri-hanif';

  if (req.method === 'GET') {
    const list = global._tuaipandangPhotos[eventId] || [];
    return res.status(200).json({
      success: true,
      photos: list
    });
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body || !body.imageUrl) {
        return res.status(400).json({ error: 'Missing photo payload' });
      }

      if (!global._tuaipandangPhotos[eventId]) {
        global._tuaipandangPhotos[eventId] = [];
      }

      const newPhoto = {
        id: body.id || `photo_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        eventId: eventId,
        guestName: body.guestName || 'Tamu Acara',
        wish: body.wish || '',
        imageUrl: body.imageUrl,
        driveFileId: body.driveFileId || null,
        presetId: body.presetId || 'portra400',
        likes: body.likes || 0,
        timestamp: body.timestamp || new Date().toISOString()
      };

      // Unshift to top of shared list
      global._tuaipandangPhotos[eventId].unshift(newPhoto);

      return res.status(200).json({
        success: true,
        photo: newPhoto,
        photos: global._tuaipandangPhotos[eventId]
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
