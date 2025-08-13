import "../../styles/tailwind.css";
import { useTheme } from "../context/ThemeContext";
import axios from "../../api/axios";
import { jobMapping, isNumeric } from "../../functions";
import { useState } from "react";

const Home = () => {
	const [jobs, setJobs] = useState<any[]>([]);
	const isDark = useTheme();

	const jobSearch = async () => {
		const res = await axios.get(`/api/jsearch`);
		let jobsData = res.data.data;
		setJobs(jobsData);
		// const jobList = jobMapping(jobsData)
		// console.log(jobList)
	};

	const jobHandler = (jobsData: any) => {
		console.log("JOBHANLDER WAS CALLED");
		console.log(jobsData);
		const jobList = jobsData.map((job: any) => {
			let salary_range: string = "";
			if ((!job.job_min_salary || !job.job_max_salary) && job.job_highlights.Benefits) {
				const temp = { benefits: job.job_highlights.Benefits };
				let start: number = 0;
				let end: number = 0;

				for (let i = 0; i < temp.benefits.length; i++) {
					let benefit = temp.benefits[i];
					if (benefit.includes("$")) {
						let lowSalary: string = "";
						let highSalary: string = "";
						if (benefit.replace("$", "").length <= benefit.length - 2) {
							start = benefit.indexOf("$") + 1;
							end = benefit.indexOf("$", start + 1) + 1;

							let s_end = start + 10;
							for (start; start < s_end; start++){
								if (isNumeric(benefit[start])) {
									lowSalary += benefit[start];
								}
							}

							let e_end = end + 10;
							for (end; end < e_end; end++){
								if (isNumeric(benefit[end])) {
									highSalary += benefit[end];
								}
							}

							salary_range = `${lowSalary} - ${highSalary}`;
							break;
						}
						else {
							start = benefit.indexOf("$") + 1;
							let s_end = start + 10;
							for (start; start < s_end; start++){
								if (isNumeric(benefit[start])) {
									lowSalary += benefit[start];
								}
							}

							let e_end = end + 10;
							end = temp.benefits[i + 1].indexOf("$") + 1;
							for (end; end < e_end; end++) {
								if (isNumeric(benefit[end])) {
									lowSalary += benefit[end];
								}
								end++;
							}

							salary_range = `${lowSalary} - ${highSalary}`;
							break;
						}
					}
				}
			}

			return {
				applyLink: job.job_apply_link,
				logo: job.employer_logo,
				employer: job.employer_name,
				location: job.job_location,
				description: job.job_description,
				postedAt: job.job_posted_at,
				salaryRange: salary_range
					? salary_range
					: job.job_min_salary && job.job_max_salary
						? `${job.job_min_salary} - ${job.job_max_salary}`
						: "Not Specified",
				title: job.job_title,
				employmentType: job.job_employment_type,
				benefits: job.job_highlights.Benefits,
				qualifications: job.job_highlights.Qualifications,
				responsibilities: job.job_highlights.Responsibilities,
				jobID: job.job_id,
			};
		});

		const test = jobMapping(jobsData)

		console.log(jobList)
		console.log(test)
	};

	return (
		<div className={`${!isDark ? "" : "dark"}`}>
			<div className="flex flex-col h-screen w-screen bg-background transition duration-1000 pt-10">
				<div className="flex flex-col w-full h-fit items-center gap-2 text-foreground transition duration-1000">
					<h1 className="text-6xl">Smart Resume</h1>
					<h2 className="text-2xl">AI-powered job matching for your resume</h2>
				</div>
				<div className="text-foreground">
					<button className="border-2 border-black hover:cursor-pointer" onClick={jobSearch}>
						API TEST
					</button>
					<button className="border-2 border-black hover:cursor-pointer" onClick={() => jobHandler(jobs)}>
						MAPPING TEST
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
