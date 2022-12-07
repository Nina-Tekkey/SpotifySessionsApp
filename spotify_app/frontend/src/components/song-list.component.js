import React, { Component } from 'react';
import { Link } from "react-router-dom";
import App from '../App' 
import { Container, Form } from "react-bootstrap"


import axios from 'axios';

export default class SongList extends Component {


constructor(props) {
        super(props);


        this.onChangeSessionName=this.onChangeSessionName.bind(this);


        this.state = {
            sessionName: "",
           
        }

    }

 

    
    onChangeSessionName(e){
      this.setState({
          sessionName : e.target.value
      });
  }

    

   













   onSubmit(e) {
    
    console.log(this.sessionName);
      }






       handleChange(e) {
        this.sessionName = e.target.value;
      };





  render() {
    return (
          <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
          <Form.Control
          type="text"
          placeholder="Start Session"
          value={"knee"}
          onChange={e => this.handleChange(e.target.value)}
        />
        <button onClick={this.onSubmit()}>Start Sesstion</button>
         <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
              Songs
          </div>
        </Container>
        )
  }
}



