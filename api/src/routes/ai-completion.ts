import { FastifyInstance } from "fastify";
import { createReadStream } from "fs";
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { openai } from "../lib/openai";

export async function generateAICompletion (app: FastifyInstance) {
    app.post('/ai/completion', async (req, res) => {
        const bodySchema = z.object({
            videoId: z.string().uuid(),
            temperature: z.number().min(0).max(1).default(0.5),
            template: z.string(),
        })

        const { videoId, template, temperature } = bodySchema.parse(req.body)

        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: videoId,
            }
        })

        if (!video.transcription) {
            return res.status(400).send({error: 'Video transcription was not generated yet'})
        }

        const { transcription } = video
        const promptMessage = template.replace('{transcription}', transcription)

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            temperature,
            messages: [{
                role: 'user', content: promptMessage
            }]
        })

        return response
    })
}