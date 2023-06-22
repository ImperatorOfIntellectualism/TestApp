import './App.scss'
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import aLeft from './res/arrowLeft.png'
import aRight from './res/arrowRight.png'
import vector from './res/Vector.png'
import 'swiper/scss';
import { gsap } from "gsap";
import "swiper/scss/navigation";
import 'sass'

function App() {
  const [point, setPoint] = useState(5);
  const prev = point - 1;
  const next = point + 1;
  const yearArr = [[2008, 2009],[2010, 2011],[2012, 2013],[2014, 2015],[2016,2017],[2018,2019]]
  const textArr = [['1','2','3','4','5','6'],['7','8','9','10','11','12'],['1','2','3','4','5','6'],['1','2','3','4','5','6'],['1','2','3','4','5','6'],['1','2','3','4','5','6']]

  //1: 494 169, 2: 412 305, 3: 255 307 4: 183 161 5: 177 169 6: 255 32


  useEffect(() => {

    const radius = 70;
    let innerWidth = 10;
    
    const canvas = document.getElementsByClassName('circle')[0];
    const container = document.getElementsByClassName('circleContainer')[0];
  const context = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  function getCursorPosition(canvas, event, coordx, coordy, context) {
  const rotation = (angle) => {
    context.translate(coordx, coordy)
    context.rotate(-(angle * Math.PI) / 180)
    context.translate(-coordx, -coordy)
  }
  const rect = canvas.getBoundingClientRect()
  const x = Math.floor(event.clientX - rect.left)
  const y = Math.floor(event.clientY - rect.top)
  if(x >= 494 -7 && x <= 494 + 7 && y >= 169 - 7 && y <= 169 + 7)
  {rotation(60);if(point == 5){setPoint(0)}else {setPoint(point + 1)}}
  else if (x >= 412 - 7 && x <= 412 + 7 && y >= 305 - 7 && y <= 305 + 7)
  {rotation(120); if(point == 5) setPoint(1); else if (point == 4) setPoint(0); else setPoint(point + 2)}
  else if (x >= 255 - 7 && x <= 255 + 7 && y >= 307 - 7 && y <= 307 + 7)
  {rotation(180); if(point == 0) setPoint(3); else if (point == 1) setPoint(4); else if (point == 2) setPoint(5); else setPoint(point - 3)}
  else if (x >= 177 - 7 && x <= 177 + 7 && y >= 169 - 7 && y <= 169 + 7)
  {rotation(-120); if(point == 0) setPoint(4); else if (point == 1) setPoint(5); else setPoint(point - 2)}
  else if (x >= 255 - 7 && x <= 255 + 7 && y >= 32 - 7 && y <= 32 + 7)
  {rotation(-60);if(point == 0){setPoint(5)}else {setPoint(point - 1)}}
  else return;
}

  container.addEventListener('click', function (e) {
        getCursorPosition(container, e, centerX, centerY, context)
        })
    context.clearRect(0,0,canvas.width,canvas.height)
    const draw = () => {
      for(var i=0; i<6; i++){
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI , false);
        context.lineWidth = 1;
        context.strokeStyle = 'black'
        context.stroke();
        context.beginPath();
        if (i == point)
        {
          context.arc(centerX + radius*Math.cos(2*Math.PI*i/6), 
          centerY + radius*Math.sin(2*Math.PI*i/6), 
                                  innerWidth, 0, 2*Math.PI);
        }
        else context.arc(centerX + radius*Math.cos(2*Math.PI*i/6), 
              centerY + radius*Math.sin(2*Math.PI*i/6), 
                                  2, 0, 2*Math.PI);
        context.strokeStyle = '#303E58'
        context.stroke();
      }

      const background = document.getElementsByClassName('background')[0];
      const ctx = background.getContext('2d');
      const centerXB = background.width / 2;
      const centerYB = background.height / 2;
      ctx.beginPath();
      ctx.moveTo(0,centerYB)
      ctx.lineTo(background.width, centerYB);
      ctx.lineWidth = 0.2;
      ctx.strokeStyle = 'black'
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(centerXB,background.height)
      ctx.lineTo(centerXB, 0);
      ctx.lineWidth = 0.2;
      ctx.strokeStyle = 'black'
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(0,0)
      ctx.lineTo(0, background.height);
      ctx.lineWidth = 0.2;
      ctx.strokeStyle = 'black'
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(background.width,0)
      ctx.lineTo(background.width, background.height);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'black'
      ctx.stroke();
    }
    draw();
    
  }, [point])
  
  const animRotate = (turn, angle) => {
    if(turn)
    gsap.to(".circle", { 
      duration: 0.15,
      rotation: `-=${angle}`,
    });
    else gsap.to(".circle", { 
      duration: 0.15,
      rotation: `+=${angle}`,
    });
  }

  return (
    <div className="container">
      <div className="textBox"><img src={vector} alt='err'></img>Исторические даты</div>
      <div className='circleContainer'><canvas className="circle"></canvas></div>
      <div className="dateBox"><span style={{color: "#5D5FEF"}}>{yearArr[point][0]} </span> <span style={{color: "#EF5DA8"}}>{yearArr[point][1]}</span></div>
      <div className='middleNBox'>{point+1}/6</div>
      <div className='middleSBox'><img className="slideButton" src={aLeft} width={"80px"} height={"80px"} alt='err' onClick={()=>{if(point == 0){animRotate(0, 60);setPoint(5)}else {animRotate(0, 60);setPoint(prev)}}}/><img className="slideButton" src={aRight} width={"80px"} height={"80px"} alt='err' onClick={()=>{if(point == 5){animRotate(1, 60);setPoint(0)}else {animRotate(1, 60);setPoint(next)}}}/></div>
      <div className='number'>{point+1}</div>
      <canvas className='background'></canvas>
      <Swiper
      className='bottomS'
      spaceBetween={50}
      navigation={true} 
      modules={[Navigation]}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><h1>{yearArr[point][0]}</h1>{textArr[point][0]}</SwiperSlide>
      <SwiperSlide><h1>{yearArr[point][0]}</h1>{textArr[point][1]}</SwiperSlide>
      <SwiperSlide><h1>{yearArr[point][0]}</h1>{textArr[point][2]}</SwiperSlide>
      <SwiperSlide><h1>{yearArr[point][1]}</h1>{textArr[point][3]}</SwiperSlide>
      <SwiperSlide><h1>{yearArr[point][1]}</h1>{textArr[point][4]}</SwiperSlide>
      <SwiperSlide><h1>{yearArr[point][1]}</h1>{textArr[point][5]}</SwiperSlide>
    </Swiper>
    </div>
  );
}

export default App;