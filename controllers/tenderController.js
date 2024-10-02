const Tender = require('../models/apspclTenders'); // Import the Tender model
const path = require('path');

// Create a new tender
exports.createTender = async (req, res) => {
    try {
        const { category, officeOf, tenderNotification, description, corrigendum, closingDate } = req.body;
        
        // Handle file upload
        const filePath = req.file ? `/uploads/tenders/${req.file.filename}` : null; // Set file path if file is uploaded

        const newTender = new Tender({
            category,
            officeOf,
            tenderNotification,
            description,
            corrigendum,
            closingDate,
            link: filePath,
        });

        await newTender.save(); // Save the new tender to the database
        res.status(201).json({ message: 'Tender created successfully', tender: newTender });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating tender', error });
    }
};

// Read all tenders
exports.getTenders = async (req, res) => {
    try {
        const tenders = await Tender.find(); // Retrieve all tenders
        res.status(200).json(tenders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving tenders', error });
    }
};

// Read a single tender by ID
exports.getTenderById = async (req, res) => {
    const { id } = req.params;

    try {
        const tender = await Tender.findById(id); // Find tender by ID
        if (!tender) {
            return res.status(404).json({ message: 'Tender not found' });
        }
        res.status(200).json(tender);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving tender', error });
    }
};

// Update a tender by ID
exports.updateTender = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTender = await Tender.findByIdAndUpdate(id, req.body, { new: true }); // Update tender
        if (!updatedTender) {
            return res.status(404).json({ message: 'Tender not found' });
        }

        // Update file path if a new file is uploaded
        if (req.file) {
            updatedTender.link = `/uploads/tenders/${req.file.filename}`;
            await updatedTender.save(); // Save the updated tender
        }

        res.status(200).json({ message: 'Tender updated successfully', tender: updatedTender });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating tender', error });
    }
};

// Delete a tender by ID
exports.deleteTender = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTender = await Tender.findByIdAndDelete(id); // Delete tender by ID
        if (!deletedTender) {
            return res.status(404).json({ message: 'Tender not found' });
        }
        res.status(200).json({ message: 'Tender deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting tender', error });
    }
};
