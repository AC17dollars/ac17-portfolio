/**
 * Matrix .well-known discovery endpoints
 * @see https://spec.matrix.org/v1.17/server-server-api
 * @see https://spec.matrix.org/v1.17/client-server-api
 *
 * Configure via wrangler.toml [vars] or Cloudflare Dashboard:
 * - MATRIX_SERVER: Delegated server for federation (e.g. "chalisezabhinav.com.np:8448")
 * - MATRIX_HOMESERVER_BASE_URL: Base URL for client-server API (e.g. "https://chalisezabhinav.com.np")
 */

const DEFAULT_SERVER = "matrix.chaliseabhinav.com.np:443";
const DEFAULT_HOMESERVER_BASE_URL = "https://matrix.chaliseabhinav.com.np";
const DEFAULT_MATRIX_RTC = "https://matrix-rtc.chaliseabhinav.com.np";

export const onRequest = async (context: {
  params: { path?: string };
  env?: Record<string, string>;
}) => {
  const path = context.params.path as string;
  const server = context.env?.MATRIX_SERVER ?? DEFAULT_SERVER;
  const baseUrl =
    context.env?.MATRIX_HOMESERVER_BASE_URL ?? DEFAULT_HOMESERVER_BASE_URL;
  const rtcUrl = context.env?.MATRIX_RTC ?? DEFAULT_MATRIX_RTC;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=86400", // 24h per spec recommendation
    "Access-Control-Allow-Origin": "*",
  };

  if (path === "server") {
    // Server-Server API: federation discovery
    return new Response(JSON.stringify({ "m.server": server }), {
      status: 200,
      headers,
    });
  }

  if (path === "client") {
    // Client-Server API: homeserver discovery
    return new Response(
      JSON.stringify({
        "m.homeserver": {
          base_url: baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl,
        },
        "org.matrix.msc4143.rtc_foci": [
          {
            type: "livekit",
            livekit_service_url:  rtcUrl.endsWith("/") ? rtcUrl.slice(0, -1) : rtcUrl,
          }
        ],
      }),
      { status: 200, headers },
    );
  }

  return new Response(
    JSON.stringify({
      errcode: "M_NOT_FOUND",
      error: "Unknown well-known path",
    }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    },
  );
};
