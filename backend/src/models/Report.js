const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for now as we might not have full user system linked immediately
    },
    labId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    patientName: {
        type: String,
        required: true
    },
    testType: {
        type: String,
        required: true,
        enum: ['Blood Panel', 'Lipid Profile', 'Thyroid Profile', 'Liver Function Test', 'Kidney Function Test', 'Urinalysis', 'Other']
    },
    rawData: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    aiAnalysis: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'flagged'],
        default: 'pending'
    },
    tat: {
        startTime: Date,
        endTime: Date,
        durationMinutes: Number
    },
    agentsInvolved: [{
        agentName: String,
        action: String,
        timestamp: Date,
        status: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);
