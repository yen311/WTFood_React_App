import React from 'react';
import ReactDOM from 'react-dom';
import BackBtn from '../../components/UI/BackBtn';
import './Overlay.scss';
import Card from './Card';

const Overlay = (props) => {
  return ReactDOM.createPortal(
    <div>
      <div className='backdrop'></div>
      <div className='modal'>
        <Card className='overlay_card'>
          <div className='header'>
            <h2>You haven't login yet!</h2>
            <i className='fas fa-window-close' onClick={props.onClose}></i>
          </div>
          <div className='content'>
            <div className='message'>Please login to see more detail</div>
            <BackBtn to='/login'>Login</BackBtn>
          </div>
        </Card>
      </div>
    </div>,
    document.getElementById('overlay'),
  );
};

export default Overlay;
