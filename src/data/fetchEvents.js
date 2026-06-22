const SHEET_ID = '1Me6ztNQjLqQFyTSJ997NgoN-qn1ptevFAW0jqS7ngZ8';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  values.push(current.trim());
  return values;
}

// Normalise any date string to YYYY-MM-DD
function normaliseDate(raw) {
  if (!raw) return '';
  const trimmed = raw.trim();
  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  // DD/MM/YYYY
  const dmyMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmyMatch) {
    const [, d, m, y] = dmyMatch;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  // "Sat, 4 Jul" style — append current year
  const withYear = `${trimmed} ${new Date().getFullYear()}`;
  const d = new Date(withYear);
  if (!isNaN(d)) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  // Last resort: parse as-is
  const d2 = new Date(trimmed);
  if (!isNaN(d2)) {
    return `${d2.getFullYear()}-${String(d2.getMonth() + 1).padStart(2, '0')}-${String(d2.getDate()).padStart(2, '0')}`;
  }
  return trimmed;
}

// Convert 24h time (18:30) or 12h (6:30 PM) to 12h format
function normaliseTime(raw) {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (/AM|PM/i.test(trimmed)) return trimmed; // already 12h
  const [h, m] = trimmed.split(':').map(Number);
  if (isNaN(h)) return trimmed;
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1)
    .filter(line => line.trim())
    .map((line, index) => {
      const values = parseCSVLine(line);
      const obj = {};
      headers.forEach((h, i) => { obj[h] = values[i] ?? ''; });
      if (!obj.id || !obj.id.trim()) obj.id = String(index + 1);

      obj.date      = normaliseDate(obj.date);
      obj.startTime = normaliseTime(obj.startTime);
      obj.endTime   = normaliseTime(obj.endTime);

      obj.accessLevel = obj.accessLevel && obj.accessLevel.trim()
        ? obj.accessLevel.split(',').map(s => s.trim()).filter(Boolean)
        : ['public', 'district', 'division', 'area', 'club'];

      ['area', 'division', 'zoomLink', 'meetingId', 'passcode', 'language', 'dressCode'].forEach(k => {
        if (!obj[k]) obj[k] = null;
      });

      return obj;
    });
}

export async function fetchEvents() {
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error('Failed to fetch events');
  const text = await res.text();
  return parseCSV(text);
}
