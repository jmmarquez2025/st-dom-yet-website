export const friars = [
  { id: "frassati-davis", name: "Rev. Frassati Davis, O.P.", role: "pastor" },
  { id: "bernard-confer", name: "Rev. Bernard Confer, O.P.", role: "associate" },
  { id: "charles-rooney", name: "Rev. Charles Rooney, O.P.", role: "associate" },
];

export const staff = [
  { id: "michele-seese", name: "Michele Seese", role: "parishSecretary" },
  { id: "karen-barr", name: "Karen Barr", role: "musicDirector" },
  { id: "sylvia-gould", name: "Sylvia Gould", role: "religiousEdCoordinator" },
  { id: "paulina-montaldo", name: "Paulina Montaldo", role: "parochialAssistant" },
];

export function initials(name) {
  return name
    .split(" ")
    .filter((w) => w.length > 2 && !w.includes("."))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}
