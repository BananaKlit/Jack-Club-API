const supabase = require("../../config/supabase");
const jwt = require("jsonwebtoken");

// Login handler
exports.login = async (req, res) => {
	const { email, password } = req.body;
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		
		console.error("Error signing in:", error);
	} else {
		
		console.log("User data:", data);
		// Check if the user is an admin
		const { data: adminData, error: adminError } = await supabase
			.from("Responsable")
			.select("*").eq("id" ,data.user.id).eq("role" , "backe-ofice").single();
		console.log(adminError)
		if (adminError || !adminData)
			return res.status(403).json({ error: "Access denied" });
		res.status(200).json({ data });
		
	}

	

	
};
// SignUp handler
exports.login = async (req, res) => {
	const { email, password } = req.body;
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		
		console.error("Error signing in:", error);
	} else {
		
		console.log("User data:", data);
		// Check if the user is an admin
		const { data: adminData, error: adminError } = await supabase
			.from("Responsable")
			.select("*").eq("id" ,data.user.id).eq("role" , "backe-ofice").single();
		console.log(adminError)
		if (adminError || !adminData)
			return res.status(403).json({ error: "Access denied" });
		res.status(200).json({ data });
		
	}

	

	
};
