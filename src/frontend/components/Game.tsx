import React, { useState, useEffect } from "react";
import axios from "axios";

const resetGame = () => {
    window.location.reload();

}

const Game: React.FC = () => {
    const [textareaValue, setTextareaValue] = useState("");
    const [responses, setResponses] = useState<{ question: string, response: string }[]>([]);
    const [hiddenNumber, setHiddenNumber] = useState("");
    const [remainingQuestions, setRemainingQuestions] = useState(5);

    useEffect(() => {
        localStorage.removeItem("responses");

        const startGame = () => {
            console.log("Starting game...");
            axios.post("https://five-guesses.benpetrillo.dev/api/start")
                .then(response => {
                    setHiddenNumber(response.data.completion.num)
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        startGame();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Submitting guess:", textareaValue);

        try {
            const response = await axios.post("https://five-guesses.benpetrillo.dev/api/guess", {
                guess: textareaValue
            });
            console.log(response.data);

            const newResponse = { question: textareaValue, response: response.data.completion };
            const updatedResponses = [...responses, newResponse];

            const compl = response.data.completion;

            if (compl.includes("yes") || compl.includes("no")) {
                setRemainingQuestions(remainingQuestions - 1);
            } else if (compl.includes("win") || compl.includes("lose")) {
                setRemainingQuestions(0);
            }

            setResponses(updatedResponses);
            localStorage.setItem("responses", JSON.stringify(updatedResponses));
            setTextareaValue("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section data-bs-theme={"dark"} className="bg-dark text-light pt-5 pb-3 text-center font-monospace">
            <h1 className={"text-lg-center font-monospace display-5"}>Guess The Number</h1>
            <p className={"font-monospace text-md-center px-4"}>
                from 0 to 100 inclusive, using yes or no questions only.
            </p>
            <div className="container my-4 align-content-center">
                <form className={"bg-dark mt-2"} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            value={textareaValue}
                            placeholder={"Enter your question or guess here..."}
                            onChange={(e) => setTextareaValue(e.target.value)}
                        ></textarea>
                    </div>
                    <p className={"my-2"}>Remaining questions: {remainingQuestions}</p>
                    {responses.map((item, index) => (
                        <div className="row border border-1 rounded mx-0 p-2 mb-3" key={index}>
                            <div className="col-12 col-md-9 border border-1 border-success p-2">
                                <strong>Q{index + 1}</strong> – {item.question}
                            </div>
                            <div className="col-12 col-md-3 border border-1 border-success p-2">
                                <strong>A</strong> – {item.response}
                            </div>
                        </div>
                    ))}
                    {remainingQuestions > 0 ? (
                        <button type="submit" className="btn btn-success mt-3">
                            Make a submission!
                        </button>
                    ) : (
                        <button onClick={resetGame} className="btn btn-primary mt-3">
                            Play again! • Answer was: {hiddenNumber}
                        </button>
                    )}
                </form>
            </div>
        </section>
    );
}

export default Game;