This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Environment variables

Create `.env.local` for local development and set the same keys in the hosting
provider's dashboard for production. `.env*` files are git-ignored — never commit
them.

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSCODE` | Production: **yes** | Passcode for the `/admin` dashboard. In dev it falls back to `adelyn2026`; in production an unset value keeps `/admin` locked. |
| `RESEND_API_KEY` | For contact / booking emails | [Resend](https://resend.com) API key. Without it, the contact form reports that messaging is not configured and booking emails are skipped. |
| `CONTACT_TO` | No | Recipient for contact-form and booking emails. Default: `freddiedsouza@gmail.com`. |
| `CONTACT_FROM` | No | Sender address. Default: `Adelyn Physiotherapy <onboarding@resend.dev>`. Use a verified domain address in production. |
| `NEXT_PUBLIC_SITE_URL` | Production: recommended | Canonical site origin (e.g. `https://your-domain.com`). Used for Open Graph tags, `robots.txt`, and `sitemap.xml`. Defaults to `http://localhost:3000`. |

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
