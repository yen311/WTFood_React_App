import React from 'react';
import { useParams } from 'react-router';
import NavBar from '../../components/Nav/NavBar';
import './index.scss';
import { useSelector } from 'react-redux';
import unavaliable from '../../assets/unavaliable.jpg';

function DetailPages() {
  console.log(useParams());
  const { id } = useParams();

  const restaurants = useSelector((state) => {
    return state.restaurants.restaurants;
  });
  const [restaurant] = restaurants.filter((restaurant) => restaurant.id === id);
  console.log(restaurant);

  return (
    <React.Fragment>
      <NavBar />
      <div className='detail-contanier'>
        <img
          className='detail_img'
          src={
            restaurant && restaurant.image_url
              ? restaurant.image_url
              : unavaliable
          }
          alt={`404`}
        ></img>
        <div className='detail_name'>{restaurant ? restaurant.name : ''}</div>

        <div className='detail_info'>
          {restaurant ? restaurant.display_phone : ''}
        </div>

        <div className='detail_info'>
          {restaurant
            ? `${restaurant.location.address1}${restaurant.location.address2}${restaurant.location.address3}, ${restaurant.location.city}, ${restaurant.location.state}, ${restaurant.location.zip_code}`
            : ''}
        </div>
        <div className='detail_info'>
          Rating: {restaurant ? restaurant.rating : ''}
        </div>
        <div className='detail_info'>{restaurant ? restaurant.price : ''}</div>
        <div className={`detail_info`}>
          {restaurant && restaurant.is_closed ? 'OPEN NOW!' : 'CLOSED'}
        </div>
        <div className='detail_info'>
          <a href={restaurant && restaurant.url ? restaurant.url : ''}>
            LINK TO YELP
          </a>
        </div>

        <div className='categories'>
          {restaurant && restaurant.categories
            ? restaurant.categories.map((category) => (
                <div>{category.alias}</div>
              ))
            : ''}
        </div>
      </div>
    </React.Fragment>
  );
}

export default DetailPages;
