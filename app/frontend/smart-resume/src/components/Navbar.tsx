import "../styles/tailwind.css";
import Logo from "../assets/SmartResume.svg";
import { useTheme, useThemeUpdate } from "./context/ThemeContext";
import { useClearUser } from "./context/UserContext";
import { useNavigate } from "react-router";
import axios from "../api/axios";
import { Toaster } from "./ui/sonner";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { House, FileUser, Check, User } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
	const isDark = useTheme();
	const toggleTheme = useThemeUpdate();
	const navigate = useNavigate();
	const clearUser = useClearUser();

	const handleLogout = async () => {
		try {
			const response = await axios.post("auth/logout");
			if (response.status === 200) {
				clearUser();
				toast.success("Successfully logged out", {
					duration: 5000,
				});
				navigate("/login");
			}
		} catch (e) {
			toast.error("Failed to logged out", {
				duration: 5000,
			});
			console.error(e);
		}
	};

	const navMLStyle = "text-foreground flex flex-row cursor-pointer transition duration-1000";
	const navMLDivStyle = "flex items-center gap-1 w-fit";
	const transition = "transition duration-1000";

	return (
		<div className={!isDark ? "" : "dark"}>
			<Toaster position="top-right" richColors={true} theme={`${!isDark ? "light" : "dark"}`} />
			<NavigationMenu className="bg-card shadow-lg transition duration-1000 shadow-primary-300 hover:shadow-primary dark:shadow-primary dark:hover:shadow-primary-300">
				<NavigationMenuList className="flex flex-row w-screen gap-2">
					<NavigationMenuItem>
						<img src={Logo} alt="Logo" />
					</NavigationMenuItem>
					<NavigationMenuLink onClick={() => navigate("/")} className={navMLStyle}>
						<div className={navMLDivStyle}>
							<House className={transition} />
							<p>Home</p>
						</div>
					</NavigationMenuLink>
					<NavigationMenuLink onClick={() => navigate("/uploadresume")} className={navMLStyle}>
						<div className={navMLDivStyle}>
							<FileUser className={transition} />
							<p>Upload Resume</p>
						</div>
					</NavigationMenuLink>
					<NavigationMenuLink onClick={() => navigate("/matches")} className={navMLStyle}>
						<div className={navMLDivStyle}>
							<Check className={transition} />
							<p>Job Matches</p>
						</div>
					</NavigationMenuLink>
					<div className="flex gap-2 ml-auto mr-4">
						<NavigationMenuItem>
							<Switch
								checked={Boolean(isDark)}
								onCheckedChange={toggleTheme}
								className="data-[state=unchecked]:bg-secondary"
							/>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger
									asChild
									className="cursor-pointer hover:border-2 hover:border-foreground">
									<Avatar>
										<AvatarImage src={""} alt="Avatar" />
										<AvatarFallback>
											<User />
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem className="bg-card">Settings</DropdownMenuItem>
									<DropdownMenuItem>My Resume</DropdownMenuItem>
									<DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</NavigationMenuItem>
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default Navbar;
