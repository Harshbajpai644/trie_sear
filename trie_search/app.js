// ── BUILD TRIE ───────────────────────────────────────────────
const trie = new Trie();
WORDS.forEach(w => trie.insert(w));

document.getElementById("info").textContent =
  WORDS.length + " words stored · Algorithm: Trie + DFS · O(L) search";

// ── STATE ────────────────────────────────────────────────────
let suggestions = [];
let activeIdx = -1;

const input = document.getElementById("searchInput");
const dropdown = document.getElementById("dropdown");
const clearBtn = document.getElementById("clearBtn");

// ── RENDER ───────────────────────────────────────────────────
function render() {
  const q = input.value.trim();
  clearBtn.style.display = q ? "block" : "none";

  if (!q) {
    dropdown.style.display = "none";
    input.style.borderRadius = "8px";
    return;
  }

  suggestions = trie.search(q);
  dropdown.style.display = "block";
  input.style.borderRadius = "8px 8px 0 0";
  dropdown.innerHTML = "";

  if (suggestions.length === 0) {
    dropdown.innerHTML = `<div class="no-result">"${q}" se koi word nahi mila</div>`;
    return;
  }

  const countRow = document.createElement("div");
  countRow.className = "count-row";
  countRow.textContent = suggestions.length + " word" + (suggestions.length > 1 ? "s" : "") + " mila";
  dropdown.appendChild(countRow);

  suggestions.forEach((word, i) => {
    const div = document.createElement("div");
    div.className = "item" + (i === activeIdx ? " active" : "");
    div.innerHTML = "<b>" + word.slice(0, q.length) + "</b>" + word.slice(q.length);
    div.onclick = () => pickWord(word);
    dropdown.appendChild(div);
  });
}

function pickWord(word) {
  input.value = word;
  suggestions = [];
  activeIdx = -1;
  dropdown.style.display = "none";
  input.style.borderRadius = "8px";
  clearBtn.style.display = "block";
  input.focus();
}

function clearSearch() {
  input.value = "";
  suggestions = [];
  activeIdx = -1;
  dropdown.style.display = "none";
  input.style.borderRadius = "8px";
  clearBtn.style.display = "none";
  input.focus();
}

// ── EVENTS ───────────────────────────────────────────────────
input.addEventListener("input", () => { activeIdx = -1; render(); });

input.addEventListener("keydown", e => {
  if (e.key === "ArrowDown") {
    activeIdx = Math.min(activeIdx + 1, suggestions.length - 1);
    render();
  } else if (e.key === "ArrowUp") {
    activeIdx = Math.max(activeIdx - 1, 0);
    render();
  } else if (e.key === "Enter" && activeIdx >= 0) {
    pickWord(suggestions[activeIdx]);
  } else if (e.key === "Escape") {
    dropdown.style.display = "none";
  }
});

document.addEventListener("click", e => {
  if (!e.target.closest(".search-box")) {
    dropdown.style.display = "none";
  }
});
