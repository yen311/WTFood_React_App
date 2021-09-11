import React from 'react';
import './Footer.scss';
import FooterItem from './FooterItem';

const exploreItems = [
  { name: 'HOME', link: './home', type: 'inner' },
  { name: 'ABOUT', link: './about', type: 'inner' },
];
const visitItems = [
  { name: '1 Northbourne Ave, Civic, ACT', link: '', type: 'none' },
  { name: 'wtfood@wtfood.com', link: '', type: 'outer' },
  { name: '0412345678', link: '', type: 'outer' },
];
const followItems = [
  { name: 'Instagram', link: '', type: 'outer' },
  { name: 'Facebook', link: '', type: 'outer' },
  { name: 'Twitter', link: '', type: 'outer' },
];
const protectItems = [
  { name: 'Terms', link: '/terms', type: 'inner' },
  { name: 'Privacy', link: '/privacy', type: 'inner' },
];

function Footer() {
  return (
    <div>
      <div className='footer'>
        <div className='item-footer'>
          {/* <img src={logo} alt="" title="abc" className="logo-footer" /> */}
          <h3>WTFood</h3>
          <p className='text-footer'>
            We connects you with a broad range of local restaurants. <br></br>
            <b>Treat yourself better.</b>
          </p>
        </div>
        <div className='item-moblie'>
          <div className='item-footer'>
            <FooterItem title='Explore' items={exploreItems} />
          </div>
          <div className='item-footer'>
            <FooterItem title='Visit' items={visitItems} />
          </div>
          <div className='item-footer'>
            <FooterItem title='Follow' items={followItems} />
          </div>
          <div className='item-footer'>
            <FooterItem title='Protect' items={protectItems} />
          </div>
        </div>
      </div>
      <div className='copyright'>
        <i className='far fa-copyright'></i>
        2021WTFood_All Rights Resereved
      </div>
    </div>
  );
}

export default Footer;
