import { useEffect, useState } from "react";

function Skills() {
	const [kata, setKata] = useState({
		name: "",
		url: "",
	});

	const users = ["g964", "jhoffner", "myjinxin2015"];

	const randomIndex = Math.floor(Math.random() * users.length);

	const randomUser = users[randomIndex];

	console.log(randomUser);

	const userUrl = `https://www.codewars.com/api/v1/users/${randomUser}/code-challenges/completed?page=0`;
	const kataUrl = "https://www.codewars.com/api/v1/code-challenges/";
	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await fetch(userUrl);
				const data = await response.json();
				console.log(data);
				filterData(data.data);
			} catch (error) {
				console.error(error);
			}
		}

		fetchUser();
	}, []);
	function filterData(userData: any) {
		console.log(userData);

		let filteredKatas = userData.filter((kata: any) =>
			kata.completedLanguages.includes("javascript")
		);
		console.log(filteredKatas);

		fetchRandomKata(filteredKatas);
	}
	// Gets one random Kata
	function fetchRandomKata(katas: any) {
		console.log(katas.length);
		const randomIndex = Math.floor(Math.random() * katas.length);
		console.log(randomIndex);

		const randomKata = katas[randomIndex];
		console.log(randomKata);

		fetchKata(randomKata);
	}

	async function fetchKata(kata: any) {
		const response = await fetch(kataUrl + kata.slug);
		const data = await response.json();
		console.log(data);
		setKata({
			name: data.name,
			url: data.url,
		});
	}
	return (
		<section className="bg-gray-900 relative overflow-hidden flex justify-center items-center min-h-screen">
			<div className="container px-6 py-16 mx-auto relative">
				<div className="bg-grey-800/50 border border-teal-500/30 px-6 py-16 w-1/2 mx-auto">
					{kata ? (
						<div className="text-center text-gray-400">
							<div className="my-14">{kata.name}</div>
							<div>
								<a href={kata.url} target="_blank" rel="noopener noreferrer">
									<button className="hover:shadow-lg bg-teal-500/50 font-semibold border-teal-400 py-3 px-6">Codewars Link</button>
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
