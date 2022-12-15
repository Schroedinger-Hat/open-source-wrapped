import { useEffect, useState } from 'react';
import { TWrappedCard } from '../types/TWrappedCard';

export const useWrappedImage = ({
  type,
  phrase,
  img,
  githubInfos
}: TWrappedCard): undefined | string => {
  const [imgSrc, setImgSrc] = useState<undefined | string>(undefined);

  useEffect(() => {
    const canvas = document.createElement('canvas');

    const cw = (canvas.width = 360);
    const ch = (canvas.height = 800);

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const wrapped = new Image();
    const wrappedText = phrase || 'Repository Name';

    wrapped.src = img || 'wrapped1.png';

    wrapped.onload = () => {
      ctx.drawImage(wrapped, 0, 0);

      let { actualBoundingBoxAscent, actualBoundingBoxDescent } =
        ctx.measureText(wrappedText);

      switch (type) {
        case 'welcome':
          ctx.font = '5em Gotham';
          ctx.fillStyle = '#fff';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';

          const wrappedText1 = wrappedText.split('|')[0];
          const wrappedText2 = wrappedText.split('|')[1];

          // Main text
          ctx.fillText(
            wrappedText1,
            cw / 2,
            ch / 2 + (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2
          );

          // Score
          ctx.fillText(
            wrappedText2,
            cw / 2,
            ch / 2 +
              (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 +
              50
          );
          break;
        case 'commits':
          ctx.font = '5em Gotham';
          ctx.fillStyle = '#fff';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';

          // Main text
          ctx.fillText(
            wrappedText,
            cw / 2,
            ch / 2 + (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2
          );

          if (githubInfos) {
            const commitsText =
              githubInfos?.user.contributionsCollection
                .totalCommitContributions;

            // Commits text
            ctx.fillText(
              commitsText.toString(),
              cw / 2,
              ch / 2 +
                (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 +
                50
            );
          }

          break;
        case 'best_repo':
          ctx.font = '3em Gotham';
          ctx.fillStyle = '#fff';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';

          const wrappedTextBestRepo1 = wrappedText.split('|')[0];
          const wrappedTextBestRepo2 = wrappedText.split('|')[1];

          // Main text
          ctx.fillText(
            wrappedTextBestRepo1,
            cw / 2,
            ch / 2 +
              (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 -
              130
          );

          // Score
          ctx.fillText(
            wrappedTextBestRepo2,
            cw / 2,
            ch / 2 +
              (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 -
              100
          );

          if (githubInfos) {
            const bestRepoText =
              githubInfos?.user.topRepositories.edges[0].node.name;

            // Commits text
            ctx.fillText(
              bestRepoText.toString(),
              cw / 2,
              ch / 2 +
                (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 +
                150
            );
          }

          break;
          break;
        default:
          break;
      }

      setImgSrc(canvas.toDataURL('image/webp', 1.0));
      return imgSrc;
    };
  }, [imgSrc]);

  return imgSrc;
};
