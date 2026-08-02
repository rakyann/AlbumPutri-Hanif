// LocalStorage & Dynamic Event Routing State Management

export function getEventFromUrl() {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);

  let slug = "putri-hanif";
  if (parts.length >= 2 && (parts[0] === 'e' || parts[0] === 'events')) {
    slug = parts[1];
  } else if (parts.length === 1 && parts[0] !== '') {
    slug = parts[0];
  }

  let formattedTitle = "Putri & Hanif's Wedding Day";
  let hostName = "Putri & Hanif";

  if (slug === 'putri-hanif') {
    formattedTitle = "Putri & Hanif's Wedding Day";
    hostName = "Putri & Hanif";
  } else if (slug !== "putri-hanif" && slug.includes('-')) {
    const names = slug.split('-').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' & ');
    formattedTitle = `${names}'s Wedding Day`;
    hostName = names;
  }

  return {
    id: slug,
    title: formattedTitle,
    subtitle: `Lihat & abadikan momen spontan di ${formattedTitle} dengan tuaipandang, kamera sekali pakai digital.`,
    date: "2 Agustus 2026",
    location: "Hutan Kota by Plataran, Jakarta",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    maxShotsPerGuest: 10,
    hostName: hostName,
    frameText: `${formattedTitle} • 02.08.2026`
  };
}

export const INITIAL_PHOTOS = [
  {
    id: "photo_1",
    eventId: "default",
    guestName: "Aditya & Sarah",
    wish: "Selamat menempuh hidup baru! Semoga bahagia selalu dan dilimpahi berkah! ✨💍",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    presetId: "portra400",
    likes: 0,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "photo_2",
    eventId: "default",
    guestName: "Bimantoro",
    wish: "Happy wedding bro! Happy long life together! 🥂🔥",
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    presetId: "cinestill800t",
    likes: 0,
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "photo_3",
    eventId: "default",
    guestName: "Dion & Maya",
    wish: "Momen akadnya sakral banget, selamat ya kawan! 🎉❤️",
    imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    presetId: "fujisuperia",
    likes: 0,
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: "photo_4",
    eventId: "default",
    guestName: "Fitri & Gading",
    wish: "Cantik dan ganteng banget berdua! Wishing you endless love! 💐",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    presetId: "bwmono",
    likes: 0,
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString()
  }
];

const STORAGE_KEYS = {
  EVENT: "tuaipandang_event_data_",
  PHOTOS: "tuaipandang_photos_list_",
  ROLL_COUNT: "tuaipandang_roll_count_"
};

export function getStoredEvent() {
  return getEventFromUrl();
}

export function getStoredPhotos(eventId = "default") {
  const data = localStorage.getItem(STORAGE_KEYS.PHOTOS + eventId);
  return data ? JSON.parse(data) : INITIAL_PHOTOS;
}

export function saveStoredPhotos(photosArray, eventId = "default") {
  localStorage.setItem(STORAGE_KEYS.PHOTOS + eventId, JSON.stringify(photosArray));
}

export function getRemainingRolls(eventId = "default", maxShots = 10) {
  const key = STORAGE_KEYS.ROLL_COUNT + eventId;
  const val = localStorage.getItem(key);
  if (val === null) {
    localStorage.setItem(key, maxShots.toString());
    return maxShots;
  }
  return parseInt(val, 10);
}

export function decrementRolls(eventId = "default") {
  const current = getRemainingRolls(eventId);
  const next = Math.max(0, current - 1);
  localStorage.setItem(STORAGE_KEYS.ROLL_COUNT + eventId, next.toString());
  return next;
}
