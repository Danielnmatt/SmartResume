import { BrowserRouter, Routes, Route } from "react-router";
import "./styles/App.css";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("./components/LoginPage"));
const SignUpPage = lazy(() => import("./components/SignUpPage"));
const Home = lazy(() => import("./components/Home"));

function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<h1>Loading...</h1>}>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
