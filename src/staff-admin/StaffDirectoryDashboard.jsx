import { useState } from "react";
import { T } from "../constants/theme";
import { getAll, saveAll, clearAll } from "./store";
import { friars as fallbackFriars, staff as fallbackStaff } from "../data/staff";
import { Plus, Trash2, Save, RotateCcw, Users } from "lucide-react";

const INPUT = {
  width: "100%",
  padding: "8px 12px",
  fontSize: 14,
  fontFamily: "'Source Sans 3', sans-serif",
  border: `1.5px solid ${T.stone}`,
  borderRadius: 6,
  outline: "none",
  background: "#fff",
  color: T.charcoal,
  boxSizing: "border-box",
};

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function GroupEditor({ label, rows, onChange }) {
  const update = (idx, field, val) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, [field]: val } : r));
    onChange(next);
  };

  const addRow = () => onChange([...rows, { id: generateId(), name: "", role: "", photo: "" }]);
  const removeRow = (idx) => onChange(rows.filter((_, i) => i !== idx));

  return (
    <div style={{ background: "#fff", border: `1px solid ${T.stone}`, borderRadius: 10, padding: 20, marginBottom: 16 }}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: T.softBlack, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <Users size={18} color={T.burgundy} /> {label}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((row, idx) => (
          <div key={row.id || idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, alignItems: "center" }}>
            <input value={row.name} onChange={(e) => update(idx, "name", e.target.value)} placeholder="Name" style={INPUT} />
            <input value={row.role} onChange={(e) => update(idx, "role", e.target.value)} placeholder="Role / title" style={INPUT} />
            <input value={row.photo || ""} onChange={(e) => update(idx, "photo", e.target.value)} placeholder="Photo URL (optional)" style={INPUT} />
            <button onClick={() => removeRow(idx)} style={{ background: "none", border: "none", color: T.warmGray, cursor: "pointer", padding: 6 }} aria-label="Remove">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addRow}
        style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "transparent", color: T.burgundy, border: `1.5px dashed ${T.stone}`, borderRadius: 6, fontSize: 13, fontWeight: 500, fontFamily: "'Source Sans 3', sans-serif", cursor: "pointer" }}
      >
        <Plus size={14} /> Add Person
      </button>
    </div>
  );
}

export default function StaffDirectoryDashboard({ onToast }) {
  const stored = getAll();
  const [friars, setFriars] = useState(stored?.friars || fallbackFriars);
  const [staff, setStaff] = useState(stored?.staff || fallbackStaff);
  const [dirty, setDirty] = useState(false);

  const handleFriarsChange = (next) => { setFriars(next); setDirty(true); };
  const handleStaffChange = (next) => { setStaff(next); setDirty(true); };

  const handleSave = () => {
    saveAll({ friars, staff });
    setDirty(false);
    onToast?.({ message: "Staff directory updated!", type: "success" });
  };

  const handleReset = () => {
    if (window.confirm("Reset staff directory to defaults? All edits will be lost.")) {
      clearAll();
      setFriars(fallbackFriars);
      setStaff(fallbackStaff);
      setDirty(false);
      onToast?.({ message: "Directory reset to defaults.", type: "success" });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: T.softBlack, margin: 0 }}>Staff Directory</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: T.warmGray, margin: "4px 0 0" }}>
            Friars and staff members. Role can be plain text.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleReset}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "transparent", color: T.warmGray, border: `1.5px solid ${T.stone}`, borderRadius: 8, fontSize: 13, fontWeight: 500, fontFamily: "'Source Sans 3', sans-serif", cursor: "pointer" }}
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!dirty}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", background: dirty ? T.burgundy : T.stone, color: dirty ? "#fff" : T.warmGray, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif", cursor: dirty ? "pointer" : "default" }}
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      <GroupEditor label="Friars" rows={friars} onChange={handleFriarsChange} />
      <GroupEditor label="Staff" rows={staff} onChange={handleStaffChange} />
    </div>
  );
}
