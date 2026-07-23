---
language: en
---

# Worked Example

> Vietnamese: example.vi.md

Original request:
- "Add a feature that lets users log in to the system."

Expected artifact:

```yaml
raw_request: "Add a feature that lets users log in to the system."
restated_request: "Allow users to log in with valid credentials to access the system."
request_type: FEATURE
business_context: "Users need to authenticate before using personalization features."
scope_in:
  - "Successful and failed login flows"
  - "Error messaging when credentials are incorrect"
scope_out:
  - "Social login"
  - "Password recovery"
open_questions:
  - "Use session or JWT?"
  - "Is account lockout required after repeated failed attempts?"
assumptions:
  - "The system already has a user table and a safe password storage mechanism"
dependencies:
  - "Existing user service"
risks_initial:
  - "No security policy for rate limiting and lockout"
acceptance_criteria_draft:
  - id: AC1
    description: "User logs in successfully when providing valid credentials"
    measurable: true
  - id: AC2
    description: "User receives an appropriate error message when providing invalid credentials"
    measurable: true
notes_for_next_step: "Need to pin down the technical approach for session/JWT and the security policy."
```
