## NODE.JS

- Node 16.x || 18.x

## USING YARN (Recommend)

- yarn install
- yarn dev

## USING NPM

- npm i OR npm i --legacy-peer-deps
- npm run dev

## Prisma command

```bash
  npx prisma init # set up Prisma with the init command of the Prisma CLI
  npx prisma migrate dev --name init # to create your database tables with Prisma Migrate
  npx prisma db push
  npx prisma generate
  npx prisma migrate reset
  npx prisma studio # Explore the data in Prisma Studio

```

ridershare30@gmail.com
ridershare123
```
Registration Flow - 
Social login  + phone number validation.
email login  - we send otp to email to validate is not fake/spam email, it can be validate from profile too, but cant do any booking or anyting untill validation complete. + phone number validation.(its very important to reduce fake booking/scmmer protaction)
```