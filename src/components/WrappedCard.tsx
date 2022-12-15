import React from 'react';
import { useWrappedImage } from '../hooks/useWrappedImage';
import { TWrappedCard } from '../types/TWrappedCard';

const WrappedCard = ({
  type,
  phrase,
  score,
  img,
  githubInfos
}: TWrappedCard) => {
  const src = useWrappedImage({ type, phrase, score, img, githubInfos });

  if (src) {
    return <img src={src} />;
  }

  return null;
};

export default WrappedCard;
