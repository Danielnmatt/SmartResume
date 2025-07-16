import "../../styles/tailwind.css";
import { useTheme } from "../context/ThemeContext";
import axios from "../../api/axios";

const Home = () => {
	const isDark = useTheme();

	const apiTest = async () => {
		const options = {
			method: "GET",
			url: "https://jsearch.p.rapidapi.com/estimated-salary",
			params: {
				job_title: "nodejs developer",
				location: "new york",
				location_type: "ANY",
				years_of_experience: "ALL",
			},
			headers: {
				"x-rapidapi-key": "REDACTED",
				"x-rapidapi-host": "jsearch.p.rapidapi.com",
			},
		};

		try {
			const response = await axios.request(options);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className={`${!isDark ? "" : "dark"}`}>
			<div className="flex flex-col h-screen w-screen bg-background transition duration-1000 pt-10">
				<div className="flex flex-col w-full h-fit items-center gap-2 text-foreground transition duration-1000">
					<h1 className="text-6xl">Smart Resume</h1>
					<h2 className="text-2xl">AI-powered job matching for your resume</h2>
				</div>
				<div className="text-foreground">
					<button className="border-2 border-black hover:cursor-pointer" onClick={apiTest}>
						GOOF
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
