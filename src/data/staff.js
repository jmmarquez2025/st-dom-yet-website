export const friars = [
  { id: "frassati-davis", name: "Fr. Frassati Davis, O.P.", role: "pastor", photo: "/photos/davis_frassati.jpg" },
  { id: "charles-rooney", name: "Fr. Charles Marie Rooney, O.P.", role: "associate", photo: "/photos/rooney_charles.jpg" },
  { id: "john-kozlowski", name: "Fr. John Chrysostom Kozlowski, O.P.", role: "inResidence" },
  { id: "bernard-confer", name: "Fr. Bernard Confer, O.P.", role: "inResidence" },
  { id: "gregory-salomone", name: "Fr. Gregory Salomone, O.P.", role: "inResidence" },
];

export const staff = [
  { id: "sylvia-gould", name: "Sylvia Gould", role: "parishSecretary" },
  { id: "alec-ring", name: "Alec Ring", role: "musicDirector" },
];

export function initials(name) {
  return name
    .split(" ")
    .filter((w) => w.length > 2 && !w.includes("."))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}
