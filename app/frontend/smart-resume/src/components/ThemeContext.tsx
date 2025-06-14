import {useContext, useState, createContext} from "react"
import {Switch} from "./ui/switch"

const ThemeContext = createContext({});

export const ThemeProvider = ({children} : any) => {
    const [isDark, setIsDark] = useState(false);

    return (
        <ThemeContext.Provider value={isDark}>
            {children}
        </ThemeContext.Provider>
    )
}