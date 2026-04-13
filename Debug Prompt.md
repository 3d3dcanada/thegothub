 Debug Prompt — MiniMax M2.5

> Systematic bug hunting. M2.5 traces execution paths, not just symptoms.

---

## Core Debug Prompt

```
Something is broken. Help me find and fix it.

## The Problem
Expected behavior: [what should happen]
Actual behavior: [what is happening]
When it started: [always broken / started after X change / intermittent]
Frequency: [always / sometimes / only under condition X]

## Reproduction Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]
Result: [what you see]

## Error Output
[Paste exact error message, stack trace, or console output]

## Relevant Code
[Paste the code — more is better, use the 205k context]

## What I've Already Tried
[List anything you've attempted]

## Instructions
1. Read the code carefully before suggesting anything
2. Identify the root cause, not just the symptom
3. Trace the execution path to the failure point
4. Explain WHY it's failing
5. Provide the minimal fix with explanation
6. Note any other issues you spotted (but don't fix them unless asked)
```

---

## Specific Debug Scenarios

### Runtime Error
```
Runtime error in [language/framework]:

Error: [exact error text]
Stack trace:
[paste stack trace]

Code at failure point:
[paste code]

What is the root cause and what is the minimal fix?
```

### Logic Bug (wrong output, no error)
```
This code runs without errors but produces wrong results.

Input: [example input]
Expected output: [what it should produce]
Actual output: [what it produces]

Code:
[paste code]

Walk through the execution step by step and find where it diverges from the expected path.
```

### Performance Issue
```
This code is too slow.

Current performance: [time / memory usage]
Target: [acceptable threshold]

Code:
[paste code]

Profile it mentally:
1. What is the algorithmic complexity?
2. Where are the bottlenecks?
3. What is the fastest fix vs. the most correct fix?
4. What would you measure first to confirm the bottleneck?
```

### Type Error (TypeScript)
```
TypeScript is rejecting this code:

Error: [exact TS error]
Location: [file:line]

Code:
[paste code]

Types involved:
[paste relevant type definitions]

Explain why TypeScript is complaining and provide the correct fix.
Do not use 'any' or 'as unknown as X' to silence the error.
```

### React / UI Bug
```
React component isn't behaving correctly.

Issue: [describe the UI problem]
Component:
[paste component code]

Related:
- State: [paste state/store if relevant]
- Parent component: [paste if relevant]
- Console errors: [paste any]

Is this a render issue, state issue, effect issue, or ref issue? Find it.
```

### Async / Race Condition
```
There's an async issue in this code.
It [works sometimes / fails randomly / has stale data].

Code:
[paste code]

Trace the async execution order. Identify:
1. What operations run concurrently that shouldn't?
2. What state can be stale?
3. What cleanup is missing?
4. The correct fix with explanation of why it works.
```

---

## Post-Fix Verification Prompt

```
After applying the fix:
1. What test would prove this is actually fixed?
2. What edge cases could still cause problems?
3. Is there anything the fix could have broken?
4. Should we add any defensive code to prevent regression?
```