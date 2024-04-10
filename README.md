# Expense Tracker App

This application has developed to solve a problem of budget and expense management to reduce financial stress and anxiety.

## Tech Stack:

- Next.js + Typescript
- Tailwindcss
- Shadcn UI
- NextAuth
- Next.js API Routes (for backend)
- Prisma

Libraries

- Zod
- React Hook Form
- React Hot Toast
- Chart.js + React Charjs 2

## Installing Dependecies

Run this command to install all the required:

```bash
npm install
```

## SetUp Environment Variables

The .env.local file will contain:

```bash
DATABASE_URL=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

NEXTAUTH_SECRET=""
```

## SetUp Database

You can choose which database you want to use in `prisma/schema.prisma` file and add the specific URL for the database to `.env.local` file. To push database to production.

```bash
npx primsa db push
```

For generating client code

```bash
npx primsa generate
```

You can run below command to visualize the data stored in your database.

```bash
npx prisma studio
```

**Note:** A `"postinstall": "prisma generate"` script is added to the `package.json` file to make prisma run in production version.

Now that you have Set-up all the pre-requisites, you are good to go. Go ahead and run the application.

```bash
npm run dev
```
