import React from 'react';
import './commentElement.scss';

const CommentElement = (props) => {
  return (
    <div>
      <div className="comment_paragraph">
        <p>{props.user}</p>
        <p>{props.date}</p>
      </div>
      <div className="comment_element_block">
        <p>{props.comment}</p>
      </div>
    </div>
   );
}

export default CommentElement;
