import { useEffect, useState, useContext, createContext } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "../../api/axios";

const UserContext = createContext({});
const ClearUserContext = createContext({});

export const useUser = (): any => useContext(UserContext);
export const useClearUser = (): any => useContext(ClearUserContext);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
	const [user, setUser] = useState<any>(null);
	const navigate = useNavigate();
	const location = useLocation();

	const clearUser = () => {
		setUser(null);
	};

	useEffect(() => {
		const getProfile = async () => {
			if (!user) {
				try {
					const response = await axios.get("/auth/profile");
					if (response) {
						const profile: any = {
							userID: response.data.id,
							userEmail: response.data.email,
						};
						setUser(profile);
					}
				} catch (e: any) {
					if (e.status === 403) {
						setUser(null);
						navigate("/login");
					}
				}
			}
		};
		getProfile();
	}, [location.pathname === "/uploadresume", location.pathname === "/matches"]);

	return (
		<UserContext.Provider value={user}>
			<ClearUserContext.Provider value={() => clearUser()}>{children}</ClearUserContext.Provider>
		</UserContext.Provider>
	);
};
