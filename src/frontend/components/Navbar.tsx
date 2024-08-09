/*
 * Copyright © 2024 Ben Petrillo. All rights reserved.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use,
 * provided that credit is given to the original author(s).
 */

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const CustomNavbar: React.FC = () => {

    return (
      <Navbar bg="success" variant="dark" expand="lg" className="py-3">
          <Container>
              <Navbar.Brand href="/">
                  <img src={"/banner.png"} className="me-2 mb-1" alt="" height={32}/>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                      <Nav.Link href={"/"} className={"text-white"}>Card Database</Nav.Link>
                      <Nav.Link href={"/sets"} className={"text-white"}>Sets</Nav.Link>
                      <Nav.Link href="https://docs.benpetrillo.dev" className={"text-white"}>About</Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
    );
}

export default CustomNavbar;
