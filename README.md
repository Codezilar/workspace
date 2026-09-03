# Vanta Work

A premium job opportunity platform built with Next.js App Router, Clerk, MongoDB/Mongoose, Tailwind, Framer Motion, and Lucide.

## Setup

1. Copy `.env.example` to `.env.local` and fill in Clerk, MongoDB, and payment values.
2. In Clerk, configure `/sign-in` and `/sign-up` paths and create an owner user record in MongoDB with `role: "OWNER"` (or add their Clerk ID to `ADMIN_CLERK_IDS`).
3. Run `npm install`, `npm run seed`, then `npm run dev`.

The payment address is read only on the server from `PAYMENT_WALLET_ADDRESS`; user access is granted only by the privileged payment-review API.
