# Code Review Prompt — MiniMax M2.5

> Deep review that finds real problems, not style nitpicks.
> M2.5 at 80.2% SWE-Bench — it knows what bad code looks like.

---

## Core Review Prompt

```
Review this code as a senior engineer doing a thorough pull request review.

## Code
[paste code]

## Context
- What this code does: [explain]
- Where it fits: [module / feature / critical path]
- Known constraints: [performance sensitive / public API / etc.]

## Review Criteria (prioritized)
1. SECURITY — Any vulnerabilities? (injection, auth bypass, data exposure)
2. CORRECTNESS — Does it actually do what it intends to? Edge cases?
3. PERFORMANCE — Any obvious bottlenecks? Unnecessary work?
4. RELIABILITY — Error handling? What happens when things fail?
5. MAINTAINABILITY — Is it readable? Will the next dev understand it?
6. TYPE SAFETY — Any type holes? Unsafe casts? Missing validation?

## Format
For each issue found:
- Severity: [CRITICAL / MAJOR / MINOR / SUGGESTION]
- Location: [line or function]
- Issue: [what is wrong]
- Why it matters: [consequence]
- Fix: [how to fix it]

End with:
- Overall assessment
- Top 3 things to fix before shipping
- Anything genuinely well done
```

---

## Focused Review Prompts

### Security Review
```
Security audit this code:
[paste code]

Check for:
- SQL injection (if DB operations)
- XSS vulnerabilities (if rendering user content)
- CSRF vulnerabilities (if forms/mutations)
- Authentication bypasses (if auth logic)
- Authorization issues (if access control)
- Sensitive data exposure (logging, error messages, responses)
- Dependency vulnerabilities
- Input validation gaps
- Cryptographic issues (if crypto present)

For each finding: exact location, how to exploit, how to fix.
```

### Performance Review
```
Analyze the performance characteristics of this code:
[paste code]

Profile it:
1. What is the time complexity of each operation?
2. What is the space complexity?
3. Are there any N+1 query patterns?
4. Is there unnecessary recomputation?
5. Are there memory leaks? (especially important for long-running processes)
6. What happens at 10x / 100x / 1000x current load?
7. What would you optimize first and why?
```

### API Design Review
```
Review this API design:
[paste API/interface/schema]

Evaluate:
1. Is the naming consistent and predictable?
2. Are the return types appropriate? (too much / too little data)
3. Is the error handling consistent?
4. Is it versioned correctly?
5. Are there breaking change risks?
6. Is authentication/authorization applied correctly?
7. Does the request/response shape make sense for the use case?

What would you change and why?
```

### React Component Review
```
Review this React component:
[paste component]

Check:
1. Does it have single responsibility?
2. Are hooks used correctly? (deps arrays, conditional calls, cleanup)
3. Is state managed at the right level?
4. Are there unnecessary re-renders?
5. Is it accessible? (aria labels, keyboard nav, focus management)
6. Are all states handled? (loading, error, empty, success)
7. Are there memory leaks? (event listeners, subscriptions not cleaned up)
8. Is the TypeScript correct and complete?
```

---

## Review Summary Template

After reviewing, ask for:
```
Summarize the review:
1. Is this code ready to ship? (Yes / No / With minor fixes)
2. Critical blockers (if any):
3. Important fixes before shipping:
4. Things to address eventually but not now:
5. Overall code quality score (1-10) and why:
```