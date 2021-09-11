import React, { useState } from 'react';
import NavBar from '../../components/Nav/NavBar';
import MainSearchBar from '../../pages/HomePage/Search/MainSearchBar';
import Result from '../../pages/HomePage/Search/Result';
import Overlay from '../../components/UI/Overlay';
import Footer from './Footer/Footer';
import './index.scss';
import { useSelector } from 'react-redux';

function Main() {
  const [overlay, setIsOverlay] = useState(false);
  const isLogin = useSelector((state) => state.auth.login);
  const openOverlay = () => {
    setIsOverlay(true);
  };
  const closeOverlay = () => {
    setIsOverlay(false);
  };
  return (
    <React.Fragment>
      <NavBar />
      {!isLogin && overlay && <Overlay onClose={closeOverlay} />}
      <div className='container-main'>
        <div className='background-main'></div>
        <MainSearchBar />
        {/* <AdvanceSearchBar /> */}
        <Result onClick={openOverlay} />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
}

export default Main;
