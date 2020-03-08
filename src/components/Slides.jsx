import React, { Component } from "react";
import { Button, ButtonToolbar, Container } from "react-bootstrap";
import { Alert } from "reactstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class Slides extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("Slides Reached");
  }
  state = {
    file: this.props.location.state.link,
    // "https://cors-anywhere.herokuapp.com/" + this.props.location.state.link,
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
    let onDocumentLoadSuccess = ({ numPages }) => {
      this.setState({ numPages });
    };
    const { pageNumber, numPages, file } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Welcome to Slides Functionality.</h1>
          </Col>
        </Row>
        <div
          style={{
            background: "AliceBlue",
            position: "relative",
            height: "900px"
          }}
        >
          <Row
            style={{
              padding: "15px",
              height: "850px"
            }}
          >
            <Col>
              <div
                style={{
                  position: "relative",
                  height: "500px",
                  width: "500px",
                  top: "20px",
                  left: "25%"
                }}
              >
                <Document
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={console.error}
                >
                  <Page height={800} size="A4" pageNumber={pageNumber} />
                </Document>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert color="info">
                <ButtonToolbar>
                  <Button
                    color="info"
                    style={{ position: "relative", left: "30%" }}
                    onClick={decPage}
                  >
                    Previous Slide
                  </Button>
                  <p
                    style={{
                      display: "inline",
                      position: "relative",
                      left: "40%"
                    }}
                  >
                    Page {pageNumber} of {numPages}
                  </p>
                  <Button
                    color="info"
                    style={{ position: "relative", left: "50%" }}
                    onClick={incPage}
                  >
                    Next Slide
                  </Button>
                </ButtonToolbar>
              </Alert>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default Slides;
