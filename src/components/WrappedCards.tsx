import Image from 'next/image';
import React from 'react';
import { renderToString } from 'react-dom/server'
<<<<<<< HEAD
import { useGetGithubInfos } from '../hooks/useGithubInfos';
=======
import { useGetGithubInfos } from '../hooks/github';
>>>>>>> 41ee0a2 (feat: svg as react component)
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
        nCommits: 0,
      }
    },
    {
      element: RecapNumTxtCard,
      params: {
        nCommits: 658,
        txt: 'nope',
      },
    },
    {
      element: RecapNumStatsCard,
      params: {
        nCommits: 658,
        txt: 'nope',
      }
    },
    {
      element: TopCard,
      params: {
        txt: 'nope',
        nCommits: 0,
      }
    },
    {
      element: RecapTopCard,
      params: {
        txt: 'nope',
        nCommits: 0,
      }
    }
  ];

  return (
    <>
      {availableTpls.map((tpl) => {
        return (
          <Image
            key={tpl.element.name}
            alt='test'
            width={400}
            height={800}
            src={`data:image/svg+xml;base64, ${Buffer.from(renderToString(tpl.element({ ...tpl.params }))).toString('base64')}`}
          />
        );
      })}
    </>
  );
};

export default WrappedCards;
