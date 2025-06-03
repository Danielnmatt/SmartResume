import "../styles/tailwind.css";
const Home = () => {
    return (
        <div className={"flex flex-col h-screen w-screen bg-[#010104]"}>
            <div className="flex bg-secondary h-1/12 w-full justify-center">
                <h1 className={"h-min text-primary text-6xl"}>SMART RESUME</h1>
            </div>
            <div className="m-auto h-1/4 w-1/4 bg-amber-700">
            </div>
        </div>
    )
}

export default Home