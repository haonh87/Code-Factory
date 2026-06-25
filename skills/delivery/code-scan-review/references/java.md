---
language: en
---

# Java

> Vietnamese: java.vi.md

Use this reference when the change touches a Java service, library, or an app running on Gradle or Maven.

## Priority Order

1. Build-tool wrapper
- Gradle: prefer `./gradlew check` or the project's verify task.
- Maven: prefer `./mvnw test`, `./mvnw verify`, or the project's equivalent lifecycle.

2. Static analysis
- Prefer an existing wrapper or plugin in the project instead of inferring loose tools.

3. Security scan
- Prefer `semgrep`.

4. Performance heuristic
- Review ORM N+1, object churn, large collection scans, blocking I/O on the request path, overly wide transaction scope, and repeated serialization or mapping.

## Mandatory Heuristics When Scope Is Spring Or ORM

- Repository calls inside loops.
- Lazy loading causing unintended queries.
- Transaction boundaries not matching the use case.
- Validation, auth, or exception mapping exposing unwanted behavior.

## Fallback

- If the project has no wrapper or the environment cannot run a full check, record clearly which build tool is missing and which parts were only reviewed at the heuristic level.
- Do not treat a compile pass as having covered static analysis.