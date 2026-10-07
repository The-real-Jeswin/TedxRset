/**
 * Generates and downloads a standard RFC 5545 iCalendar (.ics) file
 * for TEDxRSET 2026
 */

export function downloadCalendarEvent() {
  const event = {
    title: 'TEDxRSET 2026 — Resonance in Chaos',
    description:
      'Independently organized TEDx event at Rajagiri School of Engineering & Technology (RSET).\\nTheme: Resonance in Chaos\\nKeynotes, interactive tech showcases, and innovative ideas worth spreading.\\nOfficial Event: https://www.ted.com/tedx/events/70800',
    location: 'Gallery Hall, Rajagiri School of Engineering & Technology, Rajagiri Valley Road, Kakkanad, Ernakulam, Kerala 682030',
    start: '20261205T090000', // Dec 5, 2026 09:00 IST
    end: '20261205T180000',   // Dec 5, 2026 18:00 IST
    url: 'https://www.ted.com/tedx/events/70800'
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TEDxRSET//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    `DTSTART:${event.start}`,
    `DTEND:${event.end}`,
    `URL:${event.url}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'DESCRIPTION:Reminder: TEDxRSET 2026 tomorrow',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'TEDxRSET-2026.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
