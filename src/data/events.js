/**
 * Static fallback events data.
 * In production, this is replaced by live data from the Google Sheets CMS
 * "Events" tab: date | title | description | category | time | location
 *
 * Categories: mass | sacrament | education | social | prayer | other
 */
export const events = [
  {
    id: "1",
    date: "2026-04-13",
    title: "Palm Sunday Procession",
    description: "Join us for the solemn procession and Mass marking the beginning of Holy Week.",
    category: "mass",
    time: "10:30 AM",
    location: "Church",
  },
  {
    id: "2",
    date: "2026-04-17",
    title: "Holy Thursday Mass of the Lord's Supper",
    description: "Evening Mass commemorating the institution of the Eucharist and Holy Orders. Foot washing ceremony included.",
    category: "mass",
    time: "7:00 PM",
    location: "Church",
  },
  {
    id: "3",
    date: "2026-04-18",
    title: "Good Friday Stations & Liturgy",
    description: "Stations of the Cross at noon followed by the Celebration of the Lord's Passion in the afternoon.",
    category: "prayer",
    time: "12:00 PM",
    location: "Church",
  },
  {
    id: "4",
    date: "2026-04-19",
    title: "Easter Vigil",
    description: "The greatest night of the year. Reception of new members into the Church. All are welcome.",
    category: "mass",
    time: "8:00 PM",
    location: "Church",
  },
  {
    id: "5",
    date: "2026-04-20",
    title: "Easter Sunday Mass",
    description: "Celebrate the Resurrection of the Lord at our Easter Sunday Masses.",
    category: "mass",
    time: "8:00 AM, 10:30 AM, 1:00 PM",
    location: "Church",
  },
  {
    id: "6",
    date: "2026-04-27",
    title: "RCIA Meeting",
    description: "Weekly gathering for those exploring the Catholic faith. New inquirers always welcome.",
    category: "education",
    time: "7:00 PM",
    location: "Parish Hall",
  },
  {
    id: "7",
    date: "2026-05-04",
    title: "First Communion",
    description: "Our second graders receive the Eucharist for the first time. Please keep them in your prayers.",
    category: "sacrament",
    time: "10:30 AM",
    location: "Church",
  },
  {
    id: "8",
    date: "2026-05-10",
    title: "Mother's Day Church Breakfast",
    description: "A community brunch to celebrate mothers in our church family. All are invited.",
    category: "social",
    time: "After 10:30 AM Mass",
    location: "Parish Hall",
  },
];
