import React from 'react';
import './Loading.scss';

const Loading = (props) => {
  return (
    <>
      <div className={`loading-container ${props.className}`}>
        <div className='ball'></div>
        <div className='ball'></div>
        <div className='ball'></div>
        <div className='ball'></div>
        <div className='ball'></div>
        <div className='ball'></div>
      </div>
    </>
  );
};

export default Loading;
