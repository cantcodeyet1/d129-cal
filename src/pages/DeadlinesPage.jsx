import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../components/layout/Header';
import DeadlineItem from '../components/deadlines/DeadlineItem';
import { getDeadlinesForLevel } from '../data/deadlines';

const TABS = ['Upcoming', 'This Month', 'Next 3 Months', 'All'];

export default function DeadlinesPage() {
  const { accessLevel, title } = useOutletContext();
  const [tab, setTab] = useState('Upcoming');
  const deadlines = getDeadlinesForLevel(accessLevel);

  return (
    <div className="page">
      <Header title={title} accessLevel={accessLevel} />
      <div className="deadlines-page">
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

        <div className="deadlines-table">
          <div className="deadlines-thead">
            <span>DEADLINE</span>
            <span>TITLE</span>
            <span>APPLIES TO</span>
            <span>DUE DATE</span>
            <span>STATUS</span>
          </div>
          {deadlines.map(d => (
            <DeadlineItem key={d.id} deadline={d} />
          ))}
        </div>

        <button className="show-more-btn">View All Deadlines</button>
      </div>
    </div>
  );
}
