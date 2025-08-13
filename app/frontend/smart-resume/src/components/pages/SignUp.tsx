import "../../styles/tailwind.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axios from "../../api/axios";
import PulseLoader from "react-spinners/PulseLoader";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

//TODO: Email verification upon sign up
const SignUp = () => {
	const isDark = useTheme();
	const user = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, []);

	return (
		<div className={`flex flex-col w-screen h-screen ${!isDark ? "" : "dark"}`}>
			<div className="flex bg-background h-screen w-screen transition duration-1000">
				<div className="m-auto h-5/6 w-9/24 flex flex-col items-center rounded-xl">
					{<PageView />}
				</div>
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
		const emailRegex = /^[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

		if (!email || !password || !confirmPassword) {
			errorMessage += "All fields must be filled.\n";
		}
		if (password !== confirmPassword) {
			errorMessage += "Passwords must match.\n";
		}
		if (email && !emailRegex.test(email)) {
			errorMessage += "Invalid email address format.\n";
		}
		if (password && !passwordRegex.test(password)) {
			errorMessage += "Password must:\n- Be at least 8 characters long\n- Include at least one uppercase letter\n- Include at least one lowercase letter\n- Include at least one number\n";
		}

		if (errorMessage) {
			toast.error("Signup Error", {
				description: errorMessage,
				closeButton: true,
				action: {
					label: "Clear Input Fields",
					onClick: () => {
						setEmail(""), setPassword(""), setConfirmPassword("");
					},
				},
				actionButtonStyle: {
					background: "#ff6666",
					color: "white",
					alignSelf: "end"
				},
				duration: 500000,
			});
			return;
		}

		try {
			const response = await axios.post("/auth/signup", { email, password });
			if (response.data.success) {
				toast.success("Signup was successful", {
					duration: 5000,
					closeButton: true,
					description: "redirecting shortly...",
				});
				setIsLoading(true);
				setTimeout(() => {
					navigate("/");
				}, 5000);
			}
		} catch (e) {
			toast.error("Error Signing Up", {
				description: "An error occurred while creating your account. Please try again.",
				closeButton: true,
				action: {
					label: "Clear Input Fields",
					onClick: () => {
						setEmail(""), setPassword(""), setConfirmPassword("");
					},
				},
				actionButtonStyle: {
					background: "#ff6666",
					color: "white",
				},
				duration: 500000,
			});
			console.error("Error signing up, please try again: " + e);
		}
	};

	return (
		<div className="flex flex-col items-center self-center justify-self-center h-4/5 w-full">
			<h1 className="text-4xl text-foreground transition duration-1000">Sign up</h1>
			<div className="w-full bg-card rounded-lg shadow-lg shadow-primary mt-12 h-full p-4 transition duration-1000">
				<form className="flex flex-col text-card-foreground transition duration-1000">
					<label className="w-fit" htmlFor="email">
						Email
					</label>
					<input
						autoComplete="off"
						id="email"
						type="text"
						placeholder="ExampleEmail@email.com"
						className="bg-input mb-8 p-2 rounded-md w-full border-2 text-foreground transition duration-1000"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label className="w-fit" htmlFor="password">
						Password
					</label>
					<input
						autoComplete="off"
						id="password"
						type="password"
						placeholder="At least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number"
						className="bg-input mb-8 p-2 rounded-md w-full border-2 text-foreground transition duration-1000"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label className="w-fit" htmlFor="confirmPassword">
						Confirm Password
					</label>
					<input
						autoComplete="off"
						id="confirmPassword"
						type="password"
						placeholder="Must match above password"
						className="bg-input mb-8 p-2 rounded-md w-full border-2 text-foreground transition duration-1000"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<PulseLoader className="self-center mb-4" color="#6a00ff" loading={isLoading} />
					<button
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSignUp(e)}
						className="w-10/12 self-center px-1 py-1 inline-flex items-center justify-center text-white text-[18px] whitespace-nowrap cursor-pointer rounded-full bg-[linear-gradient(135deg,var(--color-primary-700),var(--color-secondary-700))] hover:outline-none active:outline-none mb-6">
						<span className="bg-[rgb(5,6,45)] w-full h-full px-6 py-4 rounded-full transition-all duration-500 ease-in-out hover:bg-transparent">
							Sign Up
						</span>
					</button>

					<button
						type="button"
						className="w-fit self-center hover:underline hover:cursor-pointer transition duration-1000"
						onClick={() => navigate("/login")}>
						{"< Back To Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
