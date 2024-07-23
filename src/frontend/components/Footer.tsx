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
import "../css/Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="text-center text-lg-start text-white bg-dark">
            <section className="d-flex justify-content-between p-4 bg-success">
                <div className="me-5">
                    <span>
                        Feel free to check out my projects and other work:
                    </span>
                </div>
                <div>
                    <a href="https://github.com/benjaspet" target="_blank" rel="noopener noreferrer" className="text-white me-4">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://linkedin.com/in/ben-petrillo/" target="_blank" rel="noopener noreferrer" className="text-white me-4">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </section>
            <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                Copyright © 2024-Present <a className="text-white" href="https://benpetrillo.dev">Ben Petrillo</a>
            </div>
        </footer>
    );
};

export default Footer;