import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../backend/config/config.json";

const Input: React.FC = () => {

    const [textareaValue, setTextareaValue] = useState("");
    const [responses, setResponses] = useState<{ question: string, response: string }[]>([]);

    useEffect(() => {
        localStorage.removeItem("responses");
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${config.host}/api/ask`, {
                guess: textareaValue
            });
            console.log(response.data);

            const newResponse = { question: textareaValue, response: response.data.completion };
            const updatedResponses = [newResponse, ...responses];

            setResponses(updatedResponses);
            localStorage.setItem("responses", JSON.stringify(updatedResponses));
            setTextareaValue("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section data-bs-theme={"dark"} className="bg-dark text-light pt-5 pb-3 text-center font-monospace">
            <div className="container">
                <form className={"bg-dark mt-1"} onSubmit={handleSubmit}>
                    <div className="mb-2 mx-3">
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            value={textareaValue}
                            placeholder={"Ask anything at all..."}
                            onChange={(e) => setTextareaValue(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-success mt-2 mb-3">
                        Ask me anything.
                    </button>
                    {responses.map((item, index) => (
                        <div className="row border border-1 rounded mx-0 p-2 mb-3 mx-3" key={index}>
                            <div className="col-12 border border-1 border-success p-2 mb-2">
                                {item.question}
                            </div>
                            <div className="col-12 border border-1 border-success p-2">
                                {item.response}
                            </div>
                        </div>
                    ))}
                </form>
            </div>
        </section>
    );
}

export default Input;