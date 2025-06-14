import "../styles/tailwind.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import axios from "../api/axios";
import PulseLoader from "react-spinners/PulseLoader";

//TODO: Handle Sign Up logic, Email verification upon sign up
const SignUpPage = () => {
	return (
		<div className="flex h-screen w-screen">
			<div className="m-auto h-5/6 w-9/24 flex flex-col items-center rounded-xl">
				<h1 className="text-5xl mb-5">Smart Resume</h1>
				{<PageView />}
			</div>
		</div>
	);
};

const PageView = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		let errorMessage = "";
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (!email || !password || !confirmPassword) {
			errorMessage += "All fields must be filled.\n";
		}
		if (password !== confirmPassword) {
			errorMessage += "Passwords must match.\n";
		}
		if (email && !emailRegex.test(email)) {
			errorMessage += "Invalid email address.\n";
		}
		if(password && confirmPassword && password === confirmPassword && password.length < 8){
			errorMessage += "Password must be at least 8 characters long.\n";
		}

		try {
			if (errorMessage != "") {
				throw new DOMException();
			}
			const response = await axios.post("/auth/signup", { email, password });
			if (response.data.success) {
				toast.success("Signup was successful", {
					duration: 5000,
					description: "redirecting shortly...",
				});
				setIsLoading(true);
				setTimeout(() => {
					navigate("/");
				}, 5000);
			}
		}
		catch (e) {
			toast.error("Error Signing Up", {
				description: `${errorMessage ? errorMessage : ""}`,
				duration: 5000,
			});
			console.error("Error signing up, please try again: " + e);
		}
	};

	return (
		<div className="flex flex-col items-center self-center justify-self-center h-4/5 w-full">
			<h1 className="text-4xl">Sign up</h1>
			<div className="w-full shadow-2xl border-[.5px] mt-12 h-full p-4">
				<Toaster
					toastOptions={{ classNames: { description: "!text-white whitespace-pre" } }}
					richColors={true}
					position="top-right"
				/>
				<form className="flex flex-col">
					<label htmlFor="email">Email</label>
					<input
						autoComplete="off"
						id="email"
						type="text"
						placeholder="ExampleEmail@email.com"
						className="mb-8 p-2 rounded-md w-full border-2"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						autoComplete="off"
						id="password"
						type="password"
						placeholder="Password must be at least 8 characters"
						className="mb-8 p-2 rounded-md w-full border-2"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						autoComplete="off"
						id="confirmPassword"
						type="password"
						placeholder="Must match above password"
						className="mb-6 p-2 rounded-md w-full border-2"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<PulseLoader className="self-center mb-4" color="#6a00ff" loading={isLoading}/>
					<button
						type="submit"
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSignUp(e)}
						className="self-center w-11/12 px-8 py-4 font-bold bg-[rgb(0,0,0)] text-[blueviolet] cursor-pointer rounded-full border-b-[2px_solid_blueviolet] border-r-[2px_solid_blueviolet] border-t-[2px_solid_white] border-l-[2px_solid_white] duration-1000 [transition-property:border-top,_border-left,_border-bottom,_border-right,_box-shadow] hover:border-t-[2px_solid_blueviolet] hover:border-l-[2px_solid_blueviolet] hover:border-b-[2px_solid_rgb(238,_103,_238)] hover:border-r-[2px_solid_rgb(238,_103,_238)] hover:[box-shadow:rgba(240,_46,_170,_0.4)_5px_5px,_rgba(240,_46,_170,_0.3)_10px_10px,_rgba(240,_46,_170,_0.2)_15px_15px] mb-8">
						Sign Up
					</button>
					<button
						type="button"
						className="w-fit self-center hover:underline hover:cursor-pointer"
						onClick={() => navigate("/login")}>
						{"< Back To Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUpPage;
