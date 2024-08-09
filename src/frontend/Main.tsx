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

import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardInfoPage from "./CardInfoPage.tsx";
import SetsPage from "./SetsPage.tsx";
import SetInfoPage from "./SetInfoPage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:cardId/view" element={<CardInfoPage />} />
            <Route path="/sets" element={<SetsPage />} />
          <Route path="/sets/:setId/view" element={<SetInfoPage />} />
        </Routes>
    </Router>
)
