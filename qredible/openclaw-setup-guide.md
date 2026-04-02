# OpenClaw Setup Guide for Qredible
### VPS · AI Agent · Workflow Integration
*A complete setup guide for getting an AI coding and workflow agent running on a VPS, connected to your tools, and optimized for engineering and product work.*

---

## Overview

OpenClaw is a self-hosted AI agent gateway. It runs on your VPS 24/7, connects to your tools (Slack, Jira, Fathom, GitHub), and gives you a persistent AI assistant that remembers context across sessions, can write code, create tickets, review PRs, and assist with any workflow task — all from within Slack.

This guide assumes you're starting from scratch on a fresh VPS (Ubuntu 22.04+ recommended).

---

## Part 1: VPS Prerequisites

### 1.1 Recommended VPS Specs

| Tier | RAM | CPU | Storage | Use Case |
|------|-----|-----|---------|----------|
| Minimum | 2GB | 2 vCPU | 40GB SSD | Light usage, no sandbox |
| Recommended | 4GB | 2 vCPU | 80GB SSD | Full setup with Docker sandbox |
| Comfortable | 8GB | 4 vCPU | 160GB SSD | Heavy coding workloads |

Good providers: **DigitalOcean**, **Hetzner**, **Vultr**, **Linode**. Hetzner offers the best value (4GB RAM / 2 vCPU from ~€5/mo).

### 1.2 Initial Server Setup

Connect to your VPS as root, then:

```bash
# Create a non-root user
adduser yourname
usermod -aG sudo yourname

# Switch to your user for everything else
su - yourname
```

### 1.3 Install Node.js 22.x (Required)

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Should be 22.12.0+
```

### 1.4 Install Docker (Required for Sandbox)

```bash
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker

# Add your user to the docker group
sudo usermod -aG docker $USER

# IMPORTANT: Full stop/start required (not just restart) after adding to docker group
# Log out and back in, or run:
newgrp docker
docker info > /dev/null 2>&1 && echo "Docker OK"
```

---

## Part 2: Security Hardening

Do this before anything else.

### 2.1 UFW Firewall

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw enable
sudo ufw status verbose
```

You want to see `Default: deny (incoming)`.

### 2.2 SSH Key Authentication (Recommended)

From your local machine:

```bash
ssh-keygen -t ed25519 -C "your-email"
ssh-copy-id yourname@your-vps-ip
```

Then disable password auth on the server:

```bash
sudo nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no
sudo systemctl restart sshd
```

### 2.3 OpenClaw File Permissions

After install (Section 3), run:

```bash
chmod 700 ~/.openclaw
chmod 600 ~/.openclaw/openclaw.json
```

### 2.4 Disable mDNS/Bonjour

Add to `~/.bashrc`:

```bash
export OPENCLAW_DISABLE_BONJOUR=1
```

Then: `source ~/.bashrc`

---

## Part 3: OpenClaw Installation

### 3.1 Install

```bash
npm install -g openclaw
```

### 3.2 Configure

```bash
openclaw configure
```

The wizard will ask for:
- **Model provider** — see Section 4 for recommendations
- **Gateway auth token** — create a strong random string (this secures your gateway)
- **Messaging platform token** — your Slack bot token (see Section 7)

### 3.3 Start the Gateway

```bash
openclaw gateway start
openclaw gateway status
```

The gateway runs as a systemd service — it will survive reboots automatically.

---

## Part 4: Model Provider — Recommendations

### 4.1 Recommended: Anthropic Claude (Claude Max Plan)

**Claude Max** is the recommended setup. It gives you access to Claude Sonnet and Claude Opus with higher rate limits and uses an **OAuth token** (not an API key) — meaning your usage is billed against your subscription rather than per-token.

**Why Claude over ChatGPT for this use case:**
- Better at long-context work (codebases, long tickets, full codebase context)
- Better instruction following for multi-step agent tasks
- Claude Sonnet 4 is the sweet spot: fast, very capable, good for coding
- OAuth token setup means predictable monthly cost instead of metered billing

**Setup:**
1. Subscribe to [Claude Max](https://claude.ai) (Pro plan or above)
2. In the Claude settings, generate an **OAuth token** (under API settings)
3. During `openclaw configure`, select `anthropic` as provider and paste the token

**Recommended model:** `anthropic/claude-sonnet-4-6` (default) — use Opus for complex reasoning tasks via `/model` command.

---

### 4.2 Alternative: OpenAI / ChatGPT

If you prefer to use your existing ChatGPT account or OpenAI API:

1. Go to [platform.openai.com](https://platform.openai.com)
2. Generate an API key under Settings → API Keys
3. During `openclaw configure`, select `openai` as provider
4. **Recommended model:** `gpt-4o` or `o3-mini` for coding tasks

> **Note:** OpenAI is billed per-token at the API level. A heavy day of coding agent work can run $5-20. Claude Max subscription pricing is more predictable for daily use.

---

## Part 5: Gateway Configuration

All config via `openclaw config set <key> <value>` or by editing `~/.openclaw/openclaw.json`.

### 5.1 Memory System (CRITICAL — Do First)

The memory system is **off by default**. Without it, the agent forgets everything between sessions. This is the most important configuration change.

```bash
openclaw config set agents.defaults.memorySearch.enabled true
openclaw config set agents.defaults.memorySearch.provider local
openclaw config set agents.defaults.memorySearch.sources '["memory","sessions"]'
openclaw config set agents.defaults.memorySearch.store.vector.enabled true
openclaw config set agents.defaults.memorySearch.sync.watch true
openclaw config set agents.defaults.memorySearch.query.hybrid.enabled true
openclaw config set agents.defaults.memorySearch.experimental.sessionMemory true
openclaw config set agents.defaults.compaction.memoryFlush.enabled true
```

Restart after:
```bash
openclaw gateway restart
```

### 5.2 Sandbox Isolation

Runs Slack/external sessions in Docker containers — isolates the agent from your host system and prevents prompt injection from external users.

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "non-main",
        "docker": {
          "network": "bridge"
        }
      }
    }
  }
}
```

> `"bridge"` allows outbound HTTP (web search, fetch URLs). Use `"none"` for maximum isolation if you don't need internet access from the agent.

Apply via:
```bash
openclaw config patch '{"agents":{"defaults":{"sandbox":{"mode":"non-main","docker":{"network":"bridge"}}}}}'
openclaw sandbox recreate --all --force
```

### 5.3 Sandbox Tool Policy

Enables all built-in tools (web search, web fetch, etc.) inside sandboxed sessions:

```bash
openclaw config set tools.sandbox.tools.allow '["group:openclaw"]'
openclaw sandbox recreate --all --force
```

### 5.4 Cross-Session Visibility (Useful for Multi-Channel Work)

Allows the agent to read history from other sessions (e.g., main session reading a Slack channel's history):

```bash
openclaw config set tools.sessions.visibility all
openclaw config set tools.agentToAgent.enabled true
openclaw gateway restart
```

### 5.5 Exec Security (Shell Command Approval)

Controls which shell commands can run without approval:

```bash
openclaw config set tools.exec.security allowlist
openclaw config set tools.exec.ask on-miss
```

Then configure your allowlist in `~/.openclaw/exec-approvals.json`:

```json
{
  "allowlist": ["git", "gh", "npm", "node", "ls", "find", "cat", "grep", "jq", "curl"]
}
```

### 5.6 Diagnostics

```bash
openclaw config set diagnostics.enabled true
```

---

## Part 6: Workspace Files

These live in `~/.openclaw/workspace/` and are injected into every agent session. Set them up on first run.

### 6.1 IDENTITY.md — Who the agent is

```markdown
# IDENTITY.md

- **Name:** (pick a name — e.g., "Claw" or your own choice)
- **Creature:** AI assistant
- **Vibe:** Direct, resourceful, no fluff. Strong at systems and code.
- **Emoji:** 🦾
```

### 6.2 USER.md — Who you are

```markdown
# USER.md

- **Name:** [Your Name]
- **What to call them:** [Your Name or Nickname]
- **Timezone:** America/New_York (or wherever you are)
- **Slack username:** [your-slack-handle]

## Context
[Your role, what you're building, how you work]
```

### 6.3 TOOLS.md — Your setup specifics

```markdown
# TOOLS.md

## Jira
- Base URL: https://qredible.atlassian.net
- Email: [your-jira-email]
- API Token: [your-jira-token]
- Project key: QP

## GitHub
- Account: [your-github-username]
- Repos: rtq-admin-ui, rtq-admin-api, middleware

## Fathom
- API Key: [your-fathom-key]
- Base URL: https://api.fathom.ai/external/v1

## Slack
- Workspace: Qredible
- Channel IDs: (add as you use them)
```

### 6.4 SOUL.md — Agent persona and values

Write a brief description of how you want the agent to behave:

```markdown
# SOUL.md

You're an AI embedded in the Qredible engineering team. You help with:
- Writing and reviewing Jira tickets
- Building HTML/React mockups
- Code review and implementation
- System design and architecture decisions

Be direct. Lead with impact. Skip the filler.
```

### 6.5 MEMORY.md — Long-term memory

Start empty. The agent will populate this over time with decisions, context, and learnings. You can also manually add important context:

```markdown
# MEMORY.md

## Project Context
[Key decisions, architecture notes, things worth remembering long-term]
```

### 6.6 HEARTBEAT.md — Periodic checks

Configure what the agent should proactively monitor:

```markdown
# HEARTBEAT.md

## Keep empty unless you want active monitoring
# Add tasks here for periodic checks:
# - Check Slack for urgent messages
# - Check Jira for comments on your tickets
# - Check GitHub for PR review requests
```

---

## Part 7: Slack Integration

OpenClaw connects to Slack via a bot token, letting you interact with the agent directly in your Slack workspace.

### 7.1 Create a Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App** → **From scratch**
3. Name it (e.g., "Kingler" or "Claw") and select your Qredible workspace
4. Under **OAuth & Permissions**, add these Bot Token Scopes:
   - `app_mentions:read`
   - `channels:history`
   - `channels:read`
   - `chat:write`
   - `files:read`
   - `im:history`
   - `im:read`
   - `im:write`
   - `reactions:write`
   - `users:read`

5. Under **Event Subscriptions**, enable events and add:
   - `app_mention`
   - `message.channels`
   - `message.im`

   The Request URL should point to your gateway (see 7.2 below).

6. Under **App Home**, enable **Messages Tab** and check "Allow users to send Slash commands and messages from the messages tab"

7. Install the app to your workspace — copy the **Bot User OAuth Token** (starts with `xoxb-`)

### 7.2 Expose Your Gateway to Slack

Slack needs to reach your gateway via HTTPS. Options:

**Option A: Cloudflare Tunnel (Recommended — free, no port forwarding)**
```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/

# Authenticate and create a tunnel
cloudflared tunnel login
cloudflared tunnel create openclaw
cloudflared tunnel route dns openclaw your-subdomain.yourdomain.com

# Run as a service
cloudflared service install
```

**Option B: Nginx Reverse Proxy + Let's Encrypt**
```bash
sudo apt install nginx certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

Nginx config:
```nginx
location / {
    proxy_pass http://127.0.0.1:18789;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
}
```

### 7.3 Configure Slack in OpenClaw

```bash
openclaw config set channels.slack.token "xoxb-your-bot-token"
openclaw config set channels.slack.signingSecret "your-slack-signing-secret"
openclaw config set channels.slack.groupPolicy allowlist
openclaw config set channels.slack.dmPolicy allowlist
```

Configure allowed channels and users:

```json
{
  "channels": {
    "slack": {
      "groupPolicy": "allowlist",
      "dmPolicy": "allowlist",
      "allowFrom": ["YOUR_SLACK_USER_ID"],
      "workspaces": {
        "YOUR_WORKSPACE_ID": {
          "channels": {
            "YOUR_CHANNEL_ID": {
              "allow": true
            }
          }
        }
      }
    }
  }
}
```

To get IDs: In Slack, right-click a channel → **Copy link** — the ID is the part after `/archives/`.

---

## Part 8: Jira Integration

No special setup needed — the agent uses the Jira REST API directly with your credentials stored in TOOLS.md.

### 8.1 Get Your API Token

1. Go to [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Create a new token — copy it immediately

### 8.2 Add to TOOLS.md

```markdown
## Jira
- Base URL: https://qredible.atlassian.net
- Email: your-email@qredible.com
- API Token: [your-token]
- Project key: QP
- REST API base: https://qredible.atlassian.net/rest/api/3
- Auth: HTTP Basic — email + API token (Base64 encoded)
```

### 8.3 Test It

Ask the agent in Slack: *"Can you look up Jira ticket QP-3472 and summarize it?"*

If it works, you're live. The agent can:
- Read and write Jira tickets
- Create new stories with full ADF descriptions
- Update ticket status, add comments, link tickets
- Build HTML mockups and add links to Jira descriptions

---

## Part 9: Fathom Integration (Meeting Notes)

Fathom records and transcribes your meetings. The agent can pull transcripts and action items automatically.

### 9.1 Get Your API Key

1. Go to [app.fathom.video](https://app.fathom.video) → Settings → API
2. Generate an API key

### 9.2 Add to TOOLS.md

```markdown
## Fathom
- API Key: [your-key]
- Base URL: https://api.fathom.ai/external/v1
- Auth header: X-Api-Key: [key]
- Use: Read meeting transcripts, summaries, action items
```

### 9.3 What You Can Do

Ask the agent: *"What were the action items from my last meeting with Ronaldo?"*

The agent will fetch the transcript, extract action items, and can optionally create Jira tickets from them.

---

## Part 10: GitHub Integration

### 10.1 Install the `gh` CLI

```bash
curl -fsSL https://cli.github.com/packages/io.key | sudo gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list
sudo apt update && sudo apt install gh -y

# Authenticate
gh auth login
```

### 10.2 Add to Exec Allowlist

```bash
# Add 'gh' to your exec-approvals.json allowlist
```

### 10.3 What You Can Do

- Review PRs: *"Check the open PRs on rtq-admin-ui and summarize what needs review"*
- Create branches and PRs automatically during coding tasks
- Check CI status: *"Is CI passing on the latest PR?"*
- Read and comment on issues

### 10.4 Private Package Access (npm)

If you need access to private npm packages (like Qredible's internal packages):

```bash
npm config set //registry.npmjs.org/:_authToken YOUR_NPM_TOKEN
```

Or add to `~/.npmrc`:
```
//registry.npmjs.org/:_authToken=YOUR_NPM_TOKEN
```

---

## Part 11: Installing Skills

Skills extend what the agent can do. Install from [clawhub.ai](https://clawhub.ai).

### 11.1 Browse and Install

```bash
# List available skills
openclaw skills list

# Install a skill
openclaw skills install skill-name
```

### 11.2 Recommended Skills for Qredible Workflow

| Skill | What It Does |
|-------|-------------|
| `github` | PR reviews, CI status, issue management via `gh` CLI |
| `gh-issues` | Automated issue/PR workflows with subagent execution |
| `frontend-design` | High-quality React/HTML component generation |
| `superpowers` | TDD, spec-first subagent-driven development workflow |
| `weather` | Current weather via wttr.in (lightweight) |

Install the ones you want:
```bash
openclaw skills install github
openclaw skills install frontend-design
openclaw skills install superpowers
```

After installing, restart the gateway:
```bash
openclaw gateway restart
```

---

## Part 12: Memory Best Practices

The agent's memory is split across files. Understanding this makes it dramatically more useful.

### 12.1 How Memory Works

| File | Purpose | When to Write |
|------|---------|---------------|
| `MEMORY.md` | Long-term curated memory | Major decisions, architecture choices, key context |
| `memory/YYYY-MM-DD.md` | Daily raw notes | Everything that happened today |
| `TOOLS.md` | Your setup specifics | Credentials, IDs, environment details |
| `USER.md` | About you | Preferences, context, constraints |

### 12.2 What to Store in MEMORY.md

```markdown
## Architecture Decisions
- Why we chose X over Y (date + reasoning)

## Key People
- Ronaldo — CIO, reports chain: me → Ronaldo → Brian
- Brian — CEO, lead with revenue impact

## Active Projects
- Cases & Compliance Portal (QP-3472) — started [date], status...

## Patterns That Work
- When writing Jira tickets, always include mockup link + test cases
- Brian wants revenue framing first, technical second
```

### 12.3 What NOT to Store

- Secrets/tokens (use TOOLS.md with proper file permissions)
- Raw conversation transcripts (those live in session history automatically)
- Things that change daily (use daily memory files)

### 12.4 Memory Maintenance

Periodically ask the agent: *"Review this week's daily memory files and update MEMORY.md with anything worth keeping long-term."*

---

## Part 13: Workflow Optimization Tips

### 13.1 Project Context Files

For large projects, create dedicated memory files:

```
~/.openclaw/workspace/memory/
  qredible-cases-portal.md     # All context for the cases feature
  qredible-codebase.md         # Entity relationships, key patterns
  sprint-notes.md              # Current sprint context
```

Then tell the agent: *"Read memory/qredible-cases-portal.md before starting any Qredible cases work."*

### 13.2 Codebase Context Strategy

For large codebases (like Qredible's three repos), store extracted context in a file:

```
~/.openclaw/workspace/
  case-management-context.md   # Your 259KB context file — keep this!
```

Start each session with: *"Read case-management-context.md to get full context on the Qredible codebase before we work on cases."*

### 13.3 Mockup-to-Ticket Pipeline

The Qredible workflow that works well:

1. Describe what you want → agent builds HTML mockup → deploys to Netlify
2. Review mockup → give feedback → agent iterates
3. *"Now create Jira tickets from this mockup with full ADF descriptions, acceptance criteria, and link to the mockup"*

This pipeline produces consistently high-quality tickets in ~10 minutes vs 1-2 hours manually.

### 13.4 Continuation Prompts

When you hit rate limits or start a new session, the agent loses context. Best practice:

After important sessions, ask: *"Write a continuation prompt I can use next session to pick up exactly where we left off."* The agent will produce a dense prompt with all necessary context.

Store these in `memory/continuations/` or just paste them at the start of the next session.

### 13.5 Subagent Parallelism

For large tasks (like "write 10 Jira tickets" or "implement 5 features"), the agent can spawn parallel subagents. This turns a 2-hour task into a 20-minute one. Just describe the work clearly and let it parallelize.

---

## Part 14: Verification Checklist

Run through this after setup:

```bash
# Node version
node --version   # Need 22.12.0+

# Gateway running
openclaw gateway status

# Docker accessible
docker info > /dev/null 2>&1 && echo "Docker OK"

# File permissions
ls -la ~/.openclaw/openclaw.json   # Should be -rw-------
ls -la ~/.openclaw/ | head -3      # Should be drwx------

# Firewall active
sudo ufw status verbose

# Sandbox health
openclaw sandbox explain

# Full health check
openclaw status
openclaw doctor
```

---

## Part 15: Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| Agent forgets between sessions | memorySearch not configured | Apply Section 5.1 config |
| Slack bot doesn't respond | Webhook URL not configured | Check Event Subscriptions URL in Slack app settings |
| `web_fetch` not available | Sandbox tool policy too restrictive | `openclaw config set tools.sandbox.tools.allow '["group:openclaw"]'` + recreate |
| Agent out of date in Slack | Stale sandbox snapshot | `openclaw sandbox recreate --all --force` |
| Config change has no effect | Running container using old policy | `openclaw sandbox recreate --all --force` |
| `docker: permission denied` | User not in docker group | `sudo usermod -aG docker $USER` + full gateway stop/start |
| Rate limit errors | Model quota exceeded | Switch to a different model tier, or batch requests |
| Memory not persisting | Files written to sandbox, not host | Main session writes persist; sandbox sessions don't (by design) |

---

## Part 16: Useful Commands Reference

```bash
# Gateway
openclaw gateway status
openclaw gateway restart
openclaw gateway stop
openclaw gateway start

# Monitoring
openclaw status
openclaw logs --follow
openclaw doctor

# Sandbox
openclaw sandbox explain
openclaw sandbox recreate --all --force

# Config
openclaw config set <key> <value>
openclaw config patch '<json>'

# Security
openclaw security audit
openclaw security audit --deep

# Skills
openclaw skills list
openclaw skills install <name>
```

---

## Quick Start Summary

For the impatient — minimum viable setup in order:

1. `npm install -g openclaw`
2. `openclaw configure` (enter model token + Slack bot token + gateway auth)
3. Configure memory (Section 5.1) — **don't skip this**
4. Configure sandbox (Section 5.2)
5. Write workspace files: `IDENTITY.md`, `USER.md`, `TOOLS.md`, `SOUL.md`
6. Restart: `openclaw gateway restart`
7. Install skills: `openclaw skills install github frontend-design`
8. Test in Slack: `@YourBot can you look up Jira ticket QP-3472?`

You're live.

---

*Generated by Kingler · OpenClaw Setup Guide · Qredible Edition*
