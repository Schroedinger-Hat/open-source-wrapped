import { useEffect, useState } from 'react';
import { TWrappedCard } from '../types/TWrappedCard';

export const useWrappedImage = ({
  type,
  score,
  img
}: TWrappedCard): undefined | string => {
  const [imgSrc, setImgSrc] = useState<undefined | string>(undefined);
  const canvas = document.createElement('canvas');

  const cw = (canvas.width = 1080);
  const ch = (canvas.height = 1080);

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  const wrapped = new Image();
  const wrappedText = type || 'Repository Name';
  const wrappedScore = score || '';

  wrapped.src = img || 'wrapped1.png';

  useEffect(() => {
    wrapped.onload = () => {
      console.log('starting to draw');
      ctx.drawImage(wrapped, 0, 0);
      ctx.font = '80px Gotham';
      ctx.fillStyle = '#fff';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      let { actualBoundingBoxAscent, actualBoundingBoxDescent } =
        ctx.measureText(wrappedText);

      // Main text
      ctx.fillText(
        wrappedText,
        cw / 2,
        ch / 2 + (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2
      );

      // Score
      ctx.fillText(
        wrappedScore,
        cw / 2,
        ch / 2 + (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 + 100
      );

      console.log('finisehd drawings');

      setImgSrc(canvas.toDataURL('image/webp', 1.0));
      return imgSrc;
    };
  }, [imgSrc]);

  return imgSrc;
};
