import "../styles/tailwind.css";
import { BiHome } from "react-icons/bi";
import Logo from "../../public/SmartResume.svg"

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
const Navbar = () => {
	return (
        <NavigationMenu className="bg-card">
            <NavigationMenuList className="w-screen">
                <NavigationMenuItem className=""><img src={Logo} alt="Logo" /></NavigationMenuItem>
                <NavigationMenuLink onClick={() => {}} className="flex flex-row"><BiHome />Home</NavigationMenuLink>
            </NavigationMenuList>
        </NavigationMenu>
    )
};

export default Navbar;