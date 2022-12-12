import React from 'react';
import { useWrappedImage } from '../hooks/useWrappedImage';
import { TWrappedCard } from '../types/TWrappedCard';

const WrappedCard = ({ type, score, img }: TWrappedCard) => {
  const src = useWrappedImage({ type, score, img });

  return (
    <div>
      <img src={src} style={{ width: '500px', height: '500px' }} />
    </div>
  );
};

export default WrappedCard;
