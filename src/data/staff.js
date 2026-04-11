export const friars = [
  { id: "frassati-davis", name: "Rev. Frassati Davis, O.P.", role: "pastor" },
  { id: "charles-rooney", name: "Rev. Charles Marie Rooney, O.P.", role: "associate" },
  { id: "john-kozlowski", name: "Rev. John Chrysostom Kozlowski, O.P.", role: "inResidence" },
  { id: "bernard-confer", name: "Rev. Bernard Confer, O.P.", role: "inResidence" },
  { id: "gregory-salomone", name: "Rev. Gregory Salomone, O.P.", role: "inResidence" },
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
