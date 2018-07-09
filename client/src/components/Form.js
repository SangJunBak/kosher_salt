import React from 'react';
import Alert from './Alert.js';
import moduleData from '../json/modules.json';
import axios from 'axios/index';
import DynamicForm from './DynamicForm';
import TextInput from './Inputs/TextInput';
import SelectInput from "./Inputs/SelectInput";
import ButtonSelectInput from "./Inputs/ButtonSelectInput";
import NormalButton from "./Buttons/NormalButton";


class Form extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            stage: 'initStage',
            dir: "",
            currModule: undefined,
            currModuleInput: "text",
            filter: 'none',
            //Error Check and misc.
            showAlert: false,
            alertMessage: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCurrentModuleChange = this.handleCurrentModuleChange.bind(this);
        this.handleDynamicFormInputChange = this.handleDynamicFormInputChange.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
    }
    componentDidMount(){
        //initializes the state variables of each module from modules.json
        this.initializeJSON(moduleData);
    }

    initializeJSON(fileName){
        for(let moduleName in fileName) {
            const moduleJSONObject = fileName[moduleName];
            let text = moduleJSONObject["text"];
            const textarea = moduleJSONObject["textarea"];
            const file = moduleJSONObject["file"];
            const select = moduleJSONObject["select"];
            let tempModule = {};

            for (let property in text) {
                tempModule[property] = text[property];
            }

            for (let property in textarea) {
                tempModule[property] = textarea[property];
            }

            for (let property in file) {
                tempModule[property] = file[property];
            }

            for (let property in select) {
                tempModule[property] = "";
            }
            this.setState({
                [moduleName]: tempModule
            });
        }
    }

    handleShowAlert(alertMessage){
        this.setState({ showAlert: true, alertMessage: alertMessage});
        setTimeout(() => {
            this.setState({showAlert: false});
        }, 800);
    };


    //Handlers binded to inputs
    handleAddModule = ()=> {
        if(this.state.currModule && this.state.currModule !== 'globals'){
            axios.post(`/addModule`, this.state)
                .then(res => {
                    this.handleShowAlert("Module Added");
                });
        }
    };

    handleUndoModule = ()=> {
        axios.post(`/undoModule`, this.state)
            .then(res => {
                this.handleShowAlert("Undo Successful");
            });
    };
    handleUpdateFile = ()=> {
        axios.post(`/updateFile`, this.state)
            .then(res => {
                this.handleShowAlert("File Updated");
            })
            .then(()=> {
                this.setState({
                    stage: "defaultStage"
                });
            });
    };

    handleClearAllModuleData = ()=> {

        axios.post(`/clearAllModuleData`, this.state)
            .then(res => {
                this.handleShowAlert("All Module Data Cleared");
            })
        .then(()=> {
            this.setState({
                stage: "initStage"
            });
        });
    };

    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleCurrentModuleChange(e){
        this.handleInputChange(e);
        const currModule = e.target.value;
        const moduleJSONObject = moduleData[currModule];

        if(moduleJSONObject) {
            const firstAvailableInput = Object.keys(moduleJSONObject)[0];
            this.setState({
                "currModuleInput": firstAvailableInput
            });
        }
    }

    handleDynamicFormInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const currModule = this.state.currModule;
        this.setState({
            [currModule] : {
                ...this.state[currModule],
                [name] : value
            }
        });
    }
    //Renders the entire page every time a state changes.
    render() {
        const {currModule,currModuleInput,filter} = this.state;
        const moduleStateObject = this.state[currModule];
        const moduleJSONObject = moduleData[currModule];
        // console.log(this.state);

        // let dynamicModuleForm = this.createDynamicModuleForm();

        return (
        <div className="pt-5">
            <Alert showAlert={this.state.showAlert} alertMessage={this.state.alertMessage}/>
            <form>

                <div className="row">
                    <div className="col-sm-12 col-md">
                        <TextInput name="dir" value={this.state.dir} inputHandler={this.handleInputChange}/>
                    </div>
                    <div className="col-sm-12 col-md ">
                        <ButtonSelectInput
                            name="filter"
                            options={['none','pre','body','post']}
                            inputHandler={this.handleInputChange}
                            selectedValue={filter}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md">
                        <SelectInput
                            name='currModule'
                            options={Object.keys(moduleData)}
                            inputHandler={this.handleCurrentModuleChange}/>
                    </div>
                    <div className="col-sm-12 col-md">
                        {this.state[currModule] &&  <ButtonSelectInput name="currModuleInput"
                                                                       options={Object.keys(moduleData[currModule])}
                                                                       inputHandler={this.handleInputChange}
                                                                       selectedValue={currModuleInput}
                        />}
                    </div>
                </div>

                <div className="row">
                {currModuleInput && <DynamicForm currModule={currModule}
                                                 currModuleInput={currModuleInput}
                                                 moduleJSONObject={moduleJSONObject}
                                                 moduleStateObject={moduleStateObject}
                                                inputHandler = {this.handleDynamicFormInputChange}
                />}
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <NormalButton buttonHandler={this.handleAddModule} type="primary">Add</NormalButton>
                            <NormalButton buttonHandler={this.handleUndoModule} type="warning">Undo</NormalButton>
                            <NormalButton buttonHandler={this.handleUpdateFile} type="primary">Update</NormalButton>
                            <NormalButton buttonHandler={this.handleClearAllModuleData} type="warning">Clear All Module Data</NormalButton>
                        </div>
                    </div>
                </div>

            </form>
        </div>
        );
    }
}

export default Form;



