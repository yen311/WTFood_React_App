import React, { useRef, useState } from 'react';
import './MainSearchBar.scss';
import { Icon } from '@iconify/react';
import drumstickIcon from '@iconify-icons/vs/drumstick';
import { server_url } from '../../../api/yelp/config';
import { useDispatch } from 'react-redux';
import { restaurantAction } from '../../../store/restaurantAction';
import Loading from '../../../components/UI/Loading';

function MainSearchBar() {
  const dispatch = useDispatch();
  const locationRef = useRef();
  const termRef = useRef();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    dispatch(restaurantAction.reset());
    if (
      termRef.current.value.trim().length !== 0 &&
      locationRef.current.value.trim().length !== 0
    ) {
      setError(null);
      setIsLoading(true);
      try {
        const data = await fetch(
          `${server_url}getData?location=${locationRef.current.value}&term=${termRef.current.value}`,
        );
        const response = await data.json();
        console.log(response);
        if (response.businesses) {
          dispatch(restaurantAction.add(response.businesses));
        } else {
          setError(response.error.description);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      if (
        termRef.current.value.trim().length === 0 &&
        locationRef.current.value.trim().length === 0
      ) {
        setError("Search & Location fields can't be empty!");
      } else if (termRef.current.value.trim().length === 0) {
        setError("Search field can't be empty!");
      } else {
        setError("Location field can't be empty!");
      }
    }
  };
  return (
    <>
      <div className='main-search-container'>
        <span className='main-search-span'>Search</span>
        <input className='main-search-input' type='text' ref={termRef}></input>
        <span className='main-search-span'>Near</span>
        <input
          className='main-search-input'
          type='text'
          ref={locationRef}
        ></input>
        <button className='main-search-btn' onClick={getData}>
          <Icon icon={drumstickIcon} className='main-search-icon' />
        </button>
      </div>
      {isLoading && <Loading className='spinner' />}
      <div className='error'>{error}</div>
    </>
  );
}

export default MainSearchBar;
