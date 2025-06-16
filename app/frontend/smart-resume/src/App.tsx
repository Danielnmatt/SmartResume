import "./styles/tailwind.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeContext";
import { UserProvider } from "./components/UserContext";

const LoginPage = lazy(() => import("./components/LoginPage"));
const SignUpPage = lazy(() => import("./components/SignUpPage"));
const Home = lazy(() => import("./components/Home"));
const UploadResume = lazy(() => import("./components/UploadResume"));
const NotFound = lazy(() => import("./components/NotFound"));
function App() {
	return (
		<div className="font-inter">
			<UserProvider>
				<ThemeProvider>
					<BrowserRouter>
						<Suspense fallback={<h1>Loading...</h1>}>
							<Navbar />
							<Routes>
								<Route path="*" element={<NotFound />} />
								<Route path="/uploadResume" element={<UploadResume />} />
								<Route path="/login" element={<LoginPage />} />
								<Route path="/signup" element={<SignUpPage />} />
								<Route path="/" element={<Home />} />
							</Routes>
						</Suspense>
					</BrowserRouter>
				</ThemeProvider>
			</UserProvider>
		</div>
	);
}

export default App;
