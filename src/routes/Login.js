import React, { useState } from "react";
import { Input,Row, Col, Divider, Button } from "antd";
import axios from "axios";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import { useHistory } from "react-router-dom";
import "./route.css";
import { notification } from "antd";
import {Login,Sign} from '../store';

function LoginComponent(props) {
  const [type, setType] = useState("In");
  const history=useHistory();
  const onClick = async(incomeType) => {
    const { REACT_APP_API,REACT_APP_TOKEN } = process.env;
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    
    if (type === "In" && incomeType === "In") {
       const res=await props.Login(email.value,password.value)
       if(res){
         history.push('/music')
       }

    } else if (type === "Up" && incomeType === "Up") {
      const res=await props.Sign(email.value,password.value)
      if(res){
        history.push('/music')
      }
    } else {
      email.setAttribute("value","")
      type === "In" ? setType("Up") : setType("In");
    }
  };
  return (
    <div>
      <Row>
        <Col md={10} className="login-ui" />
        <Col md={14}>
          <div className="login-card">
            <h1>Sign {type}</h1>
            <div className="login">
              <Input
                size="large"
                id="email"
                className="login-input"
                placeholder="Email"
              />
              <Input
                size="large"
                id="password"
                className="login-input"
                placeholder="Password"
              />
              <br />
              <Button
                className="login-btn"
                size="large"
                onClick={() => onClick("In")}
              >
                Sign In
              </Button>
              <Button
                className="login-btn"
                size="large"
                onClick={() => onClick("Up")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps=state=>{
  return {login:state.login}
}
const mapDispatchToProps=dispatch=>{
  return bindActionCreators({Login,Sign},dispatch)
}




export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);
