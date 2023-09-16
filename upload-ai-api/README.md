## Upload.ai - API

- Node + Typescript
- Prisma

Install prisma:
`npm i prisma -D`

Init prisma:
`npx prisma init --datasource-provider sqlit`

After create the schema, migrate with:
`npx prisma migrate dev`

to view tables
`npx prisma studio`