import { useOutletContext } from 'react-router-dom';
import Header from '../components/layout/Header';

const RESOURCES = [
  { title: 'Club Officer Training Materials', type: 'PDF', size: '1.2 MB', icon: '📄' },
  { title: 'DCP Goal Tracker', type: 'XLSX', size: '340 KB', icon: '📊' },
  { title: 'Area Director Handbook', type: 'PDF', size: '890 KB', icon: '📄' },
  { title: 'Club Visit Report Template', type: 'DOCX', size: '136 KB', icon: '📝' },
  { title: 'District 129 Branding Guide', type: 'PDF', size: '2.1 MB', icon: '🎨' },
  { title: 'Contest Rulebook 2025', type: 'PDF', size: '560 KB', icon: '📄' },
];

export default function ResourcesPage() {
  const { accessLevel, title } = useOutletContext();
  return (
    <div className="page">
      <Header title={title} accessLevel={accessLevel} />
      <div className="resources-page">
        <div className="resources-grid">
          {RESOURCES.map((r, i) => (
            <div key={i} className="resource-card">
              <div className="resource-icon">{r.icon}</div>
              <div className="resource-info">
                <div className="resource-title">{r.title}</div>
                <div className="resource-meta">{r.type} · {r.size}</div>
              </div>
              <button className="att-download">⬇</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
