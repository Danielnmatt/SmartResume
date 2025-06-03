import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage"
import Main from "./components/Home";
import './styles/App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;