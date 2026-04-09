# Java

Dùng reference này khi thay đổi chạm Java service, library hoặc ứng dụng chạy bằng Gradle hoặc Maven.

## Thứ Tự Ưu Tiên

1. Build-tool wrapper
- Gradle: ưu tiên `./gradlew check` hoặc task verify của project.
- Maven: ưu tiên `./mvnw test`, `./mvnw verify` hoặc lifecycle tương đương của project.

2. Static analysis
- Ưu tiên wrapper hoặc plugin đã có trong project thay vì tự suy diễn tool rời.

3. Security scan
- Ưu tiên `semgrep`.

4. Performance heuristic
- Rà N+1 ORM, object churn, collection scan lớn, blocking I/O trên request path, transaction scope quá rộng, serialization hoặc mapping lặp.

## Heuristic Bắt Buộc Khi Scope Spring hoặc ORM

- Repository call trong loop.
- Lazy loading gây query ngoài ý muốn.
- Transaction boundary không khớp với use case.
- Validation, auth hoặc exception mapping có làm lộ behavior không mong muốn.

## Fallback

- Nếu project không có wrapper hoặc môi trường không chạy được full check, ghi rõ build tool nào thiếu và phần nào chỉ được rà ở mức heuristic.
- Không coi compile pass là đã cover static analysis.
