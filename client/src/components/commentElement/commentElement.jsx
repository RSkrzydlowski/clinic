import React from 'react';
import './commentElement.scss';

const CommentElement = (props) => {
  return (
    <div>
      <p>{props.user}</p>
      <p>{props.date}</p>
      <p>{props.comment}</p>
    </div>
   );
}

export default CommentElement;
