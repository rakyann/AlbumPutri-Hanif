if (!global._tuaipandangPhotos) {
  global._tuaipandangPhotos = {};
}

export default async function handler(req, res) {
  const sendJson = (statusCode, data) => {
    if (typeof res.status === 'function') {
      return res.status(statusCode).json(data);
    }
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  const eventId = (req.query && req.query.eventId) || 'putri-hanif';

  if (req.method === 'GET') {
    const list = global._tuaipandangPhotos[eventId] || [];
    return sendJson(200, {
      success: true,
      photos: list
    });
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body || !body.imageUrl) {
        return sendJson(400, { error: 'Missing photo payload' });
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

      global._tuaipandangPhotos[eventId].unshift(newPhoto);

      return sendJson(200, {
        success: true,
        photo: newPhoto,
        photos: global._tuaipandangPhotos[eventId]
      });
    } catch (err) {
      return sendJson(500, { error: err.message });
    }
  }

  return sendJson(405, { error: 'Method Not Allowed' });
}
