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

type Props = { lessonId: "what-is-testing" | "why-quality-matters" | "software-development-lifecycle" | "requirements-analysis"; onBack: () => void; onComplete: () => void };

export function LessonView({ lessonId, onBack, onComplete }: Props) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const isQualityLesson = lessonId === "why-quality-matters";
  const isSdlcLesson = lessonId === "software-development-lifecycle";
  const isRequirementsLesson = lessonId === "requirements-analysis";
  const correctIndex = isQualityLesson ? 2 : 1;
  const correctAnswer = answer === correctIndex;
  const title = isRequirementsLesson ? "Requirements Analysis" : isSdlcLesson ? "The Software Development Lifecycle (SDLC)" : isQualityLesson ? "Why Quality Matters" : "What is Software Testing?";

  return <Page>
    <Back onClick={onBack}>← Back to Software Testing Fundamentals</Back>
    <Hero>
      <Eyebrow>Software Testing Fundamentals · Lesson {isRequirementsLesson ? "04" : isSdlcLesson ? "03" : isQualityLesson ? "02" : "01"}</Eyebrow>
      <h2>{title}</h2>
      <p>{isRequirementsLesson ? "Learn how to understand what a system must do, spot gaps in requirements and turn expectations into useful test scenarios." : isSdlcLesson ? "Follow a software product from its first idea to release and ongoing improvement — and see where testing fits at every stage." : isQualityLesson ? "Understand how software quality affects real people, businesses and the decisions teams make before release." : "Discover what testing really means, why teams do it, and how testers help people trust the software they use."}</p>
      <Meta><span>◷ 8–10 minutes</span><span>◈ Beginner</span><span>◇ Concept + knowledge check</span></Meta>
    </Hero>

    {isRequirementsLesson ? <>
      <Panel>
        <h3>Before you test, understand what should happen</h3>
        <p>Imagine a customer is using a banking app to make a payment. The screen has a button labelled <strong>Pay now</strong>. What should happen when the customer taps it? How much can they send? What if they do not have enough money? What if the payment service is unavailable?</p>
        <p>If the team has not agreed on these behaviours, how can a tester confidently decide whether the feature is working correctly?</p>
        <Callout><strong>Key idea</strong>Requirements describe what a product or feature needs to do, the constraints it must respect and the outcomes it should provide. Testers analyse requirements to understand what needs to be checked.</Callout>
      </Panel>
      <Panel>
        <h3>Functional and non-functional requirements</h3>
        <p>Requirements commonly describe two broad aspects of a system:</p>
        <ul>
          <li><strong>Functional requirements:</strong> Describe what the system must do. Example: a customer can transfer money to a saved beneficiary, and the app displays a confirmation when the transfer succeeds.</li>
          <li><strong>Non-functional requirements:</strong> Describe how well the system must operate or the constraints it must meet. Example: payment details must be protected, and the confirmation screen should load within an agreed response time.</li>
        </ul>
        <p>Both matter. A transfer feature may perform the correct action but still be unacceptable if it exposes sensitive information or takes too long to respond.</p>
      </Panel>
      <Panel>
        <h3>User stories and acceptance criteria</h3>
        <p>In Agile teams, a requirement may be described as a <strong>user story</strong>. A common format is:</p>
        <Callout><strong>Example user story</strong>As a banking customer, I want to transfer money to a saved beneficiary so that I can pay someone without entering their details every time.</Callout>
        <p>The story explains who needs something and why. <strong>Acceptance criteria</strong> add the specific conditions that must be satisfied for the story to be accepted.</p>
        <p>For example:</p>
        <ul>
          <li>Given a customer has a valid saved beneficiary and sufficient funds, when they submit a valid transfer, then the payment is processed and a confirmation is displayed.</li>
          <li>Given the customer has insufficient funds, when they try to submit the transfer, then the payment is not processed and a clear error is displayed.</li>
          <li>Given the payment service is unavailable, when the customer submits the transfer, then the app communicates the outcome without falsely showing a successful payment.</li>
        </ul>
        <p>Acceptance criteria make expectations more specific and give the team a shared basis for implementation and testing.</p>
      </Panel>
      <Panel>
        <h3>How testers analyse requirements</h3>
        <p>Do not assume that a requirement is clear just because it is written down. Read it carefully and look for gaps that could lead to different interpretations.</p>
        <ul>
          <li><strong>Ambiguous:</strong> Could two people understand it differently? For example, what does “quickly” mean?</li>
          <li><strong>Incomplete:</strong> Are important situations missing, such as insufficient funds or a service timeout?</li>
          <li><strong>Conflicting:</strong> Does one requirement contradict another?</li>
          <li><strong>Not testable:</strong> Is there a clear way to determine whether the requirement has been met?</li>
          <li><strong>Unrealistic:</strong> Does it describe something the system or agreed constraints cannot reasonably support?</li>
        </ul>
        <Callout><strong>Good tester habit</strong>Ask specific, neutral questions. Instead of saying “this requirement is bad”, ask “What should the customer see if the payment times out after the request is submitted?”</Callout>
      </Panel>
      <Panel>
        <h3>Turn requirements into test scenarios</h3>
        <p>A <strong>test scenario</strong> describes a situation or behaviour you want to verify. It is a useful starting point for deciding what to test. From the payment requirements above, you could identify scenarios such as:</p>
        <ol>
          <li>Submit a transfer with valid beneficiary details and sufficient funds.</li>
          <li>Attempt a transfer when the account has insufficient funds.</li>
          <li>Submit a transfer when the payment service is unavailable.</li>
          <li>Check that the confirmation reflects the correct amount and beneficiary.</li>
          <li>Check that sensitive payment information is not exposed to unauthorised users.</li>
        </ol>
        <p>Later, you can expand each scenario into detailed test cases with preconditions, test data, steps and expected results. For now, focus on identifying the behaviours that matter.</p>
      </Panel>
    </> : isSdlcLesson ? <>
      <Panel>
        <h3>From an idea to a product people can use</h3>
        <p>Imagine a business wants to launch an online shopping app. Customers should be able to browse products, add them to a basket, pay and track their orders. Teams break this work into stages so they can plan, build, check and improve the product.</p>
        <p>The <strong>Software Development Lifecycle (SDLC)</strong> is a structured way of organising the work involved in creating and maintaining software. It describes the journey from identifying a need through building and operating a solution.</p>
        <Callout><strong>Key idea</strong>The SDLC is the bigger journey of building software. Testing helps the team check quality and manage risk throughout that journey.</Callout>
      </Panel>
      <Panel>
        <h3>The common stages of the SDLC</h3>
        <p>Different organisations use different names and combine stages in different ways. A typical lifecycle includes:</p>
        <ol>
          <li><strong>Planning:</strong> Identify the problem, goals, scope, resources and risks. Is the shopping app worth building, and what should it achieve?</li>
          <li><strong>Requirements and analysis:</strong> Understand what users and the business need. For example, customers must be able to pay securely and receive an order confirmation.</li>
          <li><strong>Design:</strong> Plan how the solution will work, including its user experience, architecture, data and integrations.</li>
          <li><strong>Development:</strong> Developers write the code and build the features.</li>
          <li><strong>Testing:</strong> The team evaluates the product, checks requirements, explores risks and reports defects.</li>
          <li><strong>Deployment:</strong> The software is released to an environment where users can access it.</li>
          <li><strong>Maintenance:</strong> The team monitors the product, fixes issues, supports users and delivers improvements.</li>
        </ol>
        <Callout><strong>Remember</strong>These stages are a useful model, not a rule that every team must follow in a strict one-way sequence. Real projects often revisit earlier decisions as new information emerges.</Callout>
      </Panel>
      <Panel>
        <h3>Where does the tester fit in?</h3>
        <p>A common misconception is that testers wait until developers finish everything before getting involved. In a healthy delivery process, testing starts much earlier.</p>
        <ul>
          <li><strong>Planning:</strong> Ask about risks, important user journeys and how success will be measured.</li>
          <li><strong>Requirements:</strong> Review user stories, clarify unclear rules and identify missing acceptance criteria.</li>
          <li><strong>Design:</strong> Review workflows and designs, identify usability or integration risks, and help plan test coverage.</li>
          <li><strong>Development:</strong> Discuss testability, prepare test data and environments, and work with developers on early checks.</li>
          <li><strong>Testing:</strong> Execute checks, explore behaviour, report defects and provide evidence about quality.</li>
          <li><strong>Release and maintenance:</strong> Support release decisions, verify fixes, run regression tests and investigate issues reported by users.</li>
        </ul>
        <Callout><strong>Shift-left testing</strong>This means involving testing activities earlier in the lifecycle, rather than waiting until the end. Finding a misunderstanding in a requirement review can prevent expensive rework later.</Callout>
      </Panel>
      <Panel>
        <h3>Does every team work the same way?</h3>
        <p>No. Some teams use a more sequential approach, often called Waterfall, where work moves through planned phases. Other teams use Agile approaches, delivering software in smaller increments and getting feedback frequently.</p>
        <p>In Agile teams, planning, design, development and testing may happen repeatedly within short iterations or sprints. Testing is continuous and closely connected to the rest of the team's work.</p>
        <p>Neither approach removes the need to understand requirements, manage risks, test changes and support software after release.</p>
      </Panel>
    </> : !isQualityLesson ? <>
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
    </> : <>
      <Panel>
        <h3>Quality is something people experience</h3>
        <p>Imagine ordering groceries through an online store. The app lets you search, add products to your basket and pay. The payment succeeds, but the order never appears. The app looks polished, yet the experience has failed.</p>
        <p>Now imagine the order is created correctly, but the app takes 40 seconds to load each page. The core feature works, but customers may still abandon it.</p>
        <Callout><strong>Key idea</strong>Software quality is not just about whether a feature works. It is about whether the product is useful, dependable and safe to use in the situations that matter.</Callout>
      </Panel>
      <Panel>
        <h3>What does good quality look like?</h3>
        <p>Quality has several dimensions. A product can be strong in one area and weak in another:</p>
        <ul>
          <li><strong>Functionality:</strong> Does it do what users need it to do?</li>
          <li><strong>Reliability:</strong> Does it work consistently without unexpected failures?</li>
          <li><strong>Usability:</strong> Can people understand and use it without unnecessary difficulty?</li>
          <li><strong>Performance:</strong> Does it respond in a reasonable amount of time?</li>
          <li><strong>Security:</strong> Does it protect accounts, information and transactions?</li>
          <li><strong>Accessibility:</strong> Can people with different abilities use it?</li>
        </ul>
        <p>These are not separate boxes to tick once. They are different ways of looking at the same user experience.</p>
      </Panel>
      <Panel>
        <h3>Why poor quality is expensive</h3>
        <p>A defect discovered before release is usually easier to investigate and fix than one discovered by thousands of customers. Once a problem reaches production, the impact can include:</p>
        <ul>
          <li>Lost sales or failed transactions.</li>
          <li>Customer complaints and loss of trust.</li>
          <li>Support teams spending time resolving avoidable issues.</li>
          <li>Emergency fixes, operational disruption and reputational damage.</li>
        </ul>
        <p>Not every defect has the same impact. A spelling mistake on a rarely visited page is different from a defect that sends money to the wrong account. Testers help teams understand that difference.</p>
      </Panel>
      <Panel>
        <h3>Quality is a team responsibility</h3>
        <p>Testers play an important role, but they cannot create quality alone. Developers, product owners, designers, analysts and operations teams all influence the final product.</p>
        <p>Testing provides evidence: what was checked, what happened, what remains uncertain and where the biggest risks are. The team uses that information to make better decisions.</p>
        <Callout><strong>Remember</strong>The goal is not simply to release software with zero known bugs. It is to understand the risks and make an informed decision about whether the product is ready for its users.</Callout>
      </Panel>
    </>}

    <Panel>
      <h3>Quick knowledge check</h3>
      <p>{isRequirementsLesson ? "A requirement says: “The payment should be processed quickly.” It does not define what quickly means. What should the tester do?" : isSdlcLesson ? "A tester reviews a user story and notices that the payment failure behaviour is not explained. Developers have not started coding yet. What is the best action?" : isQualityLesson ? "A banking app processes payments correctly, but it exposes customer account details to other users. What does this tell us about its quality?" : "A team is building a shopping app. A tester checks that adding one item to the cart works, then tries adding the same item several times and entering an invalid quantity. What is the main purpose of these testing activities?"}</p>
      <Question>
        {isSdlcLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. Wait until the application is released and see what happens.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Raise the gap now so the team can clarify the expected behaviour before implementation.</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Ignore it because requirements are only the product owner's responsibility.</Option>
        </> : isQualityLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. The app is high quality because payments work.</Option>
          <Option $selected={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Security is only important for banking staff.</Option>
          <Option $selected={answer === 2} $correct={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Quality has several dimensions; a security failure is serious even if payments work.</Option>
        </> : <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. To make the application look more attractive.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. To evaluate behaviour, uncover defects and understand product risk.</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. To guarantee that the application will never fail.</Option>
        </>}
      </Question>
      {answer !== null && <Feedback $correct={correctAnswer}>{correctAnswer ? (isRequirementsLesson ? "Exactly. A requirement should be clear and measurable. Ask the right stakeholder to agree on what “quickly” means before deciding whether the system passes." : isSdlcLesson ? "Exactly. Clarifying requirements early helps prevent misunderstandings from becoming defects later. Testing contributes before code is written." : isQualityLesson ? "Exactly. A product can work functionally and still be poor quality if it puts customer information at risk." : "That's right. Testing checks expected and unexpected behaviour, helps reveal defects and provides information about risk.") : (isRequirementsLesson ? "Not quite. Avoid inventing your own interpretation. The team needs an agreed, measurable expectation before it can be tested fairly." : isSdlcLesson ? "Not quite. Think about when the team can most easily clarify an unclear requirement — before or after implementation?" : isQualityLesson ? "Not quite. Think about the different dimensions of quality. Correct payment processing does not make an exposure of private information acceptable." : "Not quite. Think about what the tester is trying to learn by checking normal use and unusual input. Testing cannot guarantee that software will never fail.")}</Feedback>}
    </Panel>

    <Actions>
      <Back onClick={onBack}>← Return to lesson outline</Back>
      <Button $primary disabled={!correctAnswer} onClick={() => { setCompleted(true); onComplete(); }}>{completed ? "Lesson completed ✓" : "Mark lesson as complete"}</Button>
    </Actions>
  </Page>;
}
