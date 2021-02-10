import React, {useState} from 'react';
import './addCommentSection.scss';
import { APP_URL } from '../../data/constant'
import Rating from '../rating'

const AddCommentSection = (props) => {
  const doctorId = props.doctorId
  const patientId = props.patientId
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(0);
  const [value, setValue] = useState('');

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
          props.changeCounter()
          setComment('')
        }
      })
    }
  }

  const changeRate = (rate) => {
    console.log(rate)
    // setRate(rate)
  }

  console.log("rate", rate)

  return (
    <div className="add_comment_section">
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Dodaj komentarz..." className="comment_textarea" />
      <button onClick={addComment}>Dodaj</button>
      <Rating changeRate={changeRate} />
    </div>
   );
}

export default AddCommentSection;
