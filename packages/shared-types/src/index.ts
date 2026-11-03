export interface HealthResponse {
  status: "ok" | "degraded";
  service: string;
  database: "connected" | "disconnected";
  timestamp: string;
}
