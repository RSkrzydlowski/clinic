import React, {useState, useEffect} from 'react';
import { VISIT_HOURS} from '../../data/constant'



const VisitPage = () => {
  const [visitHour, setVisitHour] = useState('');

  const items = VISIT_HOURS.map((data) =>
  (
  <option
    key={data}
    value={data}
  >{data}</option>
  ))

  return (
    <div>
      <p>visit</p>
      <select onChange={(e) => setVisitHour(e.target.value)} value={visitHour}>
        {items}
      </select>
    </div>
   );
}

export default VisitPage;
