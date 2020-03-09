// Import React FilePond
import React, { Component } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { getDecodedToken } from "../utils/jwt";
// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
//import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
//registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const pond = document.querySelector(".filepond--root");
// Our app
class Filepond extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      url: "",
      test_state: 1,
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [
        // {
        //   source: "index.html",
        //   options: {
        //     type: "local"
        //   }
        // }
      ]
    };
  }

  handleInit() {
    // console.log("FilePond instance has initialised", this.pond);
    let decoded = getDecodedToken();
    console.log("filepod started");
    console.log(decoded.email);
    this.setState({ email: decoded.email });
    this.setState({
      url: `/api/fileupload/${this.state.email}/${this.props.cname}`
    });
    console.log(this.props.cname);
    console.log(this.state.url);
  }

  render() {
    return (
      <div className="App">
        {/* Pass FilePond properties as attributes */}
        <FilePond
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          email={this.state.email}
          allowMultiple={true}
          maxFiles={3}
          // server="/api/fileupload"
          server={this.state.url}
          oninit={() => this.handleInit()}
          onupdatefiles={fileItems => {
            // Set currently active file objects to this.state
            this.setState({
              test_state: this.state.test_state + 1,
              files: fileItems.map(fileItem => fileItem.file)
            });
            //window.location.reload(false)
            // this.props.update.bind(this,id)
          }}
        />
      </div>
    );
  }
}

export default Filepond;
