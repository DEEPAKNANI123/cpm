import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './index.css';

// ── CONFIG & CONSTANTS ──
const CYCLE_ID = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

function getInitials(p) {
  if (!p) return "??";
  const f = p.first_name?.[0] || "";
  const l = p.last_name?.[0] || "";
  return (f + l).toUpperCase() || "??";
}

// ── SHARED COMPONENTS ──
function Toast({ msg, color, show }) {
  return (
    <div className={`toast ${show ? "toast-show" : "toast-hidden"}`} style={{ background: color }}>
      <span className="toast-icon">✓</span><span>{msg}</span>
    </div>
  );
}

function Badge({ cls, dot, children }) {
  return (
    <span className={`badge badge-${cls}`}>
      {dot && <span className="badge-dot" />}{children}
    </span>
  );
}

function StatCard({ cls, label, val, valCls, note }) {
  return (
    <div className={`stat-card stat-card-${cls}`}>
      <div className="stat-label">{label}</div>
      <div className={`stat-val ${valCls || ""}`}>{val}</div>
      {note && <div className="stat-note">◈ {note}</div>}
    </div>
  );
}


// ── OVERVIEW PORTAL ──
function Overview({ profile }) {
  const [cycleThemes, setCycleThemes] = useState([]);
  useEffect(() => {
    async function fetchThemes() {
      const { data } = await supabase.from('themes').select('status').eq('cycle_id', CYCLE_ID);
      setCycleThemes(data || []);
    }
    fetchThemes();
  }, []);
  const pendingGeneral = cycleThemes.filter(t => t.status === 'pending_review').length;

  return (
    <div className="page">
      <div className="portal-label">◆ EXECUTIVE OVERVIEW · APRIL 2025</div>
      <div className="page-title">Continuous Performance<br/><span>Framework Dashboard</span></div>
      <div className="page-sub">Monthly binary review cycles · Theme validation · Rolling period roll-up · SAP Connect integration</div>
      
      <div className="stats-grid" style={{ marginBottom: 32 }}>
        <StatCard cls="blue" label="Active Employees" val="847" note="↑ Synced from SAP Connect" />
        <StatCard cls="blue" label="Submission Completion" val="89%" note="↑ +8% vs last month" />
        <StatCard cls="yellow" label="Overall YES Rate" val="72%" valCls="yellow" note="↑ 3+ Yes outcomes" />
        <StatCard cls="purple" label="Pending Validations" val={pendingGeneral} valCls="purple" note="Themes awaiting manager action" />
      </div>

      <div className="sec-title">How It Works</div>
      <div className="flow-container">
        <div className="flow-rows">
          <div className="flow-row">
            <div className="flow-step"><div className="flow-step-label">SAP CONNECT</div><div className="flow-step-name">Employee Data</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-step-label">STEP 1</div><div className="flow-step-name">Manager Direction</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step hl"><div className="flow-step-label">STEP 2</div><div className="flow-step-name">Employee Themes</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step hl"><div className="flow-step-label">STEP 3</div><div className="flow-step-name">4 Binary Inputs</div></div>
            <div className="flow-arrow">→</div>
          </div>
          <div className="flow-row" style={{ marginTop: 12 }}>
            <div className="flow-step green-step"><div className="flow-step-label">AUTO CALC</div><div className="flow-step-name">Yes / No Result</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-step-label">STEP 4</div><div className="flow-step-name">Theme Validation</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step purple-step"><div className="flow-step-label">ROLL-UP</div><div className="flow-step-name">Q / Annual View</div></div>
          </div>
        </div>
      </div>

      <div className="info-grid">
        <div className="frame frame-blue">
          <div className="stat-label" style={{ color: 'var(--cyan)', marginBottom: 14 }}>Decision Rule</div>
          <div className="rule-row"><span>4 Yes / 3 Yes + 1 No / 2 + 2</span><Badge cls="green">YES</Badge></div>
          <div className="rule-row"><span>1 Yes + 3 No / 4 No</span><Badge cls="red">NO</Badge></div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 10, padding: 8, background: 'var(--bg2)', borderRadius: 6 }}>2 or more Yes inputs = overall monthly YES</div>
        </div>
        <div className="frame frame-purple">
          <div className="stat-label" style={{ color: 'var(--purple)', marginBottom: 14 }}>Period Roll-Up</div>
          <div className="v-stack" style={{ gap: 12 }}>
            <div className="h-stack" style={{ gap: 12 }}><span className="badge badge-teal" style={{ minWidth: 70 }}>Monthly</span><span style={{ fontSize: 13 }}>4 binary inputs + themes</span></div>
            <div className="h-stack" style={{ gap: 12 }}><span className="badge badge-purple" style={{ minWidth: 70 }}>Quarterly</span><span style={{ fontSize: 13 }}>Roll-up of 3 results + trends</span></div>
            <div className="h-stack" style={{ gap: 12 }}><span className="badge badge-green" style={{ minWidth: 70 }}>Annual</span><span style={{ fontSize: 13 }}>Full year aggregate + rewards</span></div>
          </div>
        </div>
        <div className="frame frame-blue">
          <div className="stat-label" style={{ color: 'var(--cyan)', marginBottom: 14 }}>User Roles</div>
          <div className="v-stack" style={{ gap: 10 }}>
            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--cyan)', fontWeight: 700 }}>Employee</span> — Create themes, submit evidence</div>
            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--green)', fontWeight: 700 }}>Manager</span> — 4 binary inputs, validate themes</div>
            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--purple)', fontWeight: 700 }}>HR</span> — Dashboards, trends, governance</div>
          </div>
        </div>
      </div>

      <div className="frame">
        <div className="sec-title">Department Distribution</div>
        <div className="bar-row"><span className="bar-label">Engineering</span><div className="bar-track"><div className="bar-fill" style={{ width: '76%', background: 'var(--cyan)' }}></div></div><span className="bar-pct">76%</span></div>
        <div className="bar-row"><span className="bar-label">Product</span><div className="bar-track"><div className="bar-fill" style={{ width: '71%', background: 'var(--purple)' }}></div></div><span className="bar-pct">71%</span></div>
        <div className="bar-row"><span className="bar-label">Marketing</span><div className="bar-track"><div className="bar-fill" style={{ width: '68%', background: 'var(--blue)' }}></div></div><span className="bar-pct">68%</span></div>
        <div className="bar-row"><span className="bar-label">Operations</span><div className="bar-track"><div className="bar-fill" style={{ width: '74%', background: 'var(--yellow)' }}></div></div><span className="bar-pct">74%</span></div>
        <div className="bar-row"><span className="bar-label">Sales</span><div className="bar-track"><div className="bar-fill" style={{ width: '63%', background: 'var(--red)' }}></div></div><span className="bar-pct">63%</span></div>
        <div className="bar-row"><span className="bar-label">HR</span><div className="bar-track"><div className="bar-fill" style={{ width: '80%', background: 'var(--green)' }}></div></div><span className="bar-pct">80%</span></div>
      </div>

      <div className="frame" style={{ marginBottom: 20 }}>
        <div className="sec-title">Monthly Trend — Yes Rate</div>
        <svg width="100%" viewBox="0 0 800 80" style={{ display: 'block' }}>
          <polyline points="0,65 160,58 320,48 480,42 640,36 800,30" style={{ stroke: 'var(--cyan)', strokeWidth: 2, fill: 'none' }}/>
          <circle cx="0" cy="65" r="4" fill="var(--cyan)"/><circle cx="160" cy="58" r="4" fill="var(--cyan)"/><circle cx="320" cy="48" r="4" fill="var(--cyan)"/><circle cx="480" cy="42" r="4" fill="var(--cyan)"/><circle cx="640" cy="36" r="4" fill="var(--cyan)"/><circle cx="800" cy="30" r="4" fill="var(--cyan)"/>
          <text x="0" y="78" fontSize="10" fill="#8c959f">Nov</text><text x="148" y="78" fontSize="10" fill="#8c959f">Dec</text><text x="308" y="78" fontSize="10" fill="#8c959f">Jan</text><text x="462" y="78" fontSize="10" fill="#8c959f">Feb</text><text x="622" y="78" fontSize="10" fill="#8c959f">Mar</text><text x="778" y="78" fontSize="10" fill="#8c959f">Apr</text>
        </svg>
      </div>

      <div className="sec-title">Exceptions & Alerts</div>
      <div className="v-stack" style={{ gap: 8 }}>
        <div className="alert-item alert-warn"><div style={{ color: 'var(--red)', flexShrink: 0 }}>⚠</div><div><strong style={{ color: 'var(--red)' }}>3 employees</strong> have received No results for 3+ consecutive months — flagged for manager follow-up</div></div>
        <div className="alert-item alert-info"><div style={{ color: 'var(--yellow)', flexShrink: 0 }}>○</div><div><strong style={{ color: 'var(--yellow)' }}>14 theme submissions</strong> pending manager validation — cycle closes in 4 days</div></div>
        <div className="alert-item alert-ok"><div style={{ color: 'var(--green)', flexShrink: 0 }}>✓</div><div>Nightly SAP Connect sync completed successfully — 847 employee records current</div></div>
      </div>
    </div>
  );
}
function EvidenceBox({ themeId, evidence, updateEvidence, readonly, onReflectionSubmit }) {
  const WORD_LIMIT = 125;
  const countWords = (text) => text?.trim() ? text.trim().split(/\s+/).length : 0;

  const handleUpdate = (field, value) => {
    if (readonly) return;
    if (countWords(value) > WORD_LIMIT) {
      const words = value.trim().split(/\s+/);
      value = words.slice(0, WORD_LIMIT).join(' ');
    }
    updateEvidence(themeId, field, value);
  };

  const fields = [
    { key: 'achievements', label: 'KEY ACHIEVEMENTS THIS MONTH', placeholder: 'Describe your main contributions, project outcomes, and delivery highlights...' },
    { key: 'blockers', label: 'CHALLENGES / BLOCKERS', placeholder: 'Any blockers or challenges faced this month...' },
    { key: 'learning', label: 'LEARNING & DEVELOPMENT POINTS', placeholder: 'Skills developed, courses completed, initiatives taken...' }
  ];

  return (
    <div className="evidence-box">
      {fields.map(f => (
        <div key={f.key} className="evidence-group" style={f.key === 'learning' ? { marginBottom: 0 } : {}}>
           <div className="evidence-label">
             {f.label}
             {!readonly && (
               <span className={`evidence-counter ${countWords(evidence?.[f.key] || "") >= WORD_LIMIT ? 'limit-hit' : ''}`}>
                 {countWords(evidence?.[f.key] || "")} / {WORD_LIMIT} words
               </span>
             )}
           </div>
           <textarea 
             className={`evidence-input ${readonly ? 'readonly' : ''}`} 
             placeholder={f.placeholder}
             value={evidence?.[f.key] || ""}
             onChange={(e) => handleUpdate(f.key, e.target.value)}
             readOnly={readonly}
             rows={4}
           />
        </div>
      ))}
      {!readonly && (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
           <button 
             className="btn-primary" 
             style={{ background: 'var(--cyan)', padding: '10px 24px', fontSize: 13, border: 'none' }}
             onClick={() => onReflectionSubmit(themeId)}
           >
             Submit Monthly Reflection →
           </button>
        </div>
      )}
    </div>
  );
}

// ── EMPLOYEE PORTAL ──
function Employee({ profile, activeUser, showToast }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [themes, setThemes] = useState([]);
  const [form, setForm] = useState({ title: "", category: "Delivery Quality", description: "", linked_objective: "", achievement_evidence: "" });
  const [themeEvidence, setThemeEvidence] = useState({}); // { theme_id: { achievements, blockers, learning } }
  const [activeReflectionId, setActiveReflectionId] = useState(null);
  
  // Authority Console States (Moved from ManagerPortal)
  const [team, setTeam] = useState([]);
  const [myAssignedThemes, setMyAssignedThemes] = useState([]); // Themes from HR
  const [teamThemes, setTeamThemes] = useState([]); // Themes this manager assigned to team
  const [empSearch, setEmpSearch] = useState("");
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showCreator, setShowCreator] = useState(false);
  const [newDirective, setNewDirective] = useState({ title: "", description: "", category: "Delivery Quality" });

  const countWords = (text) => text?.trim() ? text.trim().split(/\s+/).length : 0;

  useEffect(() => {
    refreshEmployeeDash();
  }, [activeUser]);

  async function refreshEmployeeDash() {
    // Fetch ALL themes for the cycle. While a targeted OR filter is faster for large datasets, 
    // for this scale, fetching the full cycle data ensures perfect hierarchical visibility 
    // (HR seeing reflections created by managers, managers seeing reports' sub-items, etc.)
    const { data: allThemes } = await supabase.from('themes').select('*').eq('cycle_id', CYCLE_ID);
    
    // Filter for "My Themes" (Things I need to work on/reflect on)
    // This includes things assigned TO me and things I created (employee_id == me)
    setThemes(allThemes?.filter(t => t.assigned_to === activeUser || t.employee_id === activeUser) || []);
    
    // Filter for "Team Themes" (Authority Console)
    // We include themes I assigned PLUS any children (reflections) of themes I assigned
    const myAssignedParentIds = new Set(allThemes?.filter(t => t.assigned_by === activeUser && !t.parent_id).map(t => t.id) || []);
    setTeamThemes(allThemes?.filter(t => 
      (t.assigned_by === activeUser && t.assigned_to !== activeUser) || 
      myAssignedParentIds.has(t.parent_id)
    ) || []);

    // 2. Fetch team profiles (if this user is a manager)
    const { data: teamData } = await supabase.from('profiles').select('*').eq('manager_id', activeUser);
    setTeam(teamData || []);
  }

  async function handleAssignToEmployee() {
    if (!selectedEmp || !newDirective.title) return;
    const { error } = await supabase.from('themes').insert([{
      title: newDirective.title,
      description: newDirective.description,
      category: newDirective.category,
      employee_id: selectedEmp.id, // CRITICAL FIX: employee_id is required
      assigned_by: activeUser,
      assigned_to: selectedEmp.id,
      cycle_id: CYCLE_ID,
      status: 'assigned'
    }]);

    if (!error) {
      showToast(`Directive delegated to ${selectedEmp.first_name}`, "var(--cyan)");
      setShowCreator(false);
      setSelectedEmp(null);
      setNewDirective({ title: "", description: "", category: "Delivery Quality" });
      refreshEmployeeDash();
    } else {
      showToast("Error delegating directive", "var(--red)");
    }
  }

  const updateEvidence = (themeId, field, value) => {
    setThemeEvidence(prev => ({
      ...prev,
      [themeId]: {
        ...(prev[themeId] || { achievements: "", blockers: "", learning: "" }),
        [field]: value
      }
    }));
  };

  async function handleReflectionSubmit(themeId) {
    const data = themeEvidence[themeId];
    if (!data?.achievements) return showToast("Achievement notes required", "#cf222e");

    const parentTheme = themes.find(t => t.id === themeId);
    
    const { error } = await supabase.from('themes').insert([{
      title: `Reflection: ${parentTheme?.title || 'Progress'}`,
      description: `Achievements: ${data.achievements}\nBlockers: ${data.blockers}\nLearning: ${data.learning}`,
      category: parentTheme?.category || 'Delivery Quality',
      parent_id: themeId,
      employee_id: activeUser,
      assigned_to: activeUser,
      assigned_by: parentTheme?.assigned_by || activeUser,
      cycle_id: CYCLE_ID,
      status: 'assigned',
      achievement_evidence: data.achievements
    }]);

    if (!error) {
       showToast("Reflection submitted to higher authorities", "var(--green)");
       setThemeEvidence(prev => {
         const n = {...prev};
         delete n[themeId];
         return n;
       });
       refreshEmployeeDash();
    } else {
       showToast("Error saving reflection", "#cf222e");
    }
  }

  async function handleSubmit(e) {
    if (!form.title || !form.description) return showToast("Title and Description required", "#cf222e");
    const { error } = await supabase.from('themes').insert([{
      ...form,
      employee_id: activeUser,
      cycle_id: CYCLE_ID,
      status: 'pending_review'
    }]);
    if (error) {
      console.error("Theme submission error:", error);
      showToast("Error submitting theme", "#cf222e");
    } else {
      showToast("Theme submitted successfully", "var(--green)");
      setIsFormOpen(false);
      setForm({ title: "", category: "Delivery Quality", description: "", linked_objective: "", achievement_evidence: "" });
      refreshEmployeeDash();
    }
  }

  return (
    <div className="page">
      <div className="portal-label">○ EMPLOYEE PORTAL</div>
      <div className="page-title">My <span>Monthly Review</span></div>
      <div className="page-sub">{profile?.first_name} {profile?.last_name} · {profile?.job_title}</div>

      {profile?.role !== 'employee' && (
      <React.Fragment>
      
      <div className="emp-profile">
        <div className="emp-left">
          <div className="emp-avatar">{getInitials(profile)}</div>
          <div><div className="emp-name">{profile?.first_name} {profile?.last_name}</div><div className="emp-meta">EMP-{profile?.id?.slice(0,5)} · {profile?.job_title}</div></div>
        </div>
        <div className="emp-right">
          <Badge cls="yellow" dot>In Progress</Badge>
          <div className="v-stack"><div className="period-label-sm">Review Period</div><div className="period-val">APR 2025</div></div>
        </div>
      </div>

      {/* SECTION: ASSIGN THEME TO MANAGER (RENAMED) */}
      <div className="frame frame-purple" style={{ border: '1px solid rgba(138,43,226,.3)', marginBottom: 24, padding: '12px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="stat-label" style={{ color: 'var(--purple)', margin: 0, textTransform: 'uppercase' }}>
            {profile?.role === 'hr' ? 'Assign theme to manager' : 'Assign theme to employee'}
          </div>
          <button className="badge badge-teal" style={{ cursor: 'pointer', border: 'none', padding: '6px 12px' }} onClick={() => setShowCreator(!showCreator)}>
             {showCreator ? '✕ Close Panel' : '+ New Assignment'}
          </button>
        </div>

        {showCreator && (
          <div className="assignment-panel" style={{ border: '1px solid var(--cyan)', padding: 16, borderRadius: 8, background: 'rgba(4,196,196,0.02)', margin: '16px 0' }}>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="v-stack">
                   <label className="form-label" style={{ color: 'var(--cyan)' }}>1. SELECTION (SEARCH REPORT)</label>
                   <input className="input" placeholder="Search by name..." value={empSearch} onChange={e => setEmpSearch(e.target.value)} />
                   <div className="search-results" style={{ marginTop: 8, maxHeight: 120, overflowY: 'auto', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 4 }}>
                      {team.filter(e => `${e.first_name} ${e.last_name}`.toLowerCase().includes(empSearch.toLowerCase())).map(e => (
                        <div key={e.id} className="member-row" style={{ padding: '8px 12px', cursor: 'pointer', background: selectedEmp?.id === e.id ? 'var(--cyan-bg)' : 'transparent' }} onClick={() => setSelectedEmp(e)}>
                           <div style={{ fontSize: 13, fontWeight: 700 }}>{e.first_name} {e.last_name}</div>
                           <div style={{ fontSize: 11, color: 'var(--text3)' }}>{e.job_title}</div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="v-stack">
                   <label className="form-label" style={{ color: 'var(--cyan)' }}>2. DIRECTIVE DEFINITION</label>
                   <div className="v-stack" style={{ gap: 10 }}>
                      <input className="input" placeholder="Directive Title..." value={newDirective.title} onChange={e => setNewDirective({...newDirective, title: e.target.value})} />
                      <textarea className="input" placeholder="Directive Description..." value={newDirective.description} onChange={e => setNewDirective({...newDirective, description: e.target.value})} style={{ height: 60 }} />
                      <select className="input" value={newDirective.category} onChange={e => setNewDirective({...newDirective, category: e.target.value})}>
                         <option>Delivery Quality</option>
                         <option>Stakeholder Collaboration</option>
                         <option>Technical Initiative</option>
                      </select>
                   </div>
                </div>
             </div>
             <button className="btn-primary" style={{ width: '100%', marginTop: 16, background: 'var(--cyan)', border: 'none' }} disabled={!selectedEmp || !newDirective.title} onClick={handleAssignToEmployee}>
                Delegate Directive to {selectedEmp ? selectedEmp.first_name : "selected report"} →
             </button>
          </div>
        )}

        <div className="v-stack" style={{ gap: 12, marginTop: 16 }}>
           {teamThemes.filter(t => !t.parent_id).length === 0 ? (
             <div style={{ padding: 12, color: 'var(--text3)', fontSize: 13, textAlign: 'center' }}>No active focus directives set for this period</div>
           ) : (
             teamThemes.filter(t => !t.parent_id).map(tt => {
               const reflections = teamThemes.filter(st => st.parent_id === tt.id);
               return (
                 <div key={tt.id} className="v-stack" style={{ gap: 8 }}>
                   <div className="card" style={{ background: 'var(--bg2)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{tt.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--text3)' }}>Report: {team.find(e => e.id === tt.assigned_to)?.first_name} · Focus: {tt.category}</div>
                      </div>
                      <Badge cls="teal" dot>{reflections.length > 0 ? "Progress Logged" : "Tracking"}</Badge>
                   </div>
                   {/* SHOW REFLECTIONS TO HIGHER AUTHORITY */}
                   {reflections.map(r => (
                     <div key={r.id} style={{ marginLeft: 24, padding: '8px 12px', background: 'rgba(0,178,236,0.02)', borderLeft: '3px solid var(--purple)', borderRadius: 4 }}>
                       <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--purple)', marginBottom: 4 }}>MONTHLY REFLECTION</div>
                       <div style={{ fontSize: 12, whiteSpace: 'pre-wrap' }}>{r.description}</div>
                     </div>
                   ))}
                 </div>
               );
             })
           )}
         </div>
      </div>
      </React.Fragment>
      )}

      {/* SECTION: MY THEMES (HIDDEN FOR HR AS THEY ARE TOP AUTHORITY) */}
      {profile?.role !== 'hr' && (
        <React.Fragment>
          <div className="frame frame-blue">
            <div className="sec-title">My Themes — April 2025</div>
            <div className="theme-notice">
              <span style={{ color: 'var(--cyan)' }}>ℹ</span> Your line manager has directed themes: Delivery Quality, Stakeholder Collaboration, Technical Initiative
            </div>
        
        {themes.filter(t => !t.parent_id).map(t => {
          const mySubthemes = themes.filter(st => st.parent_id === t.id);
          return (
            <div key={t.id} className={`theme-card ${t.status === 'pending_review' ? 'pending' : ''}`} style={{ paddingBottom: 16 }}>
               <div className="theme-card-header">
                  <div><div className="theme-card-name">{t.title}</div><div className="theme-card-cat">Category: {t.category} · Period: Apr 2025</div></div>
                  <Badge cls={t.status === 'validated' ? 'green' : 'yellow'} dot>{t.status === 'validated' ? 'Approved' : 'Active Focus'}</Badge>
               </div>
               <div className="theme-card-desc" style={{ marginBottom: 12 }}>{t.description}</div>
               
               {/* SUBTHEMES (REFLECTIONS) */}
               {mySubthemes.length > 0 && (
                 <div className="sub-themes-container" style={{ margin: '12px 0' }}>
                   {mySubthemes.map(st => {
                     const desc = st.description || "";
                     const hasLabels = desc.includes('Achievements:');
                     const date = st.created_at ? new Date(st.created_at) : new Date();
                     const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
                     
                     return (
                       <div key={st.id} className="sub-theme-nested-card">
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                             <div className="reflection-title">{st.title}</div>
                             <Badge cls="yellow" dot>Pending Review</Badge>
                           </div>
                           <div className="reflection-body">
                             {hasLabels ? (
                               <div dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br/>').replace(/(Achievements:|Blockers:|Learning:)/g, '<span class="reflection-label">$1</span>') }} />
                             ) : desc}
                           </div>
                           <div className="card-footer-meta">
                              <span>○ Submitted {dateStr}</span>
                              <span>○ Awaiting validation</span>
                           </div>
                       </div>
                     );
                   })}
                 </div>
               )}

               {activeReflectionId === t.id ? (
                 <div style={{ background: 'rgba(0,178,236,0.02)', padding: 16, borderRadius: 10, border: '1px solid var(--frame-border)', marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                       <div className="period-label-sm" style={{ color: 'var(--cyan)' }}>NEW REFLECTION ENTRY</div>
                       <button style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 13 }} onClick={() => setActiveReflectionId(null)}>✕ Cancel</button>
                    </div>
                    <EvidenceBox themeId={t.id} evidence={themeEvidence[t.id]} updateEvidence={updateEvidence} readonly={false} onReflectionSubmit={(tid) => {
                      handleReflectionSubmit(tid);
                      setActiveReflectionId(null);
                    }} />
                 </div>
               ) : (
                 <button className="sub-theme-add-btn" onClick={() => setActiveReflectionId(t.id)}>
                   <span style={{ fontSize: 16 }}>+</span> Add Sub Theme
                 </button>
               )}
            </div>
          );
        })}

        {!isFormOpen && (
          <button className="sub-theme-add-btn" style={{ marginBottom: 24 }} onClick={() => setIsFormOpen(true)}>
            + Add New Theme
          </button>
        )}

        {isFormOpen && (
          <div className="card" style={{ background: 'var(--bg2)', border: '1px solid rgba(0,178,236,.3)', padding: 20 }}>
             <div className="stat-label" style={{ color: 'var(--cyan)', marginBottom: 16 }}>NEW THEME ENTRY</div>
             
             <div className="form-row">
                <div className="form-group">
                   <label className="form-label">THEME TITLE</label>
                   <input className="input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. React Component Library Upgrade" />
                </div>
                <div className="form-group">
                   <label className="form-label">CATEGORY</label>
                   <select className="input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                      <option>Delivery Quality</option>
                      <option>Stakeholder Collaboration</option>
                      <option>Technical Initiative</option>
                   </select>
                </div>
             </div>

             <div className="form-group">
                <label className="form-label">SHORT DESCRIPTION</label>
                <textarea className="input" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe what you did, the approach, and the outcome..." style={{ height: 80 }} />
             </div>

             <div className="form-row">
                <div className="form-group">
                   <label className="form-label">LINK TO OBJECTIVE / TASK / PROJECT</label>
                   <input className="input" value={form.linked_objective} onChange={e => setForm({...form, linked_objective: e.target.value})} placeholder="e.g. OKR-2025-Q2-07" />
                </div>
                <div className="form-group">
                   <label className="form-label">ACHIEVEMENT EVIDENCE</label>
                   <input className="input" value={form.achievement_evidence} onChange={e => setForm({...form, achievement_evidence: e.target.value})} placeholder="e.g. Reduced build time by 40%" />
                </div>
             </div>

             <div className="new-entry-footer">
                <button className="btn-outline" onClick={() => { setIsFormOpen(false); setForm({ title: "", category: "Delivery Quality", description: "", linked_objective: "", achievement_evidence: "" }); }}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}>Submit Theme →</button>
             </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )}

      <div className="frame">
        <div className="sec-title">Supporting Evidence</div>
        <div className="form-group">
          <label className="form-label">Evidence & Proof Points</label>
          <textarea className="input" placeholder="Project outcomes, behavioural examples, quality metrics, recognition instances, specific delivery proof..." style={{ height: 100 }} />
        </div>
      </div>

      {/* REVIEW HISTORY */}
      <div className="frame" style={{ marginBottom: 24 }}>
        <div className="sec-title">My Review History</div>
        <table className="hist-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Result</th>
              <th>Themes</th>
              <th>Manager Feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mar 2025</td>
              <td><Badge cls="green">YES</Badge></td>
              <td><Badge cls="green">3 Approved</Badge></td>
              <td>🔥 Strong delivery, great collaboration this month</td>
            </tr>
            <tr>
              <td>Feb 2025</td>
              <td><Badge cls="green">YES</Badge></td>
              <td><Badge cls="green">2 Approved</Badge></td>
              <td>🔥 Met expectations across all areas</td>
            </tr>
            <tr>
              <td>Jan 2025</td>
              <td><Badge cls="red">NO</Badge></td>
              <td><Badge cls="yellow">1 Returned</Badge></td>
              <td>💡 Please address Q4 carry-over items before next cycle</td>
            </tr>
            <tr>
              <td>Dec 2024</td>
              <td><Badge cls="green">YES</Badge></td>
              <td><Badge cls="green">2 Approved</Badge></td>
              <td>🔥 Excellent end of year contribution</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="action-row" style={{ display: 'flex', gap: 12, marginTop: 24, alignItems: 'center' }}>
        <button className="btn-outline" onClick={() => showToast('💾 Draft saved successfully', 'var(--cyan)')}>
          <span style={{ marginRight: 6 }}>💾</span> Save Draft
        </button>
        <button className="btn-primary" onClick={() => showToast('✓ Review submitted successfully', 'var(--green)')}>
          Submit for Review →
        </button>
      </div>
    </div>
  );
}

// ── MANAGER PORTAL ──
function ManagerPortal({ profile, activeUser, showToast }) {
  const [team, setTeam] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [teamThemes, setTeamThemes] = useState([]); // NEW: Tracks team directives for validation badges
  const [activePanel, setActivePanel] = useState(null);
  const [binaryInputs, setBinaryInputs] = useState({ Contribution: true, Collaboration: true, Consistency: true, Growth: true });

  useEffect(() => {
    fetchManagerData();
  }, [activeUser]);

  async function fetchManagerData() {
    // Fetch all themes associated with my ID to get reviews/stats (Simplified)
    const { data: teamData } = await supabase.from('profiles').select('*').eq('manager_id', activeUser);
    setTeam(teamData || []);
    
    if (teamData?.length) {
      const ids = teamData.map(t => t.id);
      // Fetch reviews
      const { data: revs } = await supabase.from('monthly_reviews').select('*').in('employee_id', ids).eq('cycle_id', CYCLE_ID);
      setReviews(revs || []);
      
      // Fetch themes assigned TO my team (to check for reflections/validation status)
      const { data: tThemes } = await supabase.from('themes').select('*').in('employee_id', ids).eq('cycle_id', CYCLE_ID);
      setTeamThemes(tThemes || []);
    }
  }

  async function handleReviewSubmit(employeeId) {
    const yesCount = Object.values(binaryInputs).filter(v => v === true).length;
    const overall = yesCount >= 2 ? 'YES' : 'NO';
    
    const { error } = await supabase.from('monthly_reviews').upsert({
      employee_id: employeeId,
      manager_id: activeUser,
      cycle_id: CYCLE_ID,
      input_contribution: binaryInputs.Contribution,
      input_collaboration: binaryInputs.Collaboration,
      input_consistency: binaryInputs.Consistency,
      input_growth: binaryInputs.Growth,
      overall_result: overall,
      is_draft: false,
      submitted_at: new Date().toISOString()
    }, { onConflict: 'employee_id,cycle_id' });

    if (!error) {
      showToast(`Review submitted for ${team.find(t => t.id === employeeId)?.first_name}`, "var(--green)");
      setActivePanel(null);
      fetchManagerData();
    } else {
      showToast("Error saving review", "var(--red)");
    }
  }

  async function handleThemeAction(themeId, action) {
    const statusMap = { 'approve': 'validated', 'return': 'returned', 'reject': 'rejected' };
    const { error } = await supabase.from('themes').update({ status: statusMap[action] }).eq('id', themeId);
    
    if (!error) {
       showToast(`Theme ${action}d successfully`, action === 'approve' ? "var(--green)" : "var(--yellow)");
       fetchManagerData();
    } else {
       showToast("Error updating theme status", "var(--red)");
    }
  }

  // Calculate live stats
  const completedCount = reviews.length;
  const pendingCount = team.length - completedCount;
  const yesRate = completedCount > 0 
    ? Math.round((reviews.filter(r => r.overall_result === 'YES').length / completedCount) * 100) 
    : 0;

  const AVATAR_COLORS = ['#008CC8', '#8250df', '#cf222e', '#1a7f37', '#9a6700', '#bc4c00'];

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      {/* HEADER SECTION */}
      <div className="portal-label">◈ MANAGER PORTAL</div>
      <div className="page-title">Team <span>Reviews</span></div>
      <div className="page-sub">April 2025 · {profile?.first_name} {profile?.last_name} · {team.length} Direct Reports</div>

      {/* SECTION 2: STATS GRID */}
      <div className="stats-grid" style={{ marginBottom: 32 }}>
        <StatCard cls="blue" label="Direct Reports" val={team.length} valCls="cyan" note="Staff in your team" />
        <StatCard cls={pendingCount > 0 ? "orange" : "blue"} label="Pending Inputs" val={pendingCount} valCls={pendingCount > 0 ? "orange" : "cyan"} note="Requires action" />
        <StatCard cls="blue" label="Completed" val={completedCount} valCls="green" note="For April 2025" />
        <StatCard cls="blue" label="Team YES Rate" val={`${yesRate}%`} valCls="cyan" note="Overall monthly result" />
      </div>

      {/* SECTION 2: TEAM MONTHLY INPUTS */}
      <div className="frame">
        <div className="sec-title">Team Monthly Inputs — April 2025</div>
        {team.map((m, i) => {
          const review = reviews.find(r => r.employee_id === m.id);
          const themesForUser = teamThemes.filter(t => t.assigned_to === m.id);
          
          return (
<React.Fragment key={m.id}>
             <div className="member-row" style={{ padding: '16px 24px' }}>
                <div className="member-info">
                  <div className="emp-avatar" style={{ width: 44, height: 44, fontSize: 13, background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>{getInitials(m)}</div>
                  <div className="v-stack">
                    <div className="member-name" style={{ fontSize: 16 }}>{m.first_name} {m.last_name}</div>
                    <div className="member-role" style={{ fontSize: 12, opacity: 0.7 }}>{m.job_title}</div>
                  </div>
                </div>
                <div className="member-actions">
                   {review ? (
                     <React.Fragment>
                        <Badge cls={review.overall_result === 'YES' ? 'green' : 'red'}>{review.overall_result}</Badge>
                        <Badge cls="green">✓ Completed</Badge>
                     </React.Fragment>
                   ) : (
                     <React.Fragment>
                        {themesForUser.some(t => t.status === 'pending_review') ? (
                          <Badge cls="orange" dot>Validations Needed</Badge>
                        ) : (
                          <Badge cls="yellow" dot>Inputs Needed</Badge>
                        )}
                     </React.Fragment>
                   )}
                   <button className="badge badge-teal" style={{ cursor: 'pointer', minWidth: 120, justifyContent: 'center' }} onClick={() => {
                     setActivePanel(activePanel === m.id ? null : m.id);
                     if (review) {
                        setBinaryInputs({
                          Contribution: review.input_contribution ?? true,
                          Collaboration: review.input_collaboration ?? true,
                          Consistency: review.input_consistency ?? true,
                          Growth: review.input_growth ?? true,
                          comment: review.manager_comment ?? ""
                        });
                     } else {
                        setBinaryInputs({ Contribution: true, Collaboration: true, Consistency: true, Growth: true, comment: "" });
                     }
                   }}>
                     {review ? "Edit Inputs →" : "Enter Inputs →"}
                   </button>
                 </div>
              </div>

              {/* SECTION 3: EXPANDED BINARY PANEL */}
              {activePanel === m.id && (
                <div className="binary-panel">
                   <div className="binary-panel-header">
                      <div className="h-stack" style={{ gap: 12 }}>
                        <div className="emp-avatar">{getInitials(m)}</div>
                        <div className="v-stack">
                          <div className="member-name">{m.first_name} {m.last_name}</div>
                          <div className="member-role">{m.job_title} · April 2025</div>
                        </div>
                      </div>
                      <button className="badge badge-gray" onClick={() => setActivePanel(null)} style={{ cursor: 'pointer' }}>✕ Close</button>
                   </div>
                   
                   <div className="stat-label" style={{ color: 'var(--cyan)', marginBottom: 16 }}>4 MONTHLY BINARY INPUTS</div>
                   
                   {[
                     { id: 'Contribution', label: 'Contribution & Delivery', sub: 'Input 1 of 4 - April 2025' },
                     { id: 'Collaboration', label: 'Collaboration & Teamwork', sub: 'Input 2 of 4 - April 2025' },
                     { id: 'Consistency', label: 'Consistency & Reliability', sub: 'Input 3 of 4 - April 2025' },
                     { id: 'Growth', label: 'Growth & Initiative', sub: 'Input 4 of 4 - April 2025' }
                   ].map((row) => (
                     <div key={row.id} className="binary-row">
                        <div>
                          <div className="binary-row-label">{row.label}</div>
                          <div className="binary-row-sub">{row.sub}</div>
                        </div>
                        <div className="binary-btns">
                           <button 
                             className={`btn-binary ${binaryInputs[row.id] ? 'active-yes' : ''}`}
                             onClick={() => setBinaryInputs({...binaryInputs, [row.id]: true})}
                           >
                               👍 Yes
                           </button>
                           <button 
                             className={`btn-binary ${binaryInputs[row.id] === false ? 'active-no' : ''}`}
                             onClick={() => setBinaryInputs({...binaryInputs, [row.id]: false})}
                           >
                               👎 No
                           </button>
                        </div>
                     </div>
                   ))}

                   <div className="card" style={{ padding: '12px 20px', background: 'var(--bg2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>
                         {Object.values(binaryInputs).filter(v => v === true).length} Yes · {Object.values(binaryInputs).filter(v => v === false).length} No
                      </div>
                      <div className="h-stack" style={{ gap: 12 }}>
                         <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Auto-Calculated Result</div>
                         <Badge cls={Object.values(binaryInputs).filter(v => v === true).length >= 2 ? 'green' : 'red'}>
                            {Object.values(binaryInputs).filter(v => v === true).length >= 2 ? '✓ YES' : '✕ NO'}
                         </Badge>
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text3)' }}>Rules: 2+ Yes = Overall YES</div>
                   </div>

                   <div className="form-group">
                      <label className="form-label">MANAGER COMMENT</label>
                      <textarea 
                         className="input" 
                         placeholder="Add context, guidance, or feedback for this employee..." 
                         style={{ height: 100 }}
                         value={binaryInputs.comment}
                         onChange={e => setBinaryInputs({...binaryInputs, comment: e.target.value})}
                      />
                   </div>

                   <div className="h-stack" style={{ gap: 12, marginTop: 20 }}>
                      <button className="btn-outline" onClick={() => showToast('💾 Draft saved successfully', 'var(--cyan)')}>Save Draft</button>
                      <button className="btn-primary" onClick={() => handleReviewSubmit(m.id)}>Submit Inputs →</button>
                   </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* SECTION 4: THEME VALIDATIONS PENDING (ALWAYS VISIBLE AFTER INPUTS) */}
      <div className="frame" style={{ border: '1px solid var(--orange)', background: 'rgba(188,76,0,0.02)', marginTop: 24 }}>
        <div className="sec-title" style={{ color: 'var(--orange)' }}>Theme Validations Pending</div>
        <div className="v-stack" style={{ gap: 12 }}>
          {teamThemes.filter(t => t.status === 'pending_review').length > 0 ? (
            teamThemes.filter(t => t.status === 'pending_review').map(t => (
              <div key={t.id} className="validation-card pending">
                <div className="validation-info">
                  <div className="validation-title">{t.title}</div>
                  <div className="validation-meta">{team.find(e => e.id === t.assigned_to)?.first_name} {team.find(e => e.id === t.assigned_to)?.last_name} · {t.category} · Apr 2025</div>
                </div>
                <div className="validation-actions">
                  <button className="badge badge-green" style={{ cursor: 'pointer', padding: '6px 14px' }} onClick={() => handleThemeAction(t.id, 'approve')}>✓ Approve</button>
                  <button className="badge badge-yellow" style={{ cursor: 'pointer', padding: '6px 14px' }} onClick={() => handleThemeAction(t.id, 'return')}>↺ Return</button>
                  <button className="badge badge-red" style={{ cursor: 'pointer', padding: '6px 14px' }} onClick={() => handleThemeAction(t.id, 'reject')}>✕ Reject</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text3)', fontSize: 13 }}>
              ○ No pending theme validations for this period.
            </div>
          )}
        </div>
      </div>

      {/* SECTION 5: ANNUAL VIEW HEATMAP */}
      <div className="frame" style={{ marginTop: 24 }}>
        <div className="sec-title">Team Annual View (YTD 2025)</div>
        <div className="heatmap-container">
           <table className="heatmap-table">
              <thead>
                <tr>
                  <th style={{ width: 250 }}>Employee</th>
                  <th style={{ textAlign: 'center' }}>Jan</th>
                  <th style={{ textAlign: 'center' }}>Feb</th>
                  <th style={{ textAlign: 'center' }}>Mar</th>
                  <th style={{ textAlign: 'center' }}>Apr</th>
                  <th style={{ textAlign: 'center' }}>YTD Pattern</th>
                  <th style={{ textAlign: 'center' }}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {team.map(m => {
                  const aprReview = reviews.find(r => r.employee_id === m.id);
                  // Simulate Jan-Mar for visual fidelity
                  return (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 600 }}>{m.first_name} {m.last_name}</td>
                      <td><div className="cell-y">Y</div></td>
                      <td><div className="cell-y">Y</div></td>
                      <td><div className={m.id.endsWith('1') ? 'cell-n' : 'cell-y'}>{m.id.endsWith('1') ? 'N' : 'Y'}</div></td>
                      <td>
                        {aprReview ? (
                          <div className={aprReview.overall_result === 'YES' ? 'cell-y' : 'cell-n'}>
                            {aprReview.overall_result === 'YES' ? 'Y' : 'N'}
                          </div>
                        ) : (
                          <div style={{ textAlign: 'center', color: '#ccc' }}>—</div>
                        )}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text2)' }}>↑ Strong</td>
                      <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--cyan)' }}>↑ Strong</td>
                    </tr>
                  );
                })}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}

// ── HR DASHBOARD ──
function HRDashboard({ profile, activeUser, showToast }) {
  const [managers, setManagers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMgr, setSelectedMgr] = useState(null);
  const [showCreator, setShowCreator] = useState(false);
  const [newTheme, setNewTheme] = useState({ title: "", description: "", category: "Growth" });
  const [cycleThemes, setCycleThemes] = useState([]);
  const pendingGeneral = cycleThemes.filter(t => t.status === 'pending_review').length;

  useEffect(() => {
    fetchManagers();
  }, []);

  async function fetchManagers() {
    const { data: mgrs } = await supabase.from('profiles').select('*').eq('role', 'manager');
    setManagers(mgrs || []);
    
    // Fetch all themes to get validation counts
    const { data: themes } = await supabase.from('themes').select('status').eq('cycle_id', CYCLE_ID);
    setCycleThemes(themes || []);
  }

  const filteredManagers = managers.filter(m => 
    `${m.first_name} ${m.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.job_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function handleAssign() {
    if (!selectedMgr || !newTheme.title) return;
    
    const { error } = await supabase.from('themes').insert([{
      title: newTheme.title,
      description: newTheme.description,
      category: newTheme.category,
      assigned_by: activeUser,
      assigned_to: selectedMgr.id,
      cycle_id: CYCLE_ID,
      status: 'assigned'
    }]);

    if (!error) {
      showToast(`Strategic goal delegated to ${selectedMgr.first_name}`, "var(--purple)");
      setShowCreator(false);
      setSelectedMgr(null);
      setNewTheme({ title: "", description: "", category: "Growth" });
    } else {
      showToast("Error delegating goal", "var(--red)");
    }
  }

  const depts = [
    { name: 'Engineering', yes: 76, nov: 70, dec: 75, jan: 80, feb: 73, mar: 74, apr: 76, color: 'var(--cyan)' },
    { name: 'Product', yes: 71, nov: 66, dec: 67, jan: 64, feb: 69, mar: 70, apr: 71, color: 'var(--purple)' },
    { name: 'Marketing', yes: 68, nov: 62, dec: 61, jan: 53, feb: 60, mar: 67, apr: 68, color: 'var(--blue)' },
    { name: 'Operations', yes: 74, nov: 71, dec: 78, jan: 59, feb: 65, mar: 68, apr: 74, color: 'var(--yellow)' },
    { name: 'Sales', yes: 63, nov: 65, dec: 62, jan: 60, feb: 58, mar: 61, apr: 63, color: 'var(--red)' },
    { name: 'HR', yes: 80, nov: 78, dec: 82, jan: 81, feb: 79, mar: 80, apr: 80, color: 'var(--green)' },
  ];

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      {/* HEADER */}
      <div className="portal-label">◆ HR / BUSINESS DASHBOARD</div>
      <div className="page-title">Organisation <span>Analytics</span></div>
      <div className="page-sub">April 2025 · Company-wide strategic oversight</div>
      
      {/* STATS */}
      <div className="stats-grid" style={{ marginBottom: 32 }}>
        <StatCard cls="blue" label="OVERALL YES" val="610" note="72.1% of employees" />
        <StatCard cls="orange" label="OVERALL NO" val="237" valCls="orange" note="27.9% needs attention" />
        <StatCard cls="blue" label="COMPLETION RATE" val="96%" valCls="green" />
        <StatCard cls="purple" label="STRATEGY ALIGNMENT" val="92%" valCls="purple" />
      </div>

      {/* GLOBAL STRATEGY CONSOLE - ASSIGNMENT LOGIC */}
      <div className="frame" style={{ marginBottom: 32, borderLeft: '4px solid var(--purple)' }}>
        <div className="sec-title" style={{ color: 'var(--purple)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <span>Global Strategy Console</span>
           <button className="badge badge-purple" style={{ cursor: 'pointer' }} onClick={() => setShowCreator(!showCreator)}>
              {showCreator ? "✕ Close Console" : "+ Delegate Strategic Goal"}
           </button>
        </div>

        {showCreator && (
          <div className="assignment-panel" style={{ marginTop: 20 }}>
             <div className="stat-label" style={{ color: 'var(--purple)', marginBottom: 12 }}>ASSIGN NEW STRATEGIC PILLAR</div>
             
             <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* STEP 1: SEARCH MANAGER */}
                <div className="v-stack">
                   <label className="form-label">1. SEARCH MANAGER</label>
                   <input 
                      className="input" 
                      placeholder="Type name or title..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                   />
                   <div className="search-results" style={{ marginTop: 10, maxHeight: 180, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 6 }}>
                      {filteredManagers.map(m => (
                        <div key={m.id} className="member-row" style={{ padding: '8px 12px', cursor: 'pointer', background: selectedMgr?.id === m.id ? 'var(--purple-bg)' : 'transparent' }} onClick={() => setSelectedMgr(m)}>
                           <div className="h-stack" style={{ gap: 10 }}>
                              <div className="emp-avatar" style={{ width: 28, height: 28, fontSize: 10 }}>{getInitials(m)}</div>
                              <div className="v-stack">
                                 <div style={{ fontSize: 12, fontWeight: 700 }}>{m.first_name} {m.last_name}</div>
                                 <div style={{ fontSize: 10, color: 'var(--text3)' }}>{m.job_title}</div>
                              </div>
                           </div>
                           {selectedMgr?.id === m.id && <span style={{ color: 'var(--purple)', fontSize: 12 }}>✓</span>}
                        </div>
                      ))}
                   </div>
                </div>

                {/* STEP 2: THEME DETAILS */}
                <div className="v-stack">
                   <label className="form-label">2. ACTIONABLE PILLAR DETAILS</label>
                   <div className="v-stack" style={{ gap: 10 }}>
                      <input className="input" placeholder="Goal Title (e.g. Q2 Operational Excellence)" value={newTheme.title} onChange={e => setNewTheme({...newTheme, title: e.target.value})} />
                      <textarea className="input" style={{ height: 60 }} placeholder="Expected outcomes / context..." value={newTheme.description} onChange={e => setNewTheme({...newTheme, description: e.target.value})} />
                      <select className="input" value={newTheme.category} onChange={e => setNewTheme({...newTheme, category: e.target.value})}>
                         <option>Growth</option>
                         <option>Operational Excellence</option>
                         <option>Culture & Retention</option>
                         <option>Customer Impact</option>
                      </select>
                   </div>
                </div>
             </div>

             <div className="h-stack" style={{ marginTop: 20, justifyContent: 'flex-end', gap: 12 }}>
                <button className="btn-outline" onClick={() => setShowCreator(false)}>Cancel</button>
                <button 
                  className="btn-primary" 
                  style={{ background: 'var(--purple)', border: 'none' }}
                  disabled={!selectedMgr || !newTheme.title}
                  onClick={handleAssign}
                >
                   Delegate to {selectedMgr ? selectedMgr.first_name : "Manager"} →
                </button>
             </div>
          </div>
        )}

        {!showCreator && (
          <div style={{ padding: '16px 0', borderTop: '1px solid var(--border)', marginTop: 16 }}>
             <div style={{ fontSize: 13, color: 'var(--text2)' }}>◈ Actively monitoring strategy reflections from {managers.length} business unit managers.</div>
          </div>
        )}
      </div>

      <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div className="frame" style={{ margin: 0 }}>
          <div className="sec-title">Efficiency by Department</div>
          <div className="v-stack" style={{ gap: 12, marginTop: 16 }}>
            {depts.map(d => (
              <div key={d.name} className="bar-row">
                <span className="bar-label" style={{ width: 100 }}>{d.name}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${d.yes}%`, background: d.color }}></div></div>
                <span className="bar-pct">{d.yes}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="frame" style={{ margin: 0 }}>
          <div className="sec-title">Strategy Adoption Rate</div>
          <div className="v-stack" style={{ gap: 12, marginTop: 16 }}>
             {[
               { name: 'P. Sharma', rate: 94 },
               { name: 'J. Okafor', rate: 88 },
               { name: 'A. Patel', rate: 82 },
               { name: 'M. Chen', rate: 76 }
             ].map(m => (
              <div key={m.name} className="bar-row">
                <span className="bar-label" style={{ width: 100 }}>{m.name}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${m.rate}%`, background: 'var(--purple-bg)' }}></div></div>
                <span className="bar-pct" style={{ color: 'var(--purple)' }}>{m.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PERFORMANCE HEAT MAP */}
      <div className="frame">
        <div className="sec-title">Performance Heat Map — Historical Patterns</div>
        <div className="heatmap-container" style={{ marginTop: 16 }}>
          <table className="heatmap-table">
            <thead>
              <tr>
                <th style={{ width: 200 }}>Department</th>
                {['Jan', 'Feb', 'Mar', 'Apr'].map(m => <th key={m} style={{ textAlign: 'center' }}>{m}</th>)}
              </tr>
            </thead>
            <tbody>
              {depts.map(d => (
                <tr key={d.name}>
                  <td style={{ fontWeight: 700 }}>{d.name}</td>
                  {['jan', 'feb', 'mar', 'apr'].map(m => (
                    <td key={m} style={{ textAlign: 'center' }}>
                      <div style={{ 
                        background: d[m] > 75 ? 'var(--cyan-bg)' : 'var(--yellow-bg)', 
                        color: d[m] > 75 ? 'var(--cyan)' : 'var(--yellow)',
                        padding: '6px 0', borderRadius: 4, fontWeight: 700, fontSize: 13
                      }}>
                        {d[m]}%
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ACTION ROW */}
      <div className="h-stack" style={{ gap: 16, marginTop: 32, marginBottom: 40 }}>
         <button className="btn-outline">Export Strategic Report</button>
         <button className="btn-outline">Team Notifications</button>
         <button className="btn-primary" style={{ marginLeft: 'auto', background: 'var(--purple)', border: 'none' }}>Broadcast Directives</button>
      </div>
    </div>
  );
}


// ── MAIN APPLICATION ──
export default function App() {
  const [page, setPage] = useState("overview");
  const [role, setRole] = useState("Employee");
  const [profile, setProfile] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: "", color: "" });
  const navigate = useNavigate();
  const timerRef = useRef();

  useEffect(() => {
    async function initSession() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
      } else {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('auth_email', user.email).single();
        setProfile(profileData);
        if (profileData?.role === 'manager') setRole('Manager');
        else if (profileData?.role === 'hr') setRole('HR');
      }
    }
    initSession();
  }, [navigate]);

  function showToast(msg, color) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ show: true, msg, color });
    timerRef.current = setTimeout(() => setToast({ show: false, msg: "", color: "" }), 3000);
  }


  const TABS = [
    ["overview", "◆ Overview"],
    ["employee", "○ Employee"],
    ["manager", "◈ Manager"],
    ["hr", "◆ HR Dashboard"],
    ["themes", "◈ Themes"]
  ];

  return (
    <div className="pr-wrap">
      <nav className="nav">
        <div className="nav-logo" onClick={() => setPage("overview")}>
          <div className="nav-dot" />
          <span>PulseReview</span>
        </div>
        <div className="nav-tabs">
          {TABS.map(([id, label]) => (
            <button key={id} className={`nav-tab ${page === id ? "active" : ""}`} onClick={() => setPage(id)}>{label}</button>
          ))}
        </div>
        <div className="nav-right">
          <div className="nav-user" onClick={() => supabase.auth.signOut().then(() => navigate("/"))}>
             {profile?.first_name} {profile?.last_name}
             <div className="avatar">{getInitials(profile)}</div>
          </div>
        </div>
      </nav>

      {page === "overview" && <Overview profile={profile} />}
      {page === "employee" && <Employee profile={profile} activeUser={profile?.id} showToast={showToast} />}
      {page === "manager" && <ManagerPortal profile={profile} activeUser={profile?.id} showToast={showToast} />}
      {page === "hr" && <HRDashboard profile={profile} activeUser={profile?.id} showToast={showToast} />}
      {page === "themes" && <Themes />}
      
      <Toast {...toast} />
    </div>
  );
}

// ── THEMES PAGE ──
function Themes() {
  const [allThemes, setAllThemes] = React.useState([]);

  React.useEffect(() => {
    supabase.from('themes').select('*, profiles(first_name, last_name)').order('submitted_at', { ascending: false })
      .then(({data}) => setAllThemes(data || []));
  }, []);

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      {/* HEADER */}
      <div className="portal-label">◈ THEMES WORKFLOW</div>
      <div className="page-title">Theme <span>Validation</span></div>
      <div className="page-sub">Employee-owned themes · Manager validation · Status tracking · Locked outcomes</div>

      {/* LIFECYCLE FLOW */}
      <div className="frame" style={{ marginTop: 24, paddingBottom: 8 }}>
        <div className="sec-title">Theme Lifecycle</div>
        <div className="flow-lifecycle" style={{ marginTop: 16 }}>
          <div className="lifecycle-step done"><span>Manager Direction</span></div><div className="lifecycle-arrow">→</div>
          <div className="lifecycle-step done"><span>Employee Creates</span></div><div className="lifecycle-arrow">→</div>
          <div className="lifecycle-step active"><span>Employee Submits</span></div><div className="lifecycle-arrow">→</div>
          <div className="lifecycle-step"><span>Manager Reviews</span></div><div className="lifecycle-arrow">→</div>
          <div className="lifecycle-step"><span>Locked & Recorded</span></div>
        </div>
        <div className="h-stack" style={{ gap: 8, marginTop: 12 }}>
          {['Pending', 'Approved', 'Returned for Revision', 'Rejected', 'Finalized'].map(s => (
             <Badge key={s} cls={s.toLowerCase() === 'approved' ? 'green' : s.toLowerCase() === 'pending' ? 'yellow' : s.toLowerCase() === 'finalized' ? 'blue' : 'gray'}>{s}</Badge>
          ))}
        </div>
      </div>

      <div className="grid-2-1" style={{ marginTop: 32 }}>
        {/* LEFT: THEME LIST */}
        <div className="v-stack" style={{ gap: 16 }}>
          <div className="sec-title">All Themes — April 2025</div>
          {allThemes.map(t => (
            <div key={t.id} className="theme-card" style={{ margin: 0, borderLeftWidth: 6 }}>
              <div className="theme-card-header">
                <div className="theme-card-name" style={{ fontSize: 16 }}>{t.title}</div>
                <Badge cls={t.status === 'approved' ? 'green' : t.status === 'pending_review' ? 'yellow' : 'blue'}>
                  {t.status === 'pending_review' ? 'Pending' : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </Badge>
              </div>
                <div className="theme-card-cat" style={{ fontSize: 13 }}>
                   {t.profiles?.first_name} {t.profiles?.last_name} · {t.category} · Submitted {new Date(t.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="v-stack" style={{ gap: 24 }}>
          <div className="frame" style={{ margin: 0 }}>
            <div className="sec-title">Theme Field Requirements</div>
            <table className="req-table" style={{ marginTop: 12 }}>
              <tbody>
                {[
                  { name: 'Theme title', tag: 'Required', cls: 'required' },
                  { name: 'Theme category', tag: 'Required', cls: 'required' },
                  { name: 'Short description', tag: 'Required', cls: 'required' },
                  { name: 'Review period', tag: 'Required', cls: 'required' },
                  { name: 'Link to objective / project', tag: 'Optional', cls: 'optional' },
                  { name: 'Employee evidence / comments', tag: 'Required', cls: 'required' },
                  { name: 'Manager comments', tag: 'Required', cls: 'required' },
                  { name: 'Validation status → dates', tag: 'Auto tracked', cls: 'required' },
                ].map(r => (
                  <tr key={r.name}>
                    <td style={{ color: 'var(--text2)', fontWeight: 500 }}>{r.name}</td>
                    <td style={{ textAlign: 'right' }}><span className={`req-tag ${r.cls}`}>{r.tag}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="frame" style={{ margin: 0 }}>
            <div className="sec-title">Monthly Cycle Summary</div>
            <div className="v-stack" style={{ marginTop: 20 }}>
              {[
                { title: 'Manager sets theme direction', date: 'Apr 1 — Communicated to all direct reports', done: true },
                { title: 'Employee theme submission window', date: 'Apr 5-16 — 47 of 53 themes submitted', done: true },
                { title: 'Manager validation period', date: 'Apr 16-25 — 31 validations remaining', done: false },
                { title: '4 binary monthly inputs', date: 'Apr 25-30 — Manager completes for each report', done: false },
                { title: 'Cycle close & lock', date: 'Apr 30 — Results finalized, dashboard updated', done: false },
              ].map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className={`timeline-dot ${item.done ? 'done' : ''}`} />
                  <div className="timeline-content">
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-date">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
