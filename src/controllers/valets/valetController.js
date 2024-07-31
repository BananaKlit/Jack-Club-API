

const { supabase } = require("../../config/supabase");
const { v4: uuidv4 } = require('uuid');


exports.getAllValets = async (req, res) => {
	const { data, error } = await supabase.from("valet").select("*");
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Get valet by ID
exports.getValetById = async (req, res) => {
	const { id } = req.params;
	const { data, error } = await supabase
		.from("valet")
		.select("*")
		.eq("id_valet", id)
		.single();
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Create a new valet
exports.createValet = async (req, res) => {

	const { id_valet , firstName, phone_number } = req.body;
	const { data, error } = await supabase
		.from("valet")
		.insert([{ id_valet, firstName, phone_number }]);
	if (error) {
		console.log(error)
		return res.status(400).json({ error: error.message })};
	res.status(201).json(data);
};

// Update a valet
exports.updateValet = async (req, res) => {
	const { id } = req.params;
	const { name, phone } = req.body;
	const { data, error } = await supabase
		.from("valet")
		.update({ name, phone })
		.eq("id_valet", id);
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Delete a valet
exports.deleteValet = async (req, res) => {
	const { id } = req.params;
	const { data, error } = await supabase.from("valet").delete().eq("id_valet", id);
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};
