const supabase = require("../../config/supabase");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});
		console.log(email,password)
		if (error) {
			console.error("Error signing in:", error);
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// Check if the user is an admin
		const { data: adminData, error: adminError } = await supabase
			.from("Responsable")
			.select("*")
			.eq("id", data.user.id)
			.eq("role", "back-office")
			.single();

		if (adminError || !adminData) {
			return res.status(403).json({ error: "Access denied" });
		}

		const token = generateJWT(data.user.id);
		setResponseHeaders(res);
		res.status(200).json({ data, token });
	} catch (err) {
		console.error("Error during login:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

function generateJWT(userId) {
	return jwt.sign({ userId }, 'q5$28k3y');
}

function setResponseHeaders(res) {
	res.header('Access-Control-Allow-Origin', '*');//this changes in production
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Credentials', 'true');
}



function generateJWT(userId) {
	return jwt.sign({ userId }, 'q5$28k3y');
}



function validateJWT(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) {
		return res.sendStatus(401);
	}

	jwt.verify(token, 'q5$28k3y', (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		req.user = user;
		next();
	});
}



