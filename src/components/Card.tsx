import React from 'react';
import { getWrappedImage } from '../utils/getWrappedImage';

const WrappedCard = () => {
  const src = getWrappedImage();

  return (
    <div>
      <img src={src} style={{ width: '500px', height: '500px' }} />
    </div>
  );
};

export default WrappedCard;
