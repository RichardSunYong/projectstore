import logo from './logo.svg';
import './App.css';
import Themeswitcher from './Themeswitcher'

import React, { Component } from "react";
import axios from 'axios';


///React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicExample from './bootstrapcomponent'

//////////////////////////////////////////////////
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class App extends Component {



//// Jessy Put Values Here ///
    constructor (props){
        super (props);
        this.state={
            arraystore : [],
            textstore : 'default item, did not import from django',
            htmlstore: 'lorem <b>ipsum</b>',
            loading: true
        };
    }

//////////////////////////////////////////////////


///////////Richard Handles API Call Here/////////////

    componentDidMount() {
        this.getrespond();
    }

    getrespond = () => {
        axios.get("https://richardsunyong.pythonanywhere.com/newppl/events/1")
        .then(response => {
            this.setState({arraystore: response.data}, this.setState({loading: false}));
            this.setState({textstore: response.data.title});
            this.setState({htmlstore: response.data.content})
        })
        .catch(err => console.log (err));
        return "complete!";
    }


/////////////////////////////////////////////////////


    render(){

        if (this.state.loading == true) {

            return (
                <div>

                <h1>LOADING! - jassi was here</h1>

                <button type="button" className="btn btn-primary">Primary</button>
                <BasicExample />

                </div>
                );


        }else{

        return (
            <div>
            <h1>TESTING 2nd Feb</h1>
            <h2>Factor 2: {this.state.textstore}</h2>
            <h2>Factor 3: {this.state.arraystore.eventphoto}</h2>
            <img src = {this.state.arraystore.eventphoto}/>
            <h2>Factor 4: {JSON.stringify(this.state.arraystore)}</h2>

                <div dangerouslySetInnerHTML= {{__html: this.state.htmlstore}}/>

            </div>
            );

        }
    }
}


export default App;
