const ICON_COLORS = {
  'All Clubs': { bg: '#b8860b', icon: '📋' },
  'Area Directors': { bg: '#8B0000', icon: '📄' },
  'Area & Division Directors': { bg: '#1a3a6b', icon: '📄' },
  'Club Officers': { bg: '#b8860b', icon: '✔️' },
  'All Members': { bg: '#722F37', icon: '📅' },
};

export default function DeadlineItem({ deadline }) {
  const style = ICON_COLORS[deadline.appliesTo] || { bg: '#4a5568', icon: '📋' };
  return (
    <div className="deadline-item">
      <div className="deadline-icon" style={{ backgroundColor: style.bg }}>{style.icon}</div>
      <div className="deadline-info">
        <div className="deadline-title">{deadline.title}</div>
        {deadline.description && (
          <div className="deadline-desc">{deadline.description}</div>
        )}
      </div>
      <div className="deadline-applies">{deadline.appliesTo}</div>
      <div className="deadline-date">{deadline.dueDate}</div>
      <div className="deadline-status">
        <span className="deadline-badge upcoming">{deadline.status}</span>
        <span className="deadline-days">{deadline.daysLabel}</span>
      </div>
    </div>
  );
}
