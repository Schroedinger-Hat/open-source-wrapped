import React from 'react';
import { useGetGithubInfos } from '../hooks/useGithubLogin';
import { useWrappedImage } from '../hooks/useWrappedImage';
import { TWrappedCard } from '../types/TWrappedCard';

const WrappedCard = ({ type, phrase, score, img, session }: TWrappedCard) => {
  const src = useWrappedImage({ type, phrase, score, img });
  const github = useGetGithubInfos(session);

  return <img src={src} />;
};

export default WrappedCard;
