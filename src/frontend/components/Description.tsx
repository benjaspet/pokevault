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

const Description: React.FC = () => {
    return (
        <section className="text-light bg-success p-3 font-monospace">
            <div className="container">
                <div className="d-md-flex mt-3 mb-1 mx-lg-5">
                    <p>
                        Our mission is to revolutionize education by harnessing the transformative
                        power of artificial intelligence. We strive to make learning engaging,
                        accessible, and effective for every student, regardless of their background
                        or learning style. By integrating advanced AI technology, we provide
                        personalized support that helps students explore, understand, and master
                        school concepts in a way that resonates with them.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Description;