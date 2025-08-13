import "../../styles/tailwind.css";
import { useState, useRef } from "react";
import PDFUploader from "../PDFUploader";
import { Button } from "../ui/button";
import { useNavigate} from "react-router";
import { toast } from "sonner";
import axios from "../../api/axios";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

const UploadResume = () => {
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");
	const inputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
	const isDark = useTheme();
	const user = useUser();

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!pdfFile) {
			return;
		}

		toast.success("Resume Uploaded", {
			duration: 5000,
			description: "Processing Resume...",
		});

		let errorMessage = "";
		try {
			const formData = new FormData();
			formData.append("resume", pdfFile);
			const response = await axios.post("/users/analyzeresume", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			if (!response || !response.data || !response.data.response) {
				return;
			}

			if (response.data.response.toString().trim().toLowerCase() == "not a resume") {
				errorMessage = "This doesn't look like a resume, please try again.";
				throw new DOMException();
			}

			const result = response.data.response.replaceAll("```", "").replace("json", "");
			const obj = JSON.parse(result);
			const response2 = await axios.post("/users/storeresume", { obj: obj, userID: user.userID });
			if (response2.status === 201) {
				toast.success("Resume Processed Successfully", {
					duration: 5000,
					description: "You can now view your resume in the dashboard.",
					action: {
						label: "View Job Matches",
						onClick: () => {
							navigate("/matches")
						}
					},
				});
				setPdfFile(null);
				setPreviewUrl("");
				if (inputRef.current) {
					inputRef.current.value = "";
				}

				localStorage.setItem("resume-data", JSON.stringify(obj));
			}
		} catch (e) {
			setTimeout(() => {
				toast.error(`${errorMessage ? errorMessage : "Failed To Process Resume"}`, {
					duration: 5000,
					description: "Try again shortly...",
				});
			}, 1000);
			console.log(e);
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
