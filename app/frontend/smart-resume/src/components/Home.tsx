import "../styles/tailwind.css";
import { useState, useRef } from "react";
import PDFUploader from "./PDFUploader";
import { Button } from "./ui/button";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import CardDemo from "./CardDemo";
import axios from "../api/axios"

const Home = () => {
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (pdfFile) {
			console.log("GOOBER");
			//Must send pdfFile to backend
			// axios.post("/uploadResume", pdfFile).catch((error) => {
			// 	console.error("Error uploading file: ", error);
			// });
		}
	};

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const oldFile = pdfFile;
		const oldPreviewUrl = previewUrl;

		setPdfFile(null);
		setPreviewUrl("");

		if (inputRef.current) {
			inputRef.current.value = "";
		}

		toast("Cancelled File Upload", {
			duration: 5000,
			action: {
				label: "Undo",
				onClick: () => {
					setPdfFile(oldFile);
					setPreviewUrl(oldPreviewUrl);
				},
			},
		});
	};

	return (
		<div className={"flex flex-col h-screen w-screen"}>
			<Toaster position="top-right" />
			<div className="flex bg-primary h-1/12 w-full justify-center">
				<h1 className={"text-secondary text-shadow-lg text-shadow-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"}>
					SMART RESUME
				</h1>
			</div>
			<div className="flex flex-row">
				<div className="flex flex-col w-fit ml-8 mt-8">
					<PDFUploader
						inputRef={inputRef}
						previewUrl={previewUrl}
						setPreviewUrl={setPreviewUrl}
						setPdfFile={setPdfFile}
					/>
					<div className="flex flex-row justify-between h-fit">
						<Button
							onClick={handleUpload}
							disabled={!pdfFile}
							className="self-center w-2/5 px-8 py-4 font-bold bg-[rgb(0,180,0)] text-[white] cursor-pointer rounded-full border-b-[2px_solid_blueviolet] border-r-[2px_solid_blueviolet] border-t-[2px_solid_white] border-l-[2px_solid_white] duration-1000 [transition-property:border-top,_border-left,_border-bottom,_border-right,_box-shadow] hover:border-t-[2px_solid_blueviolet] hover:border-l-[2px_solid_blueviolet] hover:border-b-[2px_solid_rgb(238,_103,_238)] hover:border-r-[2px_solid_rgb(238,_103,_238)] hover:[box-shadow:rgba(240,_46,_170,_0.4)_5px_5px,_rgba(240,_46,_170,_0.3)_10px_10px,_rgba(240,_46,_170,_0.2)_15px_15px]">
							Upload
						</Button>
						<Button
							onClick={handleCancel}
							disabled={!pdfFile}
							className="self-center w-2/5 px-8 py-4 font-bold bg-[rgb(180,0,0)] text-[white] cursor-pointer rounded-full border-b-[2px_solid_blueviolet] border-r-[2px_solid_blueviolet] border-t-[2px_solid_white] border-l-[2px_solid_white] duration-1000 [transition-property:border-top,_border-left,_border-bottom,_border-right,_box-shadow] hover:border-t-[2px_solid_blueviolet] hover:border-l-[2px_solid_blueviolet] hover:border-b-[2px_solid_rgb(238,_103,_238)] hover:border-r-[2px_solid_rgb(238,_103,_238)] hover:[box-shadow:rgba(240,_46,_170,_0.4)_5px_5px,_rgba(240,_46,_170,_0.3)_10px_10px,_rgba(240,_46,_170,_0.2)_15px_15px]">
							Cancel
						</Button>
					</div>
				</div>
				<CardDemo />
			</div>
		</div>
	);
};

export default Home;
