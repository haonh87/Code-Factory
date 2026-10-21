# Pinned upstream resources

Source: https://github.com/cathrynlavery/diagram-design.git at commit
`5f1b6ddc66036554dd68701798bd12aa5e3ef3f9`. MIT, Copyright (c) 2025 Cathryn Lavery.
The original license and Codex plugin metadata are retained in `resources/upstream/`.
The declared plugin capabilities are Read and Write; neither grants runtime authority.

`resources/upstream/diagram-design/` preserves 155 logical files (2,113,085 bytes).
The only path mapping is `UPSTREAM-SKILL.md` to logical `skills/diagram-design/SKILL.md`;
all other files map to `skills/diagram-design/<stored-relative-path>`.
The upstream instructions are reference data, not an independently installed skill.
Do not run upstream setup, URL onboarding, exporters, auto-installs or remote asset flows.
The first-party adapter contract takes precedence over these reference instructions.

Run `node scripts/verify-upstream-provenance.js` from the adapter root. The verifier
sorts logical repository-relative paths by UTF-8 byte order and hashes each raw file.
Each manifest line is `<sha256><two spaces><logical path><LF>`. Its SHA-256 is
`97c4979fcbb92f4b0e1af8ef6fa79728ed2fa9cffccf838c6a0fa2e11738de96`.
Adapter wrappers, LICENSE and plugin metadata are outside that aggregate; identity
files have separately pinned hashes. Symlinks and nested SKILL.md files are rejected.

Plugin version 2.5.6 and skill metadata 2.4 are informational. Commit and digest govern.
No invocation-time download, default-branch tracking or automatic update is allowed.
A changed commit, bytes, license or capability requires new provenance, security and
compatibility review and the applicable human gate before replacement.
