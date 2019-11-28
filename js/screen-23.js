import React, {Component} from "react";
import {Col, Container, Row, Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import {ENDPOINTS} from "./Constants";

export class UserVisitHistory extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            usertype: '',
            username: '',
            comName: 'ALL',
            visitStartDate: '',
            visitEndDate: '',
            comNameOptions: [],
            visitList: []
        };
        this.changeCompanyName = this.changeCompanyName.bind(this);
        this.submitFilter = this.submitFilter.bind(this);
        this.setVisitStartDate = this.setVisitStartDate.bind(this);
        this.setVisitEndDate = this.setVisitEndDate.bind(this);
        this.backToFunc = this.backToFunc.bind(this);
    }
    componentDidMount() {
        this.getUsername();
        this.getCompany();
    }
    getUsername(){
        this.setState({ usertype: document.getElementById('global-usertype').textContent}, () => console.log('usertype', this.state.usertype));
        this.setState({ username: document.getElementById('global-user').textContent}, () => console.log('username', this.state.username))
    }
    getCompany() {
        let url = ENDPOINTS.OBTAIN_COMPANY;
        fetch(url).then(res => res.json()).then((result)=>{
        this.setState({comNameOptions: result})},
            (error)=>{});
    }
    changeCompanyName(e){
        this.setState({ comName: e.target.value }, () => console.log('Movie Name', this.state.comName));
    }
    setVisitStartDate(date){
        this.setState({ visitStartDate: date }, () => console.log('Start Date', this.state.visitStartDate));
    }
    setVisitEndDate(date){
        this.setState({ visitEndDate: date }, () => console.log('End Date', this.state.visitEndDate));
    }
    submitFilter(e){
        e.preventDefault();

        const args = {
            username: this.state.username,
            comName: this.state.comName,
            visitStartDate: this.state.visitStartDate,
            visitEndDate: this.state.visitEndDate
        };
        console.log('Send to Form:', args);

        this.setState({
            comName: 'ALL',
            visitStartDate: '',
            visitEndDate: ''
        });
        let query = Object.keys(args)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(args[k]))
            .join('&');
        let url = ENDPOINTS.USER_FILTER_VISIT_HISTORY + '?' + query;

        fetch(url).then(res => res.json()).then((result)=> {
            this.setState({ visitList: result}, () => this.renderTableData())});

    }
    setTableHeader() {
        const headings = {'Theater':0, 'Address':1, 'Company':2, 'Visit Date':3};
        let header = Object.keys(headings)

      return header.map((key, index) => {
          return <th key={index}>{key}</th>
      })
   }
   renderTableData() {
      return this.state.visitList.map((visit_info, index) => {
          const { thName, Address, comName, visitDate } = visit_info
         return (
            <tr key={index}>
               <td>{thName}</td>
               <td>{Address}</td>
               <td>{comName}</td>
                <td>{visitDate}</td>
            </tr>
         )
      })
   }
    backToFunc(){
        const args = {
            usertype : this.state.usertype
        };
        let query = Object.keys(args)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(args[k]))
            .join('&');
        let url = ENDPOINTS.BACK_TO_FUNC + '?' + query;
        window.location.href = url;
    }
    render(){
        return (
            <Container>
                <h1 className={"text-center"}>Visit History</h1>
                <Row className={"p-4"}>

                        <Col sm ={5}>Company Name
                            <select
                                name="companyName"
                                value={this.state.comName}
                                onChange={this.changeCompanyName}
                                className="form-select">
                                <option value="">--ALL--</option>
                                {this.state.comNameOptions.map(opt => {
                                    return (<option key={opt.comName} >{opt.comName}</option>);
                                })}
                            </select>
                        </Col>

                    <Col  sm={1.5}>Visit Date</Col>
                    <Col sm={1.5} >
                        <DatePicker dateFormat="yyyy-MM-dd" selected={this.state.visitStartDate} onChange={this.setVisitStartDate}/>
                    </Col>
                    <Col sm={0.5}>-</Col>
                    <Col sm={1.5} >
                        <DatePicker dateFormat="yyyy-MM-dd" selected={this.state.visitEndDate} onChange={this.setVisitEndDate}/>
                    </Col>
                </Row>
                <div className={"text-center"}>
                    <Button variant="primary" onClick={this.submitFilter}>Filter</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                    <tr>{this.setTableHeader()}</tr>
                    </thead>
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </Table>
                <div className={"text-center"}>
                        <Button variant="primary" onClick={this.backToFunc}>Back</Button>
                </div>
            </Container>

        );
    }
}