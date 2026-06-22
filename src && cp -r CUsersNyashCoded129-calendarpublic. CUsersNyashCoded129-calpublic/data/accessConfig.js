export const ACCESS_CONFIG = {
  public: {
    level: 'public',
    label: 'All Members',
    role: null,
    division: null,
    area: null,
    club: null,
  },
  district: {
    level: 'district',
    label: 'District Director',
    role: 'District Director',
    division: null,
    area: null,
    club: null,
  },
  division: {
    level: 'division',
    label: 'Division Director',
    role: 'Division Director',
    division: 'Division E',
    area: null,
    club: null,
  },
  area: {
    level: 'area',
    label: 'Area Director',
    role: 'Area Director',
    division: 'Division E',
    area: 'Area 42',
    club: null,
  },
  club: {
    level: 'club',
    label: 'Club Officer',
    role: 'Club Officer',
    division: 'Division E',
    area: 'Area 42',
    club: 'Club 1234',
  },
};

export const ROUTES = {
  public: '/',
  district: '/d129/crest',
  division: '/d129/ridge/div-e',
  area: '/d129/summit/area-42',
  club: '/d129/base/club-1234',
};

export const USER_PROFILES = {
  public: { name: 'Guest', initials: 'G' },
  district: { name: 'District Director', initials: 'DD' },
  division: { name: 'Jane Doe', initials: 'JD' },
  area: { name: 'John Doe', initials: 'JD' },
  club: { name: 'Club Officer', initials: 'CO' },
};
