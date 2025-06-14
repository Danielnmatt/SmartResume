import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function CardDemo() {
	return (
		<Card className="w-full max-w-sm h-fit">
			<CardHeader>
				<CardTitle className="text-2xl">Resume Summary</CardTitle>
			</CardHeader>
			<CardContent>
                <CardTitle className="text-lg">Skills</CardTitle>
                <div className="flex justify-between">
                    <CardDescription className="bg-purple-800 p-2 text-shadow-lg text-shadow-black text-white font-bold text-md rounded-[20px]">React</CardDescription>
                    <CardDescription className="bg-purple-800 p-2 text-shadow-lg text-shadow-black text-white font-bold text-md rounded-[20px]">Node.js</CardDescription>
                    <CardDescription className="bg-purple-800 p-2 text-shadow-lg text-shadow-black text-white font-bold text-md rounded-[20px]">Javascript</CardDescription>
                </div>
                <CardTitle className="text-lg mt-4">Titles</CardTitle>
                <div className="flex justify-between">
                    <CardDescription className="bg-purple-800 p-2 text-shadow-lg text-shadow-black text-white font-bold text-md rounded-[20px]">React</CardDescription>
                    <CardDescription className="bg-purple-800 p-2 text-shadow-lg text-shadow-black text-white font-bold text-md rounded-[20px]">Node.js</CardDescription>
                    <CardDescription className="bg-purple-800 p-2 text-shadow-lg text-shadow-black text-white font-bold text-md rounded-[20px]">Javascript</CardDescription>
                </div>
			</CardContent>
		</Card>
	);
}

export default CardDemo;