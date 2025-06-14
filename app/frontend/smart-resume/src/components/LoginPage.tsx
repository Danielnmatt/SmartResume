import "../styles/tailwind.css";
import ContinueWithGoogle from "./ContinueWithGoogle.tsx";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router'

// interface ViewToggle {
//     toggleView: boolean;
//     setToggleView: React.Dispatch<React.SetStateAction<boolean>>
// }

//TODO: Continue with google, Login logic, Forgot password email sending API
const LoginPage = () => {
    return (
        <div className="flex h-screen w-screen">
            <div className="m-auto h-5/6 w-7/24 flex flex-col items-center rounded-xl">
                <h1 className="text-5xl mb-5">Smart Resume</h1>
                {<PageView />}
            </div>
        </div>
    );
};

const PageView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fpEmail, setfpEmail] = useState("");
    const [toggleView, setToggleView] = useState(true); //True = login page, False = Forgot Password Page
    const navigate = useNavigate()

    const resetInputs = () => {
        setUsername("");
        setPassword("");
        setfpEmail("");
    }

    useEffect(resetInputs, [toggleView])

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        //API Request
        console.log(username, password)
        navigate('/')
    };

    return (
        <div className="flex flex-col items-center self-center justify-self-center h-4/5 w-4/5">
            <h1 className="text-4xl">{toggleView ? "Login" : "Reset Password"}</h1>
            <h1 className={!toggleView ? "text-xl mt-10" : "hidden"}>
                Enter the email address associated with your account we'll send you an email with a password reset link.
            </h1>
            <div className="w-9/10 mt-12 h-4/5 p-4 border-[.5px] shadow-2xl">
                <form className="flex flex-col">
                    <label htmlFor="username">{toggleView ? "Username" : "Email address"}</label>
                    <input
                        autoComplete="off"
                        id="username"
                        type="text"
                        placeholder={toggleView ? "john.cena123" : "frjohncena@gmail.com"}
                        className="mb-6 p-2 rounded-md w-full border-2"
                        value={toggleView ? username : fpEmail}
                        onChange={toggleView ? (e) => setUsername(e.target.value) : (e) => setfpEmail(e.target.value)}
                    />
                    <label htmlFor="password" className={toggleView ? "flex" : "hidden"}>
                        Password
                    </label>
                    <input
                        autoComplete="off"
                        id="password"
                        type="password"
                        placeholder="ucanTseeMe!"
                        className={toggleView ? "mb-2 p-2 rounded-md w-full border-2" : "hidden"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className={toggleView ? "self-end mb-8 w-fit hover:underline hover:cursor-pointer" : "hidden"}
                        onClick={() => setToggleView(!toggleView)}>
                        Forgot password?
                    </button>
                    <button
                        type="submit"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
                        className="self-center w-11/12 px-8 py-4 font-bold bg-[rgb(0,0,0)] text-[blueviolet] cursor-pointer rounded-full border-b-[2px_solid_blueviolet] border-r-[2px_solid_blueviolet] border-t-[2px_solid_white] border-l-[2px_solid_white] duration-1000 [transition-property:border-top,_border-left,_border-bottom,_border-right,_box-shadow] hover:border-t-[2px_solid_blueviolet] hover:border-l-[2px_solid_blueviolet] hover:border-b-[2px_solid_rgb(238,_103,_238)] hover:border-r-[2px_solid_rgb(238,_103,_238)] hover:[box-shadow:rgba(240,_46,_170,_0.4)_5px_5px,_rgba(240,_46,_170,_0.3)_10px_10px,_rgba(240,_46,_170,_0.2)_15px_15px] mb-8">
                        {toggleView ? "Login" : "Submit"}
                    </button>
                    <div className={toggleView ? "flex flex-row justify-between" : "hidden"}>
                        <ContinueWithGoogle />
                        <button
                            type="button"
                            className="self-center max-w-[320px] flex px-[1.4rem] py-2 text-[0.875rem] leading-5 font-bold text-center align-middle items-center rounded-lg border-[1px] border-[rgba(0,0,0,0.25)] gap-3 text-[rgb(65,_63,_63)] bg-[#fff] cursor-pointer [transition:all_.6s_ease]"
                            onClick={() => navigate('/signup')}>
                            Sign up
                        </button>
                    </div>
                    <button
                        type="button"
                        className={!toggleView ? "w-fit self-center hover:underline hover:cursor-pointer" : "hidden"}
                        onClick={() => setToggleView(!toggleView)}>
                        {"< Back To Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;