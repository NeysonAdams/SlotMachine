import { useEffect, useRef, useState } from 'react';
import './Slot.css';
import { motion, useAnimation } from 'framer-motion';

const CELL_H        = 110;    
const FAST_SPEED    = 0.8; 
const SPEED_FACTOR = 0.5;   
const SLOW_FACTOR   = 1.35;
const IMG_PATH = `${import.meta.env.BASE_URL}images`;

function next(d) {
    return (d + 1) % 10;
  }
  
  export default function Slot({isRunning, finalDigit, duration}) {

    const [topDigit,    setTopDigit] = useState(1);
    const [bottomDigit, setBottomDigit] = useState(0);

    const speedRef = useRef(FAST_SPEED);

    const runningRef  = useRef(false);  
    const stoppingRef = useRef(false);  

    const topYRef    = useRef(-CELL_H); 
    const bottomYRef = useRef(0);

    const topCtrl    = useAnimation();
    const bottomCtrl = useAnimation();

    const posRef        = useRef(0);   
  const topDigitRef   = useRef(1);
  const bottomDigitRef= useRef(0);

    async function tick(step=0) {
        if (!runningRef.current) return;

        const easecurr = step ===0 ? "easeIn" : "linear" 

        const nextTopY    = topYRef.current    + CELL_H;
        const nextBottomY = bottomYRef.current + CELL_H;

        await Promise.all([
        topCtrl.start({ y: nextTopY,    transition: { duration: speedRef.current, ease: easecurr} }),
        bottomCtrl.start({ y: nextBottomY, transition: { duration: speedRef.current, ease: easecurr } })
        ]);

        topYRef.current    = nextTopY;
        bottomYRef.current = nextBottomY;
    
        if (posRef.current === 0) {                  
            await bottomCtrl.set({ y: -CELL_H });      
            bottomYRef.current = -CELL_H;              
            bottomDigitRef.current = (bottomDigitRef.current + 2) % 10;
            setBottomDigit(bottomDigitRef.current);
            posRef.current = 1;                        
          } else {                                     
            await topCtrl.set({ y: -CELL_H });         
            topYRef.current = -CELL_H;                 
            topDigitRef.current = (topDigitRef.current + 2) % 10;
            setTopDigit(topDigitRef.current);
            posRef.current = 0;
          }

        if (!stoppingRef.current && speedRef.current > 0.1) {
            speedRef.current *= SPEED_FACTOR;
        }

        if (stoppingRef.current && speedRef.current < 0.5)
        {
            speedRef.current *= SLOW_FACTOR;
        }

        const visible = posRef.current === 0 ? bottomDigitRef.current : topDigitRef.current;
        const visible_coord = posRef.current === 0  ? bottomYRef.current :topYRef.current;
        if (stoppingRef.current) {
            if (visible === finalDigit && visible_coord ===0){
                runningRef.current = false;
                return;
            }
        }

        requestAnimationFrame(()=>{tick(step+1)});
    }

    useEffect(() => {
        if(!isRunning || runningRef.current) return;
        console.log(duration);
        //if (isRunning) {
            runningRef.current  = true;
            stoppingRef.current = false;
            speedRef.current    = FAST_SPEED;
            topCtrl.set({ y: -CELL_H });
            bottomCtrl.set({ y: 0 });
            topYRef.current    = -CELL_H;
            bottomYRef.current = 0;
            posRef.current       = 0;
            topDigitRef.current    = 1;
            bottomDigitRef.current = 0;
            setTopDigit(1);
            setBottomDigit(0);
        
            tick();
            setTimeout(() => {
                stoppingRef.current = true;
            }, duration);
            return;
        //}
    }, [isRunning]);

    return (
        <div
          className="slot-mask"
          style={{  overflow: 'hidden', position: 'relative' }}
        >
          <motion.img
            className='slot-digit'
            src={`${IMG_PATH}/${topDigit}.png`}
            alt={topDigit}
            initial={{ y: -CELL_H }}
            animate={topCtrl}
            style={{ position: 'absolute', width: '100%', height: CELL_H, left: 0 }}
          />
    
          <motion.img
            className='slot-digit'
            src={`${IMG_PATH}/${bottomDigit}.png`}
            alt={bottomDigit}
            initial={{ y: 0 }}
            animate={bottomCtrl}
            style={{ position: 'absolute', width: '100%', height: CELL_H, left: 0 }}
          />
        </div>
      );

  }