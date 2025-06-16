import { Link } from "react-router";
import { useTheme } from "./ThemeContext";

export default function NotFound() {
	const isDark = useTheme();

	return (
		<div className={`${!isDark ? "" : "dark"}`}>
			<div className="min-h-screen flex flex-col justify-center pb-[12em] items-center bg-background text-center px-4 transition duration-1000">
				<h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
				<p className="text-2xl text-muted-foreground mb-2">Page Not Found</p>
				<p className="text-muted-foreground mb-6">Sorry, the page you're looking for doesn't exist.</p>

				<Link
					to="/"
					className="bg-secondary-500 hover:bg-secondary-400 text-black font-semibold px-6 py-2 rounded transition">
					⬅️ Go Back Home
				</Link>
			</div>
		</div>
	);
}
