This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# v2-portalfi

# Login

Login is preformed off of my server server.perodactylesarefire.com/user/login - dont judge me for the name, I just bought whatever domain -

- we send the username and password via the body of the request
- if the server response with a success: true, we store the token in local storage and redirect to the dashboard

# Dashboard

The dashboard is where everything will happen inside the app. Here we can access from the sideNav the following sections: Drinks, Food, Events.

- Drinks: This is where we can add, edit, and delete drinks from the database
- Food: This is where we can add, edit, and delete food from the database
- Events: This is where we can add, edit, and delete events from the database

* Note that events will auto delete after the date has passed whenever the data is pulled from
  the server. This even happens when someone accesses the clients website where the data is pulled from /site via the server due to how the server pulls the info. It will always pass through a filter that will delete any events that have passed the date.
