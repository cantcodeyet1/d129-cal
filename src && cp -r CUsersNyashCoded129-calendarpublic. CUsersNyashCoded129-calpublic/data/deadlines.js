export const deadlines = [
  {
    id: 'd1',
    title: 'Club Officer List Submission',
    description: 'Submit your club officer list for 2025–2026',
    appliesTo: 'All Clubs',
    dueDate: '2025-05-15',
    status: 'Upcoming',
    daysLabel: 'In 8 days',
    accessLevel: ['public', 'district', 'division', 'area', 'club'],
  },
  {
    id: 'd2',
    title: 'Area Council Meeting Report',
    description: 'Submit April Area Council meeting report',
    appliesTo: 'Area Directors',
    dueDate: '2025-05-20',
    status: 'Upcoming',
    daysLabel: 'In 13 days',
    accessLevel: ['district', 'division', 'area'],
  },
  {
    id: 'd3',
    title: 'District Alignment Call Preparation',
    description: 'Review materials and prep for alignment call',
    appliesTo: 'Area & Division Directors',
    dueDate: '2025-05-20',
    status: 'Upcoming',
    daysLabel: 'In 13 days',
    accessLevel: ['district', 'division', 'area'],
  },
  {
    id: 'd4',
    title: 'Club Officer Training Completion',
    description: 'Complete training and submit confirmation',
    appliesTo: 'Club Officers',
    dueDate: '2025-05-31',
    status: 'Upcoming',
    daysLabel: 'In 24 days',
    accessLevel: ['public', 'district', 'division', 'area', 'club'],
  },
  {
    id: 'd5',
    title: 'District 129 Annual Conference Early Bird Registration Ends',
    description: '',
    appliesTo: 'All Members',
    dueDate: '2025-06-15',
    status: 'Upcoming',
    daysLabel: 'In 39 days',
    accessLevel: ['public', 'district', 'division', 'area', 'club'],
  },
];

export const getDeadlinesForLevel = (level) => {
  return deadlines.filter(d => d.accessLevel.includes(level));
};
