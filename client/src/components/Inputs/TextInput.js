import React from 'react';

const TextInput = (props) => (
    <div className="form-group">
        <label>{props.name}</label>
        <input type="text" name={props.name} value={props.value}
               onChange={props.inputHandler}
               className="form-control"/>
    </div>
);

export default TextInput;