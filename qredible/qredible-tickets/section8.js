const fs = require('fs');
const f = '/home/openclaw/.openclaw/workspace/projects/mgk-prototypes/qredible/qredible-tickets/regulatory-rules-engine.html';
let c = fs.readFileSync(f, 'utf8');

const section8 = `
  <!-- ══════════════════════════════════════════════════════════
       SECTION 8: Direct Attribute Assignment — Product, COA & License Override UI
  ═══════════════════════════════════════════════════════════════ -->
  <div class="section">
    <div class="section-label">⑧ Direct Attribute Assignment — Product, COA &amp; License Override UI</div>

    <!-- 8a: Three Override Scenarios -->
    <div style="margin-bottom:24px;">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">Three Override Scenarios</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
        <div style="background:white;border:1px solid var(--border);border-radius:10px;padding:16px 18px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="font-size:22px;">📦</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--text);">Product Direct Assignment</div>
              <span style="background:#DBEAFE;color:#1E40AF;font-size:10px;font-weight:700;padding:1px 7px;border-radius:4px;">Most Common</span>
            </div>
          </div>
          <div style="font-size:12px;color:var(--muted);line-height:1.6;">Product classified as wrong type (e.g., vape device in Hemp/CBD). Doesn't inherit the attribute it needs. Admin manually assigns <code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">FDA_ENDS_AUTHORIZATION_REQUIRED</code> on the product record.</div>
        </div>
        <div style="background:white;border:1px solid var(--border);border-radius:10px;padding:16px 18px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="font-size:22px;">🧪</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--text);">COA Field Suppression</div>
              <span style="background:#FEF9C3;color:#854D0E;font-size:10px;font-weight:700;padding:1px 7px;border-radius:4px;">Exception Handling</span>
            </div>
          </div>
          <div style="font-size:12px;color:var(--muted);line-height:1.6;">COA shows trace contamination of restricted analyte (e.g., 0.001% Psilocybin from cross-contamination). Product has documented exemption. Admin suppresses the COA field trigger for this specific COA.</div>
        </div>
        <div style="background:white;border:1px solid var(--border);border-radius:10px;padding:16px 18px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="font-size:22px;">🪪</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--text);">License Direct Assignment</div>
              <span style="background:#F1F5F9;color:var(--muted);font-size:10px;font-weight:700;padding:1px 7px;border-radius:4px;">Regulatory Exception</span>
            </div>
          </div>
          <div style="font-size:12px;color:var(--muted);line-height:1.6;">License under regulatory review — needs <code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">LICENSE_UNDER_REVIEW</code> even though its license type doesn't carry that attribute.</div>
        </div>
      </div>
      <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:10px 14px;margin-top:12px;font-size:12px;color:#92400E;">
        <strong>All three share the same rule:</strong> COMPLIANCE_ADMIN role required. Reason note mandatory (min 20 chars). Full audit trail — no silent changes.
      </div>
    </div>

    <!-- 8b: Product Detail — Regulatory Attributes Panel -->
    <div style="margin-bottom:28px;">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">Product Detail View — Regulatory Attributes Panel (Internal Q-Audit Admin Only)</div>
      <div style="background:white;border:1px solid var(--border);border-radius:10px;overflow:hidden;">
        <!-- Product header -->
        <div style="padding:16px 20px;border-bottom:1px solid var(--border);background:#F8FAFC;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div>
              <div style="font-size:16px;font-weight:700;color:var(--text);">Sunset Sherbet Vape Pen</div>
              <div style="font-size:12px;color:var(--muted);margin-top:4px;">SKU: SSV-001 &middot; Classification: <span style="background:#FEF9C3;color:#854D0E;padding:1px 6px;border-radius:4px;font-size:11px;font-weight:600;">⚠ Hemp/CBD</span> <span style="font-size:11px;color:var(--red);">(classification may be wrong)</span></div>
              <div style="font-size:12px;color:var(--muted);margin-top:2px;">Company: Black Bear Wellness LLC &middot; Status: Active</div>
            </div>
            <button class="btn btn-secondary btn-sm">Edit Product</button>
          </div>
        </div>

        <!-- Role gate banner -->
        <div style="background:#FFFBEB;border-bottom:1px solid #FDE68A;padding:10px 20px;display:flex;align-items:center;gap:8px;font-size:12px;color:#92400E;">
          <span>🔒</span> <strong>COMPLIANCE_ADMIN</strong> access required. All changes are logged and require a reason note.
        </div>

        <div style="padding:20px;">
          <!-- Sub-section 1: Inherited -->
          <div style="margin-bottom:20px;">
            <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              <span>🔒</span> Inherited from Classification
            </div>
            <div style="background:#F8FAFC;border:1px solid var(--border);border-radius:6px;padding:12px 14px;font-size:12px;color:var(--muted);font-style:italic;">
              No attributes inherited from <strong>Hemp / CBD</strong> classification
            </div>
          </div>

          <!-- Sub-section 2: COA Field Triggers -->
          <div style="margin-bottom:20px;">
            <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              <span>🔒</span> COA Field Triggers
            </div>
            <div style="background:#F8FAFC;border:1px solid var(--border);border-radius:6px;padding:12px 14px;font-size:12px;color:var(--muted);font-style:italic;">
              No COA field triggers active
            </div>
          </div>

          <!-- Sub-section 3: Direct Assignments -->
          <div style="margin-bottom:16px;">
            <div style="font-size:11px;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              <span>✏️</span> Direct Assignments
            </div>

            <!-- Existing assignment -->
            <div style="border:1px solid #BFDBFE;border-left:4px solid var(--blue);border-radius:6px;padding:12px 14px;margin-bottom:8px;background:#F0F9FF;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                  <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                    <code style="background:#EFF6FF;color:#1E40AF;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;font-family:'IBM Plex Mono',monospace;">FDA_ENDS_AUTHORIZATION_REQUIRED</code>
                    <span style="font-size:10px;color:var(--muted);">Federal &middot; US</span>
                  </div>
                  <div style="font-size:11px;color:var(--muted);">Added by: <strong style="color:var(--text);">J. Floyd</strong> &middot; Apr 2, 2026</div>
                  <div style="font-size:11px;color:var(--text);margin-top:4px;background:#F8FAFC;border-radius:4px;padding:4px 8px;font-style:italic;">"Product is actually a vape pen — misclassified as Hemp/CBD pending reclassification"</div>
                </div>
                <button style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:14px;" title="Remove (requires reason)">&times;</button>
              </div>
            </div>

            <!-- Add attribute button -->
            <button class="btn btn-primary btn-sm" style="margin-top:4px;">+ Add Regulatory Attribute</button>
          </div>

          <!-- 8c: Inline Add Form (expanded state) -->
          <div style="border:2px solid var(--blue);border-radius:8px;padding:16px;background:#FAFBFF;margin-bottom:16px;">
            <div style="font-size:12px;font-weight:600;color:var(--text);margin-bottom:12px;">Add Regulatory Attribute</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
              <div>
                <div style="font-size:11px;font-weight:600;color:var(--text);margin-bottom:4px;">Attribute</div>
                <select style="width:100%;border:1px solid var(--border);border-radius:6px;padding:7px 10px;font-size:12px;font-family:inherit;color:var(--text);">
                  <option>FDA_ENDS_AUTHORIZATION_REQUIRED (Federal · US)</option>
                  <option>KRATOM_BANNED (State · IN, AL, AR...)</option>
                  <option>THC_LIMIT_0.3PCT (Federal · US)</option>
                  <option>PSILOCYBIN_RESTRICTED (State · All except OR, CO)</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;font-weight:600;color:var(--text);margin-bottom:4px;">Scope (auto-filled)</div>
                <div style="border:1px solid var(--border);border-radius:6px;padding:7px 10px;font-size:12px;color:var(--muted);background:#F1F5F9;">Federal &middot; US (all states) &middot; Effective: Apr 14, 2023</div>
              </div>
            </div>
            <div style="margin-bottom:12px;">
              <div style="font-size:11px;font-weight:600;color:var(--text);margin-bottom:4px;">Reason <span style="color:var(--red);">*</span> <span style="font-weight:400;color:var(--muted);">(required, min 20 chars)</span></div>
              <textarea style="width:100%;border:1px solid var(--border);border-radius:6px;padding:8px 10px;font-size:12px;font-family:inherit;min-height:60px;resize:vertical;color:var(--text);">This product is actually a vape device misclassified as Hemp/CBD. Needs FDA ENDS authorization check pending reclassification.</textarea>
            </div>
            <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:6px;padding:8px 12px;font-size:11px;color:#991B1B;margin-bottom:12px;">
              ⚠ Adding this attribute will immediately trigger all associated compliance rules.<br>
              <strong>Affected rule:</strong> FDA ENDS Authorization Check — product will be evaluated against the FDA ENDS list.
            </div>
            <div style="display:flex;gap:8px;justify-content:flex-end;">
              <button class="btn btn-ghost btn-sm">Cancel</button>
              <button class="btn btn-primary btn-sm">Add Attribute</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 8d: Compliance Result Tooltip — Source Shown -->
    <div style="margin-bottom:28px;">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">Compliance Result — Attribute Source in Tooltip</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
        <!-- Direct Assignment tooltip -->
        <div>
          <div style="font-size:11px;color:var(--muted);margin-bottom:6px;">Direct Assignment → PROHIBITED (misclassified product)</div>
          <div style="background:var(--navy);border-radius:8px;padding:16px;color:white;font-size:12px;line-height:1.7;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span style="font-weight:700;">FDA ENDS Authorization Check</span>
              <span style="background:#FEE2E2;color:#991B1B;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">🔴 PROHIBITED</span>
            </div>
            <div style="border-top:1px solid #334155;padding-top:8px;">
              <div style="display:flex;gap:8px;margin-bottom:4px;"><span style="color:#94A3B8;min-width:70px;">Attribute:</span><span style="font-family:'IBM Plex Mono',monospace;font-size:11px;">FDA_ENDS_AUTHORIZATION_REQUIRED</span></div>
              <div style="display:flex;gap:8px;margin-bottom:4px;"><span style="color:#94A3B8;min-width:70px;">Source:</span><span>⚡ <strong>Direct Assignment</strong> (J. Floyd &middot; Apr 2, 2026)</span></div>
              <div style="background:#1a202e;border-radius:4px;padding:6px 8px;margin:4px 0 8px;font-size:11px;color:#94A3B8;font-style:italic;">"Product is actually a vape pen — misclassified"</div>
              <div style="display:flex;gap:8px;margin-bottom:4px;"><span style="color:#94A3B8;min-width:70px;">Match:</span><span style="color:#fca5a5;">No match on FDA ENDS list (&lt; 60% confidence)</span></div>
              <div style="display:flex;gap:8px;"><span style="color:#94A3B8;min-width:70px;">Result:</span><span>PROHIBITED &middot; HIGH severity</span></div>
            </div>
            <div style="border-top:1px solid #334155;margin-top:10px;padding-top:8px;display:flex;gap:8px;">
              <button style="background:#334155;color:#CBD5E1;border:none;border-radius:4px;padding:4px 10px;font-size:11px;cursor:pointer;">View Rule</button>
              <button style="background:#334155;color:#CBD5E1;border:none;border-radius:4px;padding:4px 10px;font-size:11px;cursor:pointer;">Override ▾</button>
              <button style="background:#334155;color:#CBD5E1;border:none;border-radius:4px;padding:4px 10px;font-size:11px;cursor:pointer;">View Assignment</button>
            </div>
          </div>
        </div>
        <!-- Classification-inherited tooltip -->
        <div>
          <div style="font-size:11px;color:var(--muted);margin-bottom:6px;">Classification Inherited → AUTHORIZED (correctly classified)</div>
          <div style="background:var(--navy);border-radius:8px;padding:16px;color:white;font-size:12px;line-height:1.7;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span style="font-weight:700;">FDA ENDS Authorization Check</span>
              <span style="background:#DCFCE7;color:#166534;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">✓ AUTHORIZED</span>
            </div>
            <div style="border-top:1px solid #334155;padding-top:8px;">
              <div style="display:flex;gap:8px;margin-bottom:4px;"><span style="color:#94A3B8;min-width:70px;">Attribute:</span><span style="font-family:'IBM Plex Mono',monospace;font-size:11px;">FDA_ENDS_AUTHORIZATION_REQUIRED</span></div>
              <div style="display:flex;gap:8px;margin-bottom:4px;"><span style="color:#94A3B8;min-width:70px;">Source:</span><span>🏷️ <strong>Classification</strong> (Vape Cartridge → inherited)</span></div>
              <div style="display:flex;gap:8px;margin-bottom:4px;"><span style="color:#94A3B8;min-width:70px;">Match:</span><span style="color:#86efac;">JUUL Virginia Tobacco &middot; 96% &middot; HIGH</span></div>
              <div style="display:flex;gap:8px;"><span style="color:#94A3B8;min-width:70px;">Result:</span><span>Authorized &middot; PM0000424-PMPN</span></div>
            </div>
          </div>
          <div style="font-size:11px;color:var(--muted);margin-top:8px;">The tooltip shows <em>why</em> the attribute was applied and <em>how</em> the match was found — full transparency for compliance reviewers.</div>
        </div>
      </div>
    </div>

    <!-- 8e: COA Field Suppression -->
    <div style="margin-bottom:28px;">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">COA Detail View — Attribute Trigger Suppression</div>
      <div style="background:white;border:1px solid var(--border);border-radius:10px;overflow:hidden;">
        <div style="padding:14px 20px;border-bottom:1px solid var(--border);background:#F8FAFC;">
          <div style="font-size:14px;font-weight:700;color:var(--text);">COA #VCO-2847</div>
          <div style="font-size:12px;color:var(--muted);margin-top:2px;">Sunset Sherbet Full Spectrum Oil &middot; Lab: ProVerde &middot; Mar 2026</div>
        </div>
        <div style="background:#FFFBEB;border-bottom:1px solid #FDE68A;padding:10px 20px;display:flex;align-items:center;gap:8px;font-size:12px;color:#92400E;">
          <span>🔒</span> <strong>COMPLIANCE_ADMIN</strong> access required for suppression management.
        </div>
        <div style="padding:16px 20px;">
          <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px;">Attribute Trigger Overrides</div>

          <!-- Active suppression -->
          <div style="border:1px solid #FECACA;border-left:4px solid var(--red);border-radius:6px;padding:12px 14px;margin-bottom:10px;background:#FFF5F5;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                  <span style="font-size:10px;font-weight:700;background:#FEE2E2;color:#991B1B;padding:1px 6px;border-radius:4px;">SUPPRESSED</span>
                  <code style="background:#F1F5F9;color:#5B21B6;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:600;font-family:'IBM Plex Mono',monospace;">PSILOCYBIN_RESTRICTED</code>
                </div>
                <div style="font-size:11px;color:var(--muted);margin-top:4px;">
                  Triggered by: COA Field <strong>"Psilocybin"</strong> value: <strong>0.001%</strong>
                </div>
                <div style="font-size:11px;color:var(--muted);margin-top:2px;">
                  Suppressed by: <strong style="color:var(--text);">J. Floyd</strong> &middot; Apr 2, 2026
                </div>
                <div style="font-size:11px;color:var(--text);margin-top:6px;background:white;border:1px solid var(--border);border-radius:4px;padding:6px 8px;font-style:italic;">
                  "Trace contamination from shared lab equipment — FDA cross-contamination exemption documentation on file in Q-Vault (DOC-7821)"
                </div>
              </div>
              <button style="background:none;border:1px solid #FECACA;border-radius:4px;color:#991B1B;cursor:pointer;font-size:10px;padding:3px 8px;white-space:nowrap;">Remove Suppression</button>
            </div>
          </div>

          <button class="btn btn-secondary btn-sm" style="margin-top:4px;">+ Add Suppression</button>

          <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:6px;padding:8px 12px;margin-top:12px;font-size:11px;color:#1E40AF;">
            Suppressed triggers still appear in audit logs but are excluded from compliance rule evaluation for this specific COA. The suppression does <strong>not</strong> affect other COAs for the same product.
          </div>
        </div>
      </div>
    </div>

    <!-- 8f: Data Model -->
    <div style="margin-bottom:28px;">
      <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">Data Model — <code style="font-size:12px;background:#F1F5F9;padding:2px 6px;border-radius:4px;">PlProductAttributeOverride</code></div>
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
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">entityType</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">enum</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);"><code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">PRODUCT · COA · LICENSE · COMPANY</code></td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">entityId</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">UUID FK</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">FK to the specific product/COA/license/company record</td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">attributeId</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">UUID FK</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">FK to PlRegulatoryAttribute</td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">overrideType</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">enum</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);"><code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">ADD</code> (assign attribute not inherited) or <code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;font-size:10px;">SUPPRESS</code> (block a trigger for this entity)</td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">reason</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">string(1000)</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Mandatory note explaining the override. Min 20 chars. <strong>No silent changes.</strong></td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">createdBy</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">FK user</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;">✅</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Must have <strong>COMPLIANCE_ADMIN</strong> role. Enforced at API level.</td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">expiresAt</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">timestamp</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;color:var(--muted);">—</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Auto-expire overrides. Null = permanent. Recommended for temp exceptions (e.g., "pending reclassification — expires May 1").</td>
            </tr>
            <tr>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">isActive</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--muted);">boolean</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);text-align:center;color:var(--muted);">Auto</td>
              <td style="padding:8px 14px;border-bottom:1px solid var(--border);color:var(--text);">Overrides <strong>never deleted</strong> — deactivated. removedBy + removedAt + removalReason stored on deactivation.</td>
            </tr>
            <tr style="background:#F8FAFC;">
              <td style="padding:8px 14px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--blue);">removedBy / removedAt / removalReason</td>
              <td style="padding:8px 14px;color:var(--muted);">FK / timestamp / string</td>
              <td style="padding:8px 14px;text-align:center;color:var(--muted);">—</td>
              <td style="padding:8px 14px;color:var(--text);">Audit trail for who removed the override, when, and why. Populated when isActive set to false.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="annotation">
      <strong>⑧ Key design principles for direct attribute assignment:</strong><br><br>
      <strong>Entity-first approach:</strong> The Regulatory Attributes panel lives on each entity's existing detail view (Product, COA, License) — where the context is already available. No separate "Attribute Override" admin page.<br><br>
      <strong>Read-only for inherited:</strong> Staff can see why something has an attribute but cannot remove classification-level or COA-field-level bindings from an individual entity. To change those, update the binding in Q-Audit Global Settings — which affects all entities of that type.<br><br>
      <strong>Source transparency:</strong> The compliance result tooltip always shows whether the attribute came from Classification (🏷️), COA Field (🧪), or Direct Assignment (⚡). No mystery about why a product is flagged.<br><br>
      <strong>COMPLIANCE_ADMIN role:</strong> Separate from regular admin — requires explicit role assignment. This prevents accidental overrides by staff who don't understand the regulatory implications.<br><br>
      <strong>Optional expiry:</strong> Recommended for temporary exceptions. A misclassified product's direct assignment should expire when the reclassification is complete. Auto-expiry runs as a daily cron job.<br><br>
      <strong>COA suppression scope:</strong> A suppression on one COA does NOT affect other COAs for the same product. If the product has 3 COAs and only one has trace contamination, only that one's trigger is suppressed.
    </div>

  </div><!-- /section 8 -->
`;

const insertBefore = '</div><!-- /page -->';
if (c.includes(insertBefore)) {
  c = c.replace(insertBefore, section8 + '\n' + insertBefore);
  fs.writeFileSync(f, c);
  console.log('Section 8 inserted successfully');
} else {
  console.log('Insert marker not found, trying </body>');
  c = c.replace('</body>', section8 + '\n</body>');
  fs.writeFileSync(f, c);
  console.log('Section 8 inserted before </body>');
}
