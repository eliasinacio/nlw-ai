import { fastify } from 'fastify'
import { getAllPromptsRoute, uploadVideoRoute } from './routes'

const app = fastify()

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)

app.get('/test', () => {
    return 'Hello world'
})

app.listen({
    port: 4444,
}).then(() => {
    console.log('Server running on: https://localhost:4444')
})