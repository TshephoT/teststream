import { useEffect, useState } from "react";
import styled from "styled-components";
import type { HealthResponse } from "@teststream/shared-types";

const Page = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 20px;
`;

const Panel = styled.section`
  width: min(100%, 720px);
  padding: 40px;
  border: 1px solid #263449;
  border-radius: 20px;
  background: #172235;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);

  @media (max-width: 600px) {
    padding: 26px;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 12px;
  color: #70a5ff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const Heading = styled.h1`
  margin: 0;
  color: #f7f9fc;
  font-size: clamp(36px, 7vw, 56px);
  letter-spacing: -0.055em;
`;

const Description = styled.p`
  max-width: 540px;
  margin: 16px 0 28px;
  color: #aab8ca;
  font-size: 16px;
  line-height: 1.7;
`;

const Status = styled.div<{ $healthy: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid ${({ $healthy }) => ($healthy ? "#27664f" : "#775b2b")};
  border-radius: 999px;
  color: ${({ $healthy }) => ($healthy ? "#8ee0ba" : "#f2c879")};
  background: ${({ $healthy }) => ($healthy ? "#17382f" : "#3b3020")};
  font-size: 13px;
  font-weight: 600;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
`;

const Footer = styled.p`
  margin: 32px 0 0;
  color: #718198;
  font-size: 12px;
`;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api/v1";

export function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiBaseUrl}/health`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        return (await response.json()) as HealthResponse;
      })
      .then(setHealth)
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name !== "AbortError") {
          setError(reason.message);
        }
      });

    return () => controller.abort();
  }, []);

  const healthy = health?.status === "ok";

  return (
    <Page>
      <Panel>
        <Eyebrow>Practical software testing platform</Eyebrow>
        <Heading>TestStream</Heading>
        <Description>
          Learn. Practise. Test. Build. Your practical QA journey starts here.
          We're laying the engineering foundation for a platform built around
          real applications and real testing experience.
        </Description>
        <Status $healthy={Boolean(healthy)}>
          <Dot />
          {healthy ? "API connected · Database connected" : error ? "API connection unavailable" : "Checking API connection"}
        </Status>
        {error && <Description role="status">Start the API and MongoDB services to connect this application.</Description>}
        <Footer>Development foundation · v0.1.0</Footer>
      </Panel>
    </Page>
  );
}
