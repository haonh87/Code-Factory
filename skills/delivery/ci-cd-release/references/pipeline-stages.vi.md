---
language: vi
---

# Pipeline Stages

> English: pipeline-stages.md

## Tầng Chính

- `pre-merge`: lint, test, static analysis, build hoặc type check đủ để chặn lỗi sớm.
- `build-publish`: build artifact, image hoặc package và publish lên registry/repository.
- `pre-release`: verify artifact, policy gate, security hoặc approval cần thiết trước promote.
- `post-deploy`: smoke, health, log, metric hoặc business check ngắn hạn.

## Tool Mapping

- GitHub Actions: workflow theo event, reusable workflow cho build/release khi cần.
- GitLab CI: stage/job với environment và protected branch/tag control.
- Jenkins: pipeline script hoặc shared library, chú ý credential management.
- Azure DevOps: pipeline + environment approval + release control.

## Rule Chung

- Dùng cache có chủ đích; không cache thứ làm sai artifact reproducibility.
- Giữ artifact publish tách khỏi deploy step nếu team cần promote cùng artifact giữa môi trường.
- Nếu pipeline sửa file runtime artifact, phải chỉ rõ ownership và versioning.
