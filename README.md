# AI Agent Ops

Repository nÃ y lÆ°u trá»¯ policy, workflow, skill vÃ  adapter cÃ i Ä‘áº·t cho cÃ¡c tÃ¡c vá»¥ AI agent. Hiá»‡n táº¡i repo Æ°u tiÃªn Codex, nhÆ°ng cáº¥u trÃºc Ä‘Ã£ Ä‘Æ°á»£c chia Ä‘á»ƒ sau nÃ y má»Ÿ rá»™ng thÃªm tool hoáº·c agent khÃ¡c.

## TÃ i Liá»‡u Äá»‹nh HÆ°á»›ng

Nguá»“n sá»± tháº­t Ä‘á»ƒ lÆ°u vÃ  phá»¥c há»“i ngá»¯ cáº£nh dá»± Ã¡n lÃ  `memory-bank/`.

Báº¯t Ä‘áº§u tá»« [`memory-bank/projectbrief.md`](memory-bank/projectbrief.md), sau Ä‘Ã³ Ä‘á»c láº§n lÆ°á»£t cÃ¡c file core cÃ²n láº¡i trong `memory-bank/`.

## Quy Æ¯á»›c TÃªn File Workflow Artifact

TÃªn file workflow khÃ´ng Ä‘áº·t theo cÃ¡ch hiá»ƒu cÃ¡ nhÃ¢n nhÆ° `requirements`, `architecture`, `assessment`, `threshold`, `glossary`.

- CÃ´ng thá»©c chuáº©n: `<work_item_slug>.sNN.<step-slug>.<ext>`
- Danh sÃ¡ch tÃªn file chuáº©n theo tá»«ng step: xem [`policies/codex/workflow-artifact-naming.md`](policies/codex/workflow-artifact-naming.md)
- Naming Ä‘áº§y Ä‘á»§, frontmatter vÃ  block schema theo step: xem [`skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](skills/orchestration/codex-workflow-chain/references/workflow-chain.md)
- Validator: `powershell -File scripts/validate-workflow-artifact-names.ps1 -WorkflowRoot <workflow-artifact-dir>`

## ThÃ nh Pháº§n Trong Repository

- `policies/codex/AGENTS.global.md`: chÃ­nh sÃ¡ch workflow toÃ n cá»¥c cho Codex.
- `skills/orchestration/`: skill Ä‘iá»u phá»‘i workflow tá»•ng.
- `skills/analysis/`: skill phÃ¢n tÃ­ch yÃªu cáº§u, product thinking vÃ  technical approach.
- `skills/architecture/`: skill kiáº¿n trÃºc domain vÃ  thiáº¿t káº¿ dá»¯ liá»‡u.
- `skills/delivery/`: skill chia task, implement, testing, DevOps packaging/deploy vÃ  review thay Ä‘á»•i dá»¯ liá»‡u/code.
- `skills/guardrails/`: skill contract, readiness, audit vÃ  gate DoR/DoD Ä‘á»ƒ khÃ³a cháº¥t lÆ°á»£ng.
- `skills/obsidian/`: skill soáº¡n tháº£o artifact theo há»‡ Obsidian nhÆ° note Markdown, Bases vÃ  JSON Canvas.
- `skills/notebooklm/`: skill tÃ­ch há»£p NotebookLM qua CLI/MCP cho cÃ¡c tÃ¡c vá»¥ research-heavy hoáº·c corpus lá»›n.
- `mcp/github-push/`: MCP server Node Ä‘á»ƒ inspect repository, táº¡o repo GitHub, commit, cáº¥u hÃ¬nh remote vÃ  push branch hiá»‡n táº¡i.
- `adapters/codex/install-codex-workflow.ps1`: script cÃ i Ä‘áº·t cho Windows.
- `adapters/codex/install-codex-global.cmd`: launcher Windows Ä‘á»ƒ cÃ i global nhanh.
- `adapters/codex/install-codex-workflow.sh`: script cÃ i Ä‘áº·t cho Linux/macOS.
- `adapters/mcp/install-github-push.ps1`: script cài dependency và đăng ký MCP GitHub Push vào `~/.codex/config.toml` trên Windows.
- `adapters/mcp/install-github-push.sh`: script cài dependency và đăng ký MCP GitHub Push vào `~/.codex/config.toml` trên Linux/macOS.

## MCP Hiá»‡n CÃ³

- `github-push`: MCP server starter Ä‘á»ƒ há»— trá»£ luá»“ng `inspect -> commit -> create repo -> configure remote -> push` cho GitHub báº±ng `git` vÃ  GitHub REST API.

Xem chi tiáº¿t táº¡i [`mcp/github-push/README.md`](mcp/github-push/README.md).

## Kháº£ NÄƒng DevOps Theo MÃ´i TrÆ°á»ng

- `local`: chuáº©n Ä‘Ã³ng gÃ³i báº±ng `Dockerfile` vÃ  `compose.yaml`.
- `dev`, `uat`, `prod`: workflow hiá»‡n cÃ³ thá»ƒ khÃ³a runtime target theo `docker`, `docker swarm` hoáº·c `k8s`.
- CÃ¹ng má»™t image contract nÃªn Ä‘Æ°á»£c promote giá»¯a cÃ¡c mÃ´i trÆ°á»ng; khÃ¡c biá»‡t nÃªn náº±m á»Ÿ config/secrets vÃ  rollout strategy.
- `deployment-devops` lÃ  skill umbrella Ä‘á»ƒ Ä‘iá»u phá»‘i DevOps tá»•ng tá»« `local` tá»›i `prod`.
- `containerization-packaging` khÃ³a `Dockerfile`, `.dockerignore`, `compose.yaml` vÃ  packaging pattern theo ngÃ´n ngá»¯ hoáº·c workload.
- `platform-runtime-deployment` vÃ  `ci-cd-release` láº§n lÆ°á»£t khÃ³a runtime deploy vÃ  pipeline hoáº·c promotion hoáº·c approval cho `dev`, `uat`, `prod`.

## Obsidian Skills Hiá»‡n CÃ³

Bá»™ skill nÃ y Ä‘Æ°á»£c vendor tá»« `kepano/obsidian-skills`, hiá»‡n láº¥y vÃ o repo 3 skill phá»¥c vá»¥ authoring artifact:

- `obsidian-markdown`: táº¡o vÃ  chá»‰nh sá»­a Obsidian Flavored Markdown (`.md`).
- `obsidian-bases`: táº¡o vÃ  chá»‰nh sá»­a Obsidian Bases (`.base`).
- `json-canvas`: táº¡o vÃ  chá»‰nh sá»­a JSON Canvas (`.canvas`).

Ghi chÃº:
- ChÆ°a bundle `obsidian-cli` trong vÃ²ng nÃ y.
- Script cÃ i Ä‘áº·t hiá»‡n táº¡i tá»± Ä‘á»“ng bá»™ toÃ n bá»™ thÆ° má»¥c `skills/` theo Ä‘á»‡ quy vÃ o `~/.codex/skills/<skill-name>`, nÃªn khÃ´ng cáº§n thÃªm bÆ°á»›c cÃ i Ä‘áº·t riÃªng cho nhÃ³m skill nÃ y.

## ÄÆ°a LÃªn GitHub

1. Táº¡o repository má»›i trÃªn GitHub.
2. Äáº©y thÆ° má»¥c nÃ y lÃªn repository:

```bash
git init
git add .
git commit -m "init ai agent ops"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## CÃ i Äáº·t TrÃªn MÃ¡y Windows

```powershell
git clone <your-github-repo-url> $env:USERPROFILE\codex-workflow-pack
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-pack\adapters\codex\install-codex-workflow.ps1"
```

Hoáº·c dÃ¹ng launcher Windows:

```cmd
%USERPROFILE%\codex-workflow-pack\adapters\codex\install-codex-global.cmd
```

Launcher nÃ y lÃ  cÃ¡ch cÃ i khuyáº¿n nghá»‹ náº¿u muá»‘n toÃ n bá»™ project trÃªn mÃ¡y Windows Ä‘á»u nháº­n workflow pack:
- Ä‘á»“ng bá»™ policy global vÃ o `%USERPROFILE%\.codex`
- Ä‘á»“ng bá»™ toÃ n bá»™ skill vÃ o `%USERPROFILE%\.codex\skills`
- táº¡o `AGENTS.md` á»Ÿ root cÃ¡c á»• Ä‘Ä©a filesystem Ä‘á»ƒ má»i project náº±m dÆ°á»›i cÃ¡c á»• Ä‘Ã³ Ä‘á»u nháº­n workflow

Náº¿u muá»‘n workflow Ã¡p dá»¥ng cho toÃ n bá»™ thÆ° má»¥c trÃªn mÃ¡y Windows, táº¡o `AGENTS.md` á»Ÿ root táº¥t cáº£ á»• Ä‘Ä©a filesystem:

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-pack\adapters\codex\install-codex-workflow.ps1" -CreateDriveRootLinks
```

Ghi chÃº:
- Skill trong `%USERPROFILE%\.codex\skills` lÃ  global cho má»i session Codex.
- `AGENTS.md` chá»‰ dÃ¹ng Ä‘á»ƒ Ã¡p policy workflow cho project; path tham chiáº¿u bÃªn trong skill pháº£i khá»›p layout cÃ i trong `%USERPROFILE%\.codex\skills`.
- `AGENTS.md` á»Ÿ root má»—i á»• Ä‘Ä©a giÃºp policy workflow Ã¡p dá»¥ng cho má»i project náº±m dÆ°á»›i á»• Ä‘Ã³.
- Script sáº½ tá»± quÃ©t cÃ¡c á»• Ä‘Ä©a filesystem thay vÃ¬ cá»‘ Ä‘á»‹nh `C`, `D`, `E`.
- Náº¿u mÃ¡y khÃ´ng cho táº¡o symlink, script sáº½ thá»­ copy `AGENTS.md` thay tháº¿.
- Náº¿u má»™t á»• Ä‘Ã£ cÃ³ `AGENTS.md`, script sáº½ giá»¯ nguyÃªn vÃ  bá» qua á»• Ä‘Ã³.

## Giáº£i NghÄ©a Nhanh Cho CÃ i Global

MÃ´ hÃ¬nh cÃ i global cá»§a gÃ³i nÃ y cÃ³ 2 lá»›p khÃ¡c nhau:

- Lá»›p policy: `AGENTS.md` á»Ÿ root á»• Ä‘Ä©a hoáº·c thÆ° má»¥c project Ä‘á»ƒ Codex biáº¿t pháº£i Ã¡p workflow nÃ o khi lÃ m viá»‡c trong vÃ¹ng Ä‘Ã³.
- Lá»›p skill: cÃ¡c thÆ° má»¥c skill Ä‘Æ°á»£c cÃ i vÃ o `%USERPROFILE%\.codex\skills\<skill-name>` Ä‘á»ƒ má»i session Codex Ä‘á»u cÃ³ thá»ƒ gá»i.

Äiá»ƒm quan trá»ng:

- `AGENTS.md` khÃ´ng chá»©a toÃ n bá»™ ná»™i dung skill; nÃ³ chá»‰ lÃ  Ä‘iá»ƒm kÃ­ch hoáº¡t policy workflow.
- Skill path Ä‘Æ°á»£c resolve tá»« thÆ° má»¥c skill Ä‘Ã£ cÃ i trong `%USERPROFILE%\.codex\skills`, khÃ´ng resolve tá»« vá»‹ trÃ­ cá»§a `AGENTS.md`.
- VÃ¬ installer hiá»‡n cÃ i theo dáº¡ng pháº³ng `~/.codex/skills/<skill-name>`, má»i tham chiáº¿u chÃ©o giá»¯a skill pháº£i khá»›p vá»›i layout pháº³ng nÃ y.

VÃ­ dá»¥:

- `step-goal-auditor` sáº½ Ä‘Æ°á»£c cÃ i vÃ o `%USERPROFILE%\.codex\skills\step-goal-auditor`
- `codex-workflow-chain` sáº½ Ä‘Æ°á»£c cÃ i vÃ o `%USERPROFILE%\.codex\skills\codex-workflow-chain`
- Tá»« Ä‘Ã³, path tham chiáº¿u Ä‘Ãºng tá»« `step-goal-auditor` sang tÃ i liá»‡u workflow chain lÃ  `../codex-workflow-chain/references/workflow-chain.md`

## CÃ i Äáº·t TrÃªn Linux/macOS

```bash
git clone <your-github-repo-url> ~/codex-workflow-pack
bash ~/codex-workflow-pack/adapters/codex/install-codex-workflow.sh
```

## Cáº­p Nháº­t TrÃªn MÃ¡y ÄÃ£ CÃ i

```bash
cd <repo-local-path>
git pull
```

Sau Ä‘Ã³ cháº¡y láº¡i script cÃ i Ä‘áº·t Ä‘á»ƒ Ä‘á»“ng bá»™ toÃ n bá»™ skill má»›i nháº¥t vÃ o `~/.codex/skills`.
TrÃªn Windows, náº¿u muá»‘n Ä‘á»“ng bá»™ vÃ  cÃ i global nhanh, cháº¡y láº¡i `adapters\codex\install-codex-global.cmd`.
TrÃªn Linux/macOS, náº¿u chá»‰ muá»‘n cáº­p nháº­t policy vÃ  skill má»›i vÃ o Codex global Ä‘Ã£ cÃ i sáºµn, cháº¡y `bash adapters/codex/update-codex-workflow.sh`.

Ghi chÃº:
- Script update `.sh` Ä‘á»“ng bá»™ `~/.codex/AGENTS.global.md` vÃ  `~/.codex/skills`.
- Náº¿u mÃ¡y Ä‘ang dÃ¹ng `AGENTS.md` root-level theo kiá»ƒu file copy thay vÃ¬ symlink, cáº§n copy láº¡i `AGENTS.md` Ä‘Ã³ hoáº·c cháº¡y láº¡i full install flow.

## Quy Æ¯á»›c Má»Ÿ Rá»™ng

- ThÃªm policy má»›i theo tool táº¡i `policies/<tool>/`.
- ThÃªm adapter cÃ i Ä‘áº·t hoáº·c bootstrap theo tool táº¡i `adapters/<tool>/`.
- ThÃªm skill má»›i vÃ o Ä‘Ãºng nhÃ³m trong `skills/` Ä‘á»ƒ trÃ¡nh repo thÃ nh má»™t thÆ° má»¥c pháº³ng khÃ³ quáº£n lÃ½.
- Chá»‰ tÃ¡ch thÃªm nhÃ³m skill má»›i khi sá»‘ lÆ°á»£ng skill trong má»™t nhÃ³m hiá»‡n táº¡i báº¯t Ä‘áº§u quÃ¡ lá»›n hoáº·c khÃ¡c háº³n vá» má»¥c tiÃªu sá»­ dá»¥ng.

Ghi chÃº váº­n hÃ nh:

- Cáº¥u trÃºc nhÃ³m trong repo chá»‰ phá»¥c vá»¥ quáº£n trá»‹ nguá»“n vÃ  Ä‘á»c hiá»ƒu.
- Layout runtime sau khi cÃ i global cho Codex hiá»‡n lÃ  flat theo `skill-name`.
- Khi thÃªm skill má»›i, nÃªn kiá»ƒm tra tÃªn skill lÃ  duy nháº¥t á»Ÿ má»©c toÃ n repo Ä‘á»ƒ trÃ¡nh ghi Ä‘Ã¨ lÃºc cÃ i global.


