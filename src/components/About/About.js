import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Nav, Navbar, Tab } from "react-bootstrap";
import { apiLoadMarkdown, apiGetFiles } from "../../api";
import "./About.css";
// import Github from "./Github";
// import ReactMarkdown from 'react-markdown';

function About() {
  const [expanded, setExpanded] = useState(false);
  const markdownFiles = useRef([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedMarkdown, setSelectedMarkdown] = useState("");
  const [selectedFileUrl, setSelectedFileUrl ] = useState("");
  const [fileIsLoaded, setFileIsLoaded] = useState(false);

  const changeSelectedUrl = (url) => {
    console.log("此时应该被render的url：", url);
    setSelectedFileUrl(url);
  };

  const constructTabName = (name) => {
    let filename = name;
    return filename.replace(/-.*/, "");
  };

  useEffect(() => {
    console.log("--开始fetch files");
    apiGetFiles().then((data) => {
      console.log("api get files: ", data);
      if (data !== undefined && data.length > 0) {
        markdownFiles.current = data;
        setSelectedFileUrl(data[0].url);
        setFileIsLoaded(true);
        console.log("markdown files: ", markdownFiles.current);
      }
      
    });
  }, []);

  return (
    <Container fluid className="about-section">
      <Tab.Container id="left-tabs-example" >
        <Row>

              {/* d-sm-none */}
          <Col xs={12} sm={12} md={3} lg={3} className="bg-transparent">
            <Navbar collapseOnSelect expand="lg" bg="light" expanded={expanded} className="bg-transparent about-nav-bar bg-info">
              <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                onClick={() => {
                  setExpanded(expanded ? false : true);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </Navbar.Toggle>
              <Navbar.Collapse id="responsive-navbar-nav">
              {fileIsLoaded && (
              <Nav variant="underline" className="flex-column ">
              {/* ...所有选项... */}
              {markdownFiles.current.map((file, index) => (
               
                <Nav.Item
                  className="flex-grow-1 m-0 p-0"
                  onClick={() => changeSelectedUrl(file.url)}
                  key={file.name}
                >
                  <Nav.Link
                    className="result-nav-link text-white text-center about-nav-link"
                    eventKey={constructTabName(file.name)}
                  >
                    {constructTabName(file.name)}
                    
                 </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            )}
              </Navbar.Collapse>
            </Navbar>
          </Col>
          <Col  xs={12} sm={12} md={9} lg={9} style={{height: "600px"}} className="">
            <Tab.Content className="bg-success">{selectedFileUrl}</Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      
    </Container>
  );
}

export default About;
