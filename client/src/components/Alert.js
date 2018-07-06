import React from "react";

const Alert = (props) => (
<div id="alert"className={props.showAlert ? ("show") : ("")}>
    <div className="alert alert-success">
        {props.alertMessage}
    </div>
</div>
);

export default Alert;
