import React, {useState} from 'react';
import './commentSection.scss';
import { APP_URL } from '../../data/constant'

const CommentSection = (props) => {
  const doctorId = props.doctorId
  const patientId = props.patientId
  const [comment, setComment] = useState('');

  const addComment = () => {
    const url = `${APP_URL}/api/comments/add`
    if(comment) {
      fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment,
          doctorId,
          patientId
        })
      }).then(async res => {
        const { success, error } = await res.json();
        if (!success) {
          alert(error);
        } else {
          setComment('')
        }
      })
    }
  }

  return (
    <div className="comment_section">
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Dodaj komentarz..." className="comment_textarea" />
      <button onClick={addComment}>Dodaj</button>
    </div>
   );
}

export default CommentSection;
