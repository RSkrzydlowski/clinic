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

  return props.commentType === 'ratings' ? props.rate > 0 ? (
    <div className="ratings">
      <FontAwesomeIcon className={props.rate < 1 ? "rating_less" : "rating_more"} icon={faStar} />
      <FontAwesomeIcon className={props.rate < 2 ? "rating_less" : "rating_more"} icon={faStar} />
      <FontAwesomeIcon className={props.rate < 3 ? "rating_less" : "rating_more"} icon={faStar} />
      <FontAwesomeIcon className={props.rate < 4 ? "rating_less" : "rating_more"} icon={faStar} />
      <FontAwesomeIcon className={props.rate < 5 ? "rating_less" : "rating_more"} icon={faStar} />
    </div>
   ) : null : props.commentStatus === 'added' ? (
    <div className="ratings_add">
     <FontAwesomeIcon className={rate < 1 ? "rating_less" : "rating_more"} onClick={() => changeRate(1)} icon={faStar} />
     <FontAwesomeIcon className={rate < 2 ? "rating_less" : "rating_more"} onClick={() => changeRate(2)} icon={faStar} />
     <FontAwesomeIcon className={rate < 3 ? "rating_less" : "rating_more"} onClick={() => changeRate(3)} icon={faStar} />
     <FontAwesomeIcon className={rate < 4 ? "rating_less" : "rating_more"} onClick={() => changeRate(4)} icon={faStar} />
     <FontAwesomeIcon className={rate < 5 ? "rating_less" : "rating_more"} onClick={() => changeRate(5)} icon={faStar} />
   </div>
   ) : (
   <div className="ratings_add">
    <FontAwesomeIcon className="no_rate" onClick={() => changeRate(1)} icon={faStar} />
    <FontAwesomeIcon className="no_rate" onClick={() => changeRate(2)} icon={faStar} />
    <FontAwesomeIcon className="no_rate" onClick={() => changeRate(3)} icon={faStar} />
    <FontAwesomeIcon className="no_rate" onClick={() => changeRate(4)} icon={faStar} />
    <FontAwesomeIcon className="no_rate" onClick={() => changeRate(5)} icon={faStar} />
  </div>
  );
}



export default Rating;
