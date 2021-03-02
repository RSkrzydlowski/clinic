import React, {useState} from 'react';
import './addCommentSection.scss';
import { SERVER_URL } from '../../data/constant'
import Rating from '../rating'
import { Button } from '../../components'

const AddCommentSection = (props) => {
  const doctorId = props.doctorId
  const patientId = props.patientId
  const [style, setStyle] = useState('ratings_add');
  const [comment, setComment] = useState('');
  const [commentStatus, setCommentStatus] = useState('');
  const [rate, setRate] = useState(0);
  const [value, setValue] = useState('');

  const addComment = () => {
    const url = `${SERVER_URL}/api/comments/add`
    if(comment || rate) {
      fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment,
          doctorId,
          patientId,
          rate
        })
      }).then(async res => {
        const { success, error } = await res.json();
        if (!success) {
          alert(error);
        } else {
          props.changeCounter()
          setComment('')
        }
      })
    }
  }

  const changeRate = (rate) => {
    setCommentStatus('added')
    setRate(rate)
  }

  return (
    <div className="add_comment_section">
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Dodaj komentarz..." className="comment_textarea" />
      <Button onClick={addComment} text="Dodaj" />
      <Rating commentStatus={commentStatus} commentType={style} changeRate={changeRate} />
    </div>
   );
}

export default AddCommentSection;
