import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import type { HealthResponse } from "@teststream/shared-types";
import { LearningPath } from "./components/LearningPath.js";

type Section = "Overview" | "My learning" | "Practice labs" | "Test products" | "Assessments" | "Resources";
const navigation: { label: Section; icon: string; note?: string }[] = [
  { label: "Overview", icon: "⌂" },
  { label: "My learning", icon: "▤" },
  { label: "Practice labs", icon: "⌘", note: "3" },
  { label: "Test products", icon: "▣" },
  { label: "Assessments", icon: "◷" },
  { label: "Resources", icon: "◇" }
];

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; min-width: 320px; background: #0b1220; color: #e8eef8; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; -webkit-font-smoothing: antialiased; }
  button { font: inherit; }
  ::selection { background: #2859a5; color: white; }
`;
const Shell = styled.div`min-height:100vh; display:flex; background:#0b1220;`;
const Sidebar = styled.aside`
  width:248px; flex:0 0 248px; min-height:100vh; padding:26px 16px 20px; display:flex; flex-direction:column;
  background:#101a2b; border-right:1px solid #1e2b40;
  @media(max-width:850px){width:76px;flex-basis:76px;padding:22px 10px;}
  @media(max-width:560px){display:none;}
`;
const Brand = styled.div`display:flex;align-items:center;gap:11px;padding:0 10px 34px;`;
const BrandMark = styled.div`width:34px;height:34px;border-radius:11px;background:linear-gradient(145deg,#3984f6,#2255b7);display:grid;place-items:center;color:white;font-weight:800;font-size:18px;box-shadow:0 7px 20px #1b55a744;`;
const BrandText = styled.div`
  font-size:17px;font-weight:750;letter-spacing:-.5px;color:#f5f8ff;
  span{color:#6fa6ff;}
  @media(max-width:850px){display:none;}
`;
const NavLabel = styled.div`padding:0 12px 11px;color:#687b97;font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;@media(max-width:850px){display:none;}`;
const Nav = styled.nav`display:grid;gap:5px;`;
const NavButton = styled.button<{ $active:boolean }>`
  border:0;width:100%;display:flex;align-items:center;gap:13px;padding:11px 12px;border-radius:9px;text-align:left;cursor:pointer;
  color:${p=>p.$active?"#eaf2ff":"#91a2bb"};background:${p=>p.$active?"#1b3151":"transparent"};font-size:13px;font-weight:${p=>p.$active?650:500};transition:.15s;
  &:hover{background:#1a2b43;color:#eaf2ff;}
  .glyph{width:19px;text-align:center;font-size:17px;color:${p=>p.$active?"#7eb0ff":"#8093ad"};}
  .note{margin-left:auto;border-radius:20px;background:#263d5e;padding:2px 7px;font-size:10px;color:#a9caff;}
  @media(max-width:850px){justify-content:center;padding:12px 0;font-size:0;.note{display:none;}}
`;
const SidebarBottom = styled.div`margin-top:auto;padding:15px 10px 0;border-top:1px solid #223047;@media(max-width:850px){padding:15px 0 0;}`;
const HelpCard = styled.div`padding:14px;border:1px solid #263750;border-radius:12px;background:#142238;color:#a8b8cf;font-size:11px;line-height:1.55;strong{display:block;color:#e4edfb;font-size:12px;margin-bottom:5px;}@media(max-width:850px){display:none;}`;
const Profile = styled.div`display:flex;align-items:center;gap:10px;margin-top:17px;padding:0 4px;color:#dce6f5;font-size:12px;font-weight:650;.avatar{width:31px;height:31px;border-radius:50%;display:grid;place-items:center;background:#29466d;color:#a9ceff;font-weight:800;}small{display:block;color:#7588a4;font-size:10px;font-weight:450;margin-top:3px;}@media(max-width:850px){justify-content:center;.details{display:none;}}`;
const Main = styled.main`min-width:0;flex:1;padding:0 38px 48px;@media(max-width:850px){padding:0 22px 36px;}@media(max-width:560px){padding:0 16px 32px;}`;
const Topbar = styled.header`height:78px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1c293c;margin-bottom:34px;gap:16px;`;
const Breadcrumb = styled.div`font-size:12px;color:#778aa5;span{color:#dce7f7;font-weight:600;}@media(max-width:560px){font-size:11px;}`;
const TopActions = styled.div`display:flex;align-items:center;gap:12px;`;
const Search = styled.div`width:220px;height:36px;border:1px solid #25344a;border-radius:8px;display:flex;align-items:center;gap:8px;padding:0 11px;color:#7386a2;font-size:11px;background:#101a2a;@media(max-width:700px){display:none;}`;
const IconButton = styled.button`width:35px;height:35px;border:1px solid #25344a;border-radius:9px;background:#111d2e;color:#a8bad3;cursor:pointer;font-size:15px;&:hover{border-color:#4779bc;color:white;}`;
const Content = styled.div`max-width:1180px;margin:0 auto;`;
const Welcome = styled.div`display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:26px;@media(max-width:650px){align-items:flex-start;flex-direction:column;}`;
const Eyebrow = styled.div`color:#78aaff;font-size:10px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;margin-bottom:10px;`;
const H1 = styled.h1`margin:0;color:#f3f7ff;font-size:clamp(25px,3vw,32px);letter-spacing:-1.1px;font-weight:700;`;
const Intro = styled.p`margin:9px 0 0;color:#91a2bb;font-size:13px;line-height:1.65;`;
const PrimaryButton = styled.button`border:1px solid #4b8cf5;background:#3479e7;color:white;padding:10px 15px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 5px 18px #2468d52b;&:hover{background:#4288f2;}`;
const GhostButton = styled.button`border:1px solid #2b3b53;background:#142136;color:#b7c7dc;padding:9px 13px;border-radius:8px;font-size:11px;font-weight:650;cursor:pointer;&:hover{border-color:#4d76ad;color:white;}`;
const Grid4 = styled.div`display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:18px;@media(max-width:950px){grid-template-columns:repeat(2,minmax(0,1fr));}@media(max-width:430px){gap:9px;}`;
const Stat = styled.div`padding:17px 18px;border:1px solid #223149;border-radius:11px;background:#111d2e;min-width:0;.top{display:flex;align-items:center;justify-content:space-between;color:#8193ad;font-size:11px;}.icon{width:29px;height:29px;border-radius:8px;display:grid;place-items:center;background:#1b3150;color:#8bb9ff;font-size:14px;}.value{margin-top:14px;font-size:25px;letter-spacing:-.8px;font-weight:700;color:#f1f6ff;}.sub{margin-top:5px;color:#71849f;font-size:10px;}@media(max-width:430px){padding:13px;.value{font-size:21px;}}`;
const TwoCol = styled.div`display:grid;grid-template-columns:minmax(0,1.55fr) minmax(260px,1fr);gap:16px;margin-bottom:16px;@media(max-width:950px){grid-template-columns:1fr;}`;
const Panel = styled.section`border:1px solid #223149;border-radius:12px;background:#111d2e;padding:20px;min-width:0;`;
const PanelHead = styled.div`display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px;h2{margin:0;color:#eaf1fc;font-size:13px;font-weight:700;letter-spacing:-.1px;}span{color:#7e91ad;font-size:10px;}`;
const ContinueCard = styled.div`display:flex;gap:16px;align-items:center;padding:15px;border-radius:10px;background:linear-gradient(110deg,#172b47,#172338);border:1px solid #2a4263;@media(max-width:550px){align-items:flex-start;flex-direction:column;}`;
const CourseIcon = styled.div`width:52px;height:52px;flex:0 0 52px;border-radius:12px;background:#234777;color:#9bc4ff;display:grid;place-items:center;font-size:23px;`;
const CourseBody = styled.div`flex:1;min-width:0;h3{margin:0 0 5px;font-size:13px;color:#eff5ff;}p{margin:0;color:#8296b2;font-size:10px;line-height:1.5;}`;
const ProgressTrack = styled.div`height:5px;background:#26364e;border-radius:10px;overflow:hidden;margin-top:13px;span{display:block;height:100%;width:38%;background:#4b91f5;border-radius:10px;}`;
const CourseFoot = styled.div`display:flex;justify-content:space-between;margin-top:7px;color:#7f93af;font-size:9px;`;
const ActivityList = styled.div`display:grid;gap:15px;`;
const Activity = styled.div`display:flex;gap:11px;align-items:flex-start;.dot{width:28px;height:28px;border-radius:8px;background:#1c3150;color:#8ebaff;display:grid;place-items:center;flex:0 0 28px;font-size:12px;}.copy{font-size:11px;color:#c8d5e7;line-height:1.45;}small{display:block;color:#778aa5;font-size:9px;margin-top:4px;}`;
const ProductGrid = styled.div`display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px;@media(max-width:950px){grid-template-columns:repeat(2,minmax(0,1fr));}@media(max-width:560px){grid-template-columns:1fr;}`;
const Product = styled.div`border:1px solid #263750;border-radius:10px;overflow:hidden;background:#142136;cursor:pointer;transition:.15s;&:hover{border-color:#4b79b5;transform:translateY(-2px);}`;
const ProductVisual = styled.div<{ $tone:string }>`height:92px;display:grid;place-items:center;background:${p=>p.$tone};font-size:28px;color:#b7d2fa;`;
const ProductInfo = styled.div`padding:13px 14px;h3{margin:0 0 5px;color:#e6eefb;font-size:12px;}p{margin:0;color:#8194ae;font-size:10px;line-height:1.5;}.tag{display:inline-block;margin-top:10px;color:#8ebaff;font-size:9px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;}`;
const BottomGrid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;@media(max-width:800px){grid-template-columns:1fr;}`;
const SkillRow = styled.div`display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid #202e43;color:#c6d3e5;font-size:11px;&:last-child{border:0;}.level{color:#7f94b1;font-size:10px;}`;
const EmptyState = styled.div`padding:34px 20px;text-align:center;border:1px dashed #30415a;border-radius:10px;color:#8da0ba;font-size:12px;line-height:1.7;strong{display:block;color:#dce8f8;font-size:14px;margin-bottom:6px;}`;
const MobileNav = styled.div`display:none;@media(max-width:560px){display:flex;overflow:auto;gap:6px;margin:-15px 0 25px;padding-bottom:5px;}button{white-space:nowrap;border:1px solid #263750;background:#111d2e;color:#9eb0c8;border-radius:20px;padding:8px 11px;font-size:10px;}button[aria-current=page]{background:#1b3151;color:#e8f2ff;border-color:#365c8d;}`;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api/v1";

export function App() {
  const [section, setSection] = useState<Section>("Overview");
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/health`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error("API unavailable");
        return await response.json() as HealthResponse;
      })
      .then(setHealth)
      .catch(error => {
        if (error instanceof Error && error.name !== "AbortError") setApiError(true);
      });
    return () => controller.abort();
  }, []);

  const openLearning = () => setSection("My learning");
  const isHealthy = health?.status === "ok";

  return (
    <>
      <GlobalStyle />
      <Shell>
        <Sidebar>
          <Brand><BrandMark>T</BrandMark><BrandText>test<span>stream</span></BrandText></Brand>
          <NavLabel>Workspace</NavLabel>
          <Nav>{navigation.map(item => <NavButton key={item.label} $active={section === item.label} onClick={() => setSection(item.label)} title={item.label}><span className="glyph">{item.icon}</span>{item.label}{item.note && <span className="note">{item.note}</span>}</NavButton>)}</Nav>
          <SidebarBottom>
            <HelpCard><strong>Build your QA career</strong>Small, practical steps. Real testing skills. A portfolio you can show.</HelpCard>
            <Profile><div className="avatar">T</div><div className="details">Learner account<small>Starter workspace</small></div></Profile>
          </SidebarBottom>
        </Sidebar>
        <Main>
          <Topbar>
            <Breadcrumb>Workspace&nbsp; / &nbsp;<span>{section}</span></Breadcrumb>
            <TopActions><Search>⌕ <span>Search learning content...</span></Search><IconButton aria-label="Notifications">♧</IconButton></TopActions>
          </Topbar>
          <Content>
            <MobileNav>{navigation.map(item=><button key={item.label} aria-current={section===item.label?"page":undefined} onClick={()=>setSection(item.label)}>{item.label}</button>)}</MobileNav>
            {section === "Overview" ? (
              <>
                <Welcome><div><Eyebrow>Tuesday, 3 November 2026 · Your workspace</Eyebrow><H1>Welcome back, learner.</H1><Intro>Pick up where you left off. Every practice session moves your QA journey forward.</Intro></div><PrimaryButton onClick={openLearning}>Continue learning&nbsp; →</PrimaryButton></Welcome>
                <Grid4>
                  <Stat><div className="top">Learning progress <div className="icon">↗</div></div><div className="value">38%</div><div className="sub">Across your learning path</div></Stat>
                  <Stat><div className="top">Lessons completed <div className="icon">✓</div></div><div className="value">12 <small style={{fontSize:12,color:"#8194ae"}}>/ 32</small></div><div className="sub">Keep your momentum going</div></Stat>
                  <Stat><div className="top">Practice sessions <div className="icon">⌘</div></div><div className="value">08</div><div className="sub">Hands-on practice completed</div></Stat>
                  <Stat><div className="top">Skills in progress <div className="icon">◇</div></div><div className="value">04</div><div className="sub">Your growing QA toolkit</div></Stat>
                </Grid4>
                <TwoCol>
                  <Panel><PanelHead><h2>Pick up where you left off</h2><span>YOUR LEARNING</span></PanelHead><ContinueCard><CourseIcon>⌘</CourseIcon><CourseBody><h3>Foundations of software testing</h3><p>Understand how software is tested, why quality matters and where QA fits into product development.</p><ProgressTrack><span/></ProgressTrack><CourseFoot><span>Module 2 · Test levels and types</span><span>38% complete</span></CourseFoot></CourseBody><PrimaryButton onClick={openLearning}>Resume</PrimaryButton></ContinueCard></Panel>
                  <Panel><PanelHead><h2>Recent activity</h2><span>LAST 7 DAYS</span></PanelHead><ActivityList><Activity><div className="dot">✓</div><div className="copy">Completed: What is software testing?<small>Yesterday · 12 min</small></div></Activity><Activity><div className="dot">⌘</div><div className="copy">Opened the ShopStream practice product<small>2 days ago · Practice lab</small></div></Activity><Activity><div className="dot">▤</div><div className="copy">Started: Test levels and types<small>3 days ago · Learning</small></div></Activity></ActivityList></Panel>
                </TwoCol>
                <Panel><PanelHead><h2>Explore practice products</h2><GhostButton onClick={()=>setSection("Test products")}>View all products&nbsp; →</GhostButton></PanelHead><ProductGrid>
                  <Product onClick={()=>setSection("Test products")}><ProductVisual $tone="linear-gradient(130deg,#1b3b61,#244e7d)">🛍</ProductVisual><ProductInfo><h3>ShopStream</h3><p>A sample online store to practise UI, functional and API testing.</p><span className="tag">E-commerce · Beginner</span></ProductInfo></Product>
                  <Product onClick={()=>setSection("Test products")}><ProductVisual $tone="linear-gradient(130deg,#263b54,#31536c)">💳</ProductVisual><ProductInfo><h3>PayPilot</h3><p>Explore payment flows, validation, and transaction scenarios.</p><span className="tag">Payments · Intermediate</span></ProductInfo></Product>
                  <Product onClick={()=>setSection("Test products")}><ProductVisual $tone="linear-gradient(130deg,#293451,#4b4775)">📅</ProductVisual><ProductInfo><h3>Slotly</h3><p>Test booking journeys, availability and edge cases.</p><span className="tag">Booking · Beginner</span></ProductInfo></Product>
                </ProductGrid></Panel>
                <BottomGrid>
                  <Panel><PanelHead><h2>Your skills snapshot</h2><span>IN PROGRESS</span></PanelHead><SkillRow>Manual testing <span className="level">Getting started</span></SkillRow><SkillRow>Test case design <span className="level">Getting started</span></SkillRow><SkillRow>API testing <span className="level">Not started</span></SkillRow><SkillRow>Automation testing <span className="level">Not started</span></SkillRow></Panel>
                  <Panel><PanelHead><h2>Platform status</h2><span>LIVE CONNECTION</span></PanelHead><Activity><div className="dot">{isHealthy?"✓":"…"}</div><div className="copy">TestStream API<small>{isHealthy?"Connected and responding":apiError?"Connection unavailable":"Checking connection…"}</small></div></Activity><Activity><div className="dot">{health?.database==="connected"?"✓":"…"}</div><div className="copy">Database<small>{health?.database==="connected"?"MongoDB connected":apiError?"Not connected":"Checking connection…"}</small></div></Activity></Panel>
                </BottomGrid>
              </>
            ) : (
              <>
                <Welcome><div><Eyebrow>TestStream workspace</Eyebrow><H1>{section}</H1><Intro>{sectionDescription(section)}</Intro></div><GhostButton onClick={()=>setSection("Overview")}>← Back to overview</GhostButton></Welcome>
                {section === "My learning" ? <LearningPath /> : section === "Test products" ? <Panel><PanelHead><h2>Available practice products</h2><span>LEARN BY TESTING REALISTIC APPS</span></PanelHead><ProductGrid><Product><ProductVisual $tone="linear-gradient(130deg,#1b3b61,#244e7d)">🛍</ProductVisual><ProductInfo><h3>ShopStream</h3><p>Explore a sample online store. Practise browsing, search, product details, cart and checkout scenarios.</p><span className="tag">Available · UI + API</span></ProductInfo></Product><Product><ProductVisual $tone="linear-gradient(130deg,#263b54,#31536c)">💳</ProductVisual><ProductInfo><h3>PayPilot</h3><p>Payment workflows and transaction validation exercises.</p><span className="tag">Coming soon</span></ProductInfo></Product><Product><ProductVisual $tone="linear-gradient(130deg,#293451,#4b4775)">📅</ProductVisual><ProductInfo><h3>Slotly</h3><p>Booking and availability workflows with realistic edge cases.</p><span className="tag">Coming soon</span></ProductInfo></Product></ProductGrid></Panel> : <EmptyState><strong>{section} is being prepared.</strong>This space is part of your TestStream workspace. Structured learning content and practical exercises will appear here as the platform grows.</EmptyState>}
              </>
            )}
            <div style={{display:"flex",justifyContent:"space-between",gap:12,marginTop:25,color:"#637691",fontSize:10}}><span>TESTSTREAM · PRACTICAL QA LEARNING</span><span>v0.2.0 · {isHealthy?"Connected":"Development mode"}</span></div>
          </Content>
        </Main>
      </Shell>
    </>
  );
}

function sectionDescription(section: Section): string {
  const descriptions: Record<Section,string> = {
    "Overview": "Your learning and practice workspace.",
    "My learning": "One practical QA learning journey, from testing fundamentals through UI and API testing.",
    "Practice labs": "Hands-on exercises to turn concepts into practical testing skills.",
    "Test products": "Explore realistic sample applications and practise testing them like a QA engineer.",
    "Assessments": "Check your understanding and track your progress as you build new skills.",
    "Resources": "Guides, templates and reference material for your testing journey."
  };
  return descriptions[section];
}
