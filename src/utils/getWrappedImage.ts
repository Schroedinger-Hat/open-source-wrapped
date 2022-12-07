export const getWrappedImage = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 300, 400);
  ctx.font = "30px Helvetica";
  ctx.fillStyle = 'blue';
  ctx.fillText('hello world', 0, 50);

  return canvas.toDataURL();
};
