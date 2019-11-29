import React, {Component} from "react";
import {Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {ENDPOINTS} from "./Constants";


export class ManagerOnlyReg extends Component {
    constructor(props){
        super(props);
        this.state={
            Fname:'',
            Lname:'',
            username:'',
            company:'',
            comNameOptions: [],
            password:'',
            confirmPassword:'',
            StreetAddress:'',
            city:'',
            state:'',
            zipcode:''

        }
        this.First_name = this.First_name.bind(this);
        this.Last_name = this.Last_name.bind(this);
        this.UserName = this.UserName.bind(this);
        this.addcompany=this.addcompany.bind(this);
        this.Psw = this.Psw.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this);
        this.address = this.address.bind(this);
        this.addcity = this.addcity.bind(this);
        this.addstate = this.addstate.bind(this);
        this.addzipcode= this.addzipcode.bind(this);
        this.getCompany = this.getCompany.bind(this);
        this.getReg = this.getReg.bind(this);

    };
    componentDidMount() {
        this.getCompany();
    }
    getCompany() {
        let url = ENDPOINTS.OBTAIN_COMPANY;
        fetch(url).then(res => res.json()).then((result)=>{
        this.setState({comNameOptions: result, company: result[0].comName})},
            (error)=>{});
    }
    First_name(event) {
        this.setState({Fname: event.target.value},()=>console.log('first name',this.state.Fname));
    }

    Last_name(event) {
        this.setState({Lname: event.target.value},()=>console.log('last name',this.state.Lname));
    }

    UserName(event) {
        this.setState({username: event.target.value},()=>console.log('username',this.state.username));
    }

    addcompany(event){
        this.setState({company:event.target.value},()=>console.log('company',this.state.company));
    }

    Psw(event){
        this.setState({password:event.target.value},()=>console.log('password',this.state.password));
    }

    confirmPassword(event){
        this.setState({confirmPassword:event.target.value});
    }

    address(event){
        this.setState({StreetAddress:event.target.value},()=>console.log('address',this.state.StreetAddress));
    }

    addcity(event){
        this.setState({city:event.target.value},()=>console.log('city',this.state.city));
    }

    addstate(event){
        this.setState({state:event.target.value},()=>console.log('state',this.state.state));
    }

    addzipcode(event){
        this.setState({zipcode:event.target.value},()=>console.log(('zipcode',this.state.zipcode)));
    }



    getReg(e){
        e.preventDefault();
        console.log(this.state.Fname);
        console.log(this.state.Lname);
        console.log(this.state.username);
        console.log(this.state.password);
        console.log(this.state.StreetAddress);
        console.log(this.state.state);

        const args = {
            Fname:this.state.Fname,
            Lname:this.state.Lname,
            username : this.state.username,
            password : this.state.password,
            StreetAddress:this.state.StreetAddress,
            city:this.state.city,
            state:this.state.state,
            zipcode:this.state.zipcode,
            company:this.state.company,
            confirmPassword:this.state.confirmPassword
        }
        let query = Object.keys(args)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(args[k]))
            .join('&');
        let url = ENDPOINTS.MANAGER_ONLY_REG + '?' + query;
        window.location.href = url;
        // fetch(url).then(()=>{}, ()=>{});
    }









    render(){
        return (
            <div>
                <h1 className={"text-center"}>
                    Manager-Only Registration
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
                      <Form.Group as={Col} controlId="Username" className={"form-inline"} md={{span:4,}}>
                          <Form.Label className={"p-4"}>Username</Form.Label>
                          <Form.Control  className={"w-50 m-2"} value={this.state.username} onChange={this.UserName}/>
                      </Form.Group>


                      <Form.Group as={Col} controlId="companyName" className={"form-inline"} md={{span:4,offset:2}}>
                          <Form.Label className={"p-4"}>Company</Form.Label>
                          <Form.Control as="select" className={"w-25 m-2"} value={this.state.company} onChange={this.addcompany}>
                              {this.state.comNameOptions.map((company, index) => (<option value={company.comName} key={index}>{company.comName}</option>))}
                          </Form.Control>
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
                        <Form.Group as={Col} controlId="address" className={"form-inline"} md={{span:6,}}>
                            <Form.Label className={"p-4"}>Street Address</Form.Label>
                            <Form.Control className={"w-100 m-2"} value={this.state.StreetAddress} onChange={this.address}/>
                        </Form.Group>
                    </Form.Row>


                    <Form.Row className={"p-2"}>
                        <Form.Group as={Col} controlId="city" className={"form-inline"} md={{span:1}} >
                            <Form.Label className={"p-4"}>City</Form.Label>
                            <Form.Control  className={"w-50 m-2"} value={this.state.city} onChange={this.addcity}/>
                        </Form.Group>


                        <Form.Group as={Col} controlId="state" className={"form-inline"} md={{span:1,offset:1}}>
                            <Form.Label className={"p-4"}>State</Form.Label>
                            <Form.Control as="select" className={"w-50 m-2"} value={this.state.state} onChange={this.addstate}>
                                <option value="AL">AL</option>
                                <option value="AK">AK</option>
                                <option value="AZ">AZ</option>
                                <option value="AR">AR</option>
                                <option value="CA">CA</option>
                                <option value="CO">CO</option>
                                <option value="CT">CT</option>
                                <option value="DE">DE</option>
                                <option value="DC">DC</option>
                                <option value="FL">FL</option>
                                <option value="GA">GA</option>
                                <option value="HI">HI</option>
                                <option value="ID">ID</option>
                                <option value="IL">IL</option>
                                <option value="IN">IN</option>
                                <option value="IA">IA</option>
                                <option value="KS">KS</option>
                                <option value="KY">KY</option>
                                <option value="LA">LA</option>
                                <option value="ME">ME</option>
                                <option value="MD">MD</option>
                                <option value="MA">MA</option>
                                <option value="MI">MI</option>
                                <option value="MN">MN</option>
                                <option value="MS">MS</option>
                                <option value="MO">MO</option>
                                <option value="MT">MT</option>
                                <option value="NE">NE</option>
                                <option value="NV">NV</option>
                                <option value="NH">NH</option>
                                <option value="NJ">NJ</option>
                                <option value="NM">NM</option>
                                <option value="NY">NY</option>
                                <option value="NC">NC</option>
                                <option value="ND">ND</option>
                                <option value="OH">OH</option>
                                <option value="OK">OK</option>
                                <option value="OR">OR</option>
                                <option value="PA">PA</option>
                                <option value="RI">RI</option>
                                <option value="SC">SC</option>
                                <option value="SD">SD</option>
                                <option value="TN">TN</option>
                                <option value="TX">TX</option>
                                <option value="UT">UT</option>
                                <option value="VT">VT</option>
                                <option value="VA">VA</option>
                                <option value="WA">WA</option>
                                <option value="WV">WV</option>
                                <option value="WI">WI</option>
                                <option value="WY">WY</option>

                            </Form.Control>
                        </Form.Group>

                         <Form.Group as={Col} controlId="zipcode" className={"form-inline"} md={{span:1,offset:3}}>
                             <Form.Label className={"p-4"}>Zipcode</Form.Label>
                             <Form.Control  className={"w-50 m-2"} value={this.state.zipcode} onChange={this.addzipcode}/>
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
                                 <Button variant={"primary"} size={"lg"} className={"w-150"} onClick={this.getReg}>
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

