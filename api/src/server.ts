import { fastify } from 'fastify'
import { getAllPromptsRoute, uploadVideoRoute } from './routes'

const app = fastify()

app.get('/test', () => {
    return 'Hello world'
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)

app.listen({
    port: 4444,
}).then(() => {
    console.log('Server running on: https://localhost:4444')
})