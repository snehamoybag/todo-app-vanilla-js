const LogoEl = () => {
  const logoEl = document.createElement("div");
  const logoClassName = "logo";

  // TODO: add a logo eleement

  const logoTextEl = document.createElement("h2");
  logoTextEl.classList.add(`${logoClassName}__text`);
  logoTextEl.textContent = "Todo";

  logoEl.append(logoTextEl);

  return logoEl;
};

export default LogoEl;
