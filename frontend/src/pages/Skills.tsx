import { useEffect, useState } from "react";

function Skills() {
	const [kata, setKata] = useState({
		name: "",
		url: "",
	});

	useEffect(() => {
		async function fetchUser() {
			try {
			
				const response = await fetch("/api/codewars");
				const data = await response.json();
				console.log(data);
				setKata({
					name: data.name,
					url: data.url,
				});
			} catch (error) {
				console.error(error);
			}
		}
		fetchUser();
	}, []);

	return (
		<section className="bg-gray-900 relative overflow-hidden flex justify-center items-center min-h-screen">
			<div className="container px-6 py-16 mx-auto relative">
				<div className="bg-grey-800/50 border border-teal-500/30 px-6 py-16 w-1/2 mx-auto">
					{kata ? (
						<div className="text-center text-gray-400">
							<h1 className="text-4xl font-bold">Random Daily Kata</h1>
							<div className="my-14 text-xl min-h-[30px]">{kata.name}</div>
							<div>
								<a href={kata.url} target="_blank" rel="noopener noreferrer">
									<button className="hover:shadow-lg bg-teal-500/50 font-semibold border-teal-400 py-3 px-6">
										Codewars Link
									</button>
								</a>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</section>
	);
}

export default Skills;
