import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import ThankYou from "@/pages/ThankYou";
import CosmeticCare from "@/pages/CosmeticCare";
import ImplantsRestoration from "@/pages/ImplantsRestoration";
import CorrectiveAlignment from "@/pages/CorrectiveAlignment";
import GlobalAccess from "@/pages/GlobalAccess";
import NeuromuscularDentistry from "@/pages/NeuromuscularDentistry";

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
                    <Route
                        path="/implants-restoration"
                        element={<ImplantsRestoration />}
                    />
                    <Route
                        path="/corrective-alignment"
                        element={<CorrectiveAlignment />}
                    />
                    <Route
                        path="/neuromuscular-dentistry"
                        element={<NeuromuscularDentistry />}
                    />
                    <Route
                        path="/global-access"
                        element={<GlobalAccess />}
                    />
                    <Route path="/thank-you" element={<ThankYou />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
