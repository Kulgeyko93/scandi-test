import React from 'react';
import Carousel from './pages/Carousel.jsx';
import s from './app.module.scss';


const App = () => {
  return (
    <div className={s.container}>
      <Carousel />
    </div>
  )
}

export default App;
