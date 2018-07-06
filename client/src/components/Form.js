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
            dir: "Demo",
            currModule: undefined,
            currModuleInput: "text",
            filter: undefined,
            //Error Check and misc.
            showAlert: false,
            alertMessage: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDynamicFormInputChange = this.handleDynamicFormInputChange.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
    }
    componentDidMount(){
        //initializes the state variables of each module from modules.json
        this.initializeJSON(moduleData);
    }

    initializeJSON(fileName){
        Object.keys(fileName).forEach((key) => {
            const moduleName = key;
            const input = fileName[moduleName];
            const text = input["text"];
            const textarea = input["textarea"];
            const file = input["file"];
            const select = input["select"];
            let tempModule = {};

            (text) && Object.keys(text).forEach((key) => {
                tempModule[key] = text[key];
            });
            (textarea) && Object.keys(textarea).forEach((key) => {
                tempModule[key] = textarea[key];
            });
            (file) && Object.keys(file).forEach((key) => {
                tempModule[key] = file[key];
            });
            (select) && Object.keys(select).forEach((key) => {
                tempModule[key] = "";
            });
            this.setState({
                [moduleName]: tempModule
            });
        });
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

    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
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
        const {currModule,currModuleInput} = this.state;
        const moduleStateObject = this.state[currModule];
        const moduleJSONObject = moduleData[currModule];
        // console.log(this.state);

        // let dynamicModuleForm = this.createDynamicModuleForm();

        return (
        <div className="pt-5">
            <Alert showAlert={this.state.showAlert} alertMessage={this.state.alertMessage}/>
            <form>

                <div className="row">
                    <div className="col">
                        <TextInput name="dir" value={this.state.dir} inputHandler={this.handleInputChange}/>
                    </div>
                    <div className="col">
                        <SelectInput name="filter"  options={['pre','body','post']} inputHandler={this.handleInputChange} initialValueTitle="None"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <SelectInput name='currModule' options={Object.keys(moduleData)} inputHandler={this.handleInputChange}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                        {this.state[currModule] &&  <ButtonSelectInput name="currModuleInput"
                                                                        options={Object.keys(moduleData[currModule])}
                                                                        inputHandler={this.handleInputChange}/>}
                        </div>
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
                        </div>
                    </div>
                </div>

            </form>
        </div>
        );
    }
}

export default Form;



