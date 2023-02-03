import logo from './logo.svg';
import './App.css';
import Themeswitcher from './Themeswitcher'

import React, { Component } from "react";
import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class App extends Component {

    constructor (props){
        super (props);
        this.state={
            arraystore : [],
            textstore : 'default item, did not import from django',
            loading: true
        };
    }

    componentDidMount() {
        this.getrespond();
    }

    getrespond = () => {
        axios.get("https://richardsunyong.pythonanywhere.com/newppl/events/1")
        .then(response => {
            this.setState({arraystore: response.data}, this.setState({loading: false}));
            this.setState({textstore: response.data.title});
        })
        .catch(err => console.log (err));
        return "complete!";
    }


    render(){

        if (this.state.loading == true) {

            return (
                <div>

                <h1>LOADING!</h1>

                </div>

                );


        }else{

        return (
            <div>
            <h1>TESTING Github</h1>
            <h2>Factor 2: {this.state.textstore}</h2>
            <h2>Factor 3: {this.state.arraystore.eventphoto}</h2>
            <img src = {this.state.arraystore.eventphoto}/>
            <h2>Factor 4: {JSON.stringify(this.state.arraystore)}</h2>
            </div>
            );

        }
    }
}


export default App;
