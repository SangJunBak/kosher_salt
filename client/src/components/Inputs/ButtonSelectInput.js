import React from 'react';

const ButtonSelectInput = (props) => {

    const options = props.options.map( (key, index)=> {
        let className;
        let selectedClassName = `btn btn-primary ml-4`;
        (props.selectedValue === key) ? className = selectedClassName : className = `btn btn-secondary ml-4`;
        return (
            <button
                key={key + index}
                type="button"
                name={props.name}
                value={key}
                onClick={props.inputHandler}
                className={className}>
                {key}
            </button>
        )
    });

    return(
        <div className="form-group">
            <div className="row">
                <div className="col">
                    <label>{props.name}</label>
                </div>
            </div>
            <div className="row">
                {options}
            </div>
        </div>
    )
};

export default ButtonSelectInput;
