import React, { Component, useState, useEffect } from "react";
import { Button, ButtonToolbar, Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { Alert } from "reactstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import socket from "../socket";
//import { Icon } from "@stardust-ui/react";
//import { axiosGET, axiosPOST } from "../utils/axiosClient";
import {
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class StudentSlide extends Component {
  constructor(props) {
    super(props);
    this.markoff = this.markoff.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    //this.onChangeFormUserID = this.onChangeFormuserID.bind(this);
    this.onChangeFormColour = this.onChangeFormColour.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.getmarks = this.getmarks.bind(this);
    this.decPage = this.decPage.bind(this);
    this.incPage = this.incPage.bind(this);
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.changsyncstate = this.changsyncstate.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.onSubmitNotes = this.onSubmitNotes.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.state = {
      file: localStorage.getItem("link"),
      sid: localStorage.getItem("ssid"),
      userid: localStorage.getItem("userid"),
      // "https://cors-anywhere.herokuapp.com/" + this.props.location.state.link,
      numPages: null,
      pageNumber: 1,
      form_colour: "",
      form_completed: false,
      modal: false,
      Xcord: 0,
      Ycord: 0,
      syncstatus: true,
      synctext: "Unsync",
      showaddnotes: false,
      notes: "Add note here",
      sNotes: [],
    };
  }
  componentDidMount() {
    console.log("Slides Reached");
    console.log(this.props.x);
    this.getmarks();
  }
  componentDidUpdate(prevProps) {
    console.log("Slides Reached");
    console.log(this.props.x);
    if (prevProps.x !== this.props.x && this.state.syncstatus) {
      if (this.props.x >= 1 && this.props.x <= this.state.numPages) {
        this.setState({ pageNumber: this.props.x }, this.getmarks);
      }
    }
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }
  toggle2() {
    this.setState((prevState) => ({
      showaddnotes: !prevState.showaddnotes,
    }));
  }
  onChangeFormColour(e) {
    this.setState({
      form_colour: e.target.value,
    });
  }
  onChangeComment(e) {
    this.setState({
      form_comment: e.target.value,
    });
  }
  onChangeNote(e) {
    this.setState({
      notes: e.target.value,
    });
  }
  onSubmitNotes(e) {
    e.preventDefault();
    console.log(this.state.notes);
    const req = {
      sid: this.state.userid,
      sessid: this.state.sid,
      slideNo: this.state.pageNumber,
      takennote: this.state.notes,
    };
    axios.post("api/addnote", req).then((res) => console.log(res));
    this.toggle2();
  }
  getNotes(e) {
    e.preventDefault();
    const req = {
      sid: this.state.userid,
      sessid: this.state.sid,
      slideNo: this.state.pageNumber,
    };
    axios.post("api/addnote/getnotes", req).then((res) => {
      console.log(res);
      if (res.data) {
        console.log(res.data.notes);
        this.setState({ sNotes: res.data.notes });
      }
    });
  }
  changsyncstate() {
    if (this.state.syncstatus) {
      this.setState({ syncstatus: false, synctext: "Sync" });
    } else {
      this.setState(
        {
          syncstatus: true,
          synctext: "UnSync",
          pageNumber: this.props.x,
        },
        this.getmarks
      );
    }
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.state.form_completed === true) {
      const newMark = {
        Xcord: this.state.Xcord,
        Ycord: this.state.Ycord,
        colour: this.state.form_colour,
        comment: this.state.form_comment,
      };
      //console.log("onsubmit reached");
      //console.log("ssid", this.state.sid);
      //console.log("link", this.state.file);
      axios
        .post(
          `api/marks/add/${this.state.sid}/${this.state.pageNumber}`,
          newMark
        )
        .then((res) => console.log("okay", res.data));

      this.setState({ form_completed: false });
    }

    this.toggle();
  }

  markoff(e) {
    console.log("Hello Sourav");
    this.setState({
      Xcord: e.nativeEvent.offsetX,
      Ycord: e.nativeEvent.offsetY,
      form_completed: true,
    });
    this.toggle();
  }

  getmarks() {
    var url = `api/marks/getSlide/${this.state.sid}/${this.state.pageNumber}`;
    axios
      .get(url)
      .then((response) => {
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
          comment: newComment,
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
      this.setState(
        { pageNumber: this.state.pageNumber - 1, sNotes: [] },
        this.getmarks
      );
    }
  }

  incPage() {
    var pageNo = this.state.pageNumber;
    pageNo++;
    if (pageNo <= this.state.numPages) {
      this.setState(
        { pageNumber: this.state.pageNumber + 1, sNotes: [] },
        this.getmarks
      );
    }
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }
  render() {
    const { pageNumber, numPages, file } = this.state;
    const markings = [];
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
            zIndex: 2,
          }}
        />
      );
    }
    const disp = this.state.sNotes.map((d) => <p>{d}</p>);
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
            height: "900px",
          }}
        >
          <Row
            style={{
              padding: "15px",
              height: "850px",
            }}
          >
            <Col>
              <div
                className="Sourav"
                onClick={this.markoff}
                style={{
                  position: "relative",
                  height: "500px",
                  width: "500px",
                  top: "20px",
                  left: "0%",
                }}
              >
                <Document
                  file={file}
                  onLoadSuccess={this.onDocumentLoadSuccess}
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
                    onClick={this.decPage}
                  >
                    Previous Slide
                  </Button>
                  <p
                    style={{
                      display: "inline",
                      position: "relative",
                      left: "40%",
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
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert>
                <ButtonToolbar>
                  <Button
                    variant="success"
                    style={{ position: "relative", left: "86%" }}
                    onClick={this.changsyncstate}
                  >
                    {this.state.synctext}
                  </Button>
                  <Button color="danger" onClick={this.toggle2}>
                    Add Notes
                  </Button>
                  <Modal isOpen={this.state.showaddnotes} toggle={this.toggle2}>
                    <ModalHeader toggle={this.toggle2}>Modal title</ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label for="exampleText" sm={5}>
                            Text Area
                          </Label>
                          <Col sm={10}>
                            <Input
                              type="textarea"
                              name="text"
                              id="exampleText"
                              value={this.state.notes}
                              onChange={this.onChangeNote}
                            />
                          </Col>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.onSubmitNotes}>
                        Add
                      </Button>{" "}
                      <Button color="secondary" onClick={this.toggle2}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Button
                    color="danger"
                    style={{ position: "relative", left: "30%" }}
                    onClick={this.getNotes}
                  >
                    View Notes
                  </Button>
                </ButtonToolbar>
                <br />
                <Row>
                  <Col>{disp}</Col>
                </Row>
              </Alert>
            </Col>
          </Row>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            //className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}> Add New Mark</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit}>
                <FormGroup tag="fieldset" row>
                  Colour of mark
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio2"
                        value="success"
                        checked={this.state.form_colour === "success"}
                        onChange={this.onChangeFormColour}
                      />{" "}
                      Green
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio2"
                        value="danger"
                        checked={this.state.form_colour === "danger"}
                        onChange={this.onChangeFormColour}
                      />{" "}
                      Red
                    </Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Comment</Label>
                  <Input
                    name="text"
                    id="exampleText"
                    value={this.state.form_comment}
                    onChange={this.onChangeComment}
                  />
                </FormGroup>
                <FormGroup check row>
                  <Col md={{ size: 10 }}>
                    <Button type="submit">Add Mark</Button>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </Container>
    );
  }
}

function StudentSlides() {
  const [x, setX] = useState(1);
  useEffect(() => {
    socket.on("turnPage", (msg) => {
      console.log(msg);
      setX(msg);
      console.log("something happened");
    });
  });
  return <StudentSlide x={x} />;
}

export default StudentSlides;
