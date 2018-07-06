import React from 'react';

const SelectInput = (props) => {
    const options = props.options.map((key, index) =>
        <option key ={key+index} value={key}>{key}</option>
    );

    let initialValueTitle = "Select An Option";
    let defaultValue = "";
    (props.initialValueTitle) && (initialValueTitle = props.initialValueTitle);
    (props.defaultValue) && (defaultValue = props.defaultValue);

    return (
        <div className="form-group">
            <label>{props.name}</label>
            <select name ={props.name} defaultValue={defaultValue} onChange={props.inputHandler} className="form-control">
                <option value="">{initialValueTitle}</option>
                {options}
            </select>
        </div>
    );
};

export default SelectInput;
