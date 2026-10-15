SCENE_LIB["surprise-party"] = (() => {
  const balloon = (x, y, c) => `<g><path d="M${x} ${y + 26} Q${x - 6} ${y + 46} ${x + 2} ${y + 66}" stroke="#8a7a70" stroke-width="1.5" fill="none"/>
    <ellipse cx="${x}" cy="${y}" rx="17" ry="22" fill="${c}"/><path d="M${x - 3} ${y + 21} L${x + 3} ${y + 21} L${x} ${y + 27} Z" fill="${c}"/>
    <ellipse cx="${x - 6}" cy="${y - 8}" rx="4" ry="7" fill="#fff" opacity=".35"/></g>`;
  return {
    // capa: a sala da Bia pronta para a festa, os amigos escondidos de amarelo
    cover: () => `<rect width="540" height="220" fill="#F3E3C8"/>
      <rect y="168" width="540" height="52" fill="#C9A27E"/>
      <rect x="150" y="18" width="240" height="38" rx="6" fill="#6D2E46"/>
      <text x="270" y="44" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="20" fill="#FFF6E0">HAPPY BIRTHDAY!</text>
      ${balloon(70, 60, "#E0AE55")}${balloon(110, 78, "#C77A98")}${balloon(445, 66, "#62B891")}${balloon(485, 52, "#E0AE55")}
      <rect x="236" y="112" width="68" height="56" rx="6" fill="#8E6A55"/>
      <rect x="244" y="96" width="52" height="24" rx="4" fill="#FFF6E0"/><rect x="244" y="96" width="52" height="8" rx="4" fill="#C77A98"/>
      <rect x="268" y="82" width="4" height="14" fill="#E0AE55"/><path d="M270 72 Q275 79 270 82 Q265 79 270 72 Z" fill="#E07A3E"/>
      ${person(150, 196, { skin: "#8D5A3C", hair: "#1E1210", style: "curly", shirt: "#E7B53C" })}
      ${person(205, 198, { skin: "#E7B996", hair: "#5A3A22", style: "long", shirt: "#F0C24A" })}
      ${person(340, 198, { skin: "#C68A62", hair: "#2B1B16", style: "cap", shirt: "#E7B53C" })}
      ${person(395, 196, { skin: "#F1C9A5", hair: "#3B2416", style: "bun", shirt: "#F0C24A" })}
      <text x="40" y="150" font-size="22">🤫</text><text x="482" y="150" font-size="22">🎉</text>`
  };
})();
