import React from 'react';
import './formElement.scss';

const FormElement = (props) => {
  return (
    <div className="form_element_block">
      <p>{props.text}</p>
      <input onChange={props.onChange} type={props.type} />
    </div>
   );
}

export default FormElement;
