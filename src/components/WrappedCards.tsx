import Image from 'next/image';
import React from 'react';
import { useGetGithubInfos } from '../hooks/useGithubLogin';
import { renderToString } from 'react-dom/server'
import svgString2Image from 'src/utils/svgToPng';
import { TWrappedCard } from '../types/TWrappedCard';
import {
  WelcomeCard,
  RecapNumTxtCard,
  RecapNumStatsCard,
  TopCard,
  RecapTopCard
} from './Cards';

const WrappedCards = ({ session }: TWrappedCard) => {
  const github = useGetGithubInfos(session);

  const availableTpls = [
    {
      element: WelcomeCard,
      params: {
        txt: 'ciaone',
        nCommits: 0
      }
    },
    {
      element: RecapNumTxtCard,
      params: {
        nCommits: 658,
        txt: 'nope'
      }
    },
    {
      element: RecapNumStatsCard,
      params: {
        nCommits: 658,
        txt: 'nope'
      }
    },
    {
      element: TopCard,
      params: {
        txt: 'nope',
        nCommits: 0
      }
    },
    {
      element: RecapTopCard,
      params: {
        txt: 'nope',
        nCommits: 0
      }
    }
  ];

  return (
    <>
      {availableTpls.map((tpl) => {
        const xmlString = `data:image/svg+xml;base64, ${Buffer.from(renderToString(tpl.element({ ...tpl.params }))).toString('base64')}`;
        return (
          <div className='image-slide'>
            <div className='header-image'>
              <div className='header-image__wrap'>
                <span className="button" onClick={(e) => {
                  e.preventDefault();
                  svgString2Image(xmlString, 360, 800, 'png', function (bPng: Blob){ window.open(URL.createObjectURL(bPng)) })
                }}>
                  Download & Share
                </span>
              </div>
            </div>
            <Image
                key={tpl.element.name}
                alt="test"
                width={400}
                height={800}
                src={`data:image/svg+xml;base64, ${Buffer.from(
                  renderToString(tpl.element({ ...tpl.params }))
                ).toString('base64')}`}
              />
          </div>
        );
      })}
    </>
  );
};

export default WrappedCards;
