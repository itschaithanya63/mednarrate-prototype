function TopBar() {
  return (
    <div style={{ background: "var(--navy)", color: "#D7E4F0", fontSize: "12px", padding: "6px 20px", display: "flex", justifyContent: "flex-end", gap: "20px" }}>
      <span
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={() => alert("Accessibility options: font size, high contrast, and screen reader support are planned for a future update.")}
      >
        Accessibility
      </span>
      <span
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={() => alert("Need help? Contact your hospital's front desk or reach us at support@mednarrate.example (demo placeholder).")}
      >
        Help / Support
      </span>
    </div>
  );
}

export default TopBar;