# Abhinav Chalise - Portfolio

A performance-driven personal portfolio and AI assistant platform. This project features a high-fidelity frontend built with React and a scaleable backend powered by Hono, integrated with Google Gemini for an interactive chat experience.

## Project Structure

- `src/client/`: Frontend application (React, Vite, Tailwind CSS).
- `src/server/`: Backend API server (Hono) and AI logic.
- `src/shared/`: Shared TypeScript types and services.
- `functions/api/`: Cloudflare Pages Functions integration.
- `wrangler.toml`: Cloudflare Pages deployment configuration.
- `index.local.ts`: Entry point for local Node.js development server.

## Local Development

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm

### Installation

```bash
pnpm install
```

### Running Locally

1. Prepare your Gemini API Key.
   Note: `.env` files are not automatically loaded by the development server.

2. Start the development environment:
   
   In one terminal, start the frontend:
   ```bash
   pnpm run dev
   ```

   In another terminal, start the local backend with your API key:
   ```bash
   GEMINI_API_KEY=your_key_here pnpm run dev:server
   ```

The application will be available at `http://localhost:3000`.

## Deployment

### Cloudflare Pages

This project is optimized for deployment via Cloudflare Pages.

1. Build the project:
   ```bash
   pnpm run build
   ```

2. Deploy via Wrangler:
   ```bash
   pnpm run pages:deploy
   ```

### Environment Variables

Secrets like `GEMINI_API_KEY` must be configured directly in the Cloudflare Workers & Pages Dashboard under **Settings > Variables and Secrets**. They are securely managed by Cloudflare and are not included in the repository or build artifacts.

## Technology Stack

- Frontend: React 19, Vite, Tailwind CSS 4, Lucide React.
- Backend: Hono, Cloudflare Pages Functions.
- AI: Google Gemini (generative-ai SDK).
- Language: TypeScript.
