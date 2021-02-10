import React from 'react';
import './commentElement.scss';

const CommentElement = (props) => {
  return (
    <div>
      <div className="comment_paragraph">
        <p>{props.user}</p>
        <p>{props.date}</p>
      </div>
      <p>{props.comment}</p>
    </div>
   );
}

export default CommentElement;
