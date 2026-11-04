import { useState } from "react";
import styled from "styled-components";
import { LessonView } from "./LessonView.js";

type Discipline = {
  id: string;
  number: string;
  title: string;
  description: string;
  outcome: string;
  lessons: string[];
  practice: string;
  status: "Available" | "Coming next" | "In progress";
};

const disciplines: Discipline[] = [
  {
    id: "fundamentals", number: "01", title: "Software Testing Fundamentals",
    description: "Build a solid understanding of quality, the software development lifecycle and the work a tester does.",
    outcome: "Understand the purpose of testing, analyse simple requirements and explain how testing fits into delivery.",
    lessons: ["What is software testing?", "Why quality matters", "The software development lifecycle", "The software testing lifecycle", "Testing principles", "Test levels and test types", "Understanding requirements and acceptance criteria", "Test scenarios and test cases", "Test design techniques", "Defect reporting and the defect lifecycle", "Putting it all together: a practical testing exercise"],
    practice: "Review a short product brief, identify testable requirements and write your first set of test scenarios.",
    status: "Available"
  },
  {
    id: "ui", number: "02", title: "Manual & UI Testing",
    description: "Learn to test real application workflows, explore browser behaviour and evaluate the experience from a user's perspective.",
    outcome: "Independently test a web application by translating requirements into UI checks, validating workflows and input, investigating browser behaviour, and reporting reproducible defects.",
    lessons: ["Introduction to manual and UI testing", "Understanding the user interface", "Turning requirements into UI checks", "Functional UI testing", "Forms and input validation", "Navigation, sessions and application state", "Responsive and cross-browser testing", "Usability and accessibility testing", "Exploratory testing", "Browser DevTools for testers", "Investigating and documenting UI defects", "ShopStream: end-to-end testing capstone"],
    practice: "Test the ShopStream sample store. Validate search, product details, forms, cart and checkout across realistic user journeys, then investigate and report the issues you discover.",
    status: "In progress"
  },
  {
    id: "api", number: "03", title: "API Testing",
    description: "Understand how applications communicate and learn to validate APIs using real requests and responses.",
    outcome: "Send API requests, inspect responses, validate data and build a reusable collection of API checks.",
    lessons: ["How APIs work", "HTTP, REST and JSON", "Methods, status codes and headers", "Query parameters and request bodies", "Authentication and authorisation", "Validating response bodies and schemas", "Negative testing and edge cases", "Chaining requests and managing environments"],
    practice: "Use a supplied Bruno collection to test a sample API. Validate status codes, response data, error handling and related workflows.",
    status: "Coming next"
  }
];

const IntroCard = styled.div({
  padding: "22px 24px", border: "1px solid #29466b", borderRadius: 13,
  background: "linear-gradient(115deg,#172e4d,#142238)", marginBottom: 20,
  ".eyebrow": { fontSize: 10, fontWeight: 800, letterSpacing: "1.4px", color: "#85b5ff", textTransform: "uppercase" },
  h2: { fontSize: 19, letterSpacing: "-.5px", color: "#f0f6ff", margin: "10px 0 7px" },
  p: { fontSize: 12, lineHeight: 1.7, color: "#9db0ca", margin: 0, maxWidth: 720 }
});
const Header = styled.div({ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, margin: "25px 0 13px", color: "#e8f0fc", fontSize: 13, fontWeight: 700, span: { fontSize: 10, color: "#8194ae", fontWeight: 500 } });
const Stack = styled.div({ display: "grid", gap: 12 });
const Card = styled.section<{ $active: boolean }>(({ $active }) => ({
  border: "1px solid " + ($active ? "#426da3" : "#263750"),
  borderRadius: 12,
  background: "#111d2e",
  overflow: "hidden",
  boxShadow: $active ? "0 8px 28px #07142655" : "none"
}));
const CardButton = styled.button({
  display: "flex", alignItems: "center", gap: 15, width: "100%", padding: "17px 18px", textAlign: "left",
  border: 0, background: "transparent", color: "inherit", cursor: "pointer",
  "&:hover": { background: "#16263b" }
});
const Number = styled.div({ width: 42, height: 42, flex: "0 0 42px", borderRadius: 11, display: "grid", placeItems: "center", background: "#1b3455", color: "#91bdff", fontSize: 17, fontWeight: 750 });
const CardCopy = styled.div({
  flex: 1, minWidth: 0,
  h3: { margin: "0 0 5px", color: "#edf4ff", fontSize: 13 },
  p: { margin: 0, color: "#8da1bd", fontSize: 11, lineHeight: 1.55 }
});
const Status = styled.span<{ $status: Discipline["status"] }>(({ $status }) => ({
  display: "inline-flex", alignItems: "center", padding: "5px 8px", borderRadius: 20, whiteSpace: "nowrap",
  background: $status === "Available" ? "#17382f" : $status === "In progress" ? "#1b3455" : "#252f40", color: $status === "Available" ? "#8ed9b6" : $status === "In progress" ? "#91bdff" : "#91a3bc", fontSize: 9, fontWeight: 700,
  "@media(max-width:600px)": { display: "none" }
}));
const Details = styled.div({ padding: "0 20px 20px 75px", "@media(max-width:600px)": { padding: "0 16px 18px" } });
const Outcome = styled.div({
  padding: "13px 14px", border: "1px solid #2b405c", borderRadius: 9, background: "#14243a",
  strong: { display: "block", color: "#a9caff", fontSize: 10, marginBottom: 5, textTransform: "uppercase", letterSpacing: ".7px" },
  p: { margin: 0, color: "#b9c9dd", fontSize: 11, lineHeight: 1.6 }
});
const Columns = styled.div({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 16, "@media(max-width:700px)": { gridTemplateColumns: "1fr" } });
const Subheading = styled.h4({ margin: "0 0 10px", color: "#dce8f8", fontSize: 11 });
const LessonList = styled.ol({ margin: 0, paddingLeft: 19, color: "#9eafc7", fontSize: 11, lineHeight: 1.9, li: { paddingLeft: 3 } });
const Practice = styled.div({ border: "1px solid #2b405c", borderRadius: 9, padding: 14, background: "#101c2d", p: { margin: "0 0 11px", color: "#9eafc7", fontSize: 11, lineHeight: 1.7 } });
const PracticeTitle = styled.h4({ margin: "0 0 8px", color: "#e5efff", fontSize: 13 });
const PracticeMeta = styled.div({ marginBottom: 12, color: "#83a9d8", fontSize: 10, fontWeight: 700 });
const PracticeList = styled.ul({ margin: "0 0 14px", paddingLeft: 18, color: "#aebed3", fontSize: 10, lineHeight: 1.85 });
const StartPracticeButton = styled.button({ border: "1px solid #477bb8", borderRadius: 7, padding: "9px 12px", background: "#1b3b61", color: "#dcecff", fontSize: 11, fontWeight: 700, cursor: "pointer", "&:hover": { background: "#244b77" } });
const Note = styled.p({ margin: "16px 2px 0", color: "#7186a3", fontSize: 10, lineHeight: 1.6 });
const LessonLink = styled.button({ border: 0, padding: 0, background: "transparent", color: "#8ebaff", font: "inherit", textAlign: "left", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 });

export function LearningPath() {
  const [expanded, setExpanded] = useState("fundamentals");
  const [showLesson, setShowLesson] = useState(false);
  const [activeLesson, setActiveLesson] = useState<"manual-ui-introduction" | "what-is-testing" | "why-quality-matters" | "software-development-lifecycle" | "software-testing-lifecycle" | "testing-principles" | "test-levels-types" | "requirements-acceptance-criteria" | "test-scenarios-test-cases" | "test-design-techniques" | "defect-reporting-lifecycle" | "practical-testing-exercise">("what-is-testing");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  if (showLesson) return <LessonView lessonId={activeLesson} onBack={() => setShowLesson(false)} onComplete={() => setCompletedLessons(current => current.includes(activeLesson) ? current : [...current, activeLesson])} />;
  return <>
    <IntroCard>
      <div className="eyebrow">Your learning journey</div>
      <h2>Learn QA by doing QA.</h2>
      <p>One structured path for everyone. Learn a concept, apply it to a realistic product, and build practical evidence of your testing skills. Work through the disciplines in order or revisit a topic whenever you need it.</p>
    </IntroCard>
    <Header>Core learning disciplines <span>3 disciplines · one shared path</span></Header>
    <Stack>
      {disciplines.map((discipline) => {
        const isExpanded = expanded === discipline.id;
        const available = discipline.status === "Available";
        return <Card key={discipline.id} $active={isExpanded}>
          <CardButton aria-expanded={isExpanded} onClick={() => setExpanded(isExpanded ? "" : discipline.id)}>
            <Number>{discipline.number}</Number>
            <CardCopy><h3>{discipline.title}</h3><p>{discipline.description}</p></CardCopy>
            <Status $status={discipline.status}>{discipline.status}</Status>
            <span aria-hidden="true" style={{ color: "#8ba2c0", fontSize: 17 }}>{isExpanded ? "−" : "+"}</span>
          </CardButton>
          {isExpanded && <Details>
            <Outcome><strong>What you will be able to do</strong><p>{discipline.outcome}</p></Outcome>
            <Columns>
              <div><Subheading>Lessons in this discipline</Subheading><LessonList>{discipline.lessons.map((lesson, index) => <li key={lesson}>{(discipline.id === "fundamentals" && index <= 10) || (discipline.id === "ui" && index === 0) ? <LessonLink type="button" onClick={() => { const lessonIds = ["manual-ui-introduction", "what-is-testing", "why-quality-matters", "software-development-lifecycle", "software-testing-lifecycle", "testing-principles", "test-levels-types", "requirements-acceptance-criteria", "test-scenarios-test-cases", "test-design-techniques", "defect-reporting-lifecycle", "practical-testing-exercise"] as const; setActiveLesson(discipline.id === "ui" ? "manual-ui-introduction" : lessonIds[index + 1]); setShowLesson(true); }}>{lesson} {completedLessons.includes(["manual-ui-introduction", "what-is-testing", "why-quality-matters", "software-development-lifecycle", "software-testing-lifecycle", "testing-principles", "test-levels-types", "requirements-acceptance-criteria", "test-scenarios-test-cases", "test-design-techniques", "defect-reporting-lifecycle", "practical-testing-exercise"][index]) ? "✓" : "→"}</LessonLink> : lesson}</li>)}</LessonList></div>
              <div><Subheading>Practical application</Subheading>{discipline.id === "fundamentals" ? <Practice>
                <PracticeTitle>Your first QA assignment</PracticeTitle>
                <p>Test a simulated banking money-transfer feature. Work through the requirements, identify risks, design test scenarios and investigate a defect.</p>
                <PracticeMeta>15–20 minutes · Beginner friendly</PracticeMeta>
                <PracticeList>
                  <li>Requirement clarification questions</li>
                  <li>Test scenarios and detailed test cases</li>
                  <li>A clear defect report</li>
                  <li>Retest and regression results</li>
                </PracticeList>
                <StartPracticeButton type="button" onClick={() => { setActiveLesson("practical-testing-exercise"); setShowLesson(true); }}>Start practical exercise →</StartPracticeButton>
              </Practice> : <Practice><p>{discipline.practice}</p></Practice>}</div>
            </Columns>
          </Details>}
        </Card>;
      })}
    </Stack>
    <Note>Your first lesson is ready to explore. Lesson completion is currently held in this session; account-based progress saving will be added in a later milestone.</Note>
  </>;
}
