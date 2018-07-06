import React from 'react';
import TextInput from './Inputs/TextInput';
import TextAreaInput from "./Inputs/TextAreaInput";
import SelectInput from "./Inputs/SelectInput";
import FileInput from "./Inputs/FileInput";

const DynamicForm = (props) => {
    const {currModule, currModuleInput, moduleJSONObject, moduleStateObject, inputHandler} = props;
    let dynamicInputs = [];
    if(currModule && currModuleInput){

        Object.keys(moduleJSONObject).forEach((inputName)=> {
            let inputObject = moduleJSONObject[inputName];

            if (currModuleInput === inputName) {

                if(currModuleInput === "file"){
                    dynamicInputs = Object.keys(inputObject).map((property) =>
                        <div key={inputName + property} className="col-6">
                            <FileInput name={property} inputHandler={inputHandler}/>
                        </div>
                    );
                }else if(currModuleInput === "select"){
                    dynamicInputs = Object.keys(inputObject).map((property) =>{
                        let propertyArray = inputObject[property];
                        return (
                            <div key={inputName + property} className="col-6">
                                <SelectInput name={property} defaultValue = {moduleStateObject[property]} inputHandler={inputHandler} options={propertyArray}/>
                            </div>
                        );
                    });
                }else if(currModuleInput === "text"){
                    dynamicInputs = Object.keys(inputObject).map((property) =>
                        <div key={inputName + property} className="col-6">
                            <TextInput name={property} value={moduleStateObject[property]} inputHandler = {inputHandler}/>
                        </div>
                    );
                }else if(currModuleInput === "textarea"){
                    dynamicInputs = Object.keys(inputObject).map((property) =>
                        <div key={inputName + property} className="col-6">
                            <TextAreaInput name={property} value={moduleStateObject[property]} inputHandler={inputHandler}/>
                        </div>
                    );
                }else {
                    dynamicInputs = undefined;
                }
            }
        });
    }

    return dynamicInputs;

};

export default DynamicForm;
