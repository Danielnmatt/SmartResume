import "../styles/tailwind.css";
import Test from "./test";
const Home = () => {
	return (
		<div className={"flex flex-col h-screen w-screen bg-[#010104]"}>
			<div className="flex bg-secondary h-1/12 w-full justify-center">
				<h1 className={"h-min text-primary text-6xl"}>SMART RESUME</h1>
			</div>
			<div className="m-auto w-1/4 h-1/4">
                <Test/>
            </div>
		</div>
	);
};

export default Home;
