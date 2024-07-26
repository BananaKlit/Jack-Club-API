const supabase = require("../../config/supabase");

// Get all admins
exports.getAllAdmins = async (req, res) => {
	const { data, error } = await supabase.from("Responsable").select("*");
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
	const { id } = req.params;
	const { data, error } = await supabase
		.from("Responsable")
		.select("*")
		.eq("id", id)
		.single();
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Create a new admin
exports.createAdmin = async (req, res) => {
	const { user_id, name, phone } = req.body;
	const { data, error } = await supabase
		.from("Responsable")
		.insert([{ user_id, name, phone }]);
	if (error) return res.status(400).json({ error: error.message });
	res.status(201).json(data);
};

// Update an admin
exports.updateAdmin = async (req, res) => {
	const { id } = req.params;
	const { name, phone } = req.body;
	const { data, error } = await supabase
		.from("Responsable")
		.update({ name, phone })
		.eq("id", id);
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
	const { id } = req.params;
	const { data, error } = await supabase.from("Responsable").delete().eq("id", id);
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

