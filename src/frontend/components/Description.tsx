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
                        The objective of the game is to guess the hidden number between 0 and
                        100 inclusive. The hidden number is chosen at random at the start of the
                        game. The player has only 5 chances to guess the number using yes or no
                        questions. The player can ask yes or no questions that relate to the number
                        in question, or they can guess the number directly. The player will receive
                        feedback in the form of a yes or no answer to their question. The player can
                        use this feedback to deduce the hidden number.
                    </p>
                </div>
                <ul className={"mx-lg-5"}>
                    <li>The hidden number will always be between 0 and 100 inclusive.</li>
                    <li>Only yes or no questions are allowed.</li>
                    <li>You have a maximum of five guesses to decipher the number. Guesses include yes or no questions.</li>
                    <li>The code is a single six-digit number.</li>
                    <li>The game ends when the correct number is guessed, or the player runs out of guesses.</li>
                </ul>
            </div>
        </section>
    );
};

export default Description;