---
language: vi
---

# Frontend Canonical Pattern

> English: module-first-pattern.md

Chỉ áp dụng reference này khi `frontend_style = MODULE_FIRST` hoặc `MODULE_FIRST_WITH_FLOWS`. Nếu chọn `MICRO_FRONTEND`, bỏ qua hoàn toàn file này.

## 1. Source Code Shape Chuẩn

Mặc định đề xuất:

```text
src/
  app/
    router/
    providers/
    layouts/
    guards/
  modules/
    <module-name>/
      public.ts
      api/
      model/
      ui/
      pages/
      lib/
      tests/
  flows/
    <flow-name>/
      public.ts
      model/
      ui/
      tests/
  shared/
    ui/
    lib/
    config/
    assets/
    types/
```

Trong đó:

- `app/` chứa bootstrap, router registration, provider và app shell; không chứa business rule của từng module.
- `modules/<module-name>/` là boundary chính của feature hoặc vùng nghiệp vụ trên frontend.
- `public.ts` là public entry duy nhất để module hoặc flow khác import.
- `api/` chứa query, mutation, mapper request hoặc response và helper giao tiếp server.
- `model/` chứa client state, selector, schema, validation, view-model và business rule phía client.
- `ui/` chứa component mang meaning nghiệp vụ của module hoặc flow.
- `pages/` chứa page hoặc route entry mà module sở hữu.
- `lib/` chứa helper nội bộ của module; không tự động là vùng dùng chung toàn hệ thống.
- `flows/` chỉ dùng khi một user journey ghép nhiều module và cần orchestration layer riêng.
- `shared/` chỉ chứa primitive kỹ thuật, UI generic, config và type trung tính domain.

## 2. Dependency Rule Chuẩn

Phụ thuộc hợp lệ:

- `app -> modules/public`
- `app -> flows/public`
- `flows -> modules/public`
- `modules -> shared`
- `flows -> shared`
- `modules/ui|pages -> modules/model|api|lib`

Phụ thuộc bị cấm:

- `module A -> internal file` của `module B` mà không đi qua `public.ts`
- `shared -> modules` hoặc `shared -> flows`
- `app -> internal file` của bất kỳ module nào
- `flow -> internal file` của module khác ngoài public contract
- Global store chứa state của nhiều module chỉ vì tiện

## 3. Ownership Rule Chuẩn

- Mỗi route business chính phải có đúng một `owner_module` hoặc `owner_flow`.
- Mỗi vùng state business chính phải có đúng một `owner_module`.
- `flow` chỉ được sở hữu state điều phối ngắn hạn của user journey; không được trở thành `source of truth` lâu dài của domain.
- `app/` chỉ sở hữu state và concern toàn ứng dụng như auth bootstrap, theme, locale hoặc session shell nếu thực sự dùng chung.

## 4. Public Contract Rule Chuẩn

- Module hoặc flow khác chỉ được dùng những gì được expose qua `public.ts`.
- Không expose internal component, internal hook hoặc internal selector nếu chưa cần là contract công khai.
- Nếu một module cần đọc dữ liệu từ module khác, ưu tiên query contract, selector contract hoặc read model được expose rõ.
- Nếu một module cần ghi hoặc trigger side effect ở module khác, đi qua action, use case client-side hoặc mutation contract được expose rõ.

## 5. Shared Rule Chuẩn

- `shared/ui` chỉ chứa component generic, không gắn business wording hoặc workflow đặc thù.
- `shared/lib` chỉ chứa utility trung tính domain.
- `shared/config`, `shared/types`, `shared/assets` chỉ chứa nội dung dùng chung thật sự.
- Không đẩy component, hook, validation hoặc state vào `shared` chỉ vì đang có từ hai nơi dùng tạm thời.
