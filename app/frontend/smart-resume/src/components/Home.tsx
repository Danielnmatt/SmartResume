import "../styles/tailwind.css";
import { useTheme } from "./ThemeContext";

const Home = () => {
	const isDark = useTheme();
	return (
		<div className={`${!isDark ? "" : "dark"}`}>
			<div className="flex flex-col h-screen w-screen bg-background transition duration-1000 pt-10">
				<div className="flex flex-col w-full h-fit items-center gap-2 text-foreground transition duration-1000">
					<h1 className="text-6xl">Smart Resume</h1>
					<h2 className="text-2xl">AI-powered job matching for your resume</h2>
				</div>
				<div className="text-foreground">
					
				</div>
			</div>
		</div>
	);
};

export default Home;
