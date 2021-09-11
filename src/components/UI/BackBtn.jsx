import React from 'react';
import { Link } from 'react-router-dom';
import './BackBtn.scss';

function BackBtn(props) {
  return (
    <div className={`back-btn-container ${props.className}`}>
      <Link to={props.to} className='back-btn' onClick={props.onClick}>
        {props.children}
      </Link>
    </div>
  );
}

export default BackBtn;
