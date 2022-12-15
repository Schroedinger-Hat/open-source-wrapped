import React, { useState } from 'react';
import { useGetGithubInfos } from 'src/hooks/useGetGithubInfos';
import { TGitHubUser } from 'src/types/TGithub';
import { TWrappedCard } from '../types/TWrappedCard';
import WrappedCard from './WrappedCard';

const WrappedCards = ({ session }: TWrappedCard) => {
  const [imgReady, setImgReady] = useState(false);
  const githubInfos: TGitHubUser = useGetGithubInfos(session, setImgReady);

  if (imgReady) {
    return (
      <>
        <div className="Wrapped">
          <WrappedCard
            type="welcome"
            phrase="Open Source|Wrapped"
            score="10"
            img="/w1.svg"
            githubInfos={githubInfos}
          />
          <WrappedCard
            type="commits"
            phrase="Commits"
            score="10"
            img="/w2.svg"
            githubInfos={githubInfos}
          />
          <WrappedCard
            type="best_repo"
            phrase="🎉 Your best|language!"
            score="10"
            img="/w3.svg"
            githubInfos={githubInfos}
          />
          <WrappedCard
            type="best_all"
            phrase="Nicely done :)"
            score="10"
            img="/w4.svg"
            githubInfos={githubInfos}
          />
        </div>
      </>
    );
  }

  return null;
};

export default WrappedCards;
