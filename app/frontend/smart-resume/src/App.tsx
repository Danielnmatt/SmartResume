import "./styles/tailwind.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/context/ThemeContext";
import { UserProvider } from "./components/context/UserContext";

const LoginPage = lazy(() => import("./components/pages/LoginPage"));
const SignUpPage = lazy(() => import("./components/pages/SignUp"));
const Home = lazy(() => import("./components/pages/Home"));
const UploadResume = lazy(() => import("./components/pages/UploadResume"));
const NotFound = lazy(() => import("./components/pages/NotFound"));

function App() {
	return (
		<div className="font-inter">
			<BrowserRouter>
				<UserProvider>
					<ThemeProvider>
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
					</ThemeProvider>
				</UserProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
