## [Prisma Setup](https://www.prisma.io/docs/orm/overview/databases/prisma-postgres)

- To setup interact with database I'm using Prisma ORM.
- So to configure prisma we have following steps:

```

npx prisma generate
npx prisma mirgrate dev --name init

```

### Database Docker Command

```
docker run --name postgresSQL -p 5434:5432 -e POSTGRES_USER=Lakshay -e POSTGRES_PASSWORD=postgres@db -e POSTGRES_DB=mydb -d postgres
```
