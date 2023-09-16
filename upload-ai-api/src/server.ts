import { fastify } from "fastify"
import { prisma } from "./lib/prisma"
import { getAllPromptsRoute } from "./routes"

const app = fastify()

app.register(getAllPromptsRoute)

app.listen({
    port: 4444,
}).then(() => {
    console.log('Server running on: https://localhost:4444')
})