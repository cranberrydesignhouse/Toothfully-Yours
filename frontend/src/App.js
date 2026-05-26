import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import ThankYou from "@/pages/ThankYou";
import CosmeticCare from "@/pages/CosmeticCare";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/cosmetic-aesthetic-care"
                        element={<CosmeticCare />}
                    />
                    <Route path="/thank-you" element={<ThankYou />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
