import React from 'react';

const TextAreaInput = (props) => (
    <div className="form-group">
        <label>{props.name}</label>
        <textarea name={props.name} value={props.value}
                  onChange={props.inputHandler}
                  className="form-control" rows="10"/>
    </div>
);

export default TextAreaInput;