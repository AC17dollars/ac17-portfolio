import { serve } from '@hono/node-server';
import app from './src/server/index.js';


serve({ fetch: app.fetch, port: 8787 }, (server) => {
    console.log(`Listening on http://localhost:${server.port}`);
});