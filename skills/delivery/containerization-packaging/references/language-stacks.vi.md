---
language: vi
---

# Packaging Theo Language Stack

> English: language-stacks.md

## Node.js

- Ưu tiên multi-stage khi có bước build TypeScript, Next.js, NestJS, Vite hoặc bundler.
- Dùng lock file nhất quán với package manager thật (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`).
- Tách `npm ci` hoặc tương đương khỏi bước copy source để tận dụng cache.
- Với app build ra thư mục `dist` hoặc `.next`, runtime stage chỉ copy artifact cần thiết.
- Nếu dùng Prisma, native module hoặc node-gyp, chú ý khác biệt giữa build image và runtime image.

## Python

- Chốt rõ dùng `pip`, `poetry`, `pipenv` hay `uv`.
- Nếu có build wheel hoặc dependency native, tách stage build và runtime.
- Với web API, chốt server thật như `gunicorn`, `uvicorn`, `hypercorn`.
- Với worker hoặc cron, command runtime thường khác web entrypoint; không ép chung một entrypoint nếu không phù hợp.

## Java

- Tách stage build (`maven` hoặc `gradle`) khỏi runtime JRE/JDK tối thiểu.
- Chốt rõ artifact là `jar`, `war` hay native image.
- Nếu app cần tuning JVM, ghi rõ qua env hoặc command, không hard-code mơ hồ.
- Với Spring Boot fat jar, runtime stage thường chỉ cần artifact cuối và JRE.

## .NET

- Dùng stage `sdk` để publish và stage `aspnet` hoặc runtime phù hợp để chạy.
- Chốt target framework và artifact `publish`.
- Nếu có nhiều project trong solution, copy csproj trước để tận dụng restore cache.

## Go

- Thường phù hợp multi-stage với binary build ở stage đầu và image tối thiểu ở stage sau.
- Chốt rõ có cần CGO hay không.
- Nếu binary tĩnh đủ điều kiện, runtime stage có thể rất nhỏ.

## PHP

- Chốt rõ runtime là `php-fpm`, Apache hay CLI worker.
- Nếu dùng Composer, tách stage install dependency và runtime.
