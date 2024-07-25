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

import ChatCompletionMessageParam = Groq.Chat.ChatCompletionMessageParam;
import Groq from "groq-sdk";

export default class Durai {

    private readonly model: Groq;
    private readonly chats: ChatCompletionMessageParam[];

    constructor(model: Groq) {
        this.model = model;
        this.chats = [];
    }

    public async ask(q: string): Promise<string> {
        try {
            this.chats.push({ role: "user", content: "Only answer in paragraph format. No lists, no bullets, not bolding or italics. Plain text."})
            this.chats.push({ role: "user", content: q });
            const completion = await this.model.chat.completions.create({
                messages: this.chats,
                model: config.model
            })
            const comp: string|null = completion.choices[0]?.message?.content;
            comp ? this.chats.push({ role: "system", content: comp }) : null;
            return comp ?? "";
        } catch (error: any) {
            console.error(error);
            return "";
        }
    }
}