# Refactor Prompt — MiniMax M2.5

> Surgical refactoring. Change the structure, preserve the behavior.

---

## Core Refactor Prompt

```
Refactor this code. The functionality must not change.

## Code
[paste code]

## The Problem With It
[Describe what's wrong: too complex / poor naming / duplicated logic /
  wrong abstraction / hard to test / etc.]

## Target State
[Describe what good looks like: smaller functions / clearer names /
  better separation of concerns / etc.]

## Constraints
- [Do not change the public API]
- [Must stay in one file]
- [Must remain compatible with X]
- [Do not add new dependencies]

## Process
1. Identify what's actually wrong (root cause, not surface symptoms)
2. Plan the refactor in steps
3. Execute one step at a time
4. After each step: what changed and why
5. Verify behavior is preserved at each step
```

---

## Specific Refactor Types

### Extract + Simplify a Large Function
```
This function is doing too much:
[paste function]

Split it into focused, single-responsibility functions.
Rules:
- Each function should have one reason to change
- Name functions after what they do, not how they do it
- The orchestrating function should read like documentation
- Types must remain correct throughout
```

### Remove Duplication
```
This code has duplication:
[paste code]

Identify:
1. What is duplicated?
2. What is the actual concept being duplicated?
3. What abstraction captures it without over-engineering?

Provide the refactored version with the abstraction.
Do not extract to a utility for a one-time use — that's just moving code.
```

### Improve Naming
```
The naming in this code is unclear:

[paste code]

Rename everything that could be clearer:
- Variables: describe what they hold, not their type
- Functions: verb + noun, describe the action
- Types/interfaces: describe the shape, not the usage
- Files: describe the content

Show before/after for each renamed thing and explain your reasoning.
```

### Flatten Nested Code
```
This code is too nested — the "pyramid of doom":
[paste code]

Flatten it using:
- Early returns / guard clauses
- Extracted functions for nested blocks
- Promise chaining or async/await if async

The goal: the happy path should be obvious. Edge cases should be guards at the top.
```

### Improve Error Handling
```
The error handling in this code is weak:
[paste code]

Improve it:
1. Every error case should be explicit, not caught by a blanket catch
2. Errors should have meaningful messages with context
3. Errors should propagate correctly — don't swallow them
4. The caller should be able to handle errors specifically, not generically

Create or use a consistent error type if one doesn't exist.
```

---

## Refactor Safety Net

Before any refactor, ask M2.5:
```
Before we refactor [code/module]:
1. What is the external contract (public API) that must not change?
2. What are the side effects that must be preserved?
3. What edge cases does the current code handle (even if poorly)?
4. What tests exist, or what test cases should we keep in mind?

Identify the safe refactor boundary.
```