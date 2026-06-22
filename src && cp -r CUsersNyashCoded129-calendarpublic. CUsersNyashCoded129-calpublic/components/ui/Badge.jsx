const TYPE_COLORS = {
  District: { bg: '#004165', text: '#fff' },
  Division: { bg: '#2a6496', text: '#fff' },
  Area: { bg: '#772432', text: '#fff' },
  Club: { bg: '#b8860b', text: '#f2df74' },
  Other: { bg: '#4a5568', text: '#fff' },
};

export default function Badge({ type, className = '' }) {
  const colors = TYPE_COLORS[type] || TYPE_COLORS.Other;
  return (
    <span
      className={`badge ${className}`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {type}
    </span>
  );
}
