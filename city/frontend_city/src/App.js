import './App.css';
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
            textstore2: 'second item default',
            snippetstore : [],
            textstore3: 'third item default',
            teststore4: 'fourth item default',
            teststore5: 'fifth item default',
            loading: true
        };
    }

    componentDidMount() {
        this.getrespond();
        this.getsnippet();
    }

    getrespond = () => {
        axios.get("https://richardsunyong.pythonanywhere.com/city/respond")
        .then(response => {
            this.setState({arraystore: response.data});
            this.setState({textstore: response.data.a});
        })
        .catch(err => console.log (err));
        return "complete!";
    }

    getsnippet = () => {
        axios.get("https://richardsunyong.pythonanywhere.com/city/classsnippets/")
        .then(response => {
            this.setState({snippetstore: response.data});
            this.setState({textstore3: response.data[1].code}, this.setState({loading: false}));
        })
        .catch(err => console.log (err));
        return "complete!";
    }

    submit = () => {

        axios.post('https://richardsunyong.pythonanywhere.com/city/classsnippets/', {
            "title": "",
            "code": "Second Test",
            "linenos": false,
            "language": "python",
            "style": "friendly"

        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },

        })
        .then(function (response){
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            });


        this.setState({textstore3: 'Button was Pressed'});
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
            <h1>TESTING A</h1>
            <h2>Factor 1: {this.state.arraystore.b}</h2>
            <h2>Factor 2: {this.state.textstore}</h2>
            <h2>Factor 3: {this.state.textstore2}</h2>
            <h2>Text 3: {this.state.textstore3}</h2>
            <h2>Text 4: {this.state.teststore4}</h2>
            <h2>Text 5: {this.state.teststore5}</h2>
            <h2>Factor 4: {this.state.snippetstore[1].code}</h2>
            <h2>Factor 4: {JSON.stringify(this.state.snippetstore[1])}</h2>
            <h2>Factor 4: {JSON.stringify(this.state.snippetstore)}</h2>
            <button onClick = {this.submit}>
                Submit me!
            </button>

            </div>
            );

        }
    }
}

export default App;
