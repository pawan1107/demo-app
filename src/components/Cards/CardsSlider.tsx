import { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Card from '../Common/Card/Card';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { allCardsAction } from '../../store/allCards';

const SLIDER_SETTING =  {
  dots: true,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: "center",
  centerMode: true,
  centerPadding: "16px",
  
};

const useSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const customPaging = (index: number) => {
    const isActive  = index === currentIndex;
    return (
      <div style={{width: isActive? '16px': '8px', height: '8px', borderRadius: '8px', backgroundColor: '#01D167', opacity: isActive? 1 : 0.2, marginTop: '16px' }} />
    );
  };
  const beforeChange = (prev: number, next: number) => setCurrentIndex(next);

  return {
    ...SLIDER_SETTING,
    customPaging,
    beforeChange
  }
}

const CardSlider = () => {
  const dispatch = useAppDispatch();
  const slider = useSlider();
  const { allCards } = useAppSelector((state) => state.cards);
  slider.beforeChange = (prev: number, next: number) => {
    dispatch(allCardsAction.changeCurrentCard(allCards[Math.ceil(next)].number));
  };

  return (
    <Slider {...slider} >
      {allCards?.map((cards) => (
        <div className='card-slider-card'>
          <Card
            {...cards}
            />
        </div>
      ))}
    </Slider>
  )
}

export default CardSlider