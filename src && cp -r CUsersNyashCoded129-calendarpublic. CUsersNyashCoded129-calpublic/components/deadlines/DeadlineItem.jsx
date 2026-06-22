import Icon from '../ui/Icon';

const ICON_COLORS = {
  'All Clubs':               { bg: '#b8860b', icon: 'clipboard' },
  'Area Directors':          { bg: '#8B0000', icon: 'document'  },
  'Area & Division Directors': { bg: '#1a3a6b', icon: 'document' },
  'Club Officers':           { bg: '#b8860b', icon: 'check'     },
  'All Members':             { bg: '#722F37', icon: 'calendar'  },
};

export default function DeadlineItem({ deadline }) {
  const style = ICON_COLORS[deadline.appliesTo] || { bg: '#4a5568', icon: 'clipboard' };
  return (
    <div className="deadline-item">
      <div className="deadline-icon" style={{ backgroundColor: style.bg }}>
        <Icon name={style.icon} size={16} color="#fff" />
      </div>
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
