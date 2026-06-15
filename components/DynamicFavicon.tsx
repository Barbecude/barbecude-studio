'use client';

import { useEffect } from 'react';
import { useBrandLogo, useBrandName } from '@/lib/productStore';

const makeRoundIcon = (src: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(src);

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();

      const xOffset = (img.width - size) / 2;
      const yOffset = (img.height - size) / 2;

      ctx.drawImage(img, xOffset, yOffset, size, size, 0, 0, size, size);

      try {
        resolve(canvas.toDataURL('image/png'));
      } catch (e) {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
};

const generateFallbackIcon = (text: string): string => {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background circle
  ctx.fillStyle = '#27272a'; // zinc-800
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.charAt(0).toUpperCase(), size / 2, size / 2 + 4);

  return canvas.toDataURL('image/png');
};

export function DynamicFavicon() {
  const brandLogo = useBrandLogo();
  const brandName = useBrandName();

  useEffect(() => {
    const setFavicon = (url: string) => {
      // Remove all existing favicons to override the default Next.js globe
      const existingLinks = document.querySelectorAll("link[rel~='icon']");
      existingLinks.forEach((link) => link.remove());

      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = url;
      document.head.appendChild(link);
    };

    if (brandLogo) {
      makeRoundIcon(brandLogo).then(setFavicon);
    } else {
      const fallbackUrl = generateFallbackIcon(brandName || 'B');
      if (fallbackUrl) setFavicon(fallbackUrl);
    }
  }, [brandLogo, brandName]);

  return null;
}
