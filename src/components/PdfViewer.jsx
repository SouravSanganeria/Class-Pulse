import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class PdfViewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  render() {
    let onDocumentLoadSuccess = ({ numPages }) => {
      this.setState({ numPages });
      someFn(numPages);
    };

    let someFn = numPages => {
      this.props.getnumPages(numPages);
    };

    const { pageNumber, numPages } = this.state;
    return (
      <div>
        <Document
          file={this.props.file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          <Page pageNumber={this.props.pageNumber} />
        </Document>
        <p>
          Page {this.props.pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}

export default PdfViewer;
