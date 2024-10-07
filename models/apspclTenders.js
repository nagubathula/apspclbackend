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
    viewStatus: { 
        type: String, 
        enum: ['public', 'private'], // Define it as an enum to only accept these two values
        default: 'public' 
      },
      latestStatus: { 
        type: String, 
        enum: ['active', 'inactive'], // Define it as an enum
        default: 'active' 
      }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

// Create the model
const Tender = mongoose.model('Tendertest', tenderSchema);

module.exports = Tender;
