// src/controllers/userController.js
const supabase = require("../config/supabase");

// Get all users
exports.getAllUsers = async (req, res) => {
	const { data, error } = await supabase.from("users").select("*");
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Get user by ID
exports.getUserById = async (req, res) => {
	const { id } = req.params;
	const { data, error } = await supabase
		.from("users")
		.select("*")
		.eq("id", id)
		.single();
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Create a new user
exports.createUser = async (req, res) => {
	const { name, email } = req.body;
	const { data, error } = await supabase
		.from("users")
		.insert([{ name, email }]);
	if (error) return res.status(400).json({ error: error.message });
	res.status(201).json(data);
};

// Update a user
exports.updateUser = async (req, res) => {
	const { id } = req.params;
	const { name, email } = req.body;
	const { data, error } = await supabase
		.from("users")
		.update({ name, email })
		.eq("id", id);
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Delete a user
exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	const { data, error } = await supabase.from("users").delete().eq("id", id);
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};
