import { useEffect, useState } from 'react';
import { getTopLanguage } from 'src/utils/github';
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

          var shImg = new Image();
          shImg.src = '/sh.png';

          ctx.drawImage(shImg, cw - 340, ch - 50, 32, 32);

          // Main text
          ctx.fillText(
            wrappedText1,
            cw / 2,
            ch / 2 + (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2
          );

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
          ctx.fillStyle = '#000';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';

          var shImg = new Image();
          shImg.src = '/sh.png';

          ctx.drawImage(shImg, cw - 340, ch - 50, 32, 32);

          // Main text
          ctx.fillText(wrappedText, cw / 2, ch - 220);

          if (githubInfos) {
            const commitsText =
              githubInfos?.user.contributionsCollection
                .totalCommitContributions;

            ctx.fillStyle = '#65DB23';
            ctx.fillRect(0, 80, cw, 60);
            ctx.fillStyle = '#F675C2';
            ctx.fillText(commitsText.toString(), cw / 2, 110);

            ctx.fillStyle = '#DB5018';
            ctx.fillRect(0, 140, cw, 60);
            ctx.fillStyle = '#000';
            ctx.fillText(commitsText.toString(), cw / 2, 170);

            ctx.fillStyle = '#F675C2';
            ctx.fillRect(0, 200, cw, 60);
            ctx.fillStyle = '#65DB23';
            ctx.fillText(commitsText.toString(), cw / 2, 230);

            ctx.fillStyle = '#DB5018';
            ctx.fillRect(0, 260, cw, 60);
            ctx.fillStyle = '#F675C2';
            ctx.fillText(commitsText.toString(), cw / 2, 290);

            ctx.fillStyle = '#65DB23';
            ctx.fillRect(0, 320, cw, 60);
            ctx.fillStyle = '#F675C2';
            ctx.fillText(commitsText.toString(), cw / 2, 350);

            ctx.fillStyle = '#F675C2';
            ctx.fillRect(0, 380, cw, 60);
            ctx.fillStyle = '#000';
            ctx.fillText(commitsText.toString(), cw / 2, 410);
          }

          // osday text
          ctx.font = '2em Gotham';
          ctx.textAlign = 'center';
          ctx.fillText('#githubwrapped2022', cw - 120, ch - 32);

          break;
        case 'best_repo':
          ctx.font = '3em Gotham';
          ctx.fillStyle = '#fff';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';

          const wrappedTextBestRepo1 = wrappedText.split('|')[0];
          const wrappedTextBestRepo2 = wrappedText.split('|')[1];

          var shImg = new Image();
          shImg.src = '/sh.png';

          ctx.drawImage(shImg, cw - 340, ch - 50, 32, 32);

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

            const topLanguage = getTopLanguage(githubInfos);

            // Lang text
            ctx.font = '5em Gotham';
            ctx.fillText(
              topLanguage,
              cw / 2,
              ch - 220
            );
          }

          // osday text
          ctx.font = '2em Gotham';
          ctx.fillText('#githubwrapped2022', cw - 120, ch - 32);

          break;
        case 'best_all':
          if (githubInfos) {
            const ghUserProfilePicture = githubInfos?.user.avatarUrl;

            var ghUserImg = new Image();
            ghUserImg.src = ghUserProfilePicture;
            ghUserImg.crossOrigin = 'anonymous';

            var shImg = new Image();
            shImg.src = '/sh.png';

            ctx.drawImage(shImg, cw - 340, ch - 50, 32, 32);

            ghUserImg.onload = () => {

              ctx.drawImage(
                ghUserImg,
                cw / 2 - 75,
                ch / 2 +
                  (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 -
                  190,
                150,
                150
              );

              ctx.font = '3.5em Gotham';
              ctx.fillStyle = '#F2FF47';
              ctx.textBaseline = 'middle';
              ctx.textAlign = 'center';

              // Main text
              ctx.fillText(
                wrappedText,
                cw / 2,
                ch / 2 +
                  (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 -
                  300
              );

              const ghUsername = githubInfos?.user.login;

              // Username text
              ctx.font = '2em Gotham';
              ctx.fillText(
                ghUsername,
                cw / 2,
                ch / 2 +
                  (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 +
                  50
              );

              // Top repos text
              ctx.fillStyle = '#F2FF47a1';
              ctx.font = '1.5em Gotham';
              ctx.textAlign = 'left';
              ctx.fillText(
                'Top Repos and 🌟',
                cw / 2 - 140,
                ch / 2 +
                  (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 +
                  100
              );

              // Top repos text
              ctx.fillText(
                'Top commits',
                cw / 2 - 140,
                ch / 2 +
                  (actualBoundingBoxAscent - actualBoundingBoxDescent) / 2 +
                  220
              );

              // Actual data
              // Top repos text
              githubInfos?.user.repositories.edges.map(
                (item: any, idx: number) => {
                  if (item.node) {
                    ctx.fillStyle = '#F2FF47';
                    ctx.font = '1.8em Gotham';
                    ctx.fillText(
                      item.node.name.length > 20
                        ? item.node.name.substr(0, 20) + '...'
                        : item.node.name,
                      cw / 2 - 100,
                      ch / 2 +
                        (actualBoundingBoxAscent - actualBoundingBoxDescent) /
                          2 +
                        120 +
                        idx * 18
                    );

                    ctx.fillText(
                      item.node.stargazerCount,
                      cw / 2 - 140,
                      ch / 2 +
                        (actualBoundingBoxAscent - actualBoundingBoxDescent) /
                          2 +
                        120 +
                        idx * 18
                    );
                  }
                }
              );

              // Actual data
              // Top commits text
              githubInfos?.user.contributionsCollection.commitContributionsByRepository.map(
                (item: any, idx: number) => {
                  if (item) {
                    ctx.fillStyle = '#F2FF47';
                    ctx.font = '1.8em Gotham';
                    ctx.fillText(
                      item.repository.name.length > 20
                        ? item.repository.name.substr(0, 20) + '...'
                        : item.repository.name,
                      cw / 2 - 100,
                      ch / 2 +
                        (actualBoundingBoxAscent - actualBoundingBoxDescent) /
                          2 +
                        240 +
                        idx * 18
                    );

                    ctx.fillText(
                      item.contributions.totalCount,
                      cw / 2 - 140,
                      ch / 2 +
                        (actualBoundingBoxAscent - actualBoundingBoxDescent) /
                          2 +
                        240 +
                        idx * 18
                    );
                  }
                }
              );

              // osday text
              ctx.font = '2em Gotham';
              ctx.textAlign = 'center';
              ctx.fillText('#githubwrapped2022', cw - 120, ch - 32);

              setImgSrc(canvas.toDataURL('image/webp', 1.0));
            };
          }

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
