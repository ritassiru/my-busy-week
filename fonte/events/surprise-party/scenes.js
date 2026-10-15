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
      <text x="40" y="150" font-size="22">🤫</text><text x="482" y="150" font-size="22">🎉</text>`,
    // quarta, videochamada: o Kauã carrega um bolo enorme sem ver a bola no chão
    kitchen_cake: () => `<rect width="540" height="220" fill="#F6EBD9"/>
      <rect y="176" width="540" height="44" fill="#D9C2A3"/>
      <rect x="30" y="40" width="150" height="70" rx="4" fill="#CFE3EA"/><path d="M105 40 V110 M30 75 H180" stroke="#FFF" stroke-width="4"/>
      <rect x="380" y="118" width="140" height="58" fill="#B98B66"/><rect x="372" y="110" width="156" height="10" rx="3" fill="#8E6A55"/>
      <rect x="400" y="70" width="40" height="40" rx="4" fill="#E9E2D5"/><circle cx="420" cy="90" r="11" fill="#CDBFAA"/>
      <path d="M234 158 L224 112 M266 158 L276 112" stroke="#C68A62" stroke-width="8" stroke-linecap="round"/>
      ${person(250, 200, { skin: "#C68A62", hair: "#2B1B16", style: "cap", shirt: "#E07A3E" })}
      <rect x="192" y="102" width="116" height="8" rx="3" fill="#E9E2D5"/>
      <rect x="200" y="74" width="100" height="28" rx="3" fill="#7B4A2E"/><rect x="200" y="86" width="100" height="5" fill="#FFF6E0"/>
      <rect x="208" y="50" width="84" height="25" rx="3" fill="#FFF6E0"/><rect x="208" y="50" width="84" height="8" rx="3" fill="#C77A98"/>
      <circle cx="232" cy="47" r="4" fill="#E0AE55"/><circle cx="268" cy="47" r="4" fill="#62B891"/>
      <g transform="translate(296 186)"><circle r="12" fill="#FFF" stroke="#2B1721" stroke-width="2"/>
        <path d="M0 -5 L5 -1 L3 5 L-3 5 L-5 -1 Z" fill="#2B1721"/><path d="M0 -5 V-12 M5 -1 L11 -4 M3 5 L7 10 M-3 5 L-7 10 M-5 -1 L-11 -4" stroke="#2B1721" stroke-width="1.5"/></g>
      <text x="282" y="140" font-size="18">😳</text><text x="20" y="30" font-size="16" fill="#6E5C63">📹 Kauã</text>`,
    // quarta, foto da Maya: nuvens pretas e baixas sobre a rua, ainda sem chuva
    sky_photo: () => `${SKY("#3F4650", "#8C939C")}
      <ellipse cx="90" cy="60" rx="110" ry="38" fill="#2F343B"/><ellipse cx="260" cy="45" rx="130" ry="42" fill="#363C44"/>
      <ellipse cx="450" cy="62" rx="120" ry="40" fill="#2B3036"/><ellipse cx="350" cy="90" rx="90" ry="26" fill="#454C55"/>
      <rect x="40" y="120" width="70" height="70" fill="#6B5B52"/><path d="M34 122 L75 92 L116 122 Z" fill="#4E3F38"/><rect x="62" y="150" width="20" height="40" fill="#3A2E29"/>
      <rect x="400" y="110" width="90" height="80" fill="#7A6A5E"/><path d="M394 112 L445 80 L496 112 Z" fill="#5A4A40"/>
      <rect x="415" y="130" width="22" height="20" fill="#E8D79A"/><rect x="455" y="130" width="22" height="20" fill="#E8D79A"/>
      ${GROUND("#6E6A66")}<path d="M0 205 H540" stroke="#D8D2C4" stroke-width="3" stroke-dasharray="22 16"/>
      <path d="M250 150 Q262 120 290 132" stroke="#2B3036" stroke-width="2" fill="none"/><text x="236" y="182" font-size="18">🐦</text>
      <rect x="2" y="2" width="536" height="216" fill="none" stroke="#FFF" stroke-width="4"/>`
  };
})();
