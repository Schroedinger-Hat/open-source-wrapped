export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  canvas: { w: number; h: number }
) => {
  const centerX = canvas.w / 2;
  const centerY = canvas.h / 2;
  const radius = 70;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
};
