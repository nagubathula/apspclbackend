const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    officeOf: {
        type: String,
        required: true,
    },
    tenderNotification: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    corrigendum: {
        type: String,
        default: 'NA', // Default value if not provided
    },
    closingDate: {
        type: Date,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

// Create the model
const Tender = mongoose.model('Tendertest', tenderSchema);

module.exports = Tender;
