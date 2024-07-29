const supabase = require("../../config/supabase");
const jwt = require("jsonwebtoken");
const { rest } = require("../../config/supabase");


exports.adminLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});
		if (error) {
			console.error("Error signing in:", error);
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// Check if the user is an admin
		const { data: adminData, error: adminError } = await supabase
			.from("Responsable")
			.select("*")
			.eq("id", data.user.id)
			.eq("role", "Admin")
			.single();

		if (adminError || !adminData) {
			return res.status(403).json({ error: "Access denied" });
		}

		res.status(200).json({data});

	} catch (err) {
		console.error("Error during login:", err);
		res.status(403).json({error:"Access denied"})
	}
};




exports.userLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});
		res.status(200).json({data});
	} catch (err) {
		console.error("Error during login:", err);
		res.status(403).json({err:"Error during login:"});
	}
};








