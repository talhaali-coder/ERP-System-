function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  tone = "green",
  note,
}) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon metric-${tone}`}>
          {Icon && <Icon size={20} />}
        </span>

        {change && (
          <span
            className={`metric-change ${
              change.startsWith("-") ? "negative" : ""
            }`}
          >
            {change.startsWith("-") ? "↓" : "↑"} {change}
          </span>
        )}
      </div>

      <p className="metric-label">{title}</p>
      <h2>{value}</h2>

      <span className="metric-note">
        {note || "Compared with previous period"}
      </span>
    </article>
  );
}

export default MetricCard;