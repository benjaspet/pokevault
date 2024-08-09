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

import config from "../config/config.json";
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

async function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

app.get("/api/v1/search", async (req, res) => {
    try {
        const pokemon = req.query.q as string;
        const page = req.query.page as string;
        const limit = req.query.limit as string;
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=name:"${encodeURIComponent(pokemon)}"&pageSize=60&page=${page}&orderBy=name&select:id,images`, {
            headers: {
                "X-Api-Key": config.api_key
            }
        });
        if (!response) {
            res.status(404).send("Card not found.");
        }
        console.log(response.data)
        const data = response.data;
        await shuffle(data.data)
        if (parseInt(limit) <= data.data.length) {
            const d = data.data.slice(0, parseInt(limit));
            return res.send({data: d});
        } else res.send(data);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/api/v1/searchBySet", async (req, res) => {
    try {
        const set = req.query.q as string;
        const limit = req.query.limit as string;
        const viableRarities = [
            "Amazing Rare",
            "LEGEND",
            "Promo",
            "Rare",
            "Rare ACE",
            "Rare BREAK",
            "Rare Holo",
            "Rare Holo EX",
            "Rare Holo GX",
            "Rare Holo LV.X",
            "Rare Holo Star",
            "Rare Holo V",
            "Rare Holo VMAX",
            "Rare Prime",
            "Rare Prism Star",
            "Rare Rainbow",
            "Rare Secret",
            "Rare Shining",
            "Rare Shiny",
            "Rare Shiny GX",
            "Rare Ultra"
        ];

        //const quer = `set.id:${decodeURIComponent(set)} (rarity:Rare OR rarity:Rare Ultra)`;
        const quer = `set.id:${decodeURIComponent(set)} (rarity:Rare OR rarity:"Rare Ultra" OR rarity:"Rare Holo" OR rarity:"Rare Holo EX" OR rarity:Promo)`;

        const reqUrl = `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(quer)}&select=id,images`
        console.log(reqUrl)

        const response = await axios.get(reqUrl, {
            headers: {
                "X-Api-Key": config.api_key
            }
        });
        if (!response) {
            res.status(404).send("Card not found.");
        }
        const data = response.data;
        await shuffle(data.data)
        if (parseInt(limit) <= data.data.length) {
            const d = data.data.slice(0, parseInt(limit));
            return res.send({data: d});
        } else res.send(data);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/api/v1/search/setOrdered", async (req, res) => {
    try {
        const set = req.query.q as string;
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=set.id:${encodeURIComponent(set)}&select=images,id&orderBy=number`, {
            headers: {
                "X-Api-Key": config.api_key,
            }
        });
        if (!response) {
            res.status(404).send("Card not found.");
        }
        return res.status(200).json(response.data);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/api/v1/search/order", async (req, res) => {
    const response = await axios.get(`https://api.pokemontcg.io/v2/cards?orderBy=${req.query.orderBy}&pageSize=24&page=${req.query.page}`, {
        headers: {
            "X-Api-Key": config.api_key
        }
    });
    if (!response) {
        res.status(404).send("Card not found.");
    }
    res.send(response.data);
});

app.get("/api/v1/get/:id", async (req, res) => {
    const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${req.params.id}`, {
        headers: {
            "X-Api-Key": config.api_key
        }
    });
    if (!response) {
        res.status(404).send("Card not found.");
    }
    res.send(response.data);
});

app.get("/api/v1/sets", async (_req, res) => {
    const response = await axios.get("https://api.pokemontcg.io/v2/sets?orderBy=releaseDate", {
        headers: {
            "X-Api-Key": config.api_key,
        }
    });
    if (!response) {
        res.status(404).send("Sets not found.");
    }
    res.send(response.data);
});

app.get("/api/v1/sets/:id", async (req, res) => {
    const response = await axios.get(`https://api.pokemontcg.io/v2/sets/${req.params.id}`, {
        headers: {
            "X-Api-Key": config.api_key,
        }
    });
    if (!response) {
        res.status(404).send("Set not found.");
    }
    res.send(response.data);
});

app.listen(config.port, () => console.log(`Running: ${config.port}`));