import React, {useState, useEffect, useRef} from "react";
import Slide from '@components/Slide/Slide.jsx';
import { data } from './../data/data.js';
import s from './carousel.module.scss';

const Carousel = (props) => {
  const dataLength = data.length;
  const [slide, setSlide] = useState(0);
  const [sizeOneSlide, setSizeOneSlide] = useState(0);

  const widthSliderRef = useRef();
  
  useEffect(() => {
    if (sizeOneSlide) widthSliderRef.current.style.width = `${sizeOneSlide}px`;
  }, [sizeOneSlide]);

  useEffect(() => {
    if (!sizeOneSlide) setSizeOneSlide(widthSliderRef.current.offsetWidth);
  }, []);
  
  const handleNextSlide = (nextSlide) => {
    return nextSlide === data.length - 1
      ? setSlide(0) : setSlide(nextSlide + 1);
  }

  const handlePrevSlide = (prevSlide) => {
    return prevSlide === 0
      ? setSlide(dataLength - 1) : setSlide(prevSlide - 1);
  }

  return (
    <div className={s.carousel}>
      <div className={s.arrowLeft} onClick={() => handlePrevSlide(slide)}>&#10094;</div>
      <div ref={widthSliderRef} className={s.slider}>
        <Slide
          data={data}
          slide={slide}
          clName={s.sliderLine}
          sizeOneSlide={sizeOneSlide}
          handleNextSlide={handleNextSlide}
          handlePrevSlide={handlePrevSlide}
        />
        <div className={s.pagination}>
          {
            data.map((item, index) => {
              if (index === slide) return <div key={index} className={`${s.slidePagination} ${s.active}`}></div>

              return <div key={index} className={s.slidePagination} onClick={() => {
                setSlide(index)
              }}></div>
            })
          }
        </div>

      </div>
      <div className={s.arrowRight} onClick={() => handleNextSlide(slide)}>&#10095;</div>
    </div>
  )
}

export default Carousel;