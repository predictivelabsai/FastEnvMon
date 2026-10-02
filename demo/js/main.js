import { initMultiSelects } from "./ui/multiselect.js";

initMultiSelects();

const navigation = document.querySelector(".main-nav");

if (navigation) {
  const getSummary = (details) => details.querySelector(":scope > summary");
  const setExpandedState = (details) => {
    getSummary(details)?.setAttribute("aria-expanded", String(details.open));
  };
  const closeDetails = (details) => {
    details.open = false;
    setExpandedState(details);
  };

  navigation.querySelectorAll("details").forEach(setExpandedState);

  document.addEventListener("toggle", (event) => {
    const details = event.target;
    if (!(details instanceof HTMLDetailsElement) || !details.closest(".main-nav")) return;

    setExpandedState(details);
    if (!details.open) return;

    navigation.querySelectorAll("details[open]").forEach((openDetails) => {
      if (openDetails !== details) closeDetails(openDetails);
    });
  }, true);

  document.addEventListener("click", (event) => {
    if (event.target.closest(".main-nav details")) return;
    navigation.querySelectorAll("details[open]").forEach(closeDetails);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const openDetails = navigation.querySelector("details[open]");
    if (!openDetails) return;

    event.preventDefault();
    const summary = getSummary(openDetails);
    closeDetails(openDetails);
    summary?.focus();
  });
}
