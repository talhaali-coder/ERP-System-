
function StatusBadge({ status }) {
  const value = String(status || "Active").toLowerCase().replaceAll(" ", "-");

  return (
    <span className={`status-badge status-${value}`}>
      {status}
    </span>
  );
}

export default StatusBadge;

