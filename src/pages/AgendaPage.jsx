import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../components/layout/Header';
import AgendaItem from '../components/agenda/AgendaItem';
import { events } from '../data/events';

const TABS = ['Upcoming', 'This Week', 'This Month', 'All'];

export default function AgendaPage() {
  const { accessLevel, baseUrl, title } = useOutletContext();
  const [tab, setTab] = useState('Upcoming');

  const filtered = events.filter(e => e.accessLevel.includes(accessLevel));

  const grouped = {};
  filtered.forEach(ev => {
    const d = new Date(ev.date);
    const label = d.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(ev);
  });

  return (
    <div className="page">
      <Header title={title} accessLevel={accessLevel} />
      <div className="agenda-page">
        <div className="agenda-tabs">
          {TABS.map(t => (
            <button
              key={t}
              className={`agenda-tab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
          <button className="cal-filter-btn ml-auto">⊟ Filter</button>
        </div>
        <div className="agenda-groups">
          {Object.entries(grouped).map(([month, evs]) => (
            <div key={month} className="agenda-group">
              <div className="agenda-group-label">{month}</div>
              {evs.map(ev => (
                <AgendaItem key={ev.id} event={ev} baseUrl={baseUrl} />
              ))}
            </div>
          ))}
        </div>
        <button className="show-more-btn">Show More Events ⌄</button>
      </div>
    </div>
  );
}
