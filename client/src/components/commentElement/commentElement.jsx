import React from 'react';
import './commentElement.scss';
import { Rating } from '../'

const CommentElement = (props) => {
  return (
    <div className="comment_element_block">
      <div className="comment_paragraph">
        <p>{props.user}</p>
        <p>{props.date}</p>
        <Rating rate={props.rate} commentType="ratings" />
      </div>
      <div className="comment_text">
        <p>{props.comment}</p>
      </div>
    </div>
   );
}

export default CommentElement;
