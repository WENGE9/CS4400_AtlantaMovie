import React, {Component} from "react";
import {Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {ENDPOINTS} from "./Constants";


export class UserOnly_reg extends Component {
    constructor(props){
        super(props);
        this.props = props;
        this.state={
            Fname:'',
            Lname:'',
            username:'',
            password:'',
            confirmPassword:''
        };

        this.First_name = this.First_name.bind(this);
        this.Last_name = this.Last_name.bind(this);
        this.UserName = this.UserName.bind(this);
        this.Psw = this.Psw.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this);
        this.recordReg = this.recordReg.bind(this);

    };


    recordReg(e){

        const args = {
            Fname: this.state.Fname,
            Lname: this.state.Lname,
            username : this.state.username,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword
        }
        let query = Object.keys(args)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(args[k]))
            .join('&');
        let url = ENDPOINTS.USER_REG + '?' + query;
        window.location.href = url;
        // fetch(url).then(()=>{}, ()=>{});
    }


    First_name(event) {
        this.setState({ Fname: event.target.value }, () => console.log('first name', this.state.Fname));
        // this.setState({Fname: event.target.value});
    }

    Last_name(event) {
        this.setState({ Lname: event.target.value }, () => console.log('last name', this.state.Lname));
        // this.setState({Lname: event.target.value});
    }

    UserName(event) {
        this.setState({ username: event.target.value }, () => console.log('username', this.state.username));
        // this.setState({username: event.target.value});
    }

    Psw(event){
        this.setState({ password: event.target.value }, () => console.log('password', this.state.password));
        // this.setState({password:event.target.value});
        // console.log(this.state.password);
    }

    confirmPassword(event){
        this.setState({ confirmPassword: event.target.value }, () => console.log('confirmPassword password', this.state.confirmPassword));
        // this.setState({confirmPassword:event.target.value});
    }





    render(){
        return (
            <div>
                <h1 className={"text-center"}>
                    User Registration
                </h1>
                <Form>
                    <Form.Row className={"p-2"}>
                      <Form.Group as={Col} controlId="Fname" className={"form-inline"} md={{span:4,}}>
                          <Form.Label className={"p-4"}>First name</Form.Label>
                          <Form.Control  className={"w-50 m-2"} value={this.state.Fname} onChange={this.First_name}/>
                      </Form.Group>
                      <Form.Group as={Col} controlId="Lname" className={"form-inline"} md={{span:4,offset:2}}>
                          <Form.Label className={"p-4"}>Last name</Form.Label>
                          <Form.Control  className={"w-50 m-2"} value={this.state.Lname} onChange={this.Last_name}/>
                      </Form.Group>
                    </Form.Row>

                    <Form.Row className={"p-2"}>
                        <Form.Group as={Col} controlId="userName" className={"form-inline"} md={{span:4,}}>
                            <Form.Label className={"p-4"}>Username</Form.Label>
                            <Form.Control className={"w-50 m-2"} value={this.state.username} onChange={this.UserName}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className={"p-2"}>
                        <Form.Group as={Col} controlId="psw" className={"form-inline"} md={{span:4,}}>
                          <Form.Label className={"p-4"}>Password</Form.Label>
                          <Form.Control placeholder="at least 8 characters" className={"w-200 m-2"} value={this.state.password} onChange={this.Psw}/>
                      </Form.Group>

                      <Form.Group as={Col} controlId="confirmpsw" className={"form-inline"} md={{span:4,offset:2}}>
                          <Form.Label className={"p-2"}>Confirm Password</Form.Label>
                          <Form.Control placeholder="enter same password" className={"w-200 m-2"} value={this.state.confirmPassword} onChange={this.confirmPassword}/>
                      </Form.Group>
                    </Form.Row>


                     <Form.Row className={"p-2"}>
                         <Col  md={{span:2, offset:2}} className={"text-center"}>
                              <Link to={"/login"}>
                                  <Button variant={"primary"} size={"lg"} className={"w-150"}>
                                      Back
                                  </Button>
                              </Link>
                         </Col>
                         <Col md={{span:2, offset:3}} className={"text-center"}>
                             <Link to={""}>
                                 <Button variant={"primary"} size={"lg"} className={"w-150"} onClick={this.recordReg}>
                                     Register
                                 </Button>
                             </Link>
                         </Col>
                     </Form.Row>
                </Form>
            </div>

        )
    }
}

