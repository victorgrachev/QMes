import React from 'react';
import { WrapperLoaderPage } from './styled';
import { Loader } from 'components/Loader';

export const LoaderPage = () => {
  return (
    <WrapperLoaderPage>
      <Loader />
    </WrapperLoaderPage>
  );
};
