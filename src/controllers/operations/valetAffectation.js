


const { supabase } = require("../../config/supabase");


exports.getAllOperation = async (req, res) => {
	const { data, error } = await supabase
		.from("operations")
		.select("*")
		.eq("status", "Pending");
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};
// Get all Operation By Valet
exports.getAllOperationByValet = async (req, res) => {
	const {idValet }= req.body;
	const { data, error } = await supabase
		.from("operations")
		.select("*")
		.eq("id_valet", idValet);
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};
// Get all Valet Not Afected
exports.getAllAvailableValet = async (req, res) => {
	const { data, error } = await supabase
		.from("valet")
		.select("*")
		.eq("affectation", false);
	if (error) return res.status(400).json({ error: error.message });
	res.status(200).json(data);
};

// exports.affectValet = async (req, res) => {
// 	const id_valet = req.body.idValet;
// 	const code_operation = req.body.codeOperation;

// 	// Update the operation with the given valet ID, status, and timestamp
// 	const { data: operationData, error: operationError } = await supabase
// 		.from("operations")
// 		.update({
// 			id_valet: id_valet,
// 			status: "en attente",
// 			affected_at: new Date().toISOString(), // Ensure the date is in ISO string format
// 		})
// 		.eq("code_operation", code_operation)
// 		.eq("status", "Pending")
// 		.select();

// 	if (operationError) {
// 		return res.status(400).json({ error: operationError.message });
// 	}

// 	// Update the valet with the given operation code and affectation status
// 	const { data: valetData, error: valetError } = await supabase
// 		.from("valet")
// 		.update({ codeOperation: code_operation, affectation: true })
// 		.eq("id_valet", id_valet)
// 		.eq("affectation", false)
// 		.select();

// 	if (valetError) {
// 		return res.status(400).json({ error: valetError.message });
// 	}

// 	// Update the valet_operation table with the given valet ID
// 	const { data: isConfirmed, error: error_c } = await supabase
// 		.from("valet_operation")
// 		.update({ id_valet: id_valet })
// 		.eq("codeOperation", code_operation)
// 		.select();

// 	if (error_c) {
// 		return res.status(400).json({ error: error_c.message });
// 	}

// 	res.status(200).json({
// 		Opdata: operationData,
// 		valetData: valetData,
// 		confirmed: isConfirmed,
// 	});
// };
exports.affectValet = async (req, res) => {
	const id_valet = req.body.idValet;
	const code_operation = req.body.codeOperation;

	// Check if the operation is pending
	const { data: pendingData, error: errorPending } = await supabase
		.from("operations")
		.select("*")
		.eq("code_operation", code_operation)
		.eq("status", "Pending");

	if (errorPending) {
		return res.status(400).json({ error: errorPending.message });
	}

	if (pendingData.length > 0) {
		// Update the operation with the given valet ID, status, and timestamp
		const { data: operationData, error: operationError } = await supabase
			.from("operations")
			.update({
				id_valet: id_valet,
				status: "Affected",
				affected_at: new Date().toISOString(), // Ensure the date is in ISO string format
			})
			.eq("code_operation", code_operation)
			.eq("status", "Pending");

		if (operationError) {
			return res.status(400).json({ error: operationError.message });
		}

		// Update the valet with the given operation code and affectation status
		const { data: valetData, error: valetError } = await supabase
			.from("valet")
			.update({ codeOperation: code_operation, affectation: true })
			.eq("id_valet", id_valet)
			.eq("affectation", false);

		if (valetError) {
			return res.status(400).json({ error: valetError.message });
		}

		// Update the valet_operation table with the given valet ID
		const { data: isConfirmed, error: error_c } = await supabase
			.from("valet_operation")
			.update({ id_valet: id_valet })
			.eq("codeOperation", code_operation);

		if (error_c) {
			return res.status(400).json({ error: error_c.message });
		}

		return res.status(200).json({
			Opdata: operationData,
			valetData: valetData,
			confirmed: isConfirmed,
		});
	}

	// Check if the operation is completed
	const { data: completedData, error: errorCompleted } = await supabase
		.from("operations")
		.select("*")
		.eq("code_operation", code_operation)
		.eq("status", "Completed");

	if (errorCompleted) {
		return res.status(400).json({ error: errorCompleted.message });
	}

	if (completedData.length > 0) {
		const valetAller = completedData[0].id_valet;
		console.log('Error Here !!!!!!!!!!!');
		// Update the operation with the given valet ID, status, and timestamp
		const { data: operationData, error: operationError } = await supabase
			.from("operations")
			.update({
				valet_aller: valetAller,
				id_valet: id_valet,
				status: "Ended",
				affected_return_at: new Date().toISOString(),
			})
			.eq("code_operation", code_operation)
			.eq("status", "Completed");

		if (operationError) {
			return res.status(400).json({ error: operationError.message });
		}

		// Update the valet with the given operation code and affectation status
		const { data: valetData, error: valetError } = await supabase
			.from("valet")
			.update({ codeOperation: code_operation, affectation: true })
			.eq("id_valet", id_valet);

		if (valetError) {
			return res.status(400).json({ error: valetError.message });
		}

		// Update the valet_operation table with the given valet ID
		const { data: isConfirmed, error: error_c } = await supabase
			.from("valet_operation")
			.update({ id_valet: id_valet, isConfirmed: false })
			.eq("codeOperation", code_operation);

		console.log(`this is old id Valet => ${valetAller}`);
		console.log(`this is new id Valet => ${id_valet}`);
		
		if (error_c) {
			return res.status(400).json({ error: error_c.message });
		}

		return res.status(200).json({
			Opdata: operationData,
			valetData: valetData,
			confirmed: isConfirmed,
		});
	}

	return res
		.status(404)
		.json({ error: "Operation not found or invalid status" });
};
