const TYPE_COLORS = {
  District: { bg: '#722F37', text: '#fff' },
  Division: { bg: '#1a3a6b', text: '#fff' },
  Area: { bg: '#8B0000', text: '#fff' },
  Club: { bg: '#b8860b', text: '#fff' },
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
