import { Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middleware/validate.js";
import { register, login, logout } from "../../controllers/authController.js";
import jobRoutes from "../jobs.js";
import { Request, Response, NextFunction } from "express";

const router = Router();

router.get("/codewars", async (req, res) => {
	try {
		const users = ["g964", "jhoffner", "myjinxin2015"];

		const randomUserIndex = Math.floor(Math.random() * users.length);

		const randomUser = users[randomUserIndex];

		// console.log(randomUser);

		const userUrl = `https://www.codewars.com/api/v1/users/${randomUser}/code-challenges/completed?page=0`;
		const kataUrl = "https://www.codewars.com/api/v1/code-challenges/";
		const response = await fetch(userUrl);
		const data = await response.json();
		// console.log(data);
		let filteredKatas = data.data.filter((kata: any) =>
			kata.completedLanguages.includes("javascript")
		);
		// console.log(filteredKatas);

		const randomIndex = Math.floor(Math.random() * filteredKatas.length);
		// console.log(randomIndex);

		const randomKata = filteredKatas[randomIndex];
		console.log(randomKata);

		const kataResponse = await fetch(kataUrl + randomKata.slug);
		const kataData = await kataResponse.json();

		return res.json(kataData);
	} catch (error) {
		console.error(error);
	}
});

// Job routes - Use the imported jobRoutes router
router.use("/jobs", jobRoutes);

// Registration route with validation
router.post(
	"/register",
	[
		body("email").isEmail().normalizeEmail(),
		body("password").isLength({ min: 6 }),
		body("username").trim().isLength({ min: 3 }),
	],
	validateRequest,
	register
);

// Login route with validation
router.post(
	"/login",
	[body("email").isEmail().normalizeEmail(), body("password").exists()],
	validateRequest,
	login
);

// Logout route
router.post("/logout", logout);

// Error handling middleware
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error("Router Error:", err);
	res.status(500).json({
		error:
			process.env.NODE_ENV === "production"
				? "Internal server error"
				: err.message,
	});
});

export default router;
