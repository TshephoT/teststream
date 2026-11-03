import { useState } from "react";
import styled from "styled-components";

const Page = styled.div({ display: "grid", gap: 18, maxWidth: 940 });
const Back = styled.button({ justifySelf: "start", border: 0, padding: 0, background: "transparent", color: "#8ebaff", fontSize: 11, cursor: "pointer" });
const Hero = styled.section({ padding: "24px 26px", border: "1px solid #29466b", borderRadius: 13, background: "linear-gradient(115deg,#172e4d,#142238)", h2: { margin: "8px 0", color: "#f0f6ff", fontSize: 24, letterSpacing: "-.7px" }, p: { margin: 0, maxWidth: 720, color: "#a4b6ce", fontSize: 12, lineHeight: 1.7 } });
const Eyebrow = styled.div({ color: "#85b5ff", fontSize: 10, fontWeight: 800, letterSpacing: "1.3px", textTransform: "uppercase" });
const Meta = styled.div({ display: "flex", gap: 16, marginTop: 15, color: "#91a6c2", fontSize: 10 });
const Panel = styled.section({ padding: "20px 22px", border: "1px solid #263750", borderRadius: 12, background: "#111d2e", h3: { margin: "0 0 10px", color: "#eaf2ff", fontSize: 15 }, p: { margin: "8px 0", color: "#a4b5cc", fontSize: 12, lineHeight: 1.8 }, "ul,ol": { margin: "10px 0", paddingLeft: 20, color: "#a4b5cc", fontSize: 12, lineHeight: 1.9 } });
const Callout = styled.div({ padding: "14px 16px", border: "1px solid #31547e", borderRadius: 9, background: "#142943", color: "#b8cce5", fontSize: 12, lineHeight: 1.75, strong: { display: "block", color: "#a9caff", marginBottom: 5, fontSize: 10, letterSpacing: ".6px", textTransform: "uppercase" } });
const Question = styled.div({ display: "grid", gap: 9, marginTop: 14 });
const Option = styled.button<{ $selected: boolean; $correct?: boolean }>(({ $selected, $correct }) => ({ width: "100%", padding: "12px 14px", borderRadius: 9, textAlign: "left", border: "1px solid " + ($selected ? ($correct ? "#368565" : "#426da3") : "#2b3d56"), background: $selected ? ($correct ? "#17382f" : "#172b45") : "#142136", color: "#d6e3f4", fontSize: 11, cursor: "pointer" }));
const Feedback = styled.div<{ $correct: boolean }>(({ $correct }) => ({ padding: 12, borderRadius: 9, background: $correct ? "#17382f" : "#382a25", color: $correct ? "#a4e0c2" : "#edc2a7", fontSize: 11, lineHeight: 1.6 }));
const Actions = styled.div({ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" });
const Button = styled.button<{ $primary?: boolean }>(({ $primary }) => ({ border: "1px solid " + ($primary ? "#4b8cf5" : "#2b3b53"), background: $primary ? "#3479e7" : "#142136", color: $primary ? "#fff" : "#b7c7dc", padding: "10px 14px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", opacity: 1, "&:disabled": { opacity: .45, cursor: "not-allowed" } }));

type Props = { onBack: () => void; onComplete: () => void };

export function LessonView({ onBack, onComplete }: Props) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const correctAnswer = answer === 1;

  return <Page>
    <Back onClick={onBack}>← Back to Software Testing Fundamentals</Back>
    <Hero>
      <Eyebrow>Software Testing Fundamentals · Lesson 01</Eyebrow>
      <h2>What is Software Testing?</h2>
      <p>Discover what testing really means, why teams do it, and how testers help people trust the software they use.</p>
      <Meta><span>◷ 8–10 minutes</span><span>◈ Beginner</span><span>◇ Concept + knowledge check</span></Meta>
    </Hero>

    <Panel>
      <h3>Let's start with a simple example</h3>
      <p>Imagine you are using a banking app to send R500 to a friend. You enter their account details, confirm the amount and tap <strong>Send</strong>.</p>
      <p>You expect the app to send exactly R500 to the correct person, show a clear result and update your balance accurately. But what if the app sends R5,000? What if it charges you twice? What if it says the payment failed even though the money left your account?</p>
      <Callout><strong>Think about it</strong>Would you trust that app with your next payment? Software quality matters because people rely on software to do important things correctly.</Callout>
    </Panel>

    <Panel>
      <h3>So, what is software testing?</h3>
      <p><strong>Software testing is the process of evaluating a software application or system to find defects, check whether it meets requirements, and provide information about its quality and risks.</strong></p>
      <p>In everyday language, testing means checking whether software behaves as expected — and exploring what happens when users do things the team may not have expected.</p>
      <p>Testing is not simply clicking buttons to see if they work. It involves asking questions, understanding how a feature should behave, trying realistic and unusual situations, observing the results and communicating what you discover.</p>
    </Panel>

    <Panel>
      <h3>What does a tester actually do?</h3>
      <p>A tester approaches a feature with curiosity and a healthy amount of scepticism. A typical activity might look like this:</p>
      <ol>
        <li><strong>Understand the expectation.</strong> What should the feature do? What rules must it follow?</li>
        <li><strong>Explore possible situations.</strong> Consider normal use, incorrect input, unusual values and unexpected behaviour.</li>
        <li><strong>Try it out.</strong> Interact with the application, use test data and observe what happens.</li>
        <li><strong>Compare actual and expected results.</strong> Did the software behave as intended?</li>
        <li><strong>Communicate findings.</strong> Record defects clearly so the team can understand, investigate and fix them.</li>
      </ol>
      <Callout><strong>Remember</strong>A tester does not need to prove that software is perfect. The goal is to uncover useful information about quality and risk so the team can make better decisions.</Callout>
    </Panel>

    <Panel>
      <h3>Testing is more than finding bugs</h3>
      <p>Finding defects is important, but testing also helps a team:</p>
      <ul>
        <li>Check whether requirements and user needs are being met.</li>
        <li>Reduce the risk of failures reaching real users.</li>
        <li>Give stakeholders information they need to make release decisions.</li>
        <li>Build confidence that important workflows behave as expected.</li>
        <li>Identify gaps, unclear requirements and opportunities to improve the product.</li>
      </ul>
    </Panel>

    <Panel>
      <h3>Quick knowledge check</h3>
      <p>A team is building a shopping app. A tester checks that adding one item to the cart works, then tries adding the same item several times and entering an invalid quantity.</p>
      <p><strong>What is the main purpose of these testing activities?</strong></p>
      <Question>
        <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. To make the application look more attractive.</Option>
        <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. To evaluate behaviour, uncover defects and understand product risk.</Option>
        <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. To guarantee that the application will never fail.</Option>
      </Question>
      {answer !== null && <Feedback $correct={correctAnswer}>{correctAnswer ? "That's right. Testing checks expected and unexpected behaviour, helps reveal defects and provides information about risk." : "Not quite. Think about what the tester is trying to learn by checking normal use and unusual input. Testing cannot guarantee that software will never fail."}</Feedback>}
    </Panel>

    <Actions>
      <Back onClick={onBack}>← Return to lesson outline</Back>
      <Button $primary disabled={!correctAnswer} onClick={() => { setCompleted(true); onComplete(); }}>{completed ? "Lesson completed ✓" : "Mark lesson as complete"}</Button>
    </Actions>
  </Page>;
}
