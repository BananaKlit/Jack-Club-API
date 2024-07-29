
const { supabase } = require("../../config/supabase");


exports.getAllAdmins = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Responsable')
            .select('*')
        
        if (error) {
            console.error('Error fetching admins:', error); // Log the error for debugging
            return res.status(400).json({ error: 'Unable to fetch admins.' });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error('Unexpected error:', err); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
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

