import React from 'react';
import PropTypes from 'prop-types';
import './SlotMachine.css';
import Slot from '../Slot/Slot';


const IMG_PATH = `${import.meta.env.BASE_URL}images`;

const SlotMachine = ({ maxCount, isRunning, duration }) => {
    const intMax = parseInt(maxCount, 10);

    if (!Number.isInteger(intMax)) {
      console.error('prop "maxCount" must be an integer');
      return null;
    }
  
    const digits = intMax.toString().split('');
  
    return (
      <div className="slot-machine">
        {digits.map((d, i) => (
          <Slot key={i} isRunning={isRunning} finalDigit={Number(d)} duration={duration}/>
        ))}
        <img className="slot-dollar" src={`${IMG_PATH}/Dollar.png`} alt="$"/>
      </div>
    );
  };
  
  SlotMachine.propTypes = {
    maxCount: PropTypes.number.isRequired,
    status: PropTypes.bool,
  };

  export default SlotMachine;