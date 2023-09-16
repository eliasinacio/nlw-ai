import { FastifyInstance } from 'fastify';
import { fastifyMultipart } from '@fastify/multipart' // Allows to send multimedia to api
import { prisma } from '../lib/prisma';

import path from 'node:path';
import fs from 'node:fs'
import { randomUUID } from 'node:crypto';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

/* Prompts */

export async function getAllPromptsRoute (app: FastifyInstance) {
    app.get('/prompts', async () => {
        const prompts = await prisma.prompt.findMany();

        return prompts;
    })
}

/* Videos */

const pump = promisify(pipeline)

export async function uploadVideoRoute (app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_848_576 * 100 // 100mb
        }
    })

    app.post('/videos', async (req, res) => {
        const data = await req.file()

        if (!data) {
            return res.status(400).send({ error: 'Missing file input.'})
        }

        const extension = path.extname(data.filename)

        if (extension != '.mp3') {
            return res.status(400).send({ error: 'Invalid input type.'})
        }

        const fileBaseName = path.basename(data.filename, extension)  // Get file name without extension
        const fileUploadName = `${fileBaseName}-${randomUUID}${extension}`
        const uploadDestination = path.resolve(__dirname, '../../temp/', fileUploadName)

        await pump(data.file, fs.createWriteStream(uploadDestination))
    })
}
