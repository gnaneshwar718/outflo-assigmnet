import axios from 'axios';
import { Request, Response } from 'express';

export const generateMessage = async (req: Request, res: Response) => {
    try {
        const { name, job_title, company, location, summary } = req.body;

        const prompt = `Write a short personalized outreach message for ${name}, a ${job_title} at ${company}, based in ${location}. Their profile summary: ${summary}.`;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "openai/gpt-3.5-turbo",

                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000', // Replace with your frontend URL if deployed
                    'X-Title': 'Outflo', // Replace with your app's name
                },
            }
        );

        res.json({ message: response.data.choices[0].message.content });
    } catch (error: any) {
        console.error('OpenRouter error:', error.response?.data || error.message);
        res.status(400).json({
            error: error.response?.data || 'Failed to generate personalized message',
        });
    }
};
