import React from 'react';

const FileInput = (props) => (
    <div className="form-group">
        <label>{props.name}</label>
        <input type="file" name={props.name}
               onChange={props.inputHandler}
               className="form-control"/>
    </div>
);

export default FileInput;
