import React from 'react';

const ButtonSelectInput = (props) => {

    return(
        props.options.map( (key, index)=> (
            <button  key={key + index} type="button" name={props.name} value={key} onClick={props.inputHandler} className="btn btn-secondary ml-4">{key}</button>
        ))
    )
};

export default ButtonSelectInput;
