import React, { useEffect } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import CardSlider from '../../../components/cardSlider/CardSlider';
import useFetch from '../../../hooks/useFetch';

const TopAiring = () => {

  const { data, loading, error } = useFetch(`/getdata/TopAiring/`);

  useEffect(() => {
    if (error) {
      console.error('Error in TopAiring component:', error);
    }
  }, [error]);
  if (error) {
    return (
      <div className='relative text-white'>
        <ContentWrapper classname="flex mx-auto">
          <span className='text-[24px] mx-auto w-full font-normal'>Top Airing</span>
        </ContentWrapper>
        <CardSlider  data={data} loading={loading}/>
        <div>Error: Something went wrong</div>
      </div>
    );
  }

  return (
    <div className='relative text-white'>
      <ContentWrapper classname="flex mx-auto">
        <span className='text-[24px] mx-auto w-full font-normal'>Top Airing</span>
      </ContentWrapper>
      <CardSlider data={data} loading={loading} />
    </div>
  );
};

export default TopAiring;
