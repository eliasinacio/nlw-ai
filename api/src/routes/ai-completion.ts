import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { streamToResponse, OpenAIStream } from 'ai'
import { prisma } from '../lib/prisma';
import { openai } from "../lib/openai";

export async function generateAICompletion(app: FastifyInstance) {
	app.post('/ai/completion', async (req, res) => {
		const bodySchema = z.object({
			videoId: z.string().uuid(),
			prompt: z.string(),
			temperature: z.number().min(0).max(1).default(0.5),
		})

		const { videoId, prompt, temperature } = bodySchema.parse(req.body)

		const video = await prisma.video.findUniqueOrThrow({
			where: {
				id: videoId,
			}
		})

		if (!video.transcription) {
			return res.status(400).send({ error: 'Video transcription was not generated yet' })
		}

		const { transcription } = video
		const promptMessage = prompt.replace('{transcription}', transcription)

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo-16k',
			temperature,
			messages: [{
				role: 'user', content: promptMessage
			}],
			stream: true
		})

		const stream = OpenAIStream(response)

		streamToResponse(stream, res.raw, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
			}
		})
	})
}