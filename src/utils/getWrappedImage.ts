import { drawCircle } from './drawCircle';

export const getWrappedImage = () => {
  const canvas = document.createElement('canvas');

  const cw = (canvas.width = 1000);
  const ch = (canvas.height = 1000);

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  drawCircle(ctx, { w: cw, h: ch });

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 500, 500);
  ctx.font = '50px Gotham';
  ctx.fillStyle = '#fff';
  ctx.fillText('hello world', 0, 50);

  return canvas.toDataURL('image/webp', 1.0);
};
