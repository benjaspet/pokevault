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

const Hero: React.FC = () => {

    return (
        <section className="bg-dark text-light p-4 text-center">
            <div className="container">
                <div className="p-5 align-items-center">
                    <h1>Your Learning Companion</h1>
                    <p className="lead pt-2 pb-2">
                        Transform your academic studies. Whether you're tackling complex math
                        problems, exploring the wonders of science, or diving into the depths
                        of history, we're here to help. Let's make learning engaging, effective,
                        and fun.
                    </p>
                    <button className="btn btn-success btn-lg">
                        Get started!
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;