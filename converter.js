const STORAGE_KEY = "everyday-convert-history";

const UNIT_DATA = {
  length: { label: "ความยาว", icon: "↔", units: { m: ["เมตร", 1], km: ["กิโลเมตร", 1000], cm: ["เซนติเมตร", 0.01], mm: ["มิลลิเมตร", 0.001], in: ["นิ้ว", 0.0254], ft: ["ฟุต", 0.3048], yd: ["หลา", 0.9144], mi: ["ไมล์", 1609.344] } },
  weight: { label: "น้ำหนัก", icon: "⚖", units: { kg: ["กิโลกรัม", 1], g: ["กรัม", 0.001], mg: ["มิลลิกรัม", 0.000001], lb: ["ปอนด์", 0.45359237], oz: ["ออนซ์", 0.0283495] } },
  temperature: { label: "อุณหภูมิ", icon: "℃", units: { c: ["เซลเซียส", "c"], f: ["ฟาเรนไฮต์", "f"], k: ["เคลวิน", "k"] } },
  area: { label: "พื้นที่", icon: "□", units: { sqm: ["ตารางเมตร", 1], sqkm: ["ตารางกิโลเมตร", 1000000], rai: ["ไร่", 1600], ngan: ["งาน", 400], sqwah: ["ตารางวา", 4], sqft: ["ตารางฟุต", 0.092903] } },
  volume: { label: "ปริมาตร", icon: "▱", units: { l: ["ลิตร", 1], ml: ["มิลลิลิตร", 0.001], cup: ["ถ้วย", 0.236588], tbsp: ["ช้อนโต๊ะ", 0.0147868], gal: ["แกลลอน", 3.78541] } },
  speed: { label: "ความเร็ว", icon: "➜", units: { kph: ["กม./ชม.", 1], mph: ["ไมล์/ชม.", 1.609344], mps: ["เมตร/วินาที", 3.6], knot: ["นอต", 1.852] } },
  time: { label: "เวลา", icon: "◷", units: { sec: ["วินาที", 1], min: ["นาที", 60], hr: ["ชั่วโมง", 3600], day: ["วัน", 86400], week: ["สัปดาห์", 604800] } },
  data: { label: "ข้อมูล", icon: "▦", units: { byte: ["ไบต์", 1], kb: ["กิโลไบต์", 1024], mb: ["เมกะไบต์", 1048576], gb: ["กิกะไบต์", 1073741824], tb: ["เทราไบต์", 1099511627776] } },
};

const quickConversions = [
  ["length", "m", "ft", "เมตร → ฟุต"], ["weight", "kg", "lb", "กิโลกรัม → ปอนด์"],
  ["temperature", "c", "f", "เซลเซียส → ฟาเรนไฮต์"], ["volume", "l", "cup", "ลิตร → ถ้วย"],
];
let category = "length";
const $ = (id) => document.getElementById(id);

function formatNumber(value) {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("th-TH", { maximumFractionDigits: 8 }).format(value);
}
function convert(value, from, to) {
  if (category === "temperature") {
    const celsius = from === "c" ? value : from === "f" ? (value - 32) * 5 / 9 : value - 273.15;
    return to === "c" ? celsius : to === "f" ? celsius * 9 / 5 + 32 : celsius + 273.15;
  }
  const units = UNIT_DATA[category].units;
  return value * units[from][1] / units[to][1];
}
function populateUnits() {
  const units = UNIT_DATA[category].units;
  [$("from-unit"), $("to-unit")].forEach((select) => {
    select.innerHTML = Object.entries(units).map(([key, [label]]) => `<option value="${key}">${label}</option>`).join("");
  });
  $("from-unit").value = category === "length" ? "m" : Object.keys(units)[0];
  $("to-unit").value = category === "length" ? "ft" : Object.keys(units)[1] || Object.keys(units)[0];
  updateResult();
}
function updateResult(save = false) {
  const value = Number($("amount").value);
  const from = $("from-unit").value;
  const to = $("to-unit").value;
  const units = UNIT_DATA[category].units;
  const result = convert(value, from, to);
  $("result-value").textContent = Number.isFinite(value) ? `${formatNumber(result)} ${units[to][0]}` : "กรอกตัวเลขเพื่อเริ่มแปลง";
  if (save && Number.isFinite(value)) addHistory({ category, value, from, to, result });
}
function addHistory(item) {
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]").filter((entry) => JSON.stringify(entry) !== JSON.stringify(item));
  history.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 5)));
  renderHistory();
}
function renderHistory() {
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  $("history-list").innerHTML = history.length ? history.map((item) => `<div class="history-item"><span><strong>${formatNumber(item.value)}</strong> ${UNIT_DATA[item.category].units[item.from][0]} → ${UNIT_DATA[item.category].units[item.to][0]}</span><span>${formatNumber(item.result)}</span></div>`).join("") : '<p class="empty-state">ยังไม่มีรายการแปลงหน่วย</p>';
}
function renderCategories() {
  $("category-tabs").innerHTML = Object.entries(UNIT_DATA).map(([key, data]) => `<button class="category-tab${key === category ? " active" : ""}" data-category="${key}" role="tab" aria-selected="${key === category}">${data.icon} ${data.label}</button>`).join("");
  document.querySelectorAll(".category-tab").forEach((button) => button.addEventListener("click", () => { category = button.dataset.category; renderCategories(); populateUnits(); renderShortcuts(); }));
}
function renderShortcuts() {
  $("shortcuts").innerHTML = quickConversions.map(([type, from, to, label]) => `<button class="shortcut-button" data-quick="${type}|${from}|${to}"><span>${label}</span><span aria-hidden="true">↗</span></button>`).join("");
  document.querySelectorAll(".shortcut-button").forEach((button) => button.addEventListener("click", () => { const [type, from, to] = button.dataset.quick.split("|"); category = type; renderCategories(); populateUnits(); $("from-unit").value = from; $("to-unit").value = to; updateResult(); }));
}
$("amount").addEventListener("input", () => updateResult());
$("from-unit").addEventListener("change", () => updateResult(true));
$("to-unit").addEventListener("change", () => updateResult(true));
$("swap-button").addEventListener("click", () => { const from = $("from-unit").value; $("from-unit").value = $("to-unit").value; $("to-unit").value = from; updateResult(true); });
$("copy-button").addEventListener("click", async () => { try { await navigator.clipboard.writeText($("result-value").textContent); $("copy-button").innerHTML = "✓ คัดลอกแล้ว"; setTimeout(() => { $("copy-button").innerHTML = "<span aria-hidden=\"true\">▣</span> คัดลอกผลลัพธ์"; }, 1400); } catch { /* Clipboard is unavailable in some file previews. */ } });
$("clear-history").addEventListener("click", () => { localStorage.removeItem(STORAGE_KEY); renderHistory(); });
renderCategories();
populateUnits();
renderShortcuts();
renderHistory();
