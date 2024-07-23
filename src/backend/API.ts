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

import FiveGuessesGame from "./FiveGuessesGame";
import OpenAI from "openai";
import config from "./config/config.json";
import * as bodyParser from "body-parser";

import express, {Express} from "express";
import cors from "cors";

const model: OpenAI = new OpenAI({
    organization: config.organization,
    project: config.project,
    apiKey: config.api_key
});

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", "127.0.0.1");
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(async (req, _res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

app.get("/", (_req, res, next) => {
    res.send("Five Guesses API");
    next();
});

const game = new FiveGuessesGame(model);

app.post("/api/start", async (_req, res) => {
    try {
        const completion = await game.start();
        return res.status(200).json({ completion });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/guess", async (req, res) => {
    const { guess } = req.body;
    const completion = await game.guess(guess);
    return res.json({ completion });
});

app.listen(config.port, () => console.log(`Running: ${config.port}`));