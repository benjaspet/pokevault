import React, { useState } from "react";
import axios from "axios";
import config from "../../backend/config/config.json";

const parseResponse = (text: string) => {

    text = text.replace(/^\*\*(.+?)\*\*$/gm, '<h5 class="mb-0">$1</h5>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/^\* (.+)$/gm, '<li>$1</li>');
    text = text.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/g, '<ul class="m-0">$1</ul>');
    text = text.replace(/<p><ul>/g, '<ul>');
    text = text.replace(/<\/ul><\/p>/g, '</ul>');
    text = text.replace(/(?:\r\n|\r|\n){2,}/g, '</p><p>');
    text = text.replace(/\r\n|\r|\n/g, '<br />');
    text = text.replace(/<\/li><br \/>/g, '</li>');
    text = text.replace(/(<\/ul>)<br \/>/g, '$1');

    return text;
};

const clearHistory = () => {
    localStorage.removeItem("responses");
    window.location.reload();
};

const Input: React.FC = () => {
    const [textareaValue, setTextareaValue] = useState("");
    const [responses, setResponses] = useState<{ question: string, response: string }[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${config.host}/api/ask`, {
                guess: textareaValue
            });
            console.log(response.data);

            const newResponse = { question: textareaValue, response: response.data.completion };
            const updatedResponses = [...responses, newResponse];

            setResponses(updatedResponses);

            const stored = localStorage.getItem("responses");
            if (stored) {
                const storedResponses = JSON.parse(stored);
                storedResponses.push(newResponse);
                localStorage.setItem("responses", JSON.stringify(storedResponses));
            } else {
                localStorage.setItem("responses", JSON.stringify([newResponse]));
            }
            setTextareaValue("");
            console.log(responses)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section data-bs-theme={"dark"} className="bg-dark text-light pt-4 pb-3">
            <div className="container">
                <form className={"bg-dark"} onSubmit={handleSubmit}>
                    {JSON.parse(localStorage.getItem("responses") || "[]").map((item: any, index: number) => (
                        <div className="row border border-1 mx-0 p-2 mb-3 rounded rounded-3" key={index}>
                            <div className="col-12 border border-1 border-success rounded rounded-3 py-3 px-3 mb-2">
                                {item.question}
                            </div>
                            <div
                                className="col-12 border border-1 border-success rounded rounded-3 py-3 px-3"
                                dangerouslySetInnerHTML={{ __html: parseResponse(item.response) }}
                            />
                        </div>
                    ))}
                    <div className="mb-3 mx-5 px-0 pt-2">
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={2}
                            value={textareaValue}
                            placeholder={"Ask anything at all..."}
                            onChange={(e) => setTextareaValue(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={"text-center"}>
                        <button type="submit" className="btn btn-success mt-2 mb-3 ">
                            Ask Dur.ai
                        </button>
                        <button onClick={clearHistory} className="btn btn-success mt-2 mb-3 mx-1">
                            Clear History
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Input;