import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export class ManagerOnlyFunctionality extends Component{
  render() {
    return (
        <div>
          <h1 className={"text-center"}>Manager-Only Functionality</h1>
          <Row className={"p-2"}>
            <Col md={{span:2, offset:4}} className={"text-center"}>
              <Link to={"/theaterOverview"}>
                <Button variant={"primary"} size={"lg"} className={"w-100"}>
                Theater Overview
                </Button>
              </Link>
            </Col>
            <Col md={{span:2}} className={"text-center"}>
              <Link to={"/userExploreTheater"}>
                <Button variant={"primary"} size={"lg"} className={"w-100"}>
                Explore Theater
                </Button>
              </Link>
            </Col>
          </Row>

          <Row className={"p-2"}>
            <Col md={{span:2, offset:4}} className={"text-center"}>
              <Link to={"/scheduleMovie"}>
                <Button variant={"primary"} size={"lg"} className={"w-100"}>
                Schedule Movie
                </Button>
              </Link>
            </Col>
            <Col md={{span:2}} className={"text-center"}>
              <Link to={"/customerExploreMovie"}>
                <Button variant={"primary"} size={"lg"} className={"w-100"}>
                Explore Movie
                </Button>
              </Link>
            </Col>
          </Row>

          <Row className={"p-2"}>
            <Col md={{span:2, offset:5}} className={"text-center"}>
              <Link to={"/login"}>
                <Button variant={"primary"} size={"lg"} className={"w-100"}>
                Back
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
    )
  }
}