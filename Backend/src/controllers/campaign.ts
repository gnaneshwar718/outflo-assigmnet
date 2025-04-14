import Campaign from '../models/Campaign';
import { Request, Response } from 'express';

export const getCampaigns = async (req: Request, res: Response) => {
    const campaigns = await Campaign.find({ status: { $ne: 'DELETED' } });
    res.json(campaigns);
};

export const getCampaignById = async (req: Request, res: Response) => {
    const campaign = await Campaign.findById(req.params.id);
    res.json(campaign);
};

export const createCampaign = async (req: Request, res: Response) => {
    const campaign = await Campaign.create(req.body);
    res.json(campaign);
};

export const updateCampaign = async (req: Request, res: Response) => {
    const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

export const deleteCampaign = async (req: Request, res: Response) => {
    const updated = await Campaign.findByIdAndUpdate(req.params.id, { status: 'DELETED' }, { new: true });
    res.json(updated);
};
