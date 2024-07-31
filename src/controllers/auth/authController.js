const {supabase, supabaseSecret} = require("../../config/supabase");
const { verify } = require('jsonwebtoken');




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
			.eq("role", "admin")
			.single();

		if (adminError || !adminData) {
			return res.status(403).json({ error: "Access denied" });
		}

		res.status(200).json({access_token: data.session.access_token,adminData} );

	} catch (err) {
		console.error("Error during login:", err);
		res.status(403).json({error:"Access denied"})
	}
};


exports.valetLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

			if (error) {
				console.error("Error signing in:", error);
				return res.status(401).json({ error: "Invalid credentials" });
			}


		const { data: valetData, error: valetError } = await supabase
			.from("valet")
			.select("*")
			.eq("id", data.user.id)
			.eq("role", "user")
			.single();

		if (valetError || !valetData) {
			return res.status(403).json({ valetError: "Access denied" });
		}

		res.status(200).json({access_token: data.session.access_token, valetData } );
	} catch (error) {
		console.error("Error during login:", error);
		res.status(403).json({ err: "Error during login" });
	}
};


exports.clientLogin = async (req, res) => {
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

		const { data: clientData, error: clientError } = await supabase
		.from("client")
		.select("*")
		.eq("id", data.user.id)
		.eq("role", "user")
		.single();

	if (clientError || !clientData) {
		return res.status(403).json({ error: "Access denied" });
	}	
		res.status(200).json({access_token:data.session.access-token,clientData});
	} catch (err) {
		console.error("Error during login:", err);
		res.status(403).json({err:"Error during login:"});
	}
};

//Jwt validation
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Auth Header: " + authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Remove the "Bearer " prefix from the auth header
    const token = authHeader.replace('Bearer ', '');

    try {
        // Verify the token using your JWT secret
        const verifiedToken = verify(token, supabaseSecret);

        if (!verifiedToken) {
            console.log("Invalid token");
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Token is valid, continue processing
        console.log("Verified Token: " + verifiedToken);
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};





