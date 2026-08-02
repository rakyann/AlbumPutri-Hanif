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

  return {
    id: slug,
    title: formattedTitle,
    subtitle: `Lihat & abadikan momen spontan di ${formattedTitle} dengan tuaipandang, kamera sekali pakai digital.`,
    date: "8 Agustus 2026",
    location: "Demak & Purbalingga, Jawa Tengah",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    maxShotsPerGuest: 10,
    hostName: hostName,
    frameText: `${formattedTitle} • 08.08.2026`,
    groom: {
      nickname: "Hanif",
      fullname: "drg. Moh. Irsyad Hanif, M.H",
      father: "drg. Moh Baehaqi, M.M, M.Pd (Alm)",
      mother: "Dr. Apt. Muslimah, S.Si, M.M, M.Pd",
      address: "Jl. Raya Bandungrejo No.48 Mranggen, Demak",
      instagram: "@hanifirsyad3"
    },
    bride: {
      nickname: "Putri",
      fullname: "drg. Putri Nur Azizah Zakiyah",
      father: "Aris Budiman, S.Pd, M.Pd",
      mother: "Tri Ungsi Rahayu, S.Pd",
      address: "Jl. Beringin III No.16A RT.01/RW.04, Perumahan Bojong, Purbalingga"
    }
  };
}

export const INITIAL_PHOTOS = [];

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
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    // Filter out old sample photos
    return parsed.filter(p => !p.id.startsWith('photo_1') && !p.id.startsWith('photo_2') && !p.id.startsWith('photo_3') && !p.id.startsWith('photo_4'));
  } catch (e) {
    return [];
  }
}

export function saveStoredPhotos(photosArray, eventId = "default") {
  localStorage.setItem(STORAGE_KEYS.PHOTOS + eventId, JSON.stringify(photosArray));
}

export function clearAllPhotos(eventId = "default") {
  localStorage.removeItem(STORAGE_KEYS.PHOTOS + eventId);
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
