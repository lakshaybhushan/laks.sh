# lakshb.dev

Personal site for Lakshay Bhushan. One static page: name, role, a short intro, and four links.

## Stack

- Next.js App Router, prerendered to static HTML with no client components
- Tailwind CSS v4, with design tokens in `app/design-tokens.css`
- Satoshi self-hosted through `next/font/local` (preloaded, no layout shift)
- Inline SVG icons from HugeIcons, inheriting `currentColor`

## Type and spacing

The page uses a single type size (16px) with 20px leading, 20px paragraph gaps and 32px section gaps. Hierarchy comes from ink level (`#DEDEDE` header, `#C7C7C7` body) rather than size.

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
```
