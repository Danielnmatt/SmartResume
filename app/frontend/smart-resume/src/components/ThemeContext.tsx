import { useEffect, useContext, useState, createContext } from "react";

const ThemeContext = createContext({});
const ThemeUpdateContext = createContext(() => {});

export const useTheme = () => {
	return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
	return useContext(ThemeUpdateContext);
};

export const ThemeProvider = ({ children }: any) => {
	const [isDark, setIsDark] = useState<boolean>(false);

	useEffect(() => {
		if(!localStorage.getItem("theme")){
			localStorage.setItem("theme", "light");
		}
		else if(localStorage.getItem("theme") === "dark"){
			setIsDark(true)
		}
		else{
			setIsDark(false);
		}
	}, [])

	const toggleTheme = () => {
		setIsDark((prevTheme) => !prevTheme);
		localStorage.setItem("theme", localStorage.getItem("theme") === "dark" ? "light" : "dark")
	};

	return (
		<ThemeContext.Provider value={isDark}>
			<ThemeUpdateContext.Provider value={toggleTheme}>{children}</ThemeUpdateContext.Provider>
		</ThemeContext.Provider>
	);
};
