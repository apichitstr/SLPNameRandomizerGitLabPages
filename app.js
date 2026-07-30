const STORAGE_KEY = "name-randomizer-v2";
const FILES = { A: "A.txt", B: "B.txt", C: "C.txt" };

const I18N = {
  en: {
    pageTitle: "Name Randomizer (A+C+B)",
    langLabel: "Language",
    tagText: "GitLab Pages Ready",
    mainTitle: "3-Part Name Randomizer",
    subHtml: "Tick <strong>A</strong>, <strong>B</strong>, <strong>C</strong> freely. If all are selected, pattern becomes <strong>A+C+B</strong>.",
    modeLabel: "Random pattern (A/B/C checkboxes)",
    modeHelp: "Word order is A → C → B (if all selected).",
    countLabel: "Number of results",
    generateBtn: "Generate",
    saveDraftBtn: "Save Draft (this device)",
    resetBtn: "Reload from A/B/C files",
    groupA: "Group A",
    groupB: "Group B",
    groupC: "Group C",
    resultTitle: "Generated results",
    copyBtn: "Copy all",
    noteText: "Note: GitLab Pages is a static site, so files cannot be overwritten on the server directly. Save buttons download .txt files to your device.",
    alerts: {
      emptySelection: "Please select at least one option: A, B, or C.",
      missingList: "List {key} is empty. Please add items first.",
      saveDraftDone: "Draft saved.",
      noResultToSave: "No result to save yet.",
      noResultToCopy: "No result to copy yet.",
      copied: "Copied.",
      copyFailed: "Copy failed.",
      generateFailed: "Generate failed.",
    },
  },
  th: {
    pageTitle: "โปรแกรมสุ่มชื่อ (A+C+B)",
    langLabel: "ภาษา",
    tagText: "พร้อมใช้งานบน GitLab Pages",
    mainTitle: "โปรแกรมสุ่มชื่อ 3 ท่อน",
    subHtml: "เลือกติ๊ก <strong>A</strong>, <strong>B</strong>, <strong>C</strong> ได้อิสระ เช่น ติ๊กครบจะเป็น <strong>A+C+B</strong>",
    modeLabel: "รูปแบบการสุ่ม (checkbox A/B/C)",
    modeHelp: "ลำดับการประกอบคำ: A → C → B (ถ้าติ๊กครบ)",
    countLabel: "จำนวนที่สุ่ม",
    generateBtn: "สุ่มชื่อ",
    saveDraftBtn: "บันทึก Draft (เครื่องนี้)",
    resetBtn: "โหลดจากไฟล์ A/B/C ใหม่",
    groupA: "ชุด A",
    groupB: "ชุด B",
    groupC: "ชุด C",
    resultTitle: "ผลลัพธ์การสุ่ม",
    copyBtn: "คัดลอกทั้งหมด",
    noteText: "หมายเหตุ: บน GitLab Pages เป็น static site จึงไม่สามารถเขียนไฟล์ทับบนเซิร์ฟเวอร์ได้โดยตรง ปุ่ม Save จะดาวน์โหลดไฟล์ .txt ลงเครื่องแทน",
    alerts: {
      emptySelection: "กรุณาติ๊กเลือกอย่างน้อย 1 ช่อง: A, B หรือ C",
      missingList: "รายการ {key} ว่างอยู่ กรุณาเติมข้อมูล",
      saveDraftDone: "บันทึก Draft เรียบร้อย",
      noResultToSave: "ยังไม่มีผลลัพธ์ให้บันทึก",
      noResultToCopy: "ยังไม่มีผลลัพธ์ให้คัดลอก",
      copied: "คัดลอกแล้ว",
      copyFailed: "คัดลอกไม่สำเร็จ",
      generateFailed: "สุ่มชื่อไม่สำเร็จ",
    },
  },
};

const dom = {
  modeA: document.getElementById("mode-a"),
  modeB: document.getElementById("mode-b"),
  modeC: document.getElementById("mode-c"),
  langSelect: document.getElementById("lang-select"),
  metaDescription: document.getElementById("meta-description"),
  langLabel: document.getElementById("lang-label"),
  tagText: document.getElementById("tag-text"),
  mainTitle: document.getElementById("main-title"),
  subText: document.getElementById("sub-text"),
  modeLabel: document.getElementById("mode-label"),
  modeHelp: document.getElementById("mode-help"),
  countLabel: document.getElementById("count-label"),
  groupATitle: document.getElementById("group-a-title"),
  groupBTitle: document.getElementById("group-b-title"),
  groupCTitle: document.getElementById("group-c-title"),
  resultTitle: document.getElementById("result-title"),
  noteText: document.getElementById("note-text"),
  count: document.getElementById("count"),
  listA: document.getElementById("list-a"),
  listB: document.getElementById("list-b"),
  listC: document.getElementById("list-c"),
  generateBtn: document.getElementById("generate-btn"),
  saveDraftBtn: document.getElementById("save-draft-btn"),
  resetBtn: document.getElementById("reset-btn"),
  exportResultBtn: document.getElementById("export-result-btn"),
  copyResultBtn: document.getElementById("copy-result-btn"),
  resultList: document.getElementById("result-list"),
};

let currentResults = [];
let currentLang = "en";

function t(path, replacements = {}) {
  const parts = path.split(".");
  let value = I18N[currentLang];
  for (const part of parts) {
    value = value?.[part];
  }
  let text = String(value ?? "");
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replaceAll(`{${k}}`, String(v));
  }
  return text;
}

function applyLanguage(lang) {
  currentLang = lang === "th" ? "th" : "en";
  document.documentElement.lang = currentLang;
  document.title = t("pageTitle");
  dom.langSelect.value = currentLang;

  dom.metaDescription.content = currentLang === "en"
    ? "Three-part name randomizer (A+C+B) with editable A/B/C lists and text export."
    : "โปรแกรมสุ่มชื่อ 3 ท่อน (A+C+B) พร้อมแก้ไขข้อมูล A/B/C และส่งออกไฟล์ข้อความ";

  dom.langLabel.textContent = t("langLabel");
  dom.tagText.textContent = t("tagText");
  dom.mainTitle.textContent = t("mainTitle");
  dom.subText.innerHTML = t("subHtml");
  dom.modeLabel.textContent = t("modeLabel");
  dom.modeHelp.textContent = t("modeHelp");
  dom.countLabel.textContent = t("countLabel");
  dom.generateBtn.textContent = t("generateBtn");
  dom.saveDraftBtn.textContent = t("saveDraftBtn");
  dom.resetBtn.textContent = t("resetBtn");
  dom.groupATitle.textContent = t("groupA");
  dom.groupBTitle.textContent = t("groupB");
  dom.groupCTitle.textContent = t("groupC");
  dom.resultTitle.textContent = t("resultTitle");
  dom.copyResultBtn.textContent = t("copyBtn");
  dom.noteText.textContent = t("noteText");
}

function splitLines(raw) {
  return String(raw)
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function listByKey(key) {
  if (key === "A") return splitLines(dom.listA.value);
  if (key === "B") return splitLines(dom.listB.value);
  if (key === "C") return splitLines(dom.listC.value);
  return [];
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function selectedParts() {
  const parts = [];
  if (dom.modeA.checked) parts.push("A");
  if (dom.modeC.checked) parts.push("C");
  if (dom.modeB.checked) parts.push("B");
  return parts;
}

function buildOneName(parts) {
  const chunks = [];
  for (const key of parts) {
    const pool = listByKey(key);
    if (!pool.length) {
      throw new Error(t("alerts.missingList", { key }));
    }
    chunks.push(randomFrom(pool));
  }
  return chunks.join(" ").replace(/\s+/g, " ").trim();
}

function renderResults() {
  dom.resultList.innerHTML = currentResults
    .map((name) => `<li>${escapeHtml(name)}</li>`)
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function saveDraft() {
  const data = {
    selectedKeys: selectedParts(),
    lang: currentLang,
    count: dom.count.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  alert(t("alerts.saveDraftDone"));
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    const selected = Array.isArray(data.selectedKeys) ? data.selectedKeys : ["A", "B", "C"];
    dom.modeA.checked = selected.includes("A");
    dom.modeB.checked = selected.includes("B");
    dom.modeC.checked = selected.includes("C");
    dom.count.value = data.count || "10";
    applyLanguage(data.lang || "en");
  } catch {
    // ignore malformed draft
  }
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportGroup(key) {
  const lines = listByKey(key);
  downloadText(FILES[key], lines.join("\n") + (lines.length ? "\n" : ""));
}

function exportResult() {
  if (!currentResults.length) {
    alert(t("alerts.noResultToSave"));
    return;
  }
  downloadText("result.txt", currentResults.join("\n") + "\n");
}

async function copyResult() {
  if (!currentResults.length) {
    alert(t("alerts.noResultToCopy"));
    return;
  }
  try {
    await navigator.clipboard.writeText(currentResults.join("\n"));
    alert(t("alerts.copied"));
  } catch {
    alert(t("alerts.copyFailed"));
  }
}

function generateNames() {
  const parts = selectedParts();
  if (!parts.length) {
    alert(t("alerts.emptySelection"));
    return;
  }

  const count = Math.max(1, Math.min(100, Number(dom.count.value) || 1));
  dom.count.value = String(count);

  try {
    currentResults = Array.from({ length: count }, () => buildOneName(parts));
    renderResults();
  } catch (err) {
    alert(err.message || t("alerts.generateFailed"));
  }
}

async function loadDefaultTextFiles() {
  const targets = [
    { key: "A", el: dom.listA },
    { key: "B", el: dom.listB },
    { key: "C", el: dom.listC },
  ];

  await Promise.all(
    targets.map(async ({ key, el }) => {
      try {
        const res = await fetch(`./${FILES[key]}`, { cache: "no-store" });
        if (!res.ok) return;
        el.value = await res.text();
      } catch {
        // ignore fetch errors for local/offline mode
      }
    }),
  );
}

async function resetToDefault() {
  await loadDefaultTextFiles();
  dom.modeA.checked = true;
  dom.modeB.checked = true;
  dom.modeC.checked = true;
  currentResults = [];
  renderResults();
}

function bindEvents() {
  dom.langSelect.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });
  dom.generateBtn.addEventListener("click", generateNames);
  dom.saveDraftBtn.addEventListener("click", saveDraft);
  dom.resetBtn.addEventListener("click", resetToDefault);
  dom.exportResultBtn.addEventListener("click", exportResult);
  dom.copyResultBtn.addEventListener("click", copyResult);

  document.querySelectorAll("button[data-export]").forEach((btn) => {
    btn.addEventListener("click", () => exportGroup(btn.dataset.export));
  });
}

async function init() {
  applyLanguage("en");
  await loadDefaultTextFiles();
  loadDraft();
  bindEvents();
}

init();
