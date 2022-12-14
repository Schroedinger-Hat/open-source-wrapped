import React from 'react';
import { useGetGithubInfos } from '../hooks/useGithubInfos';
import { useWrappedImage } from '../hooks/useWrappedImage';
import { TWrappedCard } from '../types/TWrappedCard';

const WrappedCard = ({ type, score, img, session }: TWrappedCard) => {
  const src = useWrappedImage({ type, score, img });
  const github = useGetGithubInfos(session);

  return (
    <div>
      <img src={src} style={{ width: '500px', height: '500px' }} />
      <img src={src} style={{ width: '500px', height: '500px' }} />
      <img src={src} style={{ width: '500px', height: '500px' }} />
      <img src={src} style={{ width: '500px', height: '500px' }} />
      <img src={src} style={{ width: '500px', height: '500px' }} />
    </div>
  );
};

export default WrappedCard;
