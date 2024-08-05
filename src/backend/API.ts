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

import config from "./config/config.json";
import * as bodyParser from "body-parser";

import express, {Express} from "express";
import cors from "cors";
import axios from "axios";

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
    res.send("PokéVault Backend");
    next();
});

app.get("/api/v1/search", async (req, res) => {
    const pokemon = req.query.q as string;
    const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=name:"${decodeURIComponent(pokemon)}"&limit=750"`, {
        headers: {
            "X-Api-Key": config.api_key
        }
    });
    res.send(response.data);
});

app.get("/api/v1/search/order", async (req, res) => {
    const response = await axios.get(`https://api.pokemontcg.io/v2/cards?orderBy=${req.query.orderBy}&limit=750"`, {
        headers: {
            "X-Api-Key": config.api_key
        }
    });
    res.send(response.data);
});

app.listen(config.port, () => console.log(`Running: ${config.port}`));