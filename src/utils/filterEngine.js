// Canvas Film Presets Engine (Clean Photos Without Watermarks)

export const FILM_PRESETS = [
  {
    id: 'portra400',
    name: 'Kodak Portra 400',
    description: 'Warm golden tones & soft skin tones',
    badge: 'Popular',
    tint: 'rgba(255, 225, 190, 0.08)',
    cssFilter: 'contrast(105%) saturate(110%) sepia(15%)'
  },
  {
    id: 'cinestill800t',
    name: 'CineStill 800T',
    description: 'Tungsten cool glow & halation highlights',
    badge: 'Night',
    tint: 'rgba(0, 180, 220, 0.07)',
    cssFilter: 'contrast(115%) saturate(120%) hue-rotate(-10deg)'
  },
  {
    id: 'fujisuperia',
    name: 'Fuji Superia 400',
    description: 'Vibrant emerald greens & sharp contrast',
    badge: 'Vivid',
    tint: 'rgba(180, 255, 210, 0.06)',
    cssFilter: 'contrast(110%) saturate(125%) hue-rotate(5deg)'
  },
  {
    id: 'bwmono',
    name: 'B&W Vintage Noir',
    description: 'Classic high contrast monochrome',
    badge: 'Retro',
    tint: 'rgba(0, 0, 0, 0)',
    cssFilter: 'grayscale(100%) contrast(125%)'
  },
  {
    id: 'clean',
    name: 'Clean Original',
    description: 'Natural uncompressed color',
    badge: 'Natural',
    tint: 'rgba(0, 0, 0, 0)',
    cssFilter: 'none'
  }
];

export async function processImageWithFilterAndFrame(sourceImgUrl, presetId = 'portra400', frameText = "", showFrame = false) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const width = img.naturalWidth || img.width || 1200;
      const height = img.naturalHeight || img.height || 1200;

      canvas.width = width;
      canvas.height = height;

      // 1. Find Preset
      const preset = FILM_PRESETS.find(p => p.id === presetId) || FILM_PRESETS[0];

      // 2. Apply CSS Filter to Canvas Context
      ctx.filter = preset.cssFilter !== 'none' ? preset.cssFilter : 'none';
      ctx.drawImage(img, 0, 0, width, height);

      // Reset filter
      ctx.filter = 'none';

      // 3. Draw Film Color Tint Overlay
      if (preset.tint !== 'rgba(0, 0, 0, 0)') {
        ctx.fillStyle = preset.tint;
        ctx.fillRect(0, 0, width, height);
      }

      // 4. Add subtle film grain effect
      addFilmGrain(ctx, width, height, 0.03);

      // 5. Draw Frame Overlay & Watermark ONLY IF explicitly enabled
      if (showFrame && frameText) {
        const barHeight = Math.max(38, Math.floor(height * 0.06));
        
        const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.75)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, height - barHeight, width, barHeight);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = Math.max(1, Math.floor(height * 0.0015));
        ctx.beginPath();
        ctx.moveTo(0, height - barHeight);
        ctx.lineTo(width, height - barHeight);
        ctx.stroke();

        const paddingHorizontal = Math.max(16, Math.floor(width * 0.03));
        const availableWidth = width - (paddingHorizontal * 2);

        let fontSize = Math.max(12, Math.floor(barHeight * 0.38));
        ctx.font = `600 ${fontSize}px "Inter", sans-serif`;

        while (ctx.measureText(frameText).width > availableWidth * 0.65 && fontSize > 9) {
          fontSize -= 1;
          ctx.font = `600 ${fontSize}px "Inter", sans-serif`;
        }

        ctx.fillStyle = '#E2A07A';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 4;
        ctx.fillText(frameText, paddingHorizontal, height - (barHeight / 2));

        ctx.font = `600 ${Math.max(9, Math.floor(fontSize * 0.85))}px "Share Tech Mono", monospace`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'right';
        ctx.fillText("TUAIPANDANG FILM", width - paddingHorizontal, height - (barHeight / 2));

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };

    img.onerror = (err) => reject(err);
    img.src = sourceImgUrl;
  });
}

function addFilmGrain(ctx, width, height, intensity = 0.03) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const factor = intensity * 255;

  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * factor;
    data[i] = Math.min(255, Math.max(0, data[i] + grain));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
  }

  ctx.putImageData(imageData, 0, 0);
}
