# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NexWalk is a premium Pakistani sneaker/streetwear e-commerce website built with Next.js 16 (App Router), Tailwind CSS v4, Shadcn UI, and Supabase.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router (React Server Components)
- **Tailwind CSS v4** with custom theme (dark mode default)
- **Shadcn UI** with base-nova style, lucide icons
- **Supabase** for auth, database, and storage
- **Framer Motion** for animations

### Theme Colors (Dark Mode Default)
- Primary/Accent: `#ff6b00` (neon orange)
- Background: `#0a0a0a`
- Card/Surface: `#1a1a1a`
- Border: `#2a2a2a`

### Contexts (src/context/)
- `AuthContext.tsx` - Authentication state using Supabase Auth
- `CartContext.tsx` - Shopping cart with localStorage persistence
- `WishlistContext.tsx` - Wishlist with localStorage persistence

### Supabase Clients (src/lib/supabase/)
- `client.ts` - Browser client (`createBrowserClient`)
- `server.ts` - Server client (`createServerClient`) for RSC

### Types (src/types/index.ts)
Defines all interfaces: User, Product, Category, Order, CartItem, Review, Coupon, Banner, etc.

### UI Components (src/components/ui/)
Shadcn UI components installed via components.json. Available: button, card, input, badge, dialog, dropdown-menu, select, tabs, skeleton, separator, avatar, progress, slider, switch, checkbox, sonner (toast).

## Database

Supabase PostgreSQL schema in `supabase/schema.sql` includes:
- profiles (extends auth.users)
- products, categories
- orders, order_items
- reviews, wishlist
- addresses, coupons, banners, payments

Row Level Security policies are configured for authenticated access patterns.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Copy `.env.local.example` to `.env.local` for local development.

## Key Patterns

- Client components use `'use client'` directive and import from `@/lib/supabase/client`
- Server components use `createServerClient` from `@/lib/supabase/server`
- Auth check: `const { data: { user } } = await supabase.auth.getUser()`
- Dark mode enabled via `next-themes` (theme provider in layout)