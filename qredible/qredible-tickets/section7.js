const fs = require('fs');
const f = '/home/openclaw/.openclaw/workspace/projects/mgk-prototypes/qredible/qredible-tickets/regulatory-rules-engine.html';
let c = fs.readFileSync(f, 'utf8');

const section7 = `
  <!-- ══════════════════════════════════════════════════════════
       SECTION 7: FDA ENDS Authorization List — Data Model & Management
  ═══════════════════════════════════════════════════════════════ -->
  <div class="section">
    <div class="section-label">⑦ FDA ENDS Authorization List — Data Model, Matching &amp; Source Management</div>

    <!-- 7a: Architecture Clarification -->
    <div style="margin-bottom:24px;">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">How the FDA Check Actually Works — Three Distinct Concepts</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">

        <div style="background:white;border:2px solid var(--green);border-radius:10px;padding:16px 18px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="font-size:22px;">🏷️</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--text);">1. Classification Binding</div>
              <span style="background:#DCFCE7;color:#166534;font-size:10px;font-weight:700;padding:1px 7px;border-radius:4px;">✓ Configured</span>
            </div>
          </div>
          <div style="font-size:12px;color:var(--muted);line-height:1.6;"><code style="background:#F1F5F9;padding:1px 5px;border-radius:3px;font-size:11px;">FDA_ENDS_AUTHORIZATION_REQUIRED</code> is bound to all 5 tobacco/vape classifications. Every product in those classes auto-inherits this attribute — no per-product action needed.</div>
        </div>

        <div style="background:white;border:2px solid var(--blue);border-radius:10px;padding:16px 18px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="font-size:22px;">📋</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--text);">2. Compliance Data Source</div>
              <span style="background:#DBEAFE;color:#1E40AF;font-size:10px;font-weight:700;padding:1px 7px;border-radius:4px;">✓ This Section</span>
            </div>
          </div>
          <div style="font-size:12px;color:var(--muted);line-height:1.6;">The FDA ENDS Authorization List is a <strong>reference lookup table</strong> — 247 FDA-approved entries. The compliance rule queries it: "does this product's name appear here?" The list is not a binding — it's a data source.</div>
        </div>

        <div style="background:white;border:1px solid var(--border);border-radius:10px;padding:16px 18px;opacity:.85;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="font-size:22px;">🎯</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--text);">3. Product (Direct) Binding</div>
              <span style="background:#F1F5F9;color:var(--muted);font-size:10px;font-weight:700;padding:1px 7px;border-radius:4px;">Override Mechanism</span>
            </div>
          </div>
          <div style="font-size:12px;color:var(--muted);line-height:1.6;">Manually tag a <em>specific product</em> with a regulatory attribute. Use for edge cases: product with no classification yet, regulatory exception, or temporary exemption. Overrides classification-level inheritance.</div>
        </div>

      </div>
      <div class="annotation" style="margin-top:12px;">
        The FDA check uses concepts 1 + 2 together. Product classification binding is the "who is affected" trigger. The data source is "what we check against." Concept 3 (direct product binding) is a manual override for exceptions — it doesn't replace the classification-level approach.
      </div>
    </div>

    <!-- 7b: Data Model -->
    <div style="margin-bottom:28px;">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">Data Model — <code style="font-size:12px;background:#F1F5F9;padding:2px 6px;border-radius:4px;">PlFdaEndsAuthorizationEntry</code></div>
      <div style="background:white;border:1px solid var(--border);border-radius:10px;overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr style="background:var(--navy);">
              <th style="padding:10px 14px;text-align:left;color:white;font-size:11px;font-weight:700;font-family:'IBM Plex Mono',monospace;">Field</th>
              <th style="padding:10px 14px;text-align:left;color:white;font-size:11px;font-weight:700;">Type</th>
              <th style="padding:10px 14px;text-align:center;color:white;font-size:11px;font-weight:700;">Required</th>
              <th style="padding:10px 14px;text-align:left;color:white;font-size:11px;font-weight:700;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">id</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">UUID</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;color:var(--muted);font-size:11px;">Auto</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Primary key</td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">brandName</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">string(255)</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Brand/trade name as listed in FDA authorization order. <strong>Primary match target.</strong></td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">productName</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">string(255)</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Full product name (may differ from brand). <strong>Secondary match target.</strong></td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">manufacturer</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">string(255)</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">FDA applicant/manufacturer name. Used as confidence tiebreaker.</td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">productType</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">enum</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);"><code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">CLOSED_SYSTEM · OPEN_SYSTEM · CIGALIKE · DISPOSABLE · TRADITIONAL_TOBACCO</code></td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">pmtaNumber</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">string(50)</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">FDA PMTA application number. The authoritative FDA identifier. e.g. <code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">PM0000424-PMPN</code></td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">authorizationType</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">enum</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);"><code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">GRANTED · DENIED · PENDING · WITHDRAWN</code> — only GRANTED entries pass the rule check</td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">authorizationDate</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">date</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Date FDA issued the authorization or denial order</td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">expirationDate</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">date</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;color:var(--muted);">—</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">If time-limited authorization. Null = no expiration.</td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">flavors</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">string[]</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;color:var(--muted);">—</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Specific flavor variants covered by this authorization (e.g., ["Virginia Tobacco", "Menthol"])</td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">searchTokens</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">string[]</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;color:var(--muted);">Auto</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);"><strong>Auto-generated on import.</strong> Normalized/tokenized names pre-built for fuzzy matching performance. Never manually edited.</td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">sourceDocumentId</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">FK</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Links to <code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">PlComplianceDataSourceDocument</code> — the actual FDA order/PDF this entry was extracted from</td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">sourceCitation</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">string(500)</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Full citation string: <em>"FDA Marketing Granted Order No. MKT-0000424, issued April 14, 2023"</em></td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">isActive</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">boolean</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;color:var(--muted);">Auto</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">False when FDA subsequently denies or withdraws. Entries are <strong>never deleted</strong> — only deactivated for full audit history.</td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">entryAddedBy</td>
              <td style="padding:8px 14px;color:var(--muted);">FK user</td>
              <td style="padding:8px 14px;text-align:center;color:var(--muted);">Auto</td>
              <td style="padding:8px 14px;color:var(--text);">System (SYSTEM = bulk import) or userId (manually added entry). Full audit trail.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 7c: Matching Algorithm -->
    <div style="margin-bottom:28px;">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">Fuzzy Matching Algorithm</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
        <!-- Left: flow -->
        <div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:10px;">Normalization Pipeline (auto-runs on import + match)</div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <div style="background:white;border:1px solid var(--border);border-left:4px solid var(--blue);border-radius:6px;padding:9px 12px;font-size:12px;display:flex;align-items:center;gap:8px;">
              <span style="background:var(--navy);color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;">1</span>
              <span>Lowercase + strip punctuation</span>
            </div>
            <div style="background:white;border:1px solid var(--border);border-left:4px solid var(--blue);border-radius:6px;padding:9px 12px;font-size:12px;display:flex;align-items:center;gap:8px;">
              <span style="background:var(--navy);color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;">2</span>
              <span>Remove filler words: "pods", "pack", "ct", "mg", "ml", "units"</span>
            </div>
            <div style="background:white;border:1px solid var(--border);border-left:4px solid var(--blue);border-radius:6px;padding:9px 12px;font-size:12px;display:flex;align-items:center;gap:8px;">
              <span style="background:var(--navy);color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;">3</span>
              <span>Tokenize into searchable terms → stored in <code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">searchTokens</code></span>
            </div>
            <div style="background:white;border:1px solid var(--border);border-left:4px solid var(--blue);border-radius:6px;padding:9px 12px;font-size:12px;display:flex;align-items:center;gap:8px;">
              <span style="background:var(--navy);color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;">4</span>
              <span>Run against pre-built <code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">searchTokens</code> index on each FDA entry</span>
            </div>
            <div style="background:white;border:1px solid var(--border);border-left:4px solid var(--blue);border-radius:6px;padding:9px 12px;font-size:12px;display:flex;align-items:center;gap:8px;">
              <span style="background:var(--navy);color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;">5</span>
              <span>Score via Levenshtein distance + token overlap (weighted)</span>
            </div>
            <div style="background:white;border:1px solid var(--border);border-left:4px solid var(--blue);border-radius:6px;padding:9px 12px;font-size:12px;display:flex;align-items:center;gap:8px;">
              <span style="background:var(--navy);color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;">6</span>
              <span>Return top 3 candidates with confidence scores</span>
            </div>
          </div>
        </div>
        <!-- Right: confidence tiers -->
        <div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:10px;">Confidence Tiers → Compliance Outcome</div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
            <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:12px 14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span style="font-size:13px;font-weight:700;color:var(--green);">≥ 95% — HIGH</span>
                <span style="background:#DCFCE7;color:#166534;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;">✓ FDA Authorized</span>
              </div>
              <div style="font-size:11px;color:var(--muted);">Auto-marked Authorized. No analyst review required.</div>
            </div>
            <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:12px 14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span style="font-size:13px;font-weight:700;color:var(--orange);">80–94% — MEDIUM</span>
                <span style="background:#FEF9C3;color:#854D0E;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;">⚠ Authorized (Review)</span>
              </div>
              <div style="font-size:11px;color:var(--muted);">Authorized but flagged for analyst confirmation. Dot indicator shown.</div>
            </div>
            <div style="background:#FFF5F5;border:1px solid #FECACA;border-radius:8px;padding:12px 14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span style="font-size:13px;font-weight:700;color:var(--red);">60–79% — LOW</span>
                <span style="background:#FEE2E2;color:#991B1B;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;">⚠ Unknown</span>
              </div>
              <div style="font-size:11px;color:var(--muted);">Cannot confirm. Analyst must manually verify before resolving.</div>
            </div>
            <div style="background:#F1F5F9;border:1px solid var(--border);border-radius:8px;padding:12px 14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span style="font-size:13px;font-weight:700;color:var(--muted);">&lt; 60% — Filtered</span>
                <span style="background:#FEE2E2;color:#991B1B;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;">🔴 PROHIBITED</span>
              </div>
              <div style="font-size:11px;color:var(--muted);">No match found. Treated as Not on FDA List. Rule returns PROHIBITED.</div>
            </div>
          </div>
          <!-- Example match table -->
          <div style="font-size:12px;color:var(--muted);margin-bottom:6px;">Example Match Results</div>
          <table style="width:100%;border-collapse:collapse;font-size:11px;background:white;border:1px solid var(--border);border-radius:8px;overflow:hidden;">
            <thead><tr style="background:var(--navy);">
              <th style="padding:7px 10px;text-align:left;color:white;font-weight:600;">Input</th>
              <th style="padding:7px 10px;text-align:left;color:white;font-weight:600;">Best FDA Match</th>
              <th style="padding:7px 10px;text-align:center;color:white;font-weight:600;">Score</th>
              <th style="padding:7px 10px;text-align:center;color:white;font-weight:600;">Result</th>
            </tr></thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border);">
                <td style="padding:7px 10px;color:var(--text);">JUUL Virginia Tobacco Pods</td>
                <td style="padding:7px 10px;color:var(--muted);">JUUL Virginia Tobacco</td>
                <td style="padding:7px 10px;text-align:center;font-weight:700;color:var(--green);">96%</td>
                <td style="padding:7px 10px;text-align:center;"><span style="background:#DCFCE7;color:#166534;font-size:10px;font-weight:700;padding:1px 6px;border-radius:4px;">HIGH ✅</span></td>
              </tr>
              <tr>
                <td style="padding:7px 10px;color:var(--text);">Generic Disposable Vape 800</td>
                <td style="padding:7px 10px;color:var(--muted);">Vuse Solo Cartridge</td>
                <td style="padding:7px 10px;text-align:center;font-weight:700;color:var(--red);">23%</td>
                <td style="padding:7px 10px;text-align:center;"><span style="background:#FEE2E2;color:#991B1B;font-size:10px;font-weight:700;padding:1px 6px;border-radius:4px;">PROHIBITED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 7d + 7e: Source Docs + List Management -->
    <div style="margin-bottom:28px;">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">Source Document Management — <code style="font-size:12px;background:#F1F5F9;padding:2px 6px;border-radius:4px;">PlComplianceDataSourceDocument</code></div>
      <div style="background:white;border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:16px;">
        <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:13px;font-weight:600;color:var(--text);">FDA ENDS Authorization — Source Documents</div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-primary btn-sm">+ Import New Document</button>
            <button class="btn btn-secondary btn-sm">View All</button>
          </div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead><tr style="background:var(--navy);">
            <th style="padding:9px 14px;text-align:left;color:white;font-size:11px;font-weight:700;">Document Name</th>
            <th style="padding:9px 14px;text-align:left;color:white;font-size:11px;font-weight:700;">Citation</th>
            <th style="padding:9px 14px;text-align:left;color:white;font-size:11px;font-weight:700;">Imported</th>
            <th style="padding:9px 14px;text-align:left;color:white;font-size:11px;font-weight:700;">Entries</th>
            <th style="padding:9px 14px;text-align:left;color:white;font-size:11px;font-weight:700;">Status</th>
            <th style="padding:9px 14px;text-align:left;color:white;font-size:11px;font-weight:700;">Actions</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px;"><div style="font-weight:600;color:var(--text);">FDA ENDS Marketing Granted Orders — Batch 1</div><div style="font-size:11px;color:var(--muted);margin-top:2px;">Imported by system from FDA.gov</div></td>
              <td style="padding:9px 14px;font-size:11px;color:var(--muted);">U.S. FDA, Center for Tobacco Products, Marketing Granted Orders (ENDS), Rev. April 14, 2023</td>
              <td style="padding:9px 14px;color:var(--text);">Apr 14, 2023<div style="font-size:11px;color:var(--muted);">System import</div></td>
              <td style="padding:9px 14px;font-weight:700;color:var(--text);">198</td>
              <td style="padding:9px 14px;"><span style="background:#DCFCE7;color:#166534;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;">ACTIVE</span></td>
              <td style="padding:9px 14px;"><button class="btn btn-ghost btn-sm">View Entries</button></td>
            </tr>
            <tr>
              <td style="padding:9px 14px;"><div style="font-weight:600;color:var(--text);">FDA ENDS Marketing Granted Orders — Batch 2</div><div style="font-size:11px;color:var(--muted);">Submitted by Brian Fitzpatrick, Mar 18, 2026</div></td>
              <td style="padding:9px 14px;font-size:11px;color:var(--muted);">U.S. FDA, Center for Tobacco Products, Marketing Granted Orders (ENDS), Rev. March 18, 2026</td>
              <td style="padding:9px 14px;color:var(--text);">Mar 18, 2026<div style="font-size:11px;color:var(--muted);">Brian Fitzpatrick</div></td>
              <td style="padding:9px 14px;font-weight:700;color:var(--text);">49</td>
              <td style="padding:9px 14px;"><span style="background:#DCFCE7;color:#166534;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;">ACTIVE</span></td>
              <td style="padding:9px 14px;"><button class="btn btn-ghost btn-sm">View Entries</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 7e: List Management -->
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">FDA ENDS Authorization List — Entry Management <span style="font-size:12px;font-weight:400;color:var(--muted);">(opened via "Manage List →" in Rules Builder)</span></div>
      <div style="background:white;border:1px solid var(--border);border-radius:10px;overflow:hidden;">
        <div style="padding:14px 18px;border-bottom:1px solid var(--border);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
            <div>
              <div style="font-size:15px;font-weight:700;color:var(--text);">FDA ENDS Authorization List</div>
              <div style="font-size:12px;color:var(--muted);margin-top:2px;">247 entries · Last updated Mar 18, 2026 by Brian Fitzpatrick · 2 source documents</div>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-primary btn-sm">+ Import New Document</button>
              <button class="btn btn-secondary btn-sm">Add Entry Manually</button>
              <button class="btn btn-secondary btn-sm">Export List</button>
            </div>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <input type="text" placeholder="Search brand, manufacturer, PMTA #..." style="flex:1;max-width:320px;border:1px solid var(--border);border-radius:6px;padding:7px 10px;font-size:13px;font-family:inherit;color:var(--text);">
            <div style="display:flex;gap:4px;">
              <button style="background:var(--navy);color:white;border:none;border-radius:5px;padding:5px 12px;font-size:11px;font-weight:700;cursor:pointer;">ALL (247)</button>
              <button style="background:white;color:var(--muted);border:1px solid var(--border);border-radius:5px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;">Granted (235)</button>
              <button style="background:white;color:var(--muted);border:1px solid var(--border);border-radius:5px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;">Denied (8)</button>
              <button style="background:white;color:var(--muted);border:1px solid var(--border);border-radius:5px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;">Pending / Withdrawn (4)</button>
            </div>
          </div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead><tr style="background:var(--navy);">
            <th style="padding:9px 12px;text-align:left;color:white;font-size:11px;font-weight:700;">Brand Name</th>
            <th style="padding:9px 12px;text-align:left;color:white;font-size:11px;font-weight:700;">Manufacturer</th>
            <th style="padding:9px 12px;text-align:left;color:white;font-size:11px;font-weight:700;">Product Type</th>
            <th style="padding:9px 12px;text-align:left;color:white;font-size:11px;font-weight:700;">PMTA #</th>
            <th style="padding:9px 12px;text-align:left;color:white;font-size:11px;font-weight:700;">Status</th>
            <th style="padding:9px 12px;text-align:left;color:white;font-size:11px;font-weight:700;">Auth. Date</th>
            <th style="padding:9px 12px;text-align:left;color:white;font-size:11px;font-weight:700;">Source</th>
            <th style="padding:9px 12px;text-align:left;color:white;font-size:11px;font-weight:700;">Actions</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);background:#F8FAFC;">
              <td style="padding:8px 12px;"><div style="font-weight:600;color:var(--text);">JUUL Virginia Tobacco</div><div style="font-size:11px;color:var(--muted);">"JUUL Virginia Tobacco Pods"</div></td>
              <td style="padding:8px 12px;color:var(--text);">JUUL Labs, Inc.</td>
              <td style="padding:8px 12px;"><span style="background:#EFF6FF;color:#1E40AF;font-size:10px;font-weight:600;padding:1px 6px;border-radius:4px;">Closed System</span></td>
              <td style="padding:8px 12px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text);">PM0000424-PMPN</td>
              <td style="padding:8px 12px;"><span style="background:#DCFCE7;color:#166534;font-size:11px;font-weight:700;padding:2px 7px;border-radius:4px;">GRANTED</span></td>
              <td style="padding:8px 12px;color:var(--text);">Apr 14, 2023</td>
              <td style="padding:8px 12px;color:var(--muted);font-size:11px;">Batch 1</td>
              <td style="padding:8px 12px;"><div style="display:flex;gap:4px;"><button class="btn btn-ghost btn-sm" style="font-size:10px;">Edit</button><button class="btn btn-ghost btn-sm" style="font-size:10px;color:var(--red);">Archive</button></div></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:8px 12px;"><div style="font-weight:600;color:var(--text);">JUUL Menthol</div><div style="font-size:11px;color:var(--muted);">"JUUL Menthol Pods"</div></td>
              <td style="padding:8px 12px;color:var(--text);">JUUL Labs, Inc.</td>
              <td style="padding:8px 12px;"><span style="background:#EFF6FF;color:#1E40AF;font-size:10px;font-weight:600;padding:1px 6px;border-radius:4px;">Closed System</span></td>
              <td style="padding:8px 12px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text);">PM0000425-PMPN</td>
              <td style="padding:8px 12px;"><span style="background:#DCFCE7;color:#166534;font-size:11px;font-weight:700;padding:2px 7px;border-radius:4px;">GRANTED</span></td>
              <td style="padding:8px 12px;color:var(--text);">Apr 14, 2023</td>
              <td style="padding:8px 12px;color:var(--muted);font-size:11px;">Batch 1</td>
              <td style="padding:8px 12px;"><div style="display:flex;gap:4px;"><button class="btn btn-ghost btn-sm" style="font-size:10px;">Edit</button><button class="btn btn-ghost btn-sm" style="font-size:10px;color:var(--red);">Archive</button></div></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);background:#F8FAFC;">
              <td style="padding:8px 12px;"><div style="font-weight:600;color:var(--text);">Vuse Solo Cartridge</div><div style="font-size:11px;color:var(--muted);">"Vuse Solo", "Vuse Solo Pod"</div></td>
              <td style="padding:8px 12px;color:var(--text);">R.J. Reynolds Vapor</td>
              <td style="padding:8px 12px;"><span style="background:#EFF6FF;color:#1E40AF;font-size:10px;font-weight:600;padding:1px 6px;border-radius:4px;">Closed System</span></td>
              <td style="padding:8px 12px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text);">PM0000352-PMPN</td>
              <td style="padding:8px 12px;"><span style="background:#DCFCE7;color:#166534;font-size:11px;font-weight:700;padding:2px 7px;border-radius:4px;">GRANTED</span></td>
              <td style="padding:8px 12px;color:var(--text);">Oct 12, 2021</td>
              <td style="padding:8px 12px;color:var(--muted);font-size:11px;">Batch 1</td>
              <td style="padding:8px 12px;"><div style="display:flex;gap:4px;"><button class="btn btn-ghost btn-sm" style="font-size:10px;">Edit</button><button class="btn btn-ghost btn-sm" style="font-size:10px;color:var(--red);">Archive</button></div></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:8px 12px;"><div style="font-weight:600;color:var(--text);">NJOY Ace Pod</div><div style="font-size:11px;color:var(--muted);">"NJOY ACE", "NJOY Ace Vape"</div></td>
              <td style="padding:8px 12px;color:var(--text);">NJOY, LLC</td>
              <td style="padding:8px 12px;"><span style="background:#EFF6FF;color:#1E40AF;font-size:10px;font-weight:600;padding:1px 6px;border-radius:4px;">Closed System</span></td>
              <td style="padding:8px 12px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text);">PM0000553-PMPN</td>
              <td style="padding:8px 12px;"><span style="background:#DCFCE7;color:#166534;font-size:11px;font-weight:700;padding:2px 7px;border-radius:4px;">GRANTED</span></td>
              <td style="padding:8px 12px;color:var(--text);">Apr 6, 2022</td>
              <td style="padding:8px 12px;color:var(--muted);font-size:11px;">Batch 2</td>
              <td style="padding:8px 12px;"><div style="display:flex;gap:4px;"><button class="btn btn-ghost btn-sm" style="font-size:10px;">Edit</button><button class="btn btn-ghost btn-sm" style="font-size:10px;color:var(--red);">Archive</button></div></td>
            </tr>
            <tr>
              <td style="padding:8px 12px;"><div style="font-weight:600;color:var(--text);">Generic Brand X 5000</div><div style="font-size:11px;color:var(--muted);">"Brand X", "Brand X Disposable"</div></td>
              <td style="padding:8px 12px;color:var(--text);">Unknown Mfr</td>
              <td style="padding:8px 12px;"><span style="background:#FEF3C7;color:#92400E;font-size:10px;font-weight:600;padding:1px 6px;border-radius:4px;">Disposable</span></td>
              <td style="padding:8px 12px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted);">—</td>
              <td style="padding:8px 12px;"><span style="background:#FEE2E2;color:#991B1B;font-size:11px;font-weight:700;padding:2px 7px;border-radius:4px;">DENIED</span></td>
              <td style="padding:8px 12px;color:var(--text);">Jan 8, 2024</td>
              <td style="padding:8px 12px;color:var(--muted);font-size:11px;">Batch 2</td>
              <td style="padding:8px 12px;"><div style="display:flex;gap:4px;"><button class="btn btn-ghost btn-sm" style="font-size:10px;">View</button></div></td>
            </tr>
          </tbody>
        </table>
        <div style="padding:10px 16px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--muted);">
          <span>Showing 1–5 of 247 entries</span>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-secondary btn-sm">← Prev</button>
            <button class="btn btn-secondary btn-sm">Next →</button>
          </div>
        </div>
      </div>
    </div>

    <div class="annotation">
      <strong>⑦ FDA ENDS Authorization List — How it all fits together:</strong><br><br>
      <strong>Data chain:</strong> Brian submits FDA source documents → imported as <code>PlComplianceDataSourceDocument</code> records → each authorized product becomes a <code>PlFdaEndsAuthorizationEntry</code> with <code>sourceDocumentId</code> FK → <code>searchTokens</code> are auto-generated for fuzzy matching. Every entry knows exactly which FDA order it came from. Entries are <strong>never deleted</strong> — archived as SUPERSEDED when FDA denies or withdraws authorization.<br><br>
      <strong>Matching:</strong> When the compliance rule evaluates a product, it normalizes the product name and runs it against the <code>searchTokens</code> index. Confidence ≥95% = auto-authorized. 80-94% = authorized + analyst flag. &lt;80% = PROHIBITED. The matching threshold is configurable per rule.<br><br>
      <strong>Not a product (direct) binding:</strong> The list is a compliance <em>data source</em> — a lookup table the rule queries. The binding is at the classification level: all products in tobacco/vape classifications inherit <code>FDA_ENDS_AUTHORIZATION_REQUIRED</code>, which triggers the rule check. Product (direct) binding is a separate override mechanism for individual product exceptions.<br><br>
      <strong>Maintainability:</strong> When the FDA publishes a new authorization list, it's imported as a new <code>PlComplianceDataSourceDocument</code> and its entries are merged into the master list. The rule auto-re-evaluates all affected products on next scan cycle.
    </div>

  </div><!-- /section 7 -->
`;

const insertBefore = '</div><!-- /page -->';
if (c.includes(insertBefore)) {
  c = c.replace(insertBefore, section7 + insertBefore);
  fs.writeFileSync(f, c);
  console.log('Section 7 inserted successfully');
} else {
  // Try alternate closing pattern
  const alt = '</div>\n\n</body>';
  if (c.includes(alt)) {
    c = c.replace(alt, section7 + '</div>\n\n</body>');
    fs.writeFileSync(f, c);
    console.log('Section 7 inserted (alt pattern)');
  } else {
    // Last resort: find </body>
    c = c.replace('</body>', section7 + '</body>');
    fs.writeFileSync(f, c);
    console.log('Section 7 inserted before </body>');
  }
}
