import React, {useState, useEffect, useRef} from 'react';
import s from './slide.module.scss';


const Slide = ({ data, slide, clName, sizeOneSlide, handleNextSlide, handlePrevSlide }) => {
  const slideLineRef = useRef();
  const imgRef = useRef();

  const [translateValue, setTranslateValue] = useState(sizeOneSlide * slide);

  useEffect(() => {
    setTranslateValue(sizeOneSlide * slide);
    slideLineRef.current.style.transition = 'all ease 1.5s';
  }, [slide])

  //swipe logic

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchMoveX, setTouchMoveX] = useState(0);
  const [touchMoveY, setTouchMoveY] = useState(0);

  const [isLeftTouch, setIsLeftTouch] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  useEffect(() => {
    slideLineRef.current.addEventListener("touchstart", handleTouchStart, false);
    slideLineRef.current.addEventListener("touchmove", handleTouch, false);
    slideLineRef.current.addEventListener("touchend", handleTouchEnd, false);
  }, []);

  const handleTouchStart = (e) => {
    setIsEnd(false);
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouch = (e) => {
    setTouchMoveX(e.touches[0].clientX);
    setTouchMoveY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsEnd(true);
    setTouchStartX(0);
    setTouchMoveX(0);
    setTouchStartY(0);
  };

  useEffect(() => {
    if (touchMoveX === 0 || touchMoveY === 0 || isEnd) return;
    slideLineRef.current.style.transition = 'none';
    const diffX = touchStartX - touchMoveX;
    const diffY = touchStartY - touchMoveY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        if (slide === data.length - 1) return;
        setIsLeftTouch(false);
        setTranslateValue(slide * sizeOneSlide + diffX);
      } else {
        if (slide === 0) return;
        setIsLeftTouch(true);
        setTranslateValue(slide * sizeOneSlide + diffX);
      }
    }
  }, [touchStartX, touchMoveX]);

  useEffect(() => {
    if (!isEnd) return;

    if (isLeftTouch) {
      if (slide === 0) return;
      if (translateValue >= sizeOneSlide * (slide - 1) + sizeOneSlide / 2 &&
          translateValue <= sizeOneSlide + sizeOneSlide * slide) {
            slideLineRef.current.style.transition = 'all ease 1.5s';
            setTranslateValue(sizeOneSlide * slide);
      } else {
        handlePrevSlide(slide);
      }
    } else {
      if (slide === data.length - 1) return;
      if (translateValue >= sizeOneSlide * slide + sizeOneSlide / 2 &&
          translateValue <= sizeOneSlide + sizeOneSlide * slide) {
        handleNextSlide(slide);
      } else {
        slideLineRef.current.style.transition = 'all ease 1.5s';
        setTranslateValue(sizeOneSlide * slide);
      };
    };
  }, [isEnd])

  return (
    <div
      ref={slideLineRef}
      className={clName}
      style={{
        "transform": `translate(-${translateValue}px)`
      }}
    >
      {
        data.map((item, index) =>(
          <div ref={imgRef} className={s.slideSingle} key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))
      }
    </div>
  )
}

export default Slide;
