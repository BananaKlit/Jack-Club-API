const supabase = require("../../config/supabase");

// Get all clients
exports.getAllClients = async (req, res) => {
	const { data, error } = await supabase.from("client").select("*");
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Get client by ID
exports.getClientById = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	const { data, error } = await supabase
		.from("client")
		.select("*")
		.eq("idClient", id)
		.single();
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Create a new client
exports.createClient = async (req, res) => {
	const { user_id, name, phone } = req.body;
	const { data, error } = await supabase
		.from("Client")
		.insert([{ user_id, name, phone }]);
	if (error) return res.status(400).json({ error: error.message });
	res.status(201).json(data);
};

// Update a client
exports.updateClient = async (req, res) => {
	const { id } = req.params;
	const { name, phone } = req.body;
	const { data, error } = await supabase
		.from("Client")
		.update({ name, phone })
		.eq("id", id);
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// Delete a client
exports.deleteClient = async (req, res) => {
	const { id } = req.params;
	const { data, error } = await supabase.from("Client").delete().eq("id", id);
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};
