---
language: vi
---

# TypeScript/JavaScript

> English: typescript-javascript.md

Dùng reference này khi thay đổi chạm TypeScript, JavaScript, Node.js, frontend bundle hoặc script automation JS/TS.

## Thứ Tự Ưu Tiên

1. Syntax hoặc type
- TypeScript: ưu tiên `tsc --noEmit` hoặc script project tương đương.
- JavaScript thuần: dùng `node --check` cho file hoặc entry phù hợp nếu project không có typecheck.

2. Static analysis
- Ưu tiên `eslint` qua script project nếu có.
- Nếu repo có nhiều package, chạy đúng workspace hoặc package bị tác động thay vì lint toàn monorepo vô điều kiện.

3. Security scan
- Ưu tiên `semgrep`.
- Dependency audit là track riêng; không tự trộn vào skill này trừ khi thay đổi chạm dependency hoặc policy project yêu cầu.

4. Performance heuristic
- Rà render loop nặng, object clone lớn, network call lặp, synchronous I/O trên hot path, serialize hoặc parse dữ liệu lớn, cache miss do scope state sai.

## Heuristic Bắt Buộc Khi Scope Frontend

- React hoặc Next.js: render churn, effect phụ thuộc sai, state đặt quá cao, list rendering thiếu key ổn định.
- Client bundle: import nặng trong path nóng, library lớn bị kéo vào client không cần thiết.
- Form hoặc API call: debounce thiếu, retry gây bão request, race condition khi update state.

## Fallback

- Nếu không có `eslint`, vẫn chạy typecheck hoặc syntax check phù hợp và ghi rõ lỗ hổng verify còn lại.
- Không coi build pass là bằng chứng đã cover lint hoặc static analysis.
