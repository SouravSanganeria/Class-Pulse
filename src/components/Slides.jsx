import React, { Component } from "react";
import { Button, ButtonToolbar, Container } from "react-bootstrap";
import { Alert } from "reactstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
//import { axiosGET, axiosPOST } from "../utils/axiosClient";
import { Spinner, Toast, ToastBody, ToastHeader } from "reactstrap";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class Slides extends Component {
  constructor(props) {
    super(props);
    this.getmarks = this.getmarks.bind(this);
    this.decPage = this.decPage.bind(this);
    this.incPage = this.incPage.bind(this);
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }
  componentDidMount() {
    console.log("Slides Reached");
    this.getmarks();
  }
  state = {
    file: this.props.location.state.link,
    sid: this.props.location.state.sid,
    // "https://cors-anywhere.herokuapp.com/" + this.props.location.state.link,
    numPages: null,
    pageNumber: 1,
    markx: [],
    marky: [],
    colour: [],
    comment: [],
    toastcol: ""
  };

  getmarks() {
    var url = `http://localhost:4000/api/marks/getSlide/${this.state.sid}/${
      this.state.pageNumber
    }`;
    axios
      .get(url)
      .then(response => {
        console.log("response", response.data.length);
        const newX = [];
        const newY = [];
        const newColour = [];
        const newComment = [];
        for (var i = 0; i < response.data.length; i += 1) {
          newX.push(response.data[i].Xcord);
          newY.push(response.data[i].Ycord);
          newColour.push(response.data[i].colour);
          newComment.push(response.data[i].comment);
        }
        this.setState({
          //data: response.data,
          no: response.data.length,
          markx: newX,
          marky: newY,
          colour: newColour,
          comment: newComment
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  decPage() {
    var pageNo = this.state.pageNumber;
    pageNo--;
    if (pageNo >= 1) {
      this.setState({ pageNumber: this.state.pageNumber - 1 }, this.getmarks);
    }
  }

  incPage() {
    var pageNo = this.state.pageNumber;
    pageNo++;
    if (pageNo <= this.state.numPages) {
      this.setState({ pageNumber: this.state.pageNumber + 1 }, this.getmarks);
    }
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages, file } = this.state;
    const markings = [];
    const greenmarkings = [];
    const redmarkings = [];
    const emptymarking = [];
    for (var i = 0; i < this.state.no; i += 1) {
      markings.push(
        <Spinner
          name="accept"
          size="sm"
          color={this.state.colour[i]}
          style={{
            top: this.state.marky[i],
            left: this.state.markx[i],
            position: "absolute",
            zIndex: 2
          }}
        />
      );
      if (this.state.colour[i] === "success") {
        greenmarkings.push(
          <Spinner
            name="accept"
            size="sm"
            color={this.state.colour[i]}
            style={{
              top: this.state.marky[i],
              left: this.state.markx[i],
              position: "absolute",
              zIndex: 2
            }}
          />
        );
      }
      if (this.state.colour[i] === "danger") {
        redmarkings.push(
          <Spinner
            name="accept"
            size="sm"
            color={this.state.colour[i]}
            style={{
              top: this.state.marky[i],
              left: this.state.markx[i],
              position: "absolute",
              zIndex: 2
            }}
          />
        );
      }
    }

    const emptytoast = [];
    const toaststeacher = [];
    const toastsred = [];
    const toastsgreen = [];
    for (var i = 0; i < this.state.no; i += 1) {
      toaststeacher.push(
        <Toast>
          <ToastHeader icon={this.state.colour[i]} />
          <ToastBody>Comment: {this.state.comment[i]}</ToastBody>
        </Toast>
      );
      if (this.state.colour[i] === "success") {
        toastsgreen.push(
          <Toast>
            <ToastHeader icon={this.state.colour[i]} />
            <ToastBody>Comment: {this.state.comment[i]}</ToastBody>
          </Toast>
        );
      }
      if (this.state.colour[i] === "danger") {
        toastsred.push(
          <Toast width="max-width">
            <ToastHeader icon={this.state.colour[i]} />
            <ToastBody>Comment: {this.state.comment[i]}</ToastBody>
          </Toast>
        );
      }
    }
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
                  left: "0%"
                }}
              >
                <Document
                  file={file}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                  onLoadError={console.error}
                >
                  <Page height={800} size="A4" pageNumber={pageNumber} />
                </Document>
                {this.state.toastcol === ""
                  ? emptymarking
                  : this.state.toastcol === "all"
                  ? markings
                  : this.state.toastcol === "green"
                  ? greenmarkings
                  : redmarkings}
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
                    onClick={this.decPage}
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
                    onClick={this.incPage}
                  >
                    Next Slide
                  </Button>
                </ButtonToolbar>
                <br />
                <ButtonToolbar>
                  <Button
                    outline
                    variant="info"
                    style={{ position: "relative", left: "30%" }}
                    onClick={() => {
                      this.setState({ toastcol: "all" });
                    }}
                  >
                    Marks
                  </Button>{" "}
                  <Button
                    outline
                    variant="info"
                    style={{ position: "relative", left: "33%" }}
                    onClick={() => {
                      this.setState({ toastcol: "" });
                    }}
                  >
                    Hide
                  </Button>{" "}
                  <Button
                    outline
                    style={{ position: "relative", left: "45%" }}
                    variant="success"
                    onClick={() => {
                      this.setState({ toastcol: "green" });
                    }}
                  >
                    Green marks
                  </Button>{" "}
                  <Button
                    outline
                    style={{ position: "relative", left: "47%" }}
                    variant="danger"
                    onClick={() => {
                      this.setState({ toastcol: "red" });
                    }}
                  >
                    Red marks
                  </Button>{" "}
                </ButtonToolbar>
                {this.state.toastcol === ""
                  ? emptytoast
                  : this.state.toastcol === "all"
                  ? toaststeacher
                  : this.state.toastcol === "green"
                  ? toastsgreen
                  : toastsred}
              </Alert>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default Slides;
