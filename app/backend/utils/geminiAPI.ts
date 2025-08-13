import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function fileToGenerativePart(path: string, mimeType: string) {
	return {
		inlineData: {
			data: Buffer.from(fs.readFileSync(path)).toString("base64"),
			mimeType,
		},
	};
}

export async function analyzeResume(path: string): Promise<string | null> {
	try {
		const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
		const resumePath = path;

		const prompt = `Please view this file and determine if it is a standard resume. Standard resumes should be roughly 1 page long and include an experience/projects/employment section and skills section. If not, output: "not a resume" and nothing else. If the file is determined to be a valid resume, review it carefully and do not infer anything about the candidate. Output the following as a standard json file. Follow this example json and for the keywords category do not make subcategories. Just list the keywords found:
		{
			"keywords" : ["keyword1", "keyword2", "keyword3", ...],
			"recommendations" : { "rec1": {"action": "action1", "example": "example1"}, "rec2": {"action": "action2", "example": "example2"}, "rec3": {"action": "action3", "example": "example3"}},
			"best_job" : ["bestjob1", "bestjob2", "bestjob3"]
		}
1.  Carefully extract all keywords from the "Skills" section and only the most relevant keywords from the "Projects/Experience" sections. List these keywords from most relevant to least relevant and avoid using acronyms.
2.  Provide 3 specific, actionable recommendations for improving the resume and give specific examples. 
3.  Based on the content, suggest three of the best-fitting job titles for the skills and experience this resume currently has.`;

		const resumeFilePart = fileToGenerativePart(resumePath, "application/pdf");
		const result = await model.generateContent([prompt, resumeFilePart]);
		const response = result.response;
		const text = response.text();

		return text;
	}
	catch (error) {
		console.error("Error analyzing resume:", error);
		return null;
	}
}
