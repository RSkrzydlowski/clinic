import React, {useState} from 'react';
import './rating.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Rating = (props) => {
  const [rate, setRate] = useState(0);

  const changeRate = (value) => {
    setRate(value)
    props.changeRate(value)
  }

  return (
    <div className="ratings">
      {/* <FontAwesomeIcon onClick={() => changeRate(1)} className={rate < 1 ? "rating_less" : "rating_more"} icon={faStar} />
      <FontAwesomeIcon onClick={() => changeRate(2)} className={rate < 2 ? "rating_less" : "rating_more"} icon={faStar} />
      <FontAwesomeIcon onClick={() => changeRate(3)} className={rate < 3 ? "rating_less" : "rating_more"} icon={faStar} />
      <FontAwesomeIcon onClick={() => changeRate(4)} className={rate < 4 ? "rating_less" : "rating_more"} icon={faStar} />
      <FontAwesomeIcon onClick={() => changeRate(5)} className={rate < 5 ? "rating_less" : "rating_more"} icon={faStar} /> */}
      <FontAwesomeIcon onClick={() => changeRate(1)} className="test" icon={faStar} />
      <FontAwesomeIcon onClick={() => changeRate(2)} className="test" icon={faStar} />
      <FontAwesomeIcon onClick={() => changeRate(3)} className="test" icon={faStar} />
      <FontAwesomeIcon onClick={() => changeRate(4)} className="test" icon={faStar} />
      <FontAwesomeIcon onClick={() => changeRate(5)} className="test" icon={faStar} />
    </div>
   );
}



export default Rating;
