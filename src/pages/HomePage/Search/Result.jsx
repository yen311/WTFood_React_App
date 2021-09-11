import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import unavaliable from '../../../assets/unavaliable.jpg';

import './Result.scss';

const Result = (props) => {
  const [displaying, setDisplaying] = useState(false);

  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const isLogin = useSelector((state) => state.auth.login);

  useEffect(() => {
    if (restaurants.length !== 0) setDisplaying(true);
    else setDisplaying(false);
  }, [displaying, restaurants]);

  return (
    <>
      <div className='outer-container'>
        {restaurants.map((restaurant, index) => {
          return (
            <div key={index}>
              <Link
                className='result_container'
                to={`/home/${restaurant.id}`}
                onClick={props.onClick}
              >
                <div className='result_img-container'>
                  <img
                    className='result_img'
                    src={
                      restaurant.image_url ? restaurant.image_url : unavaliable
                    }
                    alt={`img_of_${restaurant.name}`}
                  ></img>
                  <div className='overlay'>
                    <div className='overlay-text'>More Detail</div>
                  </div>
                </div>
                <div className='info-container'>
                  <ul>
                    <li className='restaurant-name'>
                      {restaurant.name ? restaurant.name : 'Not Available'}
                    </li>
                    <li>
                      {restaurant.display_phone
                        ? restaurant.display_phone
                        : 'Phone Number N/A'}
                    </li>
                    <li>{`${restaurant.location.address1}${restaurant.location.address2}${restaurant.location.address3}, ${restaurant.location.city}, ${restaurant.location.state}, ${restaurant.location.zip_code}`}</li>
                    <li>{`Total reviews on Yelp: ${
                      restaurant.review_count ? restaurant.review_count : 'N/A'
                    }`}</li>
                    <li>{`Yelp Rating: ${
                      restaurant.rating ? restaurant.rating : 'N/A'
                    }`}</li>
                    <li>
                      {`Yelp Price: ${
                        restaurant.price ? restaurant.price : 'N/A'
                      }`}
                      {/* <button className='detail-btn'>Leave a review?</button> */}
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Result;
