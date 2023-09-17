Install prisma:
`npm i prisma -D`

Init prisma:
`npx prisma init --datasource-provider sqlit`

After create the schema, migrate with:
`npx prisma migrate dev`

to view tables
`npx prisma studio`

To run first time, seed:
`npx run seed` or
`npx prisma db seed`