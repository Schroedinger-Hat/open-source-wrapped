import React from 'react';
import { useGetGithubInfos } from '../hooks/useGithubLogin';
import { TWrappedCard } from '../types/TWrappedCard';
import WrappedCard from './WrappedCard';

const WrappedCards = ({ session }: TWrappedCard) => {
  const github: TGitHubUser = useGetGithubInfos(session);

  return (
    <>
      <div className="Wrapped">
        <WrappedCard
          type="welcome"
          phrase="Open Source|Wrapped"
          score="10"
          img="/w1.svg"
        />
        <WrappedCard
          type="commits"
          phrase="Commits"
          score="10"
          img="/w2.svg"
        />
        <WrappedCard
          type="Hello SH 3!"
          phrase="Open Source Wrapped"
          score="10"
          img="/w3.svg"
        />
      </div>
    </>
  );
};

export default WrappedCards;
