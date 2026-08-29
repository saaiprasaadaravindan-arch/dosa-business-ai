const navItems = ["Dashboard", "Properties", "Suppliers & ingredients", "Costs", "Customers", "Orders & deliveries", "Research reports", "Financial scenarios", "Team access"];
const cards = [
  ["Daily production target", "200 kg", "Initial planning assumption"],
  ["Planned facility", "800+ m²", "Leased factory requirement"],
  ["Initial delivery radius", "~300 km", "From Warsaw region"],
  ["Product portfolio", "1", "Dosa batter — initial product"],
];

export default function DashboardPage() {
  return <main className="shell">
    <aside className="sidebar"><div className="brand"><span className="brand-mark">D</span>Dosa Business AI</div><p className="eyebrow">Workspace</p><nav>{navItems.map((item, index) => <a className={`nav-link ${index === 0 ? "active" : ""}`} href="#" key={item}>{item}</a>)}</nav><div className="profile"><strong>Owner workspace</strong>Role-aware access foundation</div></aside>
    <section className="content"><header className="topbar"><div><h1>Business foundation</h1><p className="subtitle">A private workspace for planning the Dosa Business AI venture.</p></div><span className="status">Phase 1 · Foundation</span></header>
      <div className="grid">{cards.map(([label, value, note]) => <article className="card" key={label}><div className="card-label">{label}</div><div className="card-value">{value}</div><div className="card-note">{note}</div></article>)}</div>
      <div className="workspace"><section className="card"><h2 className="panel-title">Workspace readiness</h2><p className="panel-text">The platform structure is ready for connected data, governed access, and evidence-based decisions. Operational information has not been entered yet.</p><ul className="checklist"><li><span>Configure secure PostgreSQL database</span><span className="tag">Next</span></li><li><span>Connect identity provider and invite team</span><span className="tag">Next</span></li><li><span>Add validated business records</span><span className="tag">Future</span></li></ul></section>
      <section className="card chat"><h2 className="panel-title">AI assistant</h2><p className="panel-text">Research and decision support will be added after AI provider configuration.</p><div className="message">I’m the Dosa Business AI assistant. This secure workspace is ready for future analysis; I do not yet retrieve external research or make calculations.</div><form className="composer"><input aria-label="Message the AI assistant" disabled placeholder="AI assistant coming soon"/><button type="button" disabled>Send</button></form></section></div>
      <div className="notice">No business data is shown as fact. The figures above are the initial planning assumptions supplied for this project.</div>
    </section>
  </main>;
}
