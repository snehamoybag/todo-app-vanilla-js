const ScreenReaderOnlyEl = (elmentType = "span") => {
  const srOnlyEl = document.createElement(elmentType);
  srOnlyEl.classList.add("sr-only");

  return srOnlyEl;
};

export default ScreenReaderOnlyEl;
