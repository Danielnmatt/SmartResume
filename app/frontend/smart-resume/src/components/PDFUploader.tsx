import { useState } from "react";

interface PDFUploaderProps {
	setPdfFile: (file: File | null) => void;
	previewUrl: string;
	setPreviewUrl: (url: string) => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function PdfUploader({ setPdfFile, previewUrl, setPreviewUrl, inputRef }: PDFUploaderProps) {
	const [isInvalid, setIsInvalid] = useState(false);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const droppedFiles = Array.from(e.dataTransfer.files);
		const validFiles = droppedFiles.filter((f) => f.type === "application/pdf");

		if (validFiles.length !== droppedFiles.length) {
			setIsInvalid(true);
			return;
		}

		const pdf = validFiles[0];
		setPdfFile(pdf);
		setIsInvalid(false);

		const url = URL.createObjectURL(pdf);
		setPreviewUrl(url);
	};

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
		const validFiles = selectedFiles.filter((f) => f.type === "application/pdf");

		if (validFiles.length !== selectedFiles.length) {
			setIsInvalid(true);
			return;
		}

		const pdf = validFiles[0];
		setPdfFile(pdf);
		setIsInvalid(false);

		const url = URL.createObjectURL(pdf);
		setPreviewUrl(url);
	};

	return (
		<div className="flex flex-col items-center justify-center h-full bg-background">
			<div
				className="relative bg-gradient-to-br from-primary to-secondary w-full p-8 rounded-lg shadow-lg"
				onDragOver={(e) => e.preventDefault()}
				onDrop={handleDrop}>
				<div className="flex flex-col items-center w-md justify-center h-[514px] rounded-md overflow-hidden relative">
					{previewUrl ? (
						<div className="w-full max-w-[400px] h-[500px] relative overflow-hidden sm:w-[400px] sm:h-[500px]">
							<object
								data={previewUrl + "#toolbar=0&navpanes=0"}
								type="application/pdf"
								width="100%"
								height="550"
								className="w-full h-full overflow-hidden"
							/>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center">
							<UploadIcon className="w-12 h-12 text-muted-foreground" />
							<p className="mt-4 text-white">Drag & drop a PDF here, or click to choose</p>
						</div>
					)}

					<input
						type="file"
						accept="application/pdf"
						className="absolute inset-0 opacity-0 cursor-pointer"
						onChange={handleFileInput}
						ref={inputRef}
					/>
				</div>

				{isInvalid && <div className="mt-4 text-red-500">Only PDF files are allowed. Please try again.</div>}
			</div>
		</div>
	);
}

function UploadIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" x2="12" y1="3" y2="15" />
		</svg>
	);
}
