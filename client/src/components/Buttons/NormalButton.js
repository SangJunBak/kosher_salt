import React from 'react';

const NormalButton = (props) => (
    <button type="button" onClick={props.buttonHandler} className={"btn btn-"+props.type+" ml-4"}>
        {props.children}
    </button>
);

export default NormalButton;
