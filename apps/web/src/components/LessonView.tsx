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

type Props = { lessonId: "manual-ui-forms-validation" | "manual-ui-navigation-state" | "manual-ui-responsive-cross-browser" | "manual-ui-usability-accessibility" | "manual-ui-exploratory-testing" | "manual-ui-browser-devtools" | "manual-ui-defect-investigation" | "manual-ui-shopstream-capstone | "manual-ui-functional-ui-testing" | "manual-ui-turning-requirements-into-ui-checks" | "manual-ui-understanding-interface" | "manual-ui-introduction" | "what-is-testing" | "why-quality-matters" | "software-development-lifecycle" | "software-testing-lifecycle" | "testing-principles" | "test-levels-types" | "requirements-acceptance-criteria" | "test-scenarios-test-cases" | "test-design-techniques" | "defect-reporting-lifecycle" | "practical-testing-exercise"; onBack: () => void; onComplete: () => void };

type ManualUiSection = { heading: string; paragraphs: string[]; bullets?: string[]; callout: string };
type ManualUiRemainingLesson = { title: string; description: string; minutes: string; activity: string; question: string; options: [string, string, string]; explanation: string; sections: ManualUiSection[] };
const manualUiRemainingLessons: Partial<Record<Props["lessonId"], ManualUiRemainingLesson>> = {
  "manual-ui-forms-validation": {
    title: "Forms and Input Validation", description: "Test how ShopStream accepts, rejects and explains user input, including required fields, formats, boundaries and helpful validation feedback.", minutes: "12–15 minutes", activity: "Concept + form testing", question: "A checkout form requires a valid email address. Which test gives the strongest evidence that validation works?", options: ["Enter a valid email and check only that the field accepts typing.","Try valid, missing and malformed email values; verify clear feedback and whether checkout can proceed appropriately.","Enter random text into every field and assume the form is covered."], explanation: "Validation needs both accepted and rejected examples. Check the field-level feedback and the overall form behaviour, not merely whether typing is possible.",
    sections: [
      { heading: "Why forms need careful testing", paragraphs: ["Forms collect information that the application uses to make decisions. A form can look correct but still accept invalid data, reject valid data or lose information when the user submits it.","For ShopStream, checkout forms may collect a customer's name, email and delivery details. Your job is to verify the agreed rules and make sure feedback helps the customer correct mistakes."], bullets: ["A useful form test checks the input, the validation rule, the feedback and whether the user can continue."], callout: "A useful form test checks the input, the validation rule, the feedback and whether the user can continue." },
      { heading: "Required fields and input formats", paragraphs: ["Identify which fields are mandatory and which are optional. Submit the form with each required field empty, then try leaving optional fields blank.","Try valid and invalid formats. For example, use a normal email address, an address without an @ symbol, and an address with missing text before or after the @ symbol.","Check trimming and whitespace behaviour where relevant: a name containing accidental spaces should be handled consistently, not silently corrupted."], bullets: ["Do not assume every field is required. Use the product requirements or ask the team to clarify."], callout: "Do not assume every field is required. Use the product requirements or ask the team to clarify." },
      { heading: "Boundaries, length and unusual input", paragraphs: ["If a field has a minimum or maximum length, test just below the limit, exactly at the limit and just above it.","Try leading and trailing spaces, very long values, punctuation and characters the field is expected to support.","Check that validation messages identify the problem and that entering a corrected value clears the old error."], bullets: ["Boundary examples reveal defects that ordinary valid input often misses."], callout: "Boundary examples reveal defects that ordinary valid input often misses." },
      { heading: "Form behaviour and user feedback", paragraphs: ["Submit a form with several errors. Confirm the user can identify every field that needs attention.","Check whether entered valid values remain available after a validation failure, so the user does not have to start again.","Use keyboard navigation as well as the mouse. Check that focus moves sensibly and that errors are associated with the relevant fields."], bullets: ["A form is not well validated if it rejects bad input but gives the user no useful way to fix it."], callout: "A form is not well validated if it rejects bad input but gives the user no useful way to fix it." },
      { heading: "Your ShopStream form exercise", paragraphs: ["Open checkout and identify every field, its required/optional status and its expected format.","Create at least six checks: valid submission, each required field missing, malformed email, boundary length, whitespace and correction after an error.","Record the input, expected feedback, whether progression should be allowed and the actual result. Do not enter real personal information."], bullets: ["Deliverable: a form validation checklist with at least six executed checks and clear Pass, Fail or Blocked results."], callout: "Deliverable: a form validation checklist with at least six executed checks and clear Pass, Fail or Blocked results." },
    ]
  },
  "manual-ui-navigation-state": {
    title: "Navigation, Sessions and Application State", description: "Follow users between pages and verify that ShopStream keeps, changes or clears information at the right time.", minutes: "12–15 minutes", activity: "Concept + journey testing", question: "A shopper adds an item to the cart, opens its details and then uses the browser Back button. What should guide your expected result?", options: ["The browser Back button must always return to the home page and clear all data.","The agreed navigation and state rules: the previous page should be restored appropriately and cart state should remain consistent.","The page should reload with any values the tester prefers."], explanation: "Navigation and state expectations should come from the product behaviour. Verify the destination and whether important state, such as the cart, is retained or cleared.",
    sections: [
      { heading: "Navigation is part of functionality", paragraphs: ["Navigation includes links, menus, breadcrumbs, page transitions and browser Back/Forward controls. A link that opens the wrong page is a functional defect even if the destination page itself looks correct.","Follow links from the catalogue to product details, from the cart to checkout and back again. Check for broken routes, unexpected redirects and dead ends."], bullets: ["Always verify both where the user arrives and whether the destination makes sense for the action."], callout: "Always verify both where the user arrives and whether the destination makes sense for the action." },
      { heading: "Understand application state", paragraphs: ["State is the information the application currently holds: selected products, cart quantities, search terms, form values or whether a user is signed in.","Some state should persist when moving between pages. For example, adding a product should not be undone simply because the shopper opens another page.","Other state may be temporary. A validation message may clear after correction, while checkout data may be cleared after a completed simulated order, depending on the requirements."], bullets: ["Ask what should persist, what should reset and when each change should happen."], callout: "Ask what should persist, what should reset and when each change should happen." },
      { heading: "Sessions and browser storage", paragraphs: ["A session represents a period of interaction with an application. Test what happens when a user refreshes a page, opens a new tab or closes and reopens the browser.","ShopStream may use local storage to preserve a cart. Check that the cart behaves consistently after refresh and that stale or duplicate items do not appear.","Do not assume storage behaviour is a requirement. Confirm the intended experience before reporting a difference as a defect."], bullets: ["Never use another person's account or real personal information when testing session behaviour."], callout: "Never use another person's account or real personal information when testing session behaviour." },
      { heading: "State transition checks", paragraphs: ["Test the same page in different states: empty cart, cart with one item, cart with several items and completed checkout.","Repeat actions such as adding, removing and changing quantity. Verify that indicators, totals and page content remain in sync.","Try browser refresh and Back/Forward during a journey. Look for duplicated submissions, stale pages or state that unexpectedly disappears."], bullets: ["A useful state test names the starting state, action and expected new state."], callout: "A useful state test names the starting state, action and expected new state." },
      { heading: "Your ShopStream navigation exercise", paragraphs: ["Add a product, open its details, return to the catalogue and inspect the cart.","Refresh the browser and check whether the cart follows the agreed persistence rule.","Use Back and Forward through a product-to-cart journey. Record the destination and state after each action.","Complete or restart the simulated checkout and verify the resulting cart and confirmation state."], bullets: ["Deliverable: at least five navigation/state checks, each with starting state, action and expected result."], callout: "Deliverable: at least five navigation/state checks, each with starting state, action and expected result." },
    ]
  },
  "manual-ui-responsive-cross-browser": {
    title: "Responsive and Cross-Browser Testing", description: "Check whether ShopStream remains usable across different screen sizes, browsers and input methods.", minutes: "12–15 minutes", activity: "Concept + compatibility exercise", question: "When checking a responsive product page, what is the most useful approach?", options: ["Only reduce the browser window until the page looks small.","Check representative viewport sizes and verify that content, controls and key user journeys remain usable without unintended clipping or overlap.","Assume a page is responsive if it loads on a phone."], explanation: "Responsive testing is about usable behaviour at different viewports. Check layout and complete interactions, not just whether the page loads.",
    sections: [
      { heading: "Responsive versus cross-browser testing", paragraphs: ["Responsive testing checks how a layout adapts to different viewport sizes, such as desktop, tablet and mobile.","Cross-browser testing checks whether the application behaves consistently in different browsers and browser versions. The same page may render or behave differently because of browser support and implementation differences.","Both matter because customers use different devices, browsers, zoom settings and input methods."], bullets: ["The goal is a usable and consistent experience, not necessarily identical pixels on every device."], callout: "The goal is a usable and consistent experience, not necessarily identical pixels on every device." },
      { heading: "Choose useful viewport coverage", paragraphs: ["Start with the screen sizes your product supports. Include a wide desktop, a typical tablet and a narrow mobile viewport.","Look for horizontal scrolling, clipped text, overlapping elements, tiny controls, images that distort and navigation that becomes inaccessible.","Resize gradually around layout breakpoints. A page can look fine at the largest and smallest sizes but break at an intermediate width."], bullets: ["Record the viewport dimensions when documenting a layout defect."], callout: "Record the viewport dimensions when documenting a layout defect." },
      { heading: "Test real interactions at each size", paragraphs: ["Open the navigation menu, search for a product, open product details, add an item to the cart and proceed through simulated checkout.","Check that buttons remain visible, fields can be reached, messages are readable and important content is not hidden behind sticky elements.","Where possible, test touch interaction as well as mouse and keyboard interaction. Hover-only controls may not work well on touch devices."], bullets: ["A responsive layout that cannot complete the main journey is not usable."], callout: "A responsive layout that cannot complete the main journey is not usable." },
      { heading: "Browser differences and evidence", paragraphs: ["Choose browsers based on the product's supported browser matrix and the audience. Do not claim universal compatibility from testing one browser.","Compare key workflows, date/number input behaviour, focus indicators, scrolling, fonts and layout. Note the exact browser and version.","When an issue appears in one browser only, repeat the same steps in another supported browser to help isolate the difference."], bullets: ["Capture the browser/version, operating system, viewport size, steps and screenshot or recording."], callout: "Capture the browser/version, operating system, viewport size, steps and screenshot or recording." },
      { heading: "Your ShopStream compatibility exercise", paragraphs: ["Run the same catalogue-to-cart journey at desktop, tablet and mobile viewport sizes.","Repeat the core journey in at least two available browsers if possible.","Record layout issues separately from functional differences, including exact viewport and browser details."], bullets: ["Deliverable: a small compatibility matrix showing device/viewport, browser, journey tested and result."], callout: "Deliverable: a small compatibility matrix showing device/viewport, browser, journey tested and result." },
    ]
  },
  "manual-ui-usability-accessibility": {
    title: "Usability and Accessibility Testing", description: "Evaluate whether ShopStream is understandable, operable and accessible to people using different interaction methods.", minutes: "12–15 minutes", activity: "Concept + inclusive testing", question: "Which check best supports keyboard accessibility?", options: ["Confirm that every control has a bright colour.","Navigate the complete shopping journey using only the keyboard and verify visible focus, logical order and operable controls.","Check that the page contains many images and animations."], explanation: "Keyboard testing reveals whether people can reach and operate controls without a mouse. Visible focus and logical navigation are essential observations.",
    sections: [
      { heading: "Usability: can people complete their goal?", paragraphs: ["Usability concerns how easily and confidently people can use a product. Look for clear labels, understandable messages, consistent controls and a logical journey.","For ShopStream, ask whether a first-time shopper can find a product, understand its price, add it to the cart and complete the simulated checkout without confusion.","Record specific observations. “The page is bad” is not actionable; “the checkout button is below the fold with no indication that more content follows” is more useful."], bullets: ["Usability findings should describe the user difficulty and the point in the journey where it occurs."], callout: "Usability findings should describe the user difficulty and the point in the journey where it occurs." },
      { heading: "Accessibility: can different people use it?", paragraphs: ["Accessibility testing considers whether people with different abilities and assistive technologies can perceive, understand, navigate and operate the interface.","Start with keyboard-only navigation. Use Tab and Shift+Tab to move through controls, Enter or Space to activate them and verify that focus is always visible.","Check that form fields have meaningful labels, errors are understandable and information is not communicated by colour alone."], bullets: ["A mouse-only check is not enough to understand whether an interface is accessible."], callout: "A mouse-only check is not enough to understand whether an interface is accessible." },
      { heading: "Practical visual and content checks", paragraphs: ["Check text contrast, readable font sizes, zoom behaviour and whether content remains available when enlarged.","Inspect images for useful alternative text where the image conveys information. Decorative images should not create unnecessary noise for screen-reader users.","Check headings and page structure for a sensible reading order. Labels such as “Click here” may be unclear without context."], bullets: ["Automated accessibility tools can help find issues, but they do not replace human evaluation."], callout: "Automated accessibility tools can help find issues, but they do not replace human evaluation." },
      { heading: "Assistive technology and limitations", paragraphs: ["Where available, use a screen reader to explore page titles, headings, links, buttons and form labels. Listen for missing or confusing names.","Check focus order around menus, dialogs and validation errors. Focus should not become trapped unexpectedly or disappear.","Do not claim full accessibility conformance from a few manual checks. Record what you tested and what remains outside the scope."], bullets: ["Report the assistive technology and browser used, plus the exact steps and observed output."], callout: "Report the assistive technology and browser used, plus the exact steps and observed output." },
      { heading: "Your ShopStream inclusive testing exercise", paragraphs: ["Complete the main shopping journey using only the keyboard.","Zoom the page and check that important content and controls remain available.","Inspect form labels, error messages, focus indicators and meaningful image text.","Record at least three usability or accessibility observations, including the user impact."], bullets: ["Deliverable: an inclusive testing note with the scenario, method, observation and recommended improvement."], callout: "Deliverable: an inclusive testing note with the scenario, method, observation and recommended improvement." },
    ]
  },
  "manual-ui-exploratory-testing": {
    title: "Exploratory Testing", description: "Use curiosity, product knowledge and risk to investigate ShopStream beyond a fixed checklist.", minutes: "12–15 minutes", activity: "Guided exploratory session", question: "What makes an exploratory testing session useful?", options: ["Click randomly without recording what you do.","Set a clear mission, explore using informed ideas, observe results and record the paths and findings.","Avoid changing test data so that every session is identical."], explanation: "Exploratory testing combines learning, test design and execution. A mission gives direction, while notes preserve useful evidence and reproducibility.",
    sections: [
      { heading: "What exploratory testing means", paragraphs: ["Exploratory testing is an approach where learning about the product, designing tests and executing them happen together.","You use what you discover to decide what to investigate next. It is not careless clicking or testing without purpose.","It is especially useful when requirements are incomplete, the product is unfamiliar or you want to discover unexpected interactions."], bullets: ["Exploration is guided by a question or mission, even when the exact test steps are not known in advance."], callout: "Exploration is guided by a question or mission, even when the exact test steps are not known in advance." },
      { heading: "Create a test charter", paragraphs: ["A charter defines the area, goal and boundaries of a short exploratory session.","Example: “Explore cart quantity changes to find situations where the cart count, line total and overall total become inconsistent.”","Set a timebox, such as 20 minutes. Decide what data you will use and what evidence you will capture."], bullets: ["A focused charter makes exploration easier to repeat and explain."], callout: "A focused charter makes exploration easier to repeat and explain." },
      { heading: "Explore with useful ideas", paragraphs: ["Vary the sequence of actions: add, remove, refresh, navigate Back, change quantity and repeat.","Try unusual but realistic data, empty states, repeated clicks and interruptions. Observe whether the application remains consistent.","Follow clues. If a total looks wrong, change one variable at a time and try to narrow down the conditions that trigger it."], bullets: ["Use product risks and user behaviour to choose where to explore."], callout: "Use product risks and user behaviour to choose where to explore." },
      { heading: "Keep notes and separate facts from assumptions", paragraphs: ["Record the actions you took, data used, starting state and what happened. Capture screenshots when they clarify the finding.","If you discover a possible defect, repeat the steps to confirm it and create a reproducible report.","Distinguish an observed result from a guess about the cause. Testers report evidence; developers investigate implementation causes."], bullets: ["A discovery that cannot be explained or reproduced is difficult for the team to act on."], callout: "A discovery that cannot be explained or reproduced is difficult for the team to act on." },
      { heading: "Your ShopStream exploratory session", paragraphs: ["Choose one charter: cart calculations, product search, checkout recovery or navigation state.","Explore for 15–20 minutes. Follow at least one interesting observation into a second test.","Record what you tried, what you learned, any defects and useful questions for the product team."], bullets: ["Deliverable: a short session sheet containing the charter, timebox, notes, findings and follow-up ideas."], callout: "Deliverable: a short session sheet containing the charter, timebox, notes, findings and follow-up ideas." },
    ]
  },
  "manual-ui-browser-devtools": {
    title: "Browser DevTools for Testers", description: "Use browser developer tools to inspect page structure, console errors, network activity and responsive layouts.", minutes: "15–18 minutes", activity: "Guided DevTools investigation", question: "A page looks correct but a search request fails. Which DevTools area is most useful to inspect first?", options: ["The Elements panel only, because it shows page colours.","The Network panel, to inspect the request, response status, timing and returned data.","The browser bookmarks menu."], explanation: "The Network panel shows what the browser requested and how the server responded. The Console can also reveal related JavaScript errors.",
    sections: [
      { heading: "What DevTools can tell you", paragraphs: ["Browser Developer Tools help you inspect how a web page is built and how it behaves in the browser.","For testers, the most useful areas are Elements, Console, Network, Application/Storage and responsive device emulation.","DevTools provides evidence to help understand a problem. You do not need to become a developer to use it effectively."], bullets: ["Use the browser's built-in tools to investigate, not to change application code during a test."], callout: "Use the browser's built-in tools to investigate, not to change application code during a test." },
      { heading: "Elements: inspect the interface", paragraphs: ["The Elements panel shows the page's HTML structure and applied styles. Select a visible control to inspect its label, attributes and surrounding elements.","Use it to investigate missing labels, unexpected layout, hidden elements or whether a control has the expected accessible name.","Temporary style changes in DevTools are useful for investigation but are not permanent product fixes."], bullets: ["Record what you observed and the browser context; do not treat a temporary DevTools edit as a product change."], callout: "Record what you observed and the browser context; do not treat a temporary DevTools edit as a product change." },
      { heading: "Console: look for browser errors", paragraphs: ["The Console displays JavaScript errors, warnings and diagnostic messages. Clear old messages before reproducing a problem so the timeline is easier to read.","Repeat the failing action and note any new errors. A console error may be related, but correlation does not prove it caused the visible defect.","Copy only relevant messages and remove tokens, personal information or other sensitive values before sharing evidence."], bullets: ["A clean console does not prove that the application is defect-free."], callout: "A clean console does not prove that the application is defect-free." },
      { heading: "Network: inspect requests and responses", paragraphs: ["Open Network before repeating the action. Filter to Fetch/XHR when useful, then select the relevant request.","Inspect the URL/path, method, status code, timing, request payload and response body where available.","A failed request can explain missing results or incomplete data. Compare a successful and failing request when you need to isolate the difference."], bullets: ["Never share authentication tokens, cookies or private customer data from network captures."], callout: "Never share authentication tokens, cookies or private customer data from network captures." },
      { heading: "Application and responsive tools", paragraphs: ["The Application panel can show local storage, session storage and cookies. Use it to understand whether the browser retains cart or session data.","Device emulation helps test viewport sizes and touch-like layouts. It is a useful first check, but it does not replace testing on real devices where available.","Refresh after observing storage changes and verify whether the application state follows the expected rules."], bullets: ["Treat stored values and captured network data as potentially sensitive."], callout: "Treat stored values and captured network data as potentially sensitive." },
      { heading: "Your ShopStream DevTools exercise", paragraphs: ["Open DevTools and inspect the product page with Elements. Find the visible product name and relevant controls.","Open Console, clear existing messages and repeat a search or cart action. Record new errors, if any.","Open Network and repeat the action. Identify the request and note its method, status and response shape where applicable.","Inspect Application storage to see whether cart state is stored, without copying secrets or personal data."], bullets: ["Deliverable: an investigation note containing the action, relevant DevTools panel, evidence and what you can conclude without guessing at the cause."], callout: "Deliverable: an investigation note containing the action, relevant DevTools panel, evidence and what you can conclude without guessing at the cause." },
    ]
  },
  "manual-ui-defect-investigation": {
    title: "Investigating and Documenting UI Defects", description: "Turn unexpected ShopStream behaviour into clear, reproducible defect reports that help a team investigate and verify fixes.", minutes: "12–15 minutes", activity: "Defect report workshop", question: "You see the cart total remain unchanged after increasing quantity. What should a strong defect report include?", options: ["“Cart is broken” and a guess about the developer responsible.","A clear title, starting state, reproducible steps, test data, expected and actual totals, environment and relevant evidence.","Only a screenshot of the product catalogue."], explanation: "A useful report makes the issue repeatable and explains the difference between expected and actual behaviour, with enough context to investigate.",
    sections: [
      { heading: "Recognise and confirm a defect", paragraphs: ["A defect is a problem where actual behaviour differs from an agreed requirement or expected result.","Before reporting, repeat the action using the same starting state and data. Check whether the behaviour is consistent and whether the requirement is clear.","If the expected behaviour is uncertain, ask for clarification. Do not label a preference or misunderstanding as a confirmed defect."], bullets: ["A defect report should be based on evidence and an agreed expectation."], callout: "A defect report should be based on evidence and an agreed expectation." },
      { heading: "Write a useful defect report", paragraphs: ["Use a short, specific title that describes the symptom and location. Example: “Cart total does not update when product quantity increases”.","Include environment details, preconditions, test data, numbered reproduction steps, expected result and actual result.","Attach a screenshot or short recording when it adds useful context. Include relevant console/network evidence only after removing sensitive information."], bullets: ["Another tester should be able to follow your steps without needing you beside them."], callout: "Another tester should be able to follow your steps without needing you beside them." },
      { heading: "Severity and priority are different", paragraphs: ["Severity describes the impact of the defect on the product or user. A checkout calculation error may have high severity because it affects order correctness.","Priority describes how urgently the team should address it, considering business timing, exposure and release plans.","A severe issue is often urgent, but severity and priority are not interchangeable. The team agrees the final classification."], bullets: ["Describe impact clearly instead of choosing a label without explanation."], callout: "Describe impact clearly instead of choosing a label without explanation." },
      { heading: "From report to retest", paragraphs: ["A defect may move through statuses such as New, Triaged, In Progress, Fixed, Ready for Retest, Closed or Reopened. Teams may use different names.","When a fix is ready, repeat the original reproduction steps with the relevant data. This is confirmation testing.","Then perform targeted regression checks around related cart behaviour to look for unintended side effects."], bullets: ["A defect is not verified simply because its status changed to Fixed."], callout: "A defect is not verified simply because its status changed to Fixed." },
      { heading: "Your ShopStream defect workshop", paragraphs: ["Choose a real issue you can reproduce, or use this example: quantity changes from 1 to 2 but the cart total remains at the single-item price.","Write a title, environment, preconditions, steps, expected result, actual result and impact.","Add evidence and explain how you would retest the fix and which nearby behaviours you would regress."], bullets: ["Deliverable: one complete defect report and a short retest/regression checklist."], callout: "Deliverable: one complete defect report and a short retest/regression checklist." },
    ]
  },
  "manual-ui-shopstream-capstone": {
    title: "ShopStream: End-to-End Testing Capstone", description: "Plan and execute a complete ShopStream test mission, from requirements and risk analysis to evidence, defect reporting and a concise test summary.", minutes: "25–35 minutes", activity: "Portfolio capstone", question: "What should your final ShopStream test summary communicate?", options: ["Only the number of buttons you clicked.","Scope, scenarios executed, pass/fail/blocked results, important defects, risks and any areas not tested.","A guarantee that the application has no defects."], explanation: "A test summary communicates evidence and remaining risk so the team can make an informed decision. Testing cannot prove that no defects remain.",
    sections: [
      { heading: "Your mission and scope", paragraphs: ["You are the tester responsible for evaluating a ShopStream shopping journey. Your mission is to assess the catalogue, product details, cart and simulated checkout.","Define what is in scope, what is not available and any assumptions. ShopStream is a practice application and does not process real payments.","Identify risks first: incorrect product data, cart calculations, lost state, invalid checkout input and unclear confirmation are all meaningful user-impact areas."], bullets: ["A clear scope prevents accidental claims about features you did not test."], callout: "A clear scope prevents accidental claims about features you did not test." },
      { heading: "Prepare scenarios and test data", paragraphs: ["Create scenarios for product search, product details, add/remove cart items, quantity changes, totals, checkout validation and order confirmation.","Include positive, negative, boundary, state-based and repeated-action coverage where it makes sense.","Use safe fictional data. For example, a product priced at R120 with quantity 2 should produce a line total of R240."], bullets: ["For each scenario, define the expected result before executing the test."], callout: "For each scenario, define the expected result before executing the test." },
      { heading: "Execute and capture evidence", paragraphs: ["Run each test from a known starting state. Record the actual result and mark it Pass, Fail or Blocked.","Capture useful evidence for failures and note the browser, version and viewport. Keep test data consistent so results can be compared.","When a test fails, repeat it to confirm the issue. If a dependency prevents testing, record why it is Blocked rather than marking it as failed."], bullets: ["A test result is only useful when another person can understand what was executed."], callout: "A test result is only useful when another person can understand what was executed." },
      { heading: "Report defects and retest fixes", paragraphs: ["Write a complete defect report for each confirmed issue, including steps, expected and actual results, impact and evidence.","If a fix becomes available, repeat the original test to verify it. Run related regression checks for nearby workflows.","Keep the original finding and retest result linked so the history is clear."], bullets: ["Do not silently remove failed results after a fix; preserve the test history."], callout: "Do not silently remove failed results after a fix; preserve the test history." },
      { heading: "Write your test summary", paragraphs: ["Summarise the scope, environment, scenarios executed and pass/fail/blocked totals.","Highlight significant defects, unresolved risks, limitations and areas that were not tested.","Give a recommendation based on evidence, such as “ready for review with known issues” rather than claiming the product is defect-free."], bullets: ["A good summary helps a product team understand what was tested and what uncertainty remains."], callout: "A good summary helps a product team understand what was tested and what uncertainty remains." },
      { heading: "Capstone portfolio checklist", paragraphs: ["A short test scope and risk note.","At least 10 test scenarios covering the key shopping journey.","Executed test cases with expected and actual results.","Evidence for important failures and at least one complete defect report, if a defect is found.","A retest/regression note and a concise final test summary."], bullets: ["Portfolio outcome: a small, honest testing pack that demonstrates how you plan, execute, investigate and communicate UI testing."], callout: "Portfolio outcome: a small, honest testing pack that demonstrates how you plan, execute, investigate and communicate UI testing." },
    ]
  },
};

export function LessonView({ lessonId, onBack, onComplete }: Props) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const manualUiRemainingLesson = manualUiRemainingLessons[lessonId];
  const manualUiRemainingLessonNumber = ["manual-ui-forms-validation", "manual-ui-navigation-state", "manual-ui-responsive-cross-browser", "manual-ui-usability-accessibility", "manual-ui-exploratory-testing", "manual-ui-browser-devtools", "manual-ui-defect-investigation", "manual-ui-shopstream-capstone"].indexOf(lessonId) + 5;
  const isManualUiIntroLesson = lessonId === "manual-ui-introduction";
  const isManualUiRequirementsLesson = lessonId === "manual-ui-turning-requirements-into-ui-checks";
  const isManualUiFunctionalLesson = lessonId === "manual-ui-functional-ui-testing";
  const isManualUiInterfaceLesson = lessonId === "manual-ui-understanding-interface";
  const isQualityLesson = lessonId === "why-quality-matters";
  const isSdlcLesson = lessonId === "software-development-lifecycle";
  const isStlcLesson = lessonId === "software-testing-lifecycle";
  const isPrinciplesLesson = lessonId === "testing-principles";
  const isLevelsTypesLesson = lessonId === "test-levels-types";
  const isRequirementsLesson = lessonId === "requirements-acceptance-criteria";
  const isTestCasesLesson = lessonId === "test-scenarios-test-cases";
  const isTestDesignLesson = lessonId === "test-design-techniques";
  const isDefectLesson = lessonId === "defect-reporting-lifecycle";
  const isCapstoneLesson = lessonId === "practical-testing-exercise";
  const correctIndex = isQualityLesson ? 2 : 1;
  const correctAnswer = answer === correctIndex;
  const title = manualUiRemainingLesson?.title ?? (isManualUiFunctionalLesson ? "Functional UI Testing" : isManualUiRequirementsLesson ? "Turning Requirements into UI Checks" : isManualUiInterfaceLesson ? "Understanding the User Interface" : isManualUiIntroLesson ? "Introduction to Manual & UI Testing" : isCapstoneLesson ? "Putting It All Together: A Practical Testing Exercise" : isDefectLesson ? "Defect Reporting and the Defect Lifecycle" : isTestDesignLesson ? "Test Design Techniques" : isTestCasesLesson ? "Test Scenarios and Test Cases" : isRequirementsLesson ? "Understanding Requirements and Acceptance Criteria" : isLevelsTypesLesson ? "Test Levels and Test Types" : isPrinciplesLesson ? "Testing Principles" : isStlcLesson ? "The Software Testing Lifecycle (STLC)" : isSdlcLesson ? "The Software Development Lifecycle (SDLC)" : isQualityLesson ? "Why Quality Matters" : "What is Software Testing?");

  return <Page>
    <Back onClick={onBack}>← Back to {manualUiRemainingLesson || isManualUiIntroLesson || isManualUiInterfaceLesson || isManualUiRequirementsLesson || isManualUiFunctionalLesson ? "Manual & UI Testing" : "Software Testing Fundamentals"}</Back>
    <Hero>
      <Eyebrow>{manualUiRemainingLesson ? `Manual & UI Testing · Lesson ${String(manualUiRemainingLessonNumber).padStart(2,"0")}` : isManualUiFunctionalLesson ? "Manual & UI Testing · Lesson 04" : isManualUiRequirementsLesson ? "Manual & UI Testing · Lesson 03" : isManualUiInterfaceLesson ? "Manual & UI Testing · Lesson 02" : isManualUiIntroLesson ? "Manual & UI Testing · Lesson 01" : <>Software Testing Fundamentals · Lesson {isCapstoneLesson ? "11" : isDefectLesson ? "10" : isTestDesignLesson ? "09" : isTestCasesLesson ? "08" : isRequirementsLesson ? "07" : isLevelsTypesLesson ? "06" : isPrinciplesLesson ? "05" : isStlcLesson ? "04" : isSdlcLesson ? "03" : isQualityLesson ? "02" : "01"}</>}</Eyebrow>
      <h2>{title}</h2>
      <p>{manualUiRemainingLesson?.description ?? (isManualUiFunctionalLesson ? "Learn how to verify that visible controls and complete user workflows behave correctly, from product selection through cart and checkout." : isManualUiRequirementsLesson ? "Learn how to translate product requirements into observable checks that verify what a user can see and do." : isManualUiInterfaceLesson ? "Learn to recognise the parts of a web interface, understand their purpose and identify what a tester should observe and verify on each page." : isManualUiIntroLesson ? "Learn what manual testing and UI testing mean, how they differ, and how you will use ShopStream to practise testing real user journeys." : isCapstoneLesson ? "Bring the fundamentals together by testing a realistic money-transfer feature from requirements review through test design, execution and defect reporting." : isDefectLesson ? "Learn to write clear defect reports, distinguish severity from priority and follow defects through investigation, fixing and verification." : isTestDesignLesson ? "Learn structured techniques for selecting effective test cases, including equivalence partitions, boundaries, decision tables and state transitions." : isTestCasesLesson ? "Turn requirements into focused test scenarios and detailed test cases, with practical examples of test data, expected results and boundary checks." : isRequirementsLesson ? "Learn how to read requirements, ask useful questions and turn acceptance criteria into clear, testable expectations." : isLevelsTypesLesson ? "Understand the different layers and purposes of testing, and learn how they work together to build confidence in a product." : isPrinciplesLesson ? "Explore seven foundational principles that guide effective testing and help testers make better decisions." : isStlcLesson ? "Follow the testing process from understanding requirements through planning, execution, defect handling and closure." : isSdlcLesson ? "Follow a software product from its first idea to release and ongoing improvement — and see where testing fits at every stage." : isQualityLesson ? "Understand how software quality affects real people, businesses and the decisions teams make before release." : "Discover what testing really means, why teams do it, and how testers help people trust the software they use.")}</p>
      <Meta><span>◷ {manualUiRemainingLesson?.minutes ?? (isManualUiFunctionalLesson ? "12–15 minutes" : isManualUiRequirementsLesson ? "12–15 minutes" : isManualUiInterfaceLesson ? "10–12 minutes" : isManualUiIntroLesson ? "10–12 minutes" : isCapstoneLesson ? "15–20 minutes" : "8–10 minutes")}</span><span>◈ Beginner</span><span>◇ {manualUiRemainingLesson?.activity ?? (isManualUiFunctionalLesson ? "Concept + workflow testing" : isManualUiRequirementsLesson ? "Concept + test design exercise" : isManualUiInterfaceLesson ? "Concept + interface inspection" : isManualUiIntroLesson ? "Concept + ShopStream activity" : isCapstoneLesson ? "Practical capstone" : "Concept + knowledge check")}</span></Meta>
    </Hero>

    {manualUiRemainingLesson ? <>
      {manualUiRemainingLesson.sections.map((section) => <Panel key={section.heading}>
        <h3>{section.heading}</h3>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <Callout><strong>Tester takeaway</strong>{section.callout}</Callout>
      </Panel>)}
    </> : isManualUiFunctionalLesson ? <>
      <Panel>
        <h3>What is functional UI testing?</h3>
        <p>Functional UI testing verifies that the features a user interacts with perform the actions they are meant to perform. You use the interface, provide input, trigger actions and compare the outcome with the expected behaviour.</p>
        <p>For ShopStream, this means checking more than whether a button responds. You verify that searching finds the right products, product details are accurate, cart actions update the cart correctly and checkout follows the agreed rules.</p>
        <Callout><strong>Remember</strong>Functional UI testing asks: does this feature do what it is supposed to do when a user interacts with it?</Callout>
      </Panel>
      <Panel>
        <h3>Test a feature, not just a screen</h3>
        <p>A user journey can involve several pages and components. For example, adding a product to a cart may involve a product card, a button, a cart indicator, a confirmation message and the cart page.</p>
        <p>Test the complete outcome:</p>
        <ol>
          <li>Identify the feature and its expected behaviour.</li>
          <li>Prepare the required starting state and test data.</li>
          <li>Perform the user action through the interface.</li>
          <li>Check the visible response and any related state changes.</li>
          <li>Compare the actual result with the expected result.</li>
          <li>Record failures with enough detail to reproduce them.</li>
        </ol>
      </Panel>
      <Panel>
        <h3>ShopStream example: product catalogue</h3>
        <p>Imagine the catalogue displays a list of products. Functional checks could include:</p>
        <ul>
          <li>Open the catalogue. The available products should be displayed.</li>
          <li>Search for a known product. The matching product should appear.</li>
          <li>Choose a sort order. Products should be arranged according to the selected order.</li>
          <li>Open a product card. The detail page should show the correct name, image, description and price for that product.</li>
          <li>Use browser navigation to return to the catalogue. The application should return to a usable state.</li>
        </ul>
        <p>For each check, use known test data and verify the result rather than assuming that a successful click means the feature worked.</p>
      </Panel>
      <Panel>
        <h3>ShopStream example: cart behaviour</h3>
        <p>The cart is a useful place to practise functional testing because one action can affect several values.</p>
        <ul>
          <li><strong>Add an item:</strong> The selected product appears in the cart.</li>
          <li><strong>Add the same item again:</strong> The cart follows the agreed quantity behaviour and does not create an unexpected duplicate.</li>
          <li><strong>Change quantity:</strong> The displayed quantity and line total update correctly.</li>
          <li><strong>Remove an item:</strong> The product is removed and the cart summary recalculates.</li>
          <li><strong>Empty cart:</strong> The page displays a clear empty-cart state and does not show a stale total.</li>
        </ul>
        <Callout><strong>Check the calculations</strong>For a product priced at R120 with a quantity of 2, the line total should be R240. Verify the quantity, line total and overall total agree.</Callout>
      </Panel>
      <Panel>
        <h3>ShopStream example: checkout</h3>
        <p>Checkout combines form input, navigation and business rules. Your checks might include:</p>
        <ul>
          <li>Continue with valid required details. The user should reach the next checkout step.</li>
          <li>Leave a required field empty. The application should explain what needs attention.</li>
          <li>Enter invalid data where a format is required. The application should prevent progression and show useful feedback.</li>
          <li>Review the order. Products, quantities and totals should match the cart.</li>
          <li>Complete the simulated order. A clear confirmation should appear and the order summary should be consistent.</li>
        </ul>
        <p>ShopStream is a learning environment: checkout is simulated and does not process real payments.</p>
      </Panel>
      <Panel>
        <h3>Positive, negative and state-based checks</h3>
        <ul>
          <li><strong>Positive check:</strong> Use valid input and verify that the feature succeeds.</li>
          <li><strong>Negative check:</strong> Use invalid or missing input and verify that the application handles it correctly.</li>
          <li><strong>State check:</strong> Verify behaviour in different application states, such as an empty cart, a cart with items or a completed checkout.</li>
          <li><strong>Repeated-action check:</strong> Perform an action more than once and verify that the result remains correct.</li>
        </ul>
        <p>Choose checks based on the feature's requirements and risks. You do not need to try every imaginable combination; focus on meaningful user behaviour and likely failure points.</p>
      </Panel>
      <Panel>
        <h3>When is a check a pass or a fail?</h3>
        <p>A check passes when the observed result matches the expected result for the conditions you tested. It fails when the actual behaviour differs from the agreed expectation.</p>
        <ul>
          <li><strong>Expected:</strong> Adding one R120 product updates the cart count to 1 and the total to R120.</li>
          <li><strong>Actual:</strong> The cart count becomes 1, but the total remains R0.</li>
          <li><strong>Result:</strong> Fail — the cart total does not reflect the selected product.</li>
        </ul>
        <p>Record the exact steps, test data, environment, expected result and actual result. Avoid vague notes such as “cart broken”.</p>
      </Panel>
      <Panel>
        <h3>Your ShopStream functional test exercise</h3>
        <p>Choose one product and test its journey from the catalogue to the cart. Then continue through the simulated checkout if it is available.</p>
        <ol>
          <li>Search for the product and open its details.</li>
          <li>Add it to the cart and verify the cart indicator.</li>
          <li>Change its quantity and check the line and overall totals.</li>
          <li>Remove the item and verify the empty-cart state.</li>
          <li>Repeat the journey with valid and invalid checkout details where supported.</li>
        </ol>
        <Callout><strong>Mini deliverable</strong>Write at least five functional test cases. For each, record the starting condition, action, expected result and actual result. Mark each as Pass, Fail or Blocked, and explain any failure clearly.</Callout>
      </Panel>
      <Panel>
        <h3>Key takeaways</h3>
        <ul>
          <li>Functional UI testing verifies that user-facing features behave as required.</li>
          <li>Test complete workflows and connected interface elements, not just individual clicks.</li>
          <li>Use positive, negative, state-based and repeated-action checks where relevant.</li>
          <li>Compare actual behaviour with a clear expected result.</li>
          <li>Record failures so another person can reproduce and investigate them.</li>
        </ul>
      </Panel>
    </> : isManualUiRequirementsLesson ? <>
      <Panel>
        <h3>Start with what the user needs to achieve</h3>
        <p>A requirement describes something the product should do or a quality it should provide. A UI check turns that expectation into something you can observe by interacting with the application.</p>
        <p>For example, “Customers can search for products” is a useful starting point, but it is not yet a complete test. You need to decide what input to use, what action to take and what result should appear.</p>
        <Callout><strong>The key idea</strong>A good UI check connects a requirement to an action and an observable result. Avoid checks that rely on guesses or vague opinions.</Callout>
      </Panel>
      <Panel>
        <h3>From requirement to check</h3>
        <p>Use this simple sequence whenever you receive a requirement:</p>
        <ol>
          <li><strong>Identify the user goal:</strong> What is the user trying to accomplish?</li>
          <li><strong>Find the UI entry point:</strong> Which page, field, button or control will the user use?</li>
          <li><strong>Define the action:</strong> What will the user enter, select or click?</li>
          <li><strong>Describe the expected result:</strong> What should be displayed or changed?</li>
          <li><strong>Consider variations:</strong> What happens with empty, invalid, unusual or repeated input?</li>
        </ol>
        <p>These steps help turn broad statements into checks that another tester could understand and repeat.</p>
      </Panel>
      <Panel>
        <h3>Example: ShopStream product search</h3>
        <p>Requirement: “A customer can search the catalogue by product name.”</p>
        <p>Break it into practical checks:</p>
        <ul>
          <li>Enter the exact name of an existing product and submit the search. The matching product should appear.</li>
          <li>Enter part of a product name. Matching products should appear if partial matching is supported.</li>
          <li>Search for a name that does not exist. The page should show a clear no-results state.</li>
          <li>Submit an empty search. The application should behave consistently with the agreed design, without showing a misleading result.</li>
          <li>Change the search term and submit again. Results should reflect the latest term, not stale results.</li>
        </ul>
        <Callout><strong>Notice</strong>Each check names an action and a result you can verify. If the requirement does not explain behaviour such as empty searches or partial matches, raise a clarification question rather than inventing a rule.</Callout>
      </Panel>
      <Panel>
        <h3>Use acceptance criteria as your guide</h3>
        <p>Acceptance criteria make a requirement more specific. They describe conditions that must be met for a feature to be accepted.</p>
        <p>Example user story: “As a shopper, I want to add a product to my cart so that I can purchase it later.”</p>
        <p>Possible acceptance criteria:</p>
        <ul>
          <li>When a shopper selects Add to cart, the selected product is added to the cart.</li>
          <li>The cart indicator reflects the number of items in the cart.</li>
          <li>The shopper receives clear confirmation that the item was added.</li>
          <li>The cart displays the correct product name, price and quantity.</li>
        </ul>
        <p>Each criterion gives you a specific expectation to verify. You can create one or more checks for each criterion, including negative and boundary situations where relevant.</p>
      </Panel>
      <Panel>
        <h3>Write checks that are observable</h3>
        <p>Compare these two examples:</p>
        <ul>
          <li><strong>Too vague:</strong> “Search should work properly.”</li>
          <li><strong>Testable:</strong> “When the shopper searches for ‘Canvas Backpack’, the results should include the Canvas Backpack product and should not show unrelated products.”</li>
        </ul>
        <p>Be precise about what you can see or verify. Avoid assumptions about how the application is implemented. A UI tester is checking externally observable behaviour, not prescribing the code.</p>
      </Panel>
      <Panel>
        <h3>Think beyond the happy path</h3>
        <p>Requirements often describe the successful journey first. A thoughtful tester also considers variations:</p>
        <ul>
          <li><strong>Valid input:</strong> A product name that exists.</li>
          <li><strong>Invalid or unmatched input:</strong> A search term with no matching product.</li>
          <li><strong>Empty input:</strong> Submitting without entering a term.</li>
          <li><strong>Boundary or unusual input:</strong> A very long search term, spaces or special characters.</li>
          <li><strong>Repeated action:</strong> Searching several times or quickly changing the search term.</li>
        </ul>
        <p>Only treat a behaviour as a failure when it contradicts a requirement, agreed design or reasonable product expectation. If the expected behaviour is unclear, record the question for the team.</p>
      </Panel>
      <Panel>
        <h3>Your ShopStream exercise</h3>
        <p>Use this requirement: “A shopper can add a product to the cart and see an accurate cart summary.” Turn it into at least five UI checks.</p>
        <ol>
          <li>Write down the user action for each check.</li>
          <li>State the expected result in observable terms.</li>
          <li>Include a normal journey and at least two variations, such as adding the same item twice or removing an item.</li>
          <li>Identify any behaviour you would need the product owner or designer to clarify.</li>
        </ol>
        <Callout><strong>Mini deliverable</strong>Create a simple table with three columns: requirement or criterion, user action, expected UI result. Your checks should be clear enough for another tester to execute without asking what you meant.</Callout>
      </Panel>
      <Panel>
        <h3>Key takeaways</h3>
        <ul>
          <li>Requirements describe expected product behaviour; UI checks make that behaviour observable.</li>
          <li>Start with the user goal, identify the UI action and define the expected result.</li>
          <li>Use acceptance criteria to create focused checks.</li>
          <li>Consider empty, invalid, unusual and repeated actions as well as the happy path.</li>
          <li>Clarify ambiguity instead of inventing expected behaviour.</li>
        </ul>
      </Panel>
    </> : isManualUiInterfaceLesson ? <>
      <Panel>
        <h3>Think of a web page as a collection of parts</h3>
        <p>A user interface is not just a picture on a screen. It is made up of individual elements that work together to help someone complete a task. As a tester, you need to recognise these elements and understand what each one is meant to do.</p>
        <p>Imagine opening ShopStream. You might see a store logo, navigation links, a search field, product cards, prices, buttons and a cart indicator. Each element communicates information or lets the user take an action.</p>
        <Callout><strong>Tester mindset</strong>When you look at a page, do not treat it as one big screen. Break it into smaller components, ask what each component is for and decide how you would verify it.</Callout>
      </Panel>
      <Panel>
        <h3>Common interface components</h3>
        <ul>
          <li><strong>Header:</strong> Usually contains branding, navigation and account or cart actions. Check that it is consistent and that its links work.</li>
          <li><strong>Navigation:</strong> Menus and links help users move between areas. Check the destination, active state and whether the user can find their way back.</li>
          <li><strong>Buttons:</strong> Trigger actions such as Search, Add to cart or Continue. Check the action, feedback and whether repeated clicks cause an unexpected result.</li>
          <li><strong>Input fields:</strong> Allow users to enter information, such as a search term or checkout details. Check labels, accepted input, validation and error messages.</li>
          <li><strong>Product cards:</strong> Present a product image, name, price and action. Check that the information belongs to the correct product and is consistent with its detail page.</li>
          <li><strong>Messages and indicators:</strong> Show success, errors, loading or cart counts. Check that they are accurate, understandable and appear at the right time.</li>
          <li><strong>Footer:</strong> Often contains supporting links and information. Check that links are usable and content is not missing or cut off.</li>
        </ul>
      </Panel>
      <Panel>
        <h3>Visual elements versus interactive elements</h3>
        <p>Some interface elements mainly present information. Others allow the user to interact with the application. Many do both.</p>
        <ul>
          <li><strong>Informational:</strong> Product name, price, description, page heading or order reference.</li>
          <li><strong>Interactive:</strong> Search field, filter, sort control, quantity selector, button or navigation link.</li>
          <li><strong>Feedback:</strong> “Added to cart”, validation message, loading indicator, cart count or checkout confirmation.</li>
        </ul>
        <p>For informational elements, check accuracy, clarity and consistency. For interactive elements, check what happens when you use them. For feedback elements, check whether the message reflects the actual result.</p>
        <Callout><strong>Example</strong>If you select Add to cart, the button action, cart count, confirmation message and cart contents should tell a consistent story. A message saying “Added” is not enough if the cart remains empty.</Callout>
      </Panel>
      <Panel>
        <h3>Understand the page structure</h3>
        <p>Most web pages have a hierarchy. A page may contain a header, a main content area and a footer. Inside the main area there may be sections, cards, forms and controls.</p>
        <p>When inspecting a page, ask:</p>
        <ol>
          <li>What is the purpose of this page?</li>
          <li>What is the main task a user should complete here?</li>
          <li>Which information should be immediately visible?</li>
          <li>Which controls can the user interact with?</li>
          <li>What should happen after each action?</li>
          <li>What feedback or change should confirm that the action worked?</li>
        </ol>
        <p>This helps you move from simply looking at a page to understanding how it is supposed to behave.</p>
      </Panel>
      <Panel>
        <h3>Follow one action across the interface</h3>
        <p>Let's use a ShopStream product card. A user sees a product and selects Add to cart. Do not check only the button. Follow the result through the interface:</p>
        <ol>
          <li>The selected product should be the one added.</li>
          <li>The cart indicator should update to reflect the new item or quantity.</li>
          <li>The user should receive clear feedback that the action succeeded.</li>
          <li>The cart page should show the correct product, price and quantity.</li>
          <li>The order total should reflect the cart contents.</li>
        </ol>
        <Callout><strong>Important</strong>Interface components are connected. A button can appear to work while another part of the page displays incorrect information. Verify the complete outcome, not just the control you clicked.</Callout>
      </Panel>
      <Panel>
        <h3>What to look for when inspecting a UI</h3>
        <ul>
          <li><strong>Visibility:</strong> Is the element present and easy to find?</li>
          <li><strong>Clarity:</strong> Does its label or message explain what it does?</li>
          <li><strong>Consistency:</strong> Does it behave and look consistently with similar elements?</li>
          <li><strong>Accuracy:</strong> Is the displayed information correct?</li>
          <li><strong>Usability:</strong> Can a user complete the task without unnecessary confusion?</li>
          <li><strong>State:</strong> Does the page reflect the current situation, such as an empty cart or selected filter?</li>
        </ul>
        <p>Later lessons will explore responsive behaviour, accessibility, forms and browser tools in more detail. For now, focus on recognising the parts of the interface and asking useful testing questions about them.</p>
      </Panel>
      <Panel>
        <h3>Your ShopStream interface inspection</h3>
        <p>When ShopStream is available, open the product catalogue and inspect it without rushing to buy anything.</p>
        <ol>
          <li>Identify the header, navigation, main content and footer.</li>
          <li>Find one product card and list the information it displays.</li>
          <li>Identify the interactive controls on the page.</li>
          <li>Choose one action, such as sorting products or adding an item to the cart.</li>
          <li>Observe every part of the page that changes after the action.</li>
          <li>Write down one thing that works as expected and one question you would investigate further.</li>
        </ol>
        <Callout><strong>Mini deliverable</strong>Create a simple inventory with three columns: interface element, its purpose and what you would check. Aim for at least six elements.</Callout>
      </Panel>
      <Panel>
        <h3>Key takeaways</h3>
        <ul>
          <li>A web interface is made of components with different purposes.</li>
          <li>Some components display information, some accept actions and others provide feedback.</li>
          <li>Testers should understand the purpose of each component before deciding what to verify.</li>
          <li>Actions often affect several parts of the page, so check the complete outcome.</li>
          <li>Good UI inspection considers visibility, clarity, consistency, accuracy, usability and state.</li>
        </ul>
      </Panel>
    </> : isManualUiIntroLesson ? <>
      <Panel><h3>What is manual testing?</h3>
        <p>Manual testing is when a person interacts with software, observes what happens and compares the result with what is expected. The tester uses the application as a user would, but with a clear purpose: to learn whether it behaves correctly and to identify risks or problems.</p>
        <p>For example, imagine testing an online store. You search for a product, open its details, add it to your cart and check whether the cart shows the correct item and price. You are manually checking the behaviour by using the application yourself.</p>
        <Callout><strong>Remember</strong>Manual testing does not mean clicking around without a plan. Good manual testing is thoughtful, structured and supported by clear expectations.</Callout>
      </Panel>
      <Panel><h3>What is UI testing?</h3>
        <p>UI stands for <strong>user interface</strong>. It is the part of an application that a person sees and interacts with: pages, buttons, links, menus, text fields, messages, images and other controls.</p>
        <p>UI testing checks whether that visible and interactive layer works as expected. A tester might check that:</p>
        <ul><li>Buttons and links respond to the correct actions.</li><li>Labels, prices and product information are displayed correctly.</li><li>Forms accept valid input and explain invalid input clearly.</li><li>Navigation takes the user to the correct page.</li><li>The page responds appropriately when the cart is empty or contains products.</li><li>Content remains usable on different screen sizes.</li></ul>
        <Callout><strong>Simple distinction</strong>Manual testing describes <em>how</em> a test is performed. UI testing describes <em>what part</em> of the application is being tested. UI tests can also be automated.</Callout>
      </Panel>
      <Panel><h3>Manual testing and automated testing</h3>
        <p>A person can manually test a user interface, and an automated test can interact with that same interface using tools such as Playwright, Selenium or Cypress.</p>
        <p>Manual testing is especially useful when a tester needs to explore an unfamiliar feature, evaluate whether an experience makes sense, investigate unexpected behaviour or use human judgement. Automation is useful for repeating checks consistently, especially when the same workflow must be tested frequently.</p>
        <p>They are not competitors. A good team chooses the approach that best answers the testing question. In this discipline, you will first learn to observe and reason about application behaviour manually. Those skills also help you design better automated tests later.</p>
      </Panel>
      <Panel><h3>A simple manual testing workflow</h3>
        <ol><li><strong>Understand the task:</strong> Learn what the feature is supposed to do and identify anything unclear.</li><li><strong>Think about risk:</strong> Consider what could go wrong and which user actions matter most.</li><li><strong>Prepare:</strong> Open the correct environment and prepare suitable test data.</li><li><strong>Explore and check:</strong> Follow the workflow, try relevant inputs and observe the results.</li><li><strong>Compare:</strong> Check what happened against the expected behaviour.</li><li><strong>Record:</strong> Capture useful evidence and report any reproducible unexpected behaviour.</li><li><strong>Summarise:</strong> Explain what you tested, what passed, what failed and what remains uncertain.</li></ol>
        <Callout><strong>Tester mindset</strong>Do not only ask, “Does it work?” Also ask, “What happens if I do this twice? What if I leave this field empty? What would confuse a user? What should happen next?”</Callout>
      </Panel>
      <Panel><h3>Meet ShopStream: your testing playground</h3>
        <p>Throughout this discipline, you will use <strong>ShopStream</strong>, a small sample online store created for TestStream learners. It has a simple shopping journey:</p>
        <ol><li>Sign in to the store.</li><li>Browse or search the product catalogue.</li><li>Open a product and review its details.</li><li>Add a product to the shopping cart.</li><li>Change the quantity or remove an item.</li><li>Continue to checkout and review the order summary.</li></ol>
        <p>There is no real payment. The application exists so you can practise testing realistic workflows safely.</p>
        <p>As you explore, think beyond whether each button works. Check whether the right product was added, whether the price is correct, whether totals update, whether the user receives feedback and whether the application keeps the right state as you move between pages.</p>
        <Callout><strong>Important</strong>Some future exercises may include intentionally incorrect behaviour. Treat an unexpected result as a potential defect, then gather evidence and compare it with the stated expectation before reporting it.</Callout>
      </Panel>
      <Panel><h3>Your first ShopStream exercise</h3>
        <p>When ShopStream is available, complete this short exploratory task. You do not need to write a formal test case yet. Your goal is to practise observing the application carefully.</p>
        <ol><li>Sign in and open the product catalogue.</li><li>Choose one product and note its name and displayed price.</li><li>Add it to the cart and check that the correct product appears.</li><li>Compare the cart quantity, unit price and total.</li><li>Increase the quantity and check whether the total changes correctly.</li><li>Remove the product and observe what the empty cart looks like.</li></ol>
        <p>For each step, write down what you expected, what actually happened and any evidence you would capture if the result differed.</p>
        <Callout><strong>What to observe</strong>Look for clear feedback after actions, accurate product information, sensible totals, loading behaviour and helpful empty states. Do not assume a result is correct just because the page did not show an error.</Callout>
      </Panel>
      <Panel><h3>What you should take away</h3>
        <ul><li>Manual testing uses human observation, interaction and judgement.</li><li>UI testing focuses on the visible and interactive parts of an application.</li><li>Manual testing can be structured with test cases or open-ended through exploratory testing.</li><li>UI testing can be performed manually or with automation.</li><li>Good testers compare actual behaviour with an expected result and record evidence.</li></ul>
      </Panel>
    </> : isCapstoneLesson ? <>
      <Panel><h3>Your assignment: test a money-transfer feature</h3>
        <p>You are joining a team preparing a new transfer feature for release. Assess the requirement, decide what needs testing, execute checks and communicate any problem you find.</p>
        <Callout><strong>Feature brief</strong>A logged-in customer can transfer money to an active, saved beneficiary from an active account. The amount must be between R10.00 and R50,000.00 inclusive. The account must have enough available balance. A successful submission creates a unique reference and displays the submitted amount and beneficiary. The payment may initially show Processing and later become Successful or Failed.</Callout>
        <p>Amounts are entered to two decimal places. Assume the test environment provides approved test accounts and beneficiaries. Never use real customer information.</p>
      </Panel>
      <Panel><h3>Step 1 — Review the requirement</h3>
        <p>Identify questions the team should clarify before testing:</p>
        <ul><li>What message should appear when the balance is insufficient?</li><li>Can a customer submit the same transfer more than once by tapping repeatedly?</li><li>What happens if the network drops after confirmation?</li><li>How should a failed or processing payment appear in transaction history?</li></ul>
        <Callout><strong>Your task</strong>Write down at least two questions for the product owner. Do not invent expected behaviour where the requirement is silent.</Callout>
      </Panel>
      <Panel><h3>Step 2 — Identify test scenarios</h3>
        <ol><li>Transfer a valid amount to an active beneficiary with sufficient funds.</li><li>Attempt amounts below the minimum and above the maximum.</li><li>Transfer exactly R10.00 and exactly R50,000.00.</li><li>Attempt a transfer with insufficient available balance.</li><li>Attempt a transfer to an inactive beneficiary or from an inactive account.</li><li>Verify the confirmation shows the correct amount, beneficiary and unique reference.</li><li>Verify payment status as it moves from Processing to a final state.</li></ol>
        <p>These are scenarios, not yet detailed test cases. Expand each with preconditions, data, steps and expected results.</p>
      </Panel>
      <Panel><h3>Step 3 — Design focused test cases</h3>
        <p>For the amount field, apply equivalence partitioning and boundary value analysis:</p>
        <ul><li>R9.99 — invalid below range.</li><li>R10.00 — valid lower boundary.</li><li>R10.01 — valid just above lower boundary.</li><li>R49,999.99 — valid just below upper boundary.</li><li>R50,000.00 — valid upper boundary.</li><li>R50,000.01 — invalid above range.</li></ul>
        <p>Use a decision table for combinations of active/inactive account, sufficient/insufficient balance and active/inactive beneficiary. Use state-transition checks for Processing, Successful and Failed.</p>
        <Callout><strong>Example test case</strong>Precondition: active account, active beneficiary and available balance of R1,000.00. Steps: open Transfers, select the beneficiary, enter R500.00, review and confirm. Expected: transfer accepted, unique reference created, confirmation displays R500.00 and the selected beneficiary.</Callout>
      </Panel>
      <Panel><h3>Step 4 — Execute and investigate</h3>
        <Callout><strong>Observed result</strong>The transfer is accepted and a reference is generated, but the confirmation screen displays R5,000.00 instead of R500.00. Transaction history displays R500.00.</Callout>
        <p>This is a potential defect because the confirmation does not match the submitted amount. Record the environment, test data, steps, expected result, actual result and evidence. Do not assume the underlying payment amount is wrong until you verify the relevant records.</p>
      </Panel>
      <Panel><h3>Step 5 — Report, retest and run regression checks</h3>
        <p>Use a clear title: <strong>Transfer confirmation displays R5,000.00 after submitting R500.00</strong>.</p>
        <ol><li>Repeat the original R500.00 test to perform confirmation testing.</li><li>Check other amounts, including the minimum and maximum boundaries.</li><li>Check transaction history and reference details for consistency.</li><li>Verify insufficient-balance and invalid-beneficiary handling still work.</li><li>Record the build tested and the outcome of each check.</li></ol>
        <Callout><strong>Capstone outcome</strong>You have applied requirements analysis, scenario design, test cases, equivalence partitioning, boundary value analysis, decision tables, state transitions, defect reporting, confirmation testing and regression testing in one workflow.</Callout>
      </Panel>
      <Panel><h3>What to put in your QA portfolio</h3>
        <ul><li>Your clarification questions and identified risks.</li><li>A list of test scenarios.</li><li>At least five detailed test cases with expected results.</li><li>A completed defect report based on the confirmation mismatch.</li><li>A short retest and regression summary.</li></ul>
        <p>Use fictional test data only. Explain why you selected each test; a smaller, reasoned test set is more valuable than a long unexplained list.</p>
      </Panel>
    </> : isDefectLesson ? <>
      <Panel>
        <h3>Finding a defect is only the beginning</h3>
        <p>Imagine testing a banking app and discovering that a customer enters R500, but the confirmation screen displays R5,000. You have found unexpected behaviour, but the team still needs enough information to understand, investigate and fix it.</p>
        <p>A defect report communicates the difference between what should happen and what actually happened. A useful report helps another person reproduce the issue without having to guess what you did.</p>
        <Callout><strong>Key idea</strong>A defect report is not just a complaint that something is broken. It is clear, factual evidence that helps the team investigate and make a decision.</Callout>
      </Panel>
      <Panel>
        <h3>What makes a good defect report?</h3>
        <p>A report should be concise, specific and reproducible. Include the details that help the team understand the problem:</p>
        <ul>
          <li><strong>Title:</strong> A short summary of the problem and where it occurs.</li>
          <li><strong>Environment:</strong> Application version, device or browser, operating system and test environment where relevant.</li>
          <li><strong>Preconditions:</strong> Relevant account state, permissions, setup or data needed before reproducing the issue.</li>
          <li><strong>Steps to reproduce:</strong> Numbered actions that another person can follow.</li>
          <li><strong>Test data:</strong> The values or records used, while protecting sensitive information.</li>
          <li><strong>Expected result:</strong> What should happen according to the requirement.</li>
          <li><strong>Actual result:</strong> What happened instead.</li>
          <li><strong>Evidence:</strong> Screenshots, screen recordings, logs, request and response details or timestamps, where appropriate.</li>
        </ul>
        <Callout><strong>Protect customer information</strong>Never include real passwords, PINs, full card details or unnecessary personal information in a defect report. Use approved test data and follow your organisation's data-handling rules.</Callout>
      </Panel>
      <Panel>
        <h3>Example: a useful banking defect</h3>
        <Callout><strong>Title</strong>Transfer confirmation displays R5,000 when customer submits R500</Callout>
        <p><strong>Environment:</strong> QA environment, Android app version 2.4.1.</p>
        <p><strong>Precondition:</strong> Test customer is logged in and has sufficient available funds.</p>
        <p><strong>Steps to reproduce:</strong></p>
        <ol><li>Open Transfers.</li><li>Select a valid saved beneficiary.</li><li>Enter R500 as the transfer amount.</li><li>Review and confirm the transfer.</li></ol>
        <p><strong>Expected result:</strong> The confirmation displays a transfer amount of R500.</p>
        <p><strong>Actual result:</strong> The confirmation displays R5,000.</p>
        <p><strong>Evidence:</strong> Attach a screenshot or recording, a timestamp and relevant transaction reference from the test environment.</p>
        <p>This report gives the team a starting point to reproduce and investigate the problem. Do not claim that money was actually transferred unless you have verified that separately.</p>
      </Panel>
      <Panel>
        <h3>Severity and priority are different</h3>
        <p>These terms are related, but they answer different questions:</p>
        <ul>
          <li><strong>Severity:</strong> How serious is the impact of the defect on the system or user?</li>
          <li><strong>Priority:</strong> How urgently should the team address it?</li>
        </ul>
        <p>A defect that exposes customer financial information may have very high severity and high priority. A small visual issue on a rarely used page may have low severity, although a business deadline or public launch could still make its priority higher.</p>
        <p>Severity and priority are usually agreed with the team according to business impact, risk and release context. Do not assume that every organisation uses identical labels or definitions.</p>
        <Callout><strong>Remember</strong>Severity describes impact. Priority describes urgency. A serious defect is not automatically the next item in every team's work queue, and a seemingly small issue can become urgent in the right context.</Callout>
      </Panel>
      <Panel>
        <h3>The defect lifecycle</h3>
        <p>A defect moves through a workflow as people investigate it, fix it and verify the result. A common example is:</p>
        <ol>
          <li><strong>New / Open:</strong> The tester records the defect and submits it for review.</li>
          <li><strong>Triaged:</strong> The team reviews the report, confirms its validity and agrees on severity, priority and ownership.</li>
          <li><strong>Assigned:</strong> The defect is assigned to someone to investigate.</li>
          <li><strong>In progress:</strong> The developer or responsible team member works on a fix.</li>
          <li><strong>Fixed / Resolved:</strong> A change has been made and is ready for verification.</li>
          <li><strong>Retest:</strong> The tester repeats the relevant checks in an environment containing the fix.</li>
          <li><strong>Closed:</strong> The tester confirms the reported issue is resolved and closes it according to the team's workflow.</li>
        </ol>
        <p>If the issue still occurs, the tester may reopen the defect with updated evidence. Some teams also use statuses such as Rejected, Duplicate, Deferred or Cannot Reproduce. The exact workflow depends on the organisation and its tracking tool.</p>
      </Panel>
      <Panel>
        <h3>Retesting is not the end of the story</h3>
        <p>When a fix is delivered, first perform <strong>confirmation testing</strong> (also called retesting): repeat the test that originally exposed the defect to check whether the specific problem has been fixed.</p>
        <p>Then consider <strong>regression testing</strong>: check related areas to make sure the change has not caused an unintended problem elsewhere. For example, after a transfer amount display fix, check transfer submission, transaction history and confirmation details where relevant.</p>
        <Callout><strong>Practical habit</strong>Keep the original expected result and evidence. Record the build or version tested, what you retested, the outcome and any related regression checks.</Callout>
      </Panel>
      <Panel>
        <h3>Communicate defects professionally</h3>
        <ul>
          <li>Describe what you observed, not who you think is responsible.</li>
          <li>Use factual language and avoid assumptions about the root cause.</li>
          <li>Provide enough detail for someone else to reproduce the issue.</li>
          <li>Update the report when new evidence becomes available.</li>
          <li>If the behaviour is unclear, confirm the requirement before labelling it a defect.</li>
        </ul>
        <p>Good defect reporting saves investigation time, improves collaboration and helps teams make informed release decisions.</p>
      </Panel>
    </> : isTestDesignLesson ? <>
      <Panel>
        <h3>Choose tests that give you useful coverage</h3>
        <p>Test design techniques help you select effective test cases without trying every possible combination. Imagine a banking app that accepts transfers between R10 and R50,000, applies fees based on customer type and changes a payment's status as it moves through processing.</p>
        <p>Rather than guessing which values and journeys to test, use structured techniques to identify representative cases, important boundaries, combinations and state changes.</p>
        <Callout><strong>Key idea</strong>Test design techniques help you decide what to test. They make testing more systematic, focused and easier to explain.</Callout>
      </Panel>
      <Panel>
        <h3>1. Equivalence partitioning</h3>
        <p>Equivalence partitioning divides input data into groups that the system is expected to handle in the same way. You select representative values from each group instead of testing every possible value.</p>
        <p>For a transfer amount allowed between R10 and R50,000, possible partitions are:</p>
        <ul><li><strong>Below the minimum:</strong> values less than R10, such as R5.</li><li><strong>Valid range:</strong> values from R10 to R50,000, such as R500.</li><li><strong>Above the maximum:</strong> values greater than R50,000, such as R50,001.</li></ul>
        <p>A representative value from each partition can help check whether the application accepts or rejects the group correctly. Confirm the actual rules and decimal precision from the requirement.</p>
      </Panel>
      <Panel>
        <h3>2. Boundary value analysis</h3>
        <p>Defects often appear at the edges of allowed ranges. Boundary value analysis focuses on the minimum and maximum values, and values immediately around them.</p>
        <p>For a range of R10 to R50,000, useful checks include R9.99, R10, R10.01, R49,999.99, R50,000 and R50,000.01, assuming cents are supported.</p>
        <Callout><strong>Remember</strong>Equivalence partitioning checks representative groups. Boundary value analysis concentrates on the edges between those groups.</Callout>
      </Panel>
      <Panel>
        <h3>3. Decision table testing</h3>
        <p>Use a decision table when the outcome depends on combinations of conditions. For example, a transfer might be allowed only when the account is active, the balance is sufficient and the beneficiary is valid.</p>
        <ul><li>Condition 1: Is the account active?</li><li>Condition 2: Is the available balance sufficient?</li><li>Condition 3: Is the beneficiary valid?</li><li>Expected action: Accept the transfer only when all required conditions are true; otherwise show the appropriate rejection.</li></ul>
        <p>A decision table lays out combinations of these conditions and the expected result for each meaningful rule. It is especially useful when several business rules interact.</p>
      </Panel>
      <Panel>
        <h3>4. State transition testing</h3>
        <p>Some features behave differently depending on their current state and the event that occurs. State transition testing checks valid state changes and, where appropriate, invalid transitions.</p>
        <p>A payment could move through states such as:</p>
        <ol><li><strong>Created:</strong> The customer has submitted the payment.</li><li><strong>Processing:</strong> The payment is being handled.</li><li><strong>Successful:</strong> The payment has completed successfully.</li><li><strong>Failed:</strong> The payment could not be completed.</li></ol>
        <p>Test that valid events move the payment to the correct next state, that terminal states are handled correctly, and that the system does not allow an invalid transition such as changing a completed payment back to processing without an explicitly defined business rule.</p>
      </Panel>
      <Panel>
        <h3>How to choose a technique</h3>
        <ul><li>Use <strong>equivalence partitioning</strong> when many input values should behave alike.</li><li>Use <strong>boundary value analysis</strong> when a requirement defines limits or ranges.</li><li>Use <strong>decision tables</strong> when combinations of conditions determine the outcome.</li><li>Use <strong>state transition testing</strong> when behaviour depends on the current state and events.</li></ul>
        <p>These techniques can be combined. A tester might use partitions and boundaries for the transfer amount, a decision table for eligibility rules, and state transitions to verify payment processing.</p>
        <Callout><strong>Practical habit</strong>Choose techniques based on the requirement, risk and complexity. You do not need to apply every technique to every feature.</Callout>
      </Panel>
    </> : isTestCasesLesson ? <>
      <Panel>
        <h3>From requirements to practical checks</h3>
        <p>In the previous lesson, you learned how requirements and acceptance criteria describe what a product should do. The next step is to decide how to check that behaviour.</p>
        <p>A <strong>test scenario</strong> describes a situation or behaviour you want to verify. A <strong>test case</strong> turns that scenario into a specific set of conditions, data, actions and expected results.</p>
        <Callout><strong>Key difference</strong>Scenario: Verify that a customer can transfer money to a valid beneficiary. Test case: Log in as a customer with sufficient funds, transfer R500 to a saved beneficiary, and verify the debit, credit and confirmation.</Callout>
      </Panel>
      <Panel>
        <h3>Identify test scenarios</h3>
        <p>Start with the acceptance criteria and ask: what could a user do, what could go wrong, and what important conditions could change the outcome?</p>
        <p>For a banking transfer feature, useful scenarios include:</p>
        <ul>
          <li>Transfer money when the account has sufficient funds.</li>
          <li>Attempt a transfer when the account has insufficient funds.</li>
          <li>Attempt to transfer to an invalid or inactive beneficiary.</li>
          <li>Submit a transfer with a zero, negative or above-limit amount.</li>
          <li>Lose network connectivity while submitting the transfer.</li>
          <li>Submit the same transfer action more than once and check for duplicate processing.</li>
        </ul>
        <Callout><strong>Think beyond the happy path</strong>A positive scenario checks expected use with valid information. Negative scenarios check how the system handles invalid input, unavailable services, missing information or other failure conditions.</Callout>
      </Panel>
      <Panel>
        <h3>What belongs in a test case?</h3>
        <p>A useful test case gives another tester enough information to repeat the check and compare the actual result with the expected result.</p>
        <ul>
          <li><strong>Test case ID and title:</strong> A unique reference and a short description of what is being checked.</li>
          <li><strong>Preconditions:</strong> What must already be true, such as the customer being logged in and having a saved beneficiary.</li>
          <li><strong>Test data:</strong> The specific values used, such as a transfer amount of R500 and an account balance of R2,000.</li>
          <li><strong>Steps:</strong> The actions the tester performs, in the correct order.</li>
          <li><strong>Expected result:</strong> The outcome that should happen after the steps.</li>
          <li><strong>Actual result and status:</strong> What happened during execution and whether the test passed or failed.</li>
        </ul>
        <Callout><strong>Example test case</strong>Title: Transfer R500 to a saved beneficiary<br/>Precondition: Customer is logged in and has R2,000 available.<br/>Test data: Amount R500; beneficiary is valid and active.<br/>Steps: Open Transfers; select the beneficiary; enter R500; review and confirm.<br/>Expected result: The transfer is accepted once, the available balance decreases by R500, and a confirmation with the correct amount and beneficiary is displayed.</Callout>
      </Panel>
      <Panel>
        <h3>Positive, negative and boundary-value tests</h3>
        <p>Test design is not about writing as many cases as possible. It is about selecting cases that provide useful coverage of the requirement and its risks.</p>
        <ul>
          <li><strong>Positive testing:</strong> Use valid data and confirm the intended operation succeeds.</li>
          <li><strong>Negative testing:</strong> Use invalid or unsuitable data and confirm the system handles it safely and clearly.</li>
          <li><strong>Boundary-value testing:</strong> Check values at and around the edges of an allowed range, where defects commonly occur.</li>
        </ul>
        <p>For example, if the agreed minimum transfer is R10 and the maximum is R50,000, test R10, R9.99, R10.01, R50,000, R50,000.01 and a value comfortably inside the range. The actual limits must come from the requirement.</p>
        <Callout><strong>Useful habit</strong>Do not invent business rules. If the minimum, maximum, precision or behaviour for an invalid amount is not defined, ask the team to clarify it before finalising the expected result.</Callout>
      </Panel>
      <Panel>
        <h3>Make test cases clear and maintainable</h3>
        <ul>
          <li>Keep each test focused on a clear objective.</li>
          <li>Use specific, realistic test data rather than vague instructions such as “enter a valid amount”.</li>
          <li>Write steps in the order they should be performed.</li>
          <li>Describe observable expected results, not assumptions about how the code works.</li>
          <li>Avoid combining many unrelated checks into one test case.</li>
          <li>Link test cases back to the requirement or acceptance criterion they cover.</li>
        </ul>
        <p>Good test cases help different people repeat the same check consistently, understand failures and see which requirements have been covered.</p>
      </Panel>
    </> : isRequirementsLesson ? <>
      <Panel>
        <h3>Before you test, understand what should happen</h3>
        <p>Imagine a banking app introduces a new beneficiary feature. A customer should be able to add someone they trust and later send money to that person. But what information is required? Must the beneficiary be verified? What happens if the account number is invalid?</p>
        <p>If the team does not agree on the expected behaviour, developers may build one interpretation while testers validate another. Requirements help the team understand what needs to be delivered.</p>
        <Callout><strong>Key idea</strong>A requirement describes a need, capability or condition that a product or feature must satisfy. Testing uses requirements as a basis for evaluating whether the solution behaves as expected.</Callout>
      </Panel>
      <Panel>
        <h3>Where do requirements come from?</h3>
        <p>Requirements can come from customers, users, business stakeholders, regulations, existing systems, product strategy and technical constraints. They may be documented in different ways, depending on how a team works.</p>
        <ul>
          <li><strong>Business requirements:</strong> Explain the business goal, such as allowing customers to make payments without visiting a branch.</li>
          <li><strong>User requirements:</strong> Describe what a user needs to achieve, such as adding and managing beneficiaries.</li>
          <li><strong>Functional requirements:</strong> Describe what the system must do, such as validating an account number before saving a beneficiary.</li>
          <li><strong>Non-functional requirements:</strong> Describe quality expectations or constraints, such as response time, security, availability and accessibility.</li>
        </ul>
        <Callout><strong>Tester mindset</strong>Do not assume a short requirement contains every detail. Look for missing rules, unclear wording, conflicting statements and unanswered questions.</Callout>
      </Panel>
      <Panel>
        <h3>User stories and acceptance criteria</h3>
        <p>In Agile teams, a requirement may be expressed as a user story. A common format is:</p>
        <Callout><strong>User story</strong>As a banking customer, I want to add a beneficiary, so that I can make future payments without entering their details every time.</Callout>
        <p>The story explains who needs something and why. <strong>Acceptance criteria</strong> describe the conditions that must be met for the story to be accepted. They make the expected behaviour clearer and provide a basis for testing.</p>
        <p>For this story, acceptance criteria might state:</p>
        <ol>
          <li>The customer can enter a beneficiary name and account number.</li>
          <li>The system must reject an account number that does not meet the defined format.</li>
          <li>A successfully saved beneficiary appears in the customer's beneficiary list.</li>
          <li>If saving fails, the customer sees a clear message and the beneficiary is not added.</li>
        </ol>
      </Panel>
      <Panel>
        <h3>What makes acceptance criteria testable?</h3>
        <p>Good acceptance criteria should be clear, specific, observable and measurable. Avoid vague statements such as “the page must be user-friendly” or “the system should be fast”. Ask what a user should be able to do and what result can be observed.</p>
        <p>For example, replace “the system should respond quickly” with an agreed measurable target, such as “the beneficiary list should load within two seconds under the defined test conditions”. The actual target must come from the product and business stakeholders, not be invented by the tester.</p>
        <p>One popular way to express acceptance criteria is <strong>Given / When / Then</strong>:</p>
        <Callout><strong>Example: successful beneficiary save</strong>Given that the customer is logged in and has entered valid beneficiary details,<br/>When the customer selects Save,<br/>Then the beneficiary is saved and displayed in the beneficiary list.</Callout>
        <p>This structure describes the starting context, the action and the expected outcome. It helps everyone understand what needs to be checked.</p>
      </Panel>
      <Panel>
        <h3>How testers review requirements</h3>
        <p>When reviewing a story or requirement, ask questions such as:</p>
        <ul>
          <li>Is the expected behaviour clear and unambiguous?</li>
          <li>Are valid and invalid inputs described?</li>
          <li>What should happen when a service is unavailable or an action fails?</li>
          <li>Are permissions, security and data privacy considered?</li>
          <li>Are limits, boundaries and error messages defined?</li>
          <li>Can the acceptance criteria be verified through observable results?</li>
        </ul>
        <p>If something is unclear, raise the question with the product owner, business analyst or relevant stakeholder before making assumptions. This is an important way testers contribute early in the delivery process.</p>
      </Panel>
      <Panel>
        <h3>From acceptance criteria to test scenarios</h3>
        <p>Consider the criterion: “The system must reject an account number that does not meet the defined format.” A tester can derive scenarios such as:</p>
        <ul>
          <li>Enter a valid account number and confirm it can be saved.</li>
          <li>Enter an account number that is too short.</li>
          <li>Enter an account number that is too long.</li>
          <li>Leave the account number blank.</li>
          <li>Enter letters or unsupported characters, if the format does not allow them.</li>
        </ul>
        <Callout><strong>Remember</strong>Requirements explain what is needed. Acceptance criteria make expected outcomes specific. Test scenarios describe the situations you will check. Test cases add the detailed steps, data and expected results.</Callout>
      </Panel>
    </> : isLevelsTypesLesson ? <>
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
      <p>{isManualUiFunctionalLesson ? "A ShopStream tester adds a product priced at R120 to the cart and changes its quantity to 2. Which result best confirms the cart feature is working correctly?" : isManualUiRequirementsLesson ? "A requirement says shoppers can add products to the cart. Which UI check is the most useful and testable?" : isManualUiInterfaceLesson ? "A ShopStream tester selects Add to cart on a product card. Which approach gives the most complete check of this interaction?" : isManualUiIntroLesson ? "Which statement best explains the relationship between manual testing and UI testing?" : isDefectLesson ? "A tester reports that a transfer confirmation displays R5,000 instead of the R500 entered. Which information is most important to help the developer reproduce and investigate the defect?" : isTestDesignLesson ? "A transfer amount must be between R10 and R50,000. Which technique is most useful for selecting representative values from valid and invalid input groups?" : isTestCasesLesson ? "A transfer requirement allows amounts from R10 to R50,000. Which set of values is most useful for checking the lower boundary?" : isRequirementsLesson ? "A user story says customers can add beneficiaries. One acceptance criterion says: \"The system should be easy to use.\" What should the tester do?" : isLevelsTypesLesson ? "A developer has fixed a defect in the transfer fee calculation. The tester reruns the exact test that originally failed to confirm the fix. What is this called?" : isPrinciplesLesson ? "A tester has run the same successful payment test every day for several weeks, but it has not revealed any new defects. Which principle suggests the tester should review and expand the tests?" : isStlcLesson ? "A tester has executed a transfer test and found that the app sends R5,000 instead of the expected R500. What should happen next?" : isSdlcLesson ? "A tester reviews a user story and notices that the payment failure behaviour is not explained. Developers have not started coding yet. What is the best action?" : isQualityLesson ? "A banking app processes payments correctly, but it exposes customer account details to other users. What does this tell us about its quality?" : "A team is building a shopping app. A tester checks that adding one item to the cart works, then tries adding the same item several times and entering an invalid quantity. What is the main purpose of these testing activities?")}</p>
      <Question>
        {manualUiRemainingLesson ? <>
          {manualUiRemainingLesson.options.map((option, index) => <Option key={option} $selected={answer === index} $correct={answer === 1 && index === 1} onClick={() => { setAnswer(index); setCompleted(false); }}>{String.fromCharCode(65 + index)}. {option}</Option>)}
        </> : isManualUiFunctionalLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. The quantity field accepts the number 2, regardless of the cart total.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. The cart shows the correct product, quantity 2, line total R240 and a matching overall total.</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. The Add to cart button changes colour after it is clicked.</Option>
        </> : isManualUiRequirementsLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. Check that the Add to cart button looks attractive.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Select a specific product, add it, then verify that the correct item, quantity and price appear in the cart and that the cart indicator updates.</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Assume the cart works because the requirement says shoppers can use it.</Option>
        </> : isManualUiInterfaceLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. Check only that the button can be clicked.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Check that the correct product is added, the cart indicator and feedback update, and the cart shows the correct item, quantity and total.</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Check whether the button colour changes, then move to another page.</Option>
        </> : isManualUiIntroLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. Manual testing always means testing without a plan, while UI testing is only about visual appearance.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Manual testing is a way of testing using human interaction and judgement; UI testing focuses on the user interface and can be manual or automated.</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Manual testing and UI testing are exactly the same thing.</Option>
        </> : isCapstoneLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. Start executing random tests and decide expected results as you go.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Clarify gaps, derive scenarios and test cases from the rules, execute them, then report and verify defects.</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Only test the happy path because the brief describes a successful transfer.</Option>
        </> : isDefectLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. The tester’s opinion about which developer caused the issue.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Clear reproduction steps, test data, expected and actual results, environment and relevant evidence.</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Only the word “broken” and a screenshot with no context.</Option>
        </> : isTestDesignLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. State transition testing</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Equivalence partitioning</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Exploratory testing only</Option>
        </> : isTestCasesLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. R100 and R500, because they are normal transfer amounts.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. R9.99, R10 and R10.01, because they check just below, at and just above the minimum.</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. R1, R5 and R8, because they are all below the minimum.</Option>
        </> : isRequirementsLesson ? <>
          <Option $selected={answer === 0} onClick={() => { setAnswer(0); setCompleted(false); }}>A. Accept it as written because it is part of the requirement.</Option>
          <Option $selected={answer === 1} $correct={answer === 1} onClick={() => { setAnswer(1); setCompleted(false); }}>B. Ask stakeholders to clarify the expected behaviour in specific, observable terms.</Option>
          <Option $selected={answer === 2} onClick={() => { setAnswer(2); setCompleted(false); }}>C. Decide independently what “easy to use” means and test that.</Option>
        </> : isLevelsTypesLesson ? <>
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
      {answer !== null && <Feedback $correct={correctAnswer}>{correctAnswer ? (manualUiRemainingLesson ? manualUiRemainingLesson.explanation : isManualUiFunctionalLesson ? "Correct. Functional testing verifies the feature outcome across related values. The product, quantity and calculated totals should all agree." : isManualUiRequirementsLesson ? "Correct. This check turns the requirement into a clear action and several observable outcomes. It verifies the selected product and the related cart information rather than relying on the button alone." : isManualUiInterfaceLesson ? "Correct. A UI action can affect several connected elements. Verify the product, cart indicator, feedback and resulting cart contents so that the whole interaction is consistent." : isManualUiIntroLesson ? "Correct. Manual testing describes an approach that uses human interaction and judgement. UI testing focuses on the user interface, and it can be performed manually or automated. The two ideas overlap, but they do not mean the same thing." : isCapstoneLesson ? "Exactly. A structured tester clarifies requirements, designs checks for normal and exceptional behaviour, executes them, then reports and verifies defects. This is how the fundamentals work together." : isDefectLesson ? "Correct. A useful defect report gives the team reproducible steps, relevant context and clear expected-versus-actual results, supported by appropriate evidence." : isTestDesignLesson ? "Correct. Equivalence partitioning groups values expected to behave similarly, then uses representative values from each group. Boundary value analysis complements it by checking values around the limits." : isTestCasesLesson ? "Correct. Boundary-value testing checks values just below, at and just above a limit. This helps reveal errors in how the system handles the edge of an allowed range." : isRequirementsLesson ? "Correct. Vague criteria are difficult to verify consistently. The team should agree on clear, observable expectations before treating the story as testable." : isLevelsTypesLesson ? "Correct. Confirmation testing repeats the test that exposed the defect to check that the specific fix works. Regression testing checks for unintended side effects elsewhere." : isPrinciplesLesson ? "Correct. Repeating the same tests can become less effective over time. Improve the test suite with new scenarios, data and exploratory checks." : isStlcLesson ? "Exactly. Record the failure clearly, report it for investigation and retest once a fix is available." : isSdlcLesson ? "Exactly. Clarifying requirements early helps prevent misunderstandings from becoming defects later. Testing contributes before code is written." : isQualityLesson ? "Exactly. A product can work functionally and still be poor quality if it puts customer information at risk." : "That's right. Testing checks expected and unexpected behaviour, helps reveal defects and provides information about risk.")   : (manualUiRemainingLesson ? "Not quite. Review the expected behaviour and the tester takeaway above, then compare each option with the evidence you would need." : isManualUiFunctionalLesson ? "Not quite. A quantity field accepting input or a button changing colour does not prove the cart calculation is correct. Verify the product, quantity and totals together." : isManualUiRequirementsLesson ? "Not quite. A useful check must describe what the tester does and what observable result should follow. Appearance alone or an assumption does not verify the requirement." : isManualUiInterfaceLesson ? "Not quite. Checking only the button does not confirm that the application completed the action correctly. Follow the result through the cart and related feedback." : isManualUiIntroLesson ? "Not quite. Remember the distinction: manual describes how testing is performed; UI describes the part of the application being tested. A UI test can be automated too." : isCapstoneLesson ? "Not quite. Testing should be systematic: understand the rules, identify risks and scenarios, define expected results, execute checks and report defects with evidence." : isDefectLesson ? "Not quite. The team needs enough context to repeat the issue and compare what happened with what should have happened. A label or uncontextualised screenshot is not enough." : isTestDesignLesson ? "Not quite. The question asks for a technique that divides input data into groups expected to behave alike. Boundary value analysis focuses specifically on values at and around limits." : isTestCasesLesson ? "Not quite. The most useful boundary checks are immediately below the minimum, exactly at the minimum and immediately above it. Testing only ordinary values may miss boundary defects." : isRequirementsLesson ? "Not quite. The phrase is subjective and does not tell the tester what result to observe. Ask the team to define specific, verifiable expectations." : isLevelsTypesLesson ? "Not quite. The question describes repeating the original failed test to verify one particular fix. Regression testing has a broader purpose: checking for side effects." : isPrinciplesLesson ? "Not quite. The clue is that repeating the same tests stops revealing new information. Which principle says tests need to be refreshed?" : isStlcLesson ? "A failed test should be documented with evidence and raised as a defect so the team can investigate and verify a fix." : isSdlcLesson ? "Not quite. Think about when the team can most easily clarify an unclear requirement — before or after implementation?" : isQualityLesson ? "Not quite. Think about the different dimensions of quality. Correct payment processing does not make an exposure of private information acceptable." : "Not quite. Think about what the tester is trying to learn by checking normal use and unusual input. Testing cannot guarantee that software will never fail.")}</Feedback>}
    </Panel>

    <Actions>
      <Back onClick={onBack}>← Return to lesson outline</Back>
      <Button $primary disabled={!correctAnswer} onClick={() => { setCompleted(true); onComplete(); }}>{completed ? "Lesson completed ✓" : "Mark lesson as complete"}</Button>
    </Actions>
  </Page>;
}
