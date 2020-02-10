import React, { Component } from "react";
import { Button, ButtonToolbar, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PdfViewer from "./PdfViewer";

class WIP extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("Slides Reached");
  }
  state = {
    file:
      "https://cors-anywhere.herokuapp.com/https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf",
    numPages: null,
    pageNumber: 1
  };

  render() {
    let decPage = () => {
      console.log("Dec page", this.state.pageNumber);
      var pageNumber = this.state.pageNumber - 1;
      if (pageNumber >= 1) {
        this.setState({ pageNumber });
        console.log("Dec page", pageNumber);
      }
    };
    let incPage = () => {
      console.log("Inc page", this.state.pageNumber);
      var pageNumber = this.state.pageNumber + 1;
      if (pageNumber <= this.state.numPages) {
        this.setState({ pageNumber });
        console.log("Dec page", pageNumber);
      }
    };
    let numpagescallback = dataFromChild => {
      this.setState({ numPages: dataFromChild });
    };
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Welcome to Slides Functionality.</h1>
          </Col>
        </Row>
        <Row style={{ padding: "15px" }}>
          <Col>
            <PdfViewer
              pageNumber={this.state.pageNumber}
              file={this.state.file}
              getnumPages={numpagescallback}
            />
            <ButtonToolbar>
              <Button
                style={{ margin: "15px" }}
                variant="primary"
                size="sm"
                onClick={decPage}
              >
                Previous Slide
              </Button>
              <Button
                style={{ margin: "15px" }}
                variant="primary"
                size="sm"
                onClick={incPage}
              >
                Next Slide
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WIP;
