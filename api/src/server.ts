import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from './routes/prompts'
import { uploadVideoRoute } from './routes/video'
import { createTranscriptionRoute } from './routes/transcription'
import { generateAICompletion } from './routes/ai-completion'

const app = fastify()

app.register(fastifyCors, {
    origin: '*',
})

app.get('/test', () => {
    return 'Hello world'
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAICompletion)

app.listen({
    port: 4444,
}).then(() => {
    console.log('Server running on: https://localhost:4444')
})