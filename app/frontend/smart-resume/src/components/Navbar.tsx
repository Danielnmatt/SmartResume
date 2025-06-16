import "../styles/tailwind.css";
import Logo from "../assets/SmartResume.svg";
import { useTheme, useThemeUpdate } from "./ThemeContext";
import { useNavigate } from "react-router";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, } from "./ui/navigation-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "./ui/dropdown-menu"
import { Switch } from "./ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { House, FileUser, Check, User } from "lucide-react";

const Navbar = () => {
	const isDark = useTheme();
	const toggleTheme = useThemeUpdate();
	const navigate = useNavigate();

	return (
		<div className={!isDark ? "" : "dark"}>
			<NavigationMenu className="bg-card shadow-lg transition duration-1000 shadow-primary-300 hover:shadow-primary dark:shadow-primary dark:hover:shadow-primary-300">
				<NavigationMenuList className="w-screen gap-2">
					<NavigationMenuItem>
						<img src={Logo} alt="Logo" />
					</NavigationMenuItem>
					<NavigationMenuLink onClick={() => navigate("/")} className="text-foreground flex flex-row cursor-pointer transition duration-1000">
						<div className="flex items-center gap-1 w-fit">
							<House className="transition duration-1000" />
							<p>Home</p>
						</div>
					</NavigationMenuLink>
					<NavigationMenuLink onClick={() => navigate("/uploadresume")} className="text-foreground flex flex-row cursor-pointer transition duration-1000">
						<div className="flex items-center gap-1 w-fit">
							<FileUser className="transition duration-1000" />
							<p>Upload Resume</p>
						</div>
					</NavigationMenuLink>
					<NavigationMenuLink onClick={() => navigate("/matches")} className="text-foreground flex flex-row cursor-pointer transition duration-1000">
						<div className="flex items-center gap-1 w-fit">
							<Check className="transition duration-1000" />
							<p>Job Matches</p>
						</div>
					</NavigationMenuLink>
					<NavigationMenuItem>
						<Switch checked={Boolean(isDark)} onCheckedChange={toggleTheme} className="data-[state=unchecked]:bg-secondary" />
					</NavigationMenuItem>
					<NavigationMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild className="cursor-pointer">
								<Avatar >
									<AvatarImage src={""} alt="Avatar" />
									<AvatarFallback>
										<User />
									</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem className="bg-card">Settings</DropdownMenuItem>
									<DropdownMenuItem>My Resume</DropdownMenuItem>
									<DropdownMenuItem>Logout</DropdownMenuItem>
								</DropdownMenuContent>
						</DropdownMenu>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default Navbar;
