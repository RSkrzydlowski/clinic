import React, {useState} from 'react';
import './commentSection.scss';

const CommentSection = () => {
  const [comment, setComment] = useState('');


  return (
    <div className="comment_section">
      <textarea onChange={(e) => setComment(e.target.value)} placeholder="Dodaj komentarz..." className="comment_textarea" />
      <button onClick={() => console.log(comment)}>Dodaj</button>
    </div>
   );
}

export default CommentSection;
