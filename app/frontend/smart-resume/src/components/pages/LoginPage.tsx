import "../../styles/tailwind.css";
import ContinueWithGoogle from "../../assets/ContinueWithGoogle.tsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useTheme } from "../context/ThemeContext.tsx";
import axios from "../../api/axios";
import { useUser } from "../context/UserContext.tsx";

//TODO: Continue with google, Login logic, Forgot password email sending API
const LoginPage = () => {
	const isDark = useTheme();
	const user = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, []);

	return (
		<div className={`${!isDark ? "" : "dark"} h-screen w-screen`}>
			<div className="flex h-full w-full bg-background transition duration-1000">
				<div className="m-auto h-5/6 w-9/24 flex flex-col items-center rounded-xl">{<PageView />}</div>
			</div>
		</div>
	);
};

const PageView = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [fpEmail, setfpEmail] = useState<string>("");
	const [defaultView, setDefaultView] = useState<boolean>(true); //True = login page, False = Forgot Password Page

	const resetInputs = () => {
		setEmail("");
		setPassword("");
		setfpEmail("");
	};

	useEffect(resetInputs, [defaultView]);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		//API Request (?)
		let errorMessage = "";
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (!email || !password) {
			errorMessage += "All fields must be filled.\n";
		}

		if (email && !emailRegex.test(email)) {
			errorMessage += "Invalid email address.\n";
		}

		try {
			if (errorMessage) {
				throw new DOMException();
			}
			const res = await axios.post("/auth/login", { email, password });
			if (res.data.success) {
				toast.success("Login was successful", {
					duration: 1000,
					closeButton: true,
					description: "redirecting shortly...",
				});
				setTimeout(() => {
					navigate("/");
				}, 1000);
			}
		} catch (e: any) {
			toast.error("Login was unsuccessful", {
				description: errorMessage
					? errorMessage
					: e.status === 404
						? "Page Not Found"
						: "Incorrect email or password",
				closeButton: true,
				action: {
					label: "Clear Input Fields",
					onClick: () => {
						setEmail(""), setPassword("");
					},
				},
				actionButtonStyle: {
					background: "#ff6666",
					color: "white",
				},
				duration: 5000,
			});
			console.error(e);
		}
	};

	return (
		<div
			className={`flex flex-col items-center self-center justify-self-center ${defaultView ? "h-full" : "h-3/5"} w-full text-foreground transition duration-1000`}>
			<h1 className="text-4xl">{defaultView ? "Login" : "Reset Password"}</h1>
			<h1 className={!defaultView ? "text-xl mt-10" : "hidden"}>
				Enter the email address associated with your account we'll send you an email with a password reset link.
			</h1>
			<div className="w-full mt-12 h-4/5 p-4 rounded-lg shadow-lg shadow-primary bg-card transition duration-1000">
				<form className="flex flex-col text-foreground ">
					<label htmlFor="email" className="transition duration-1000">
						{defaultView ? "Email" : "Email address"}
					</label>
					<input
						autoComplete="off"
						id="email"
						type="text"
						placeholder={"ExampleEmail@email.com"}
						className="bg-input mb-8 p-2 rounded-md w-full border-2 transition duration-1000"
						value={defaultView ? email : fpEmail}
						onChange={defaultView ? (e) => setEmail(e.target.value) : (e) => setfpEmail(e.target.value)}
					/>
					<label htmlFor="password" className={`${defaultView ? "flex" : "hidden"} transition duration-1000`}>
						Password
					</label>
					<input
						autoComplete="off"
						id="password"
						type="password"
						placeholder="Password is at least 8 characters"
						className={`${defaultView ? "bg-input mb-8 p-2 rounded-md w-full border-2" : "hidden"} transition duration-1000`}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="button"
						className={`${defaultView ? "self-end mb-8 w-fit hover:underline hover:cursor-pointer" : "hidden"} transition duration-1000`}
						onClick={() => setDefaultView(!defaultView)}>
						Forgot password?
					</button>
					<button
						onClick={(e) => handleSubmit(e)}
						className="w-10/12 self-center px-1 py-1 inline-flex items-center justify-center text-white text-[18px] whitespace-nowrap cursor-pointer rounded-full bg-[linear-gradient(135deg,var(--color-primary-700),var(--color-secondary-700))] hover:outline-none active:outline-none mb-6">
						<span className="bg-[rgb(5,6,45)] w-full px-6 py-4 rounded-full transition-all duration-500 ease-in-out hover:bg-transparent">
							{defaultView ? "Login" : "Submit"}
						</span>
					</button>
					<div className={defaultView ? "flex flex-row justify-between mt-4 mb-4" : "hidden"}>
						<ContinueWithGoogle />
						<button
							type="button"
							className="hover:bg-primary-200 dark:hover:bg-primary-900 border-foreground bg-transparent border-[1px] text-foreground self-center w-55 flex px-[1.4rem] py-2 text-[0.875rem] font-bold justify-center items-center rounded-lg gap-3 cursor-pointer h-14 transition duration-1000"
							onClick={() => navigate("/signup")}>
							Sign up
						</button>
					</div>
					<button
						type="button"
						className={
							!defaultView
								? "transition duration-1000 w-fit self-center hover:underline hover:cursor-pointer"
								: "hidden"
						}
						onClick={() => setDefaultView(!defaultView)}>
						{"< Back To Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
