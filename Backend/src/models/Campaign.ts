import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'DELETED'], default: 'ACTIVE' },
    leads: [String],
    accountIDs: [String]
}, { timestamps: true });

export default mongoose.model('Campaign', CampaignSchema);
