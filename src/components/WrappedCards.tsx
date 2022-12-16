import React, { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server'
import { useGetGithubInfos } from '../hooks/useGetGithubInfos';
import { TGitHubUser } from 'src/types/TGithub';
import { TWrappedCard } from '../types/TWrappedCard';
import svgString2Image from 'src/utils/svgToPng';
import { getTopLanguage } from 'src/utils/github';
import Image from 'next/image';
import { RecapNumTxtCard, RecapTopCard, TopCard, WelcomeCard } from './Cards';

const WrappedCards = ({ session }: TWrappedCard) => {
  const [imgReady, setImgReady] = useState(false);
  const [avatar, setAvatar] = useState('');
  const githubInfos: TGitHubUser = useGetGithubInfos(session, setImgReady);

  if (imgReady) {
    if (!avatar) {
      if (githubInfos.user.avatarUrl !== undefined) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                // @ts-ignore
                setAvatar(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', githubInfos.user.avatarUrl);
        xhr.responseType = 'blob';
        xhr.send();
      } else {
        setAvatar('none');
      }
    }

    const cards = [
      {
        name: 'welcome-card',
        xmlString: `data:image/svg+xml;base64, ${Buffer.from(renderToString(WelcomeCard())).toString('base64')}`,
      },
      {
        name: 'recap-num-txt-card',
        xmlString: `data:image/svg+xml;base64, ${Buffer.from(renderToString(RecapNumTxtCard({ nCommits: githubInfos?.user.contributionsCollection
          ?.totalCommitContributions, txt: 'Commits' }))).toString('base64')}`,
      },
      {
        name: 'top-card',
        xmlString: `data:image/svg+xml;base64, ${Buffer.from(renderToString(TopCard({ txt: getTopLanguage(githubInfos) }))).toString('base64')}`,
      },
      {
        name: 'recap-top-card',
        xmlString: `data:image/svg+xml;base64, ${Buffer.from(renderToString(RecapTopCard(githubInfos, avatar))).toString('base64')}`,
      }
    ];

    return (
      <>
        {cards.map((card) => {
          return (
            <div key={card.name} className='image-slide'>
              <div className='header-image'>
                <div className='header-image__wrap'>
                  <span className="button" onClick={(e) => {
                    e.preventDefault();
                    svgString2Image(card.xmlString, 360, 800, 'png', function (bPng: Blob){ window.open(URL.createObjectURL(bPng)) })
                  }}>
                    Download & Share
                  </span>
                </div>
              </div>
              <Image
                alt={card.name}
                width={400}
                height={800}
                src={card.xmlString}
              />
            </div>
          );
        })}
      </>
    );
  }

  return null;
};

export default WrappedCards;
