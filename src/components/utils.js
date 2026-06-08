export function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function nl2Paragraphs(text = "") {
  return String(text)
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

export function listChips(items = [], className = "chip") {
  return items.map((item) => `<span class="${className}">${escapeHtml(item)}</span>`).join("");
}

export function highlightWords(text = "", words = []) {
  let output = escapeHtml(text);

  words
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .forEach((word) => {
      const escapedWord = escapeHtml(word).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      output = output.replace(new RegExp(escapedWord, "gi"), (match) => `<span>${match}</span>`);
    });

  return output;
}
