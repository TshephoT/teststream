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

type Props = { lessonId: "what-is-testing" | "why-quality-matters" | "software-development-lifecycle" | "software-testing-lifecycle" | "testing-principles" | "test-levels-types"; onBack: () => void; onComplete: () => void };

export function LessonView({ lessonId, onBack, onComplete }: Props) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const isQualityLesson = lessonId === "why-quality-matters";
  const isSdlcLesson = lessonId === "software-development-lifecycle";
  const isStlcLesson = lessonId === "software-testing-lifecycle";
  const isPrinciplesLesson = lessonId === "testing-principles";
  const isLevelsTypesLesson = lessonId === "test-levels-types";
  const correctIndex = isQualityLesson ? 2 : 1;
  const correctAnswer = answer === correctIndex;
  const title = isLevelsTypesLesson ? "Test Levels and Test Types" : isPrinciplesLesson ? "Testing Principles" : isStlcLesson ? "The Software Testing Lifecycle (STLC)" : isSdlcLesson ? "The Software Development Lifecycle (SDLC)" : isQualityLesson ? "Why Quality Matters" : "What is Software Testing?";

  return <Page>
    <Back onClick={onBack}>← Back to Software Testing Fundamentals</Back>
    <Hero>
      <Eyebrow>Software Testing Fundamentals · Lesson {isLevelsTypesLesson ? "06" : isPrinciplesLesson ? "05" : isStlcLesson ? "04" : isSdlcLesson ? "03" : isQualityLesson ? "02" : "01"}</Eyebrow>
      <h2>{title}</h2>
      <p>{isLevelsTypesLesson ? "Understand the different layers and purposes of testing, and learn how they work together to build confidence in a product." : isPrinciplesLesson ? "Explore seven foundational principles that guide effective testing and help testers make better decisions." : isStlcLesson ? "Follow the testing process from understanding requirements through planning, execution, defect handling and closure." : isSdlcLesson ? "Follow a software product from its first idea to release and ongoing improvement — and see where testing fits at every stage." : isQualityLesson ? "Understand how software quality affects real people, businesses and the decisions teams make before release." : "Discover what testing really means, why teams do it, and how testers help people trust the software they use."}</p>
      <Meta><span>◷ 8–10 minutes</span><span>◈ Beginner</span><span>◇ Concept + knowledge check</span></Meta>
    </Hero>

    {isLevelsTypesLesson ? <>
      <Panel>
        <h3>Not all testing happens at the same level</h3>
        <p>Imagine a banking app that lets customers transfer money. A developer may check a small calculation, a team may check how the app talks to the payment service, and testers may verify the complete transfer journey from the customer's screen to the final confirmation.</p>
        <p>These are different <strong>test levels</strong>. Each level looks at the software from a different scope and helps find different kinds of problems.</p>
        <Callout><strong>Key idea</strong>Test levels describe where or at what scope testing is performed. Test types describe what quality characteristic or behaviour is being checked, or the purpose of a test.</Callout>
      </Panel>
      <Panel>
        <h3>The four commonly used test levels</h3>
        <ol>
          <li><strong>Unit testing:</strong> Checks a small, isolated piece of code, such as a function that calculates a transfer fee. Usually performed by developers, often with automated tests.</li>
          <li><strong>Integration testing:</strong> Checks whether components or systems work correctly together. For example, does the banking app send the correct payment request to the payment service, and handle its response properly?</li>
          <li><strong>System testing:</strong> Checks the complete integrated application against its requirements. For example, can a customer log in, select a beneficiary, submit a transfer and receive the correct result?</li>
          <li><strong>Acceptance testing:</strong> Evaluates whether the solution is ready for its intended use and meets business or user needs. Business representatives or intended users may help confirm that the transfer journey supports the real business process.</li>
        </ol>
        <Callout><strong>Remember</strong>These levels are related, but they are not simply job titles. Developers, testers, business analysts and users may all contribute depending on the team and context.</Callout>
      </Panel>
      <Panel>
        <h3>Functional and non-functional testing</h3>
        <p>Test types can also focus on different aspects of quality:</p>
        <ul>
          <li><strong>Functional testing:</strong> Checks what the system does. Does a valid transfer debit the correct account, credit the intended beneficiary and show the right confirmation?</li>
          <li><strong>Non-functional testing:</strong> Checks how well the system operates. Does the transfer journey respond within agreed performance targets? Is customer information protected? Can users with accessibility needs complete the journey?</li>
        </ul>
        <p>Functional and non-functional testing are not competing alternatives. A feature needs to behave correctly and provide an acceptable level of quality.</p>
      </Panel>
      <Panel>
        <h3>Confirmation testing and regression testing</h3>
        <p>Imagine a defect caused the app to display the wrong transfer fee. A developer fixes the calculation. What should the tester do?</p>
        <ul>
          <li><strong>Confirmation testing (retesting):</strong> Run the test that originally exposed the defect again to confirm the specific issue has been fixed.</li>
          <li><strong>Regression testing:</strong> Run relevant tests to check that the change has not caused problems in existing functionality. For example, verify that transfer limits, balances and payment confirmations still work.</li>
        </ul>
        <Callout><strong>Easy way to remember</strong>Retesting asks: “Did this particular fix work?” Regression testing asks: “Did the change break anything else?”</Callout>
      </Panel>
      <Panel>
        <h3>How the pieces fit together</h3>
        <p>One feature can be tested at several levels and with several test types. For a money transfer:</p>
        <ul>
          <li>At unit level, check the transfer fee calculation.</li>
          <li>At integration level, check communication with the payment service.</li>
          <li>At system level, check the complete transfer journey.</li>
          <li>At acceptance level, check that the journey meets the business and customer need.</li>
          <li>Across those levels, consider functional behaviour as well as security, performance and accessibility.</li>
        </ul>
        <p>The right combination depends on the feature, the risks and the product. Testing is most useful when the team chooses coverage deliberately rather than assuming one test level is enough.</p>
      </Panel>
    </> : isPrinciplesLesson ? <>
      <Panel>
        <h3>Why do testers need principles?</h3>
        <p>Imagine you are testing a banking app. You have checked the login screen, transferred money successfully and confirmed that the balance updates. Does that prove the whole application is free of defects?</p>
        <p>No. There may be thousands of other combinations of users, accounts, amounts, devices, network conditions and unexpected actions. Testing principles help us understand what testing can achieve, where its limits are and how to use our time wisely.</p>
        <Callout><strong>Key idea</strong>Testing principles are guiding ideas that apply across different projects, tools and testing approaches. They help testers make thoughtful decisions rather than simply follow a checklist.</Callout>
      </Panel>
      <Panel>
        <h3>The seven fundamental testing principles</h3>
        <ol>
          <li><strong>Testing shows the presence of defects, not their absence.</strong> Testing can reveal defects, but passing tests do not prove that no defects remain. A successful payment test gives evidence about the cases checked, not a guarantee that every payment will work.</li>
          <li><strong>Exhaustive testing is impossible.</strong> It is usually not practical to test every possible input, path and condition. A transfer feature could have countless combinations of amounts, accounts, balances and network states. Prioritise based on risk and use techniques to select valuable tests.</li>
          <li><strong>Early testing saves time and money.</strong> Start testing activities as early as possible. Reviewing a payment requirement before development can uncover a missing rule before it becomes code that needs rework.</li>
          <li><strong>Defects cluster together.</strong> A small number of areas often contain a large proportion of the defects found. If testing repeatedly finds issues in payment processing, that area may deserve more investigation. Do not assume other areas are defect-free.</li>
          <li><strong>Tests wear out (the pesticide paradox).</strong> Running the same tests repeatedly may eventually stop finding new defects. Review and improve tests, add new scenarios and explore different data and workflows.</li>
          <li><strong>Testing is context dependent.</strong> The right approach depends on the product, risks, users and environment. A banking payment system needs different levels of control and evidence from a simple personal blog.</li>
          <li><strong>Absence-of-errors is a fallacy.</strong> Software can have very few known defects and still fail to meet user needs. A payment app that works exactly as specified is not useful if the specification itself misses what customers need.</li>
        </ol>
      </Panel>
      <Panel>
        <h3>Putting the principles into practice</h3>
        <p>Suppose a new payment feature is due for release and time is limited. A tester can apply the principles by:</p>
        <ul>
          <li>Prioritising high-risk flows such as duplicate payments, incorrect amounts and insufficient funds.</li>
          <li>Reviewing requirements early and asking questions before implementation is complete.</li>
          <li>Looking beyond the usual happy-path test cases and varying test data and conditions.</li>
          <li>Investigating areas where defects have repeatedly appeared, without ignoring the rest of the system.</li>
          <li>Considering whether the feature solves the customer's actual problem, not just whether it matches the written specification.</li>
        </ul>
        <Callout><strong>Remember</strong>Principles guide judgement. They do not replace a test strategy, test design techniques or knowledge of the product.</Callout>
      </Panel>
    </> : isStlcLesson ? <>
      <Panel>
        <h3>Testing has a lifecycle too</h3>
        <p>Imagine your team is building a banking app feature that lets customers transfer money. Before testing begins, the team needs to understand the requirements, plan the checks, prepare test data and an environment, and agree how results will be reported.</p>
        <p>The <strong>Software Testing Lifecycle (STLC)</strong> is the set of activities a testing team carries out to plan, design, execute and complete testing. It gives testing work structure and helps ensure important quality activities are not missed.</p>
        <Callout><strong>Key idea</strong>The SDLC describes the broader process of building and maintaining software. The STLC focuses on the activities involved in testing that software.</Callout>
      </Panel>
      <Panel>
        <h3>The common phases of the STLC</h3>
        <ol>
          <li><strong>Requirement analysis:</strong> Study requirements, identify what can be tested, clarify gaps and note risks. For a transfer feature, clarify limits, fees and failure behaviour.</li>
          <li><strong>Test planning:</strong> Decide scope, approach, resources, responsibilities, tools, schedule and risks.</li>
          <li><strong>Test case development:</strong> Create test scenarios and detailed test cases, identify test data and prepare automation where appropriate.</li>
          <li><strong>Test environment setup:</strong> Prepare the application, services, configurations and test accounts needed to run checks.</li>
          <li><strong>Test execution:</strong> Run tests, compare actual results with expected results, record evidence and report defects.</li>
          <li><strong>Test cycle closure:</strong> Summarise coverage, results, outstanding defects, risks and lessons learned for stakeholders.</li>
        </ol>
        <Callout><strong>Remember</strong>Teams may use different names or combine phases. In Agile delivery, these activities often repeat for each feature or sprint.</Callout>
      </Panel>
      <Panel>
        <h3>What happens when a test fails?</h3>
        <p>Suppose a transfer test expects R500 to be sent, but the app displays R5,000. The tester records the steps, test data, expected result, actual result and supporting evidence, then reports the defect.</p>
        <p>The developer investigates and fixes the issue. The tester performs <strong>retesting</strong> to check the specific fix and may perform <strong>regression testing</strong> to check that related functionality still works.</p>
        <p>Defect handling can send the team back through execution more than once. Testing is rarely a perfectly straight line.</p>
      </Panel>
      <Panel>
        <h3>How the STLC fits into real teams</h3>
        <p>Think of the phases as a guide, not a rigid checklist. A small change may need lightweight planning and a few focused checks. A high-risk payment feature may need deeper analysis, more test data and careful reporting.</p>
        <p>The tester applies the right level of testing for the feature, its users and its risks, while keeping the team informed about progress and findings.</p>
      </Panel>
    </>: isSdlcLesson ? <>
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
      <p>{isLevelsTypesLesson ? "A developer has fixed a defect in the transfer fee calculation. The tester reruns the exact test that originally failed to confirm the fix. What is this called?" : isPrinciplesLesson ? "A tester has run the same successful payment test every day for several weeks, but it has not revealed any new defects. Which principle suggests the tester should review and expand the tests?" : isStlcLesson ? "A tester has executed a transfer test and found that the app sends R5,000 instead of the expected R500. What should happen next?" : isSdlcLesson ? "A tester reviews a user story and notices that the payment failure behaviour is not explained. Developers have not started coding yet. What is the best action?" : isQualityLesson ? "A banking app processes payments correctly, but it exposes customer account details to other users. What does this tell us about its quality?" : "A team is building a shopping app. A tester checks that adding one item to the cart works, then tries adding the same item several times and entering an invalid quantity. What is the main purpose of these testing activities?"}</p>
      <Question>
        {isLevelsTypesLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. Regression testing</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Confirmation testing (retesting)</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Acceptance testing</Option>
        </> : isPrinciplesLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. Exhaustive testing is possible.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Tests wear out (the pesticide paradox).</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Defects cluster together.</Option>
        </> : isSdlcLesson ? <>
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
      {answer !== null && <Feedback $correct={correctAnswer}>{correctAnswer ? (isLevelsTypesLesson ? "Correct. Confirmation testing repeats the test that exposed the defect to check that the specific fix works. Regression testing checks for unintended side effects elsewhere." : isPrinciplesLesson ? "Correct. Repeating the same tests can become less effective over time. Improve the test suite with new scenarios, data and exploratory checks." : isStlcLesson ? "Exactly. Record the failure clearly, report it for investigation and retest once a fix is available." : isSdlcLesson ? "Exactly. Clarifying requirements early helps prevent misunderstandings from becoming defects later. Testing contributes before code is written." : isQualityLesson ? "Exactly. A product can work functionally and still be poor quality if it puts customer information at risk." : "That's right. Testing checks expected and unexpected behaviour, helps reveal defects and provides information about risk.") : (isLevelsTypesLesson ? "Not quite. The question describes repeating the original failed test to verify one particular fix. Regression testing has a broader purpose: checking for side effects." : isPrinciplesLesson ? "Not quite. The clue is that repeating the same tests stops revealing new information. Which principle says tests need to be refreshed?" : isStlcLesson ? "A failed test should be documented with evidence and raised as a defect so the team can investigate and verify a fix." : isSdlcLesson ? "Not quite. Think about when the team can most easily clarify an unclear requirement — before or after implementation?" : isQualityLesson ? "Not quite. Think about the different dimensions of quality. Correct payment processing does not make an exposure of private information acceptable." : "Not quite. Think about what the tester is trying to learn by checking normal use and unusual input. Testing cannot guarantee that software will never fail.")}</Feedback>}
    </Panel>

    <Actions>
      <Back onClick={onBack}>← Return to lesson outline</Back>
      <Button $primary disabled={!correctAnswer} onClick={() => { setCompleted(true); onComplete(); }}>{completed ? "Lesson completed ✓" : "Mark lesson as complete"}</Button>
    </Actions>
  </Page>;
}
