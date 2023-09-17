import { FastifyInstance } from 'fastify';
import { fastifyMultipart } from '@fastify/multipart' // Allows to send multimedia to api
import { prisma } from '../lib/prisma';

import path from 'node:path';
import fs from 'node:fs'
import { randomUUID } from 'node:crypto';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

const pump = promisify(pipeline)

export async function uploadVideoRoute (app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_848_576 * 25 // 25mb
        }
    })

    app.post('/videos', async (req, res) => {
        const data = await req.file()

        if (!data) {
            return res.status(400).send({ error: 'Missing file input.'})
        }

        const extension = path.extname(data.filename)

        if (extension !== '.mp3') {
            return res.status(400).send({ error: 'Invalid input type.', extension})
        }

        const fileBaseName = path.basename(data.filename, extension)  // Get file name without extension
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
        const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)

        await pump(data.file, fs.createWriteStream(uploadDestination))

        const video = await prisma.video.create({
            data: {
                name: data.filename,
                path: uploadDestination,
            }
        })

        return { video }
    })
}
