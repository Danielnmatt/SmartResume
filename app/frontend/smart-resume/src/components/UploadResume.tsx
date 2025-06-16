import "../styles/tailwind.css";
import { useState, useRef } from "react";
import PDFUploader from "./PDFUploader";
import { Button } from "./ui/button";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import axios from "../api/axios";
import { useTheme } from "./ThemeContext";

const UploadResume = () => {
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");
	const inputRef = useRef<HTMLInputElement | null>(null);
	const isDark = useTheme();

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!pdfFile) {
			return;
		}
		try {
			// Must send pdfFile to backend
			const response = await axios.post("/uploadresume", pdfFile);

			if (response.data.success) {
				toast.success("Resume Uploaded", {
					duration: 5000,
					description: "Finding jobs...",
				});
			}
		} catch (e) {
			toast.error("Failed To Upload Resume", {
				duration: 5000,
				description: "Try again shortly...",
			});
		}
	};

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!pdfFile) {
			return;
		}

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
		<div className={`${!isDark ? "" : "dark"}`}>
			<div className={"flex flex-col h-screen w-screen bg-background transition duration-1000"}>
				<Toaster
					theme={!isDark ? "light" : "dark"}
					toastOptions={{ classNames: { description: "whitespace-pre" } }}
					richColors={true}
					position="top-right"
				/>
				<div className="flex flex-row ml-auto mr-auto mt-8 ">
					<div className="flex flex-col w-fit ml-8 mt-8">
						<PDFUploader
							inputRef={inputRef}
							previewUrl={previewUrl}
							setPreviewUrl={setPreviewUrl}
							setPdfFile={setPdfFile}
						/>
						<div className="flex flex-row justify-between h-fit mt-2">
							<Button
								onClick={handleSubmit}
								className={`${!pdfFile ? "hidden" : "flex"} self-center w-2/5 px-8 py-4 font-bold bg-[rgb(0,180,0)] dark:bg-[rgb(0,90,0)] text-[white] cursor-pointer rounded-full`}>
								Submit
							</Button>
							<Button
								onClick={handleCancel}
								className={`${!pdfFile ? "hidden" : "flex"} self-center w-2/5 px-8 py-4 font-bold bg-[rgb(180,0,0)] text-[white] cursor-pointer rounded-full`}>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadResume;
