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
                    <h1>Five Guesses</h1>
                    <p className="lead pt-2 pb-2">
                        You have five chances to guess the correct number, from 0 to 100
                        inclusive. You may ask yes or no questions. A very simple game, that I
                        totally didn't whip up in 2 hours... Anyways, this thing is powered
                        by React, Bootstrap v5, Node.js,
                        and <a className={"link-success"} href={"https://openai.com/index/gpt-4/"}>GPT-4</a>.
                    </p>
                    <button className="btn btn-success btn-lg">
                        Start playing!
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;