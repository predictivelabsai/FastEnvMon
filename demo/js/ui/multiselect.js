function optionLabel(option) {
  return option.label || option.textContent || option.value;
}

function initMultiSelect(select) {
  if (select.dataset.multiselectInitialized === "true") return;

  select.dataset.multiselectInitialized = "true";
  select.classList.add("multiselect-native");
  select.setAttribute("aria-hidden", "true");
  select.inert = true;
  select.tabIndex = -1;

  const label = select.labels?.[0];
  if (label && !label.id) label.id = `${select.id}-label`;

  const multiselect = document.createElement("div");
  multiselect.className = "multiselect";
  multiselect.setAttribute("role", "group");
  if (label?.id) multiselect.setAttribute("aria-labelledby", label.id);
  if (select.getAttribute("aria-describedby")) multiselect.setAttribute("aria-describedby", select.getAttribute("aria-describedby"));
  multiselect.innerHTML = `
    <div class="multiselect__toolbar">
      <span class="multiselect__count" aria-live="polite"></span>
      <span class="multiselect__actions">
        <button class="multiselect__action" type="button" data-multiselect-action="all">Visi</button>
        <button class="multiselect__action" type="button" data-multiselect-action="clear">Valyti</button>
      </span>
    </div>
    <div class="multiselect__list"></div>`;
  select.insertAdjacentElement("afterend", multiselect);

  const count = multiselect.querySelector(".multiselect__count");
  const list = multiselect.querySelector(".multiselect__list");
  const selectAll = multiselect.querySelector('[data-multiselect-action="all"]');
  const clear = multiselect.querySelector('[data-multiselect-action="clear"]');
  let selectedValues = new Set([...select.selectedOptions].map((option) => option.value));

  function syncState() {
    const options = [...select.options];
    const selected = options.filter((option) => option.selected);
    const checkboxes = [...list.querySelectorAll('input[type="checkbox"]')];

    checkboxes.forEach((checkbox) => {
      const option = options.find((item) => item.value === checkbox.value);
      if (!option) return;
      checkbox.checked = option.selected;
      checkbox.disabled = option.disabled;
    });

    selectedValues = new Set(selected.map((option) => option.value));
    count.textContent = `${selected.length} iš ${options.length} pasirinkta`;
    selectAll.disabled = options.length === 0 || options.every((option) => option.disabled || option.selected);
    clear.disabled = selected.length === 0;
  }

  function dispatchChange() {
    syncState();
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function renderList() {
    const options = [...select.options];
    if (!options.some((option) => option.selected) && selectedValues.size) {
      options.forEach((option) => { option.selected = selectedValues.has(option.value); });
    }

    list.replaceChildren();
    if (!options.length) {
      const empty = document.createElement("p");
      empty.className = "multiselect__empty";
      empty.textContent = "Pagal pasirinktus filtrus taškų nėra.";
      list.append(empty);
      syncState();
      return;
    }

    options.forEach((option) => {
      const row = document.createElement("label");
      row.className = "multiselect__option";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = option.value;
      checkbox.checked = option.selected;
      checkbox.disabled = option.disabled;
      checkbox.addEventListener("change", () => {
        option.selected = checkbox.checked;
        dispatchChange();
      });

      const text = document.createElement("span");
      text.className = "multiselect__option-text";
      text.textContent = optionLabel(option);
      row.append(checkbox, text);
      list.append(row);
    });

    syncState();
  }

  selectAll.addEventListener("click", () => {
    [...select.options].forEach((option) => { option.selected = !option.disabled; });
    dispatchChange();
  });
  clear.addEventListener("click", () => {
    [...select.options].forEach((option) => { option.selected = false; });
    dispatchChange();
  });
  select.addEventListener("change", syncState);

  const observer = new MutationObserver(renderList);
  observer.observe(select, { attributes: true, childList: true, subtree: true });
  renderList();
}

export function initMultiSelects(root = document) {
  root.querySelectorAll("select.select-field[multiple]").forEach(initMultiSelect);
}
