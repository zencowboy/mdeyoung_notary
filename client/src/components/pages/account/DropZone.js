import React, { useEffect, useState } from "react";
import {
  Popover,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import img from "./image.svg";

export const FilePreview = ({ name, data, id, children }) => (
  <InputGroup size="sm" className="my-1">
    {children}
    <FormControl value={name} disabled />
    <InputGroup.Append>
      <OverlayTrigger
        trigger="click"
        placement="right"
        overlay={
          <Popover>
            <Popover.Content>
              <embed
                src={data}
                width="250"
                height="700"
                style={{ zIndex: "-1", position: "relative" }}
              />
            </Popover.Content>
          </Popover>
        }
      >
        <Button className="mt-0" variant="secondary">
          Preview
        </Button>
      </OverlayTrigger>
    </InputGroup.Append>
  </InputGroup>
);

export default class DropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hightlight: false,
    };
    this.fileInputRef = React.createRef();
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    this.fileInputRef.current.click();
  }
  onFilesAdded(evt) {
    const files = evt.target.files;
    const array = this.fileListToArray(files);
    this.uploadFile(array);
  }
  onDragOver(evt) {
    evt.preventDefault();
    this.setState({ hightlight: true });
  }
  onDragLeave() {
    this.setState({ hightlight: false });
  }
  onDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const array = this.fileListToArray(files);
    this.uploadFile(array);
    this.setState({ hightlight: false });
  }
  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }
  uploadFile(array) {
    // if (this.props.number) {
    var formData = new FormData();
    array.forEach((file, index) => {
      formData.append(`file`, file);
    });
    // formData.append("number", this.props.number);
    // formData.append("company", this.props.company);
    // formData.append("manager", this.props.userName);

    fetch(`http://localhost:4000/contract?token=${this.props.token}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((success) => {
        console.log(success);
        var files = [];
        // fetch("/php/show/show_files.php?filenumber=" + this.props.number)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     files = data.map((item) => (
        //       <FilePreview
        //         id={item["id"]}
        //         name={item["name"]}
        //         data={item["data"]}
        //       />
        //     ));
        //     this.props.onDrop(files);
        //   });
      })
      .catch((error) => console.log(error));
    // } else {
    //   alert("please input number of document first");
    // }
  }

  render() {
    return (
      <div
        className={`my-1 text-center Dropzone ${
          this.state.hightlight ? "Highlight" : ""
        }`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          name="file"
          onChange={this.onFilesAdded}
        />
        <img alt="upload" className="Icon" src={img} />
        <span>Drag files here ok click to select folder</span>
      </div>
    );
  }
}
