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

import * as fs from "node:fs";
import * as path from "node:path";

import config from "./config/config.json";
import OpenAI from "openai";

import ChatCompletionMessageParam = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export default class FiveGuessesGame {

    private readonly model: OpenAI;
    private readonly chats: ChatCompletionMessageParam[];

    constructor(model: OpenAI) {
        this.model = model;
        this.chats = [];
    }

    private genNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    public async start(): Promise<object> {
        const num: number = this.genNumber();
        const prompt: string = fs.readFileSync(path.resolve(__dirname + "/config", "prompt.txt"), "utf-8")
            .replace(/\n/g, " ")
            .replace(/\${num}/g, num.toString());
        this.chats.push({ role: "user", content: prompt });
        await this.model.chat.completions.create({
            messages: this.chats,
            model: config.model
        });
        return { num };
    }

    public async guess(guess: string): Promise<string> {
        try {
            this.chats.push({ role: "user", content: guess });
            const completion = await this.model.chat.completions.create({
                messages: this.chats,
                model: config.model
            })
            const comp: string|null = completion.choices[0]?.message?.content;
            return comp ? comp.toLowerCase().replace(".", "") : "";
        } catch (error: any) {
            console.error(error);
            return "";
        }
    }
}