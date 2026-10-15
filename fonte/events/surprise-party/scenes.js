SCENE_LIB["surprise-party"] = (() => {
  // os amigos (sempre os mesmos rostos) e o aluno (pele e cabelo do perfil; camiseta amarela se escolheu na terça)
  const YELLOW = ["#E7B53C", "#F0C24A"];
  const F = {
    bia: (x, y, o) => person(x, y, Object.assign({ skin: "#8D5A3C", hair: "#1E1210", style: "curly", shirt: YELLOW[0] }, o)),
    maya: (x, y, o) => person(x, y, Object.assign({ skin: "#E7B996", hair: "#5A3A22", style: "long", shirt: YELLOW[1] }, o)),
    kaua: (x, y, o) => person(x, y, Object.assign({ skin: "#C68A62", hair: "#2B1B16", style: "cap", shirt: YELLOW[0] }, o)),
    davi: (x, y, o) => person(x, y, Object.assign({ skin: "#F1C9A5", hair: "#3B2416", style: "short", shirt: YELLOW[1] }, o)),
    nina: (x, y, o) => person(x, y, Object.assign({ skin: "#D9A57E", hair: "#1E1210", style: "long", shirt: "#F4A7B9" }, o)),
    mom: (x, y, o) => person(x, y, Object.assign({ skin: "#A86F4C", hair: "#2B1B16", style: "bun", shirt: "#A26769" }, o))
  };
  const me = (c, x, y, o) => person(x, y, Object.assign({ skin: (c.me || {}).skin, hair: (c.me || {}).hair, style: (c.me || {}).style,
    shirt: (c.flags || []).includes("camiseta_amarela") ? YELLOW[0] : "#2F7DA8" }, o));
  const mk = (c, k) => (c.marks || {})[k] === true;
  const cake = (x, y) => `<rect x="${x - 34}" y="${y}" width="68" height="26" rx="3" fill="#7B4A2E"/><rect x="${x - 34}" y="${y - 6}" width="68" height="9" rx="3" fill="#C77A98"/>
    <text x="${x}" y="${y + 18}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="11" fill="#FFF6E0">NINA 15</text>
    <rect x="${x - 2}" y="${y - 20}" width="4" height="14" fill="#E0AE55"/><path d="M${x} ${y - 30} Q${x + 5} ${y - 23} ${x} ${y - 20} Q${x - 5} ${y - 23} ${x} ${y - 30} Z" fill="#E07A3E"/>`;
  const cookies = (x, y) => `${[0, 1, 2, 3].map(i => `<ellipse cx="${x}" cy="${y + 24 - i * 9}" rx="${24 - i * 4}" ry="5" fill="#C8955A" stroke="#8E6A55"/>`).join("")}
    <rect x="${x - 2}" y="${y - 22}" width="4" height="12" fill="#E0AE55"/><path d="M${x} ${y - 31} Q${x + 5} ${y - 24} ${x} ${y - 21} Q${x - 5} ${y - 24} ${x} ${y - 31} Z" fill="#E07A3E"/>`;
  const banner = (c, x, y) => mk(c, "lista_pronta")
    ? `<rect x="${x}" y="${y}" width="220" height="30" rx="5" fill="#6D2E46"/><text x="${x + 110}" y="${y + 21}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="15" fill="#FFF6E0">HAPPY BIRTHDAY, NINA!</text>`
    : `<rect x="${x + 60}" y="${y - 6}" width="100" height="40" fill="#C9A27E" stroke="#8E6A55"/><text x="${x + 110}" y="${y + 12}" text-anchor="middle" font-size="10" font-weight="700" fill="#4E3F38">HAPPY</text><text x="${x + 110}" y="${y + 26}" text-anchor="middle" font-size="10" font-weight="700" fill="#4E3F38">BIRTHDAY 🍕</text>`;
  const rainWin = (x, y) => `<rect x="${x}" y="${y}" width="110" height="80" rx="4" fill="#5C6670"/><path d="M${x + 55} ${y} V${y + 80} M${x} ${y + 40} H${x + 110}" stroke="#FFF" stroke-width="4"/>
    ${[12, 30, 48, 70, 88, 100].map((d, i) => `<path d="M${x + d} ${y + 8 + (i % 3) * 18} l-4 10" stroke="#BFD3E0" stroke-width="2"/>`).join("")}`;
  const balloon2 = (x, y, c) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="17" fill="${c}"/><path d="M${x} ${y + 17} q-4 14 2 28" stroke="#8a7a70" stroke-width="1.2" fill="none"/>`;
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
      <rect x="2" y="2" width="536" height="216" fill="none" stroke="#FFF" stroke-width="4"/>`,
    // sexta, 4 p.m.: a Dona Célia entrega o bolo NINA 15
    bakery: c => `<rect width="540" height="220" fill="#F7E6D0"/><rect y="150" width="540" height="70" fill="#B98B66"/><rect y="142" width="540" height="12" fill="#8E6A55"/>
      <text x="270" y="40" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="22" fill="#B5651D">Sweet Corner 🥐</text>
      ${person(150, 142, { skin: "#C68A62", hair: "#B8B0A8", style: "bun", shirt: "#FFFFFF", extra: '<rect x="-20" y="-30" width="40" height="30" fill="#F4A7B9"/>' })}
      ${cake(270, 112)}${me(c, 400, 200)}<text x="440" y="90" font-size="20">😍</text>`,
    // sexta, 4 p.m., sem o bolo marcado a tempo: o relógio e a agenda
    clock_late: c => `<rect width="540" height="220" fill="#EFE4D2"/><circle cx="160" cy="95" r="58" fill="#FFF" stroke="#6D2E46" stroke-width="6"/>
      <path d="M160 95 V55 M160 95 L190 112" stroke="#2B1721" stroke-width="5" stroke-linecap="round"/>
      <rect x="300" y="40" width="150" height="120" rx="14" fill="#2B1721"/><rect x="310" y="54" width="130" height="92" rx="6" fill="#FFF6E0"/>
      <text x="375" y="84" text-anchor="middle" font-size="12" fill="#6D2E46" font-weight="700">📅 Friday</text>
      <text x="375" y="108" text-anchor="middle" font-size="11" fill="#2B1721">Cake · 6:00 p.m.</text><text x="375" y="130" text-anchor="middle" font-size="18">😬</text>
      ${GROUND("#C9B49A")}`,
    // sexta, saída: a mãe leva de carro (promessa cumprida)
    car: c => `${SKY("#B9D3E2", "#F2E6D3")}${GROUND("#7E7A74")}
      <path d="M90 175 Q100 120 170 115 L330 115 Q390 118 420 160 L450 165 Q460 185 440 190 L100 190 Q80 188 90 175 Z" fill="#6D2E46"/>
      <rect x="180" y="125" width="70" height="35" rx="6" fill="#CFE3EA"/><rect x="262" y="125" width="70" height="35" rx="6" fill="#CFE3EA"/>
      <circle cx="160" cy="192" r="20" fill="#2B1721"/><circle cx="380" cy="192" r="20" fill="#2B1721"/>
      <g transform="translate(215 162) scale(.55)">${F.mom(0, 0)}</g><g transform="translate(297 162) scale(.55)">${me(c, 0, 0)}</g>
      ${balloon2(350, 100, "#E0AE55")}${balloon2(372, 92, "#C77A98")}<text x="60" y="60" font-size="22">🎈🚗</text>`,
    // sexta, saída: primeiro a louça (promessa quebrada)
    dishes: c => `<rect width="540" height="220" fill="#E9EEF1"/><rect y="150" width="540" height="70" fill="#9FB1BC"/>
      <rect x="160" y="132" width="220" height="20" fill="#C9D3D9"/><rect x="200" y="120" width="140" height="16" rx="6" fill="#7E8C95"/>
      ${me(c, 270, 200)}<text x="220" y="118" font-size="22">🍽️🍽️</text><text x="320" y="80" font-size="22">💦</text>
      ${F.mom(450, 200, { s: .9 })}<text x="480" y="90" font-size="18">😤</text>`,
    // sexta, chegada (prioridade: sem bolo → o Davi atrasado → todos na hora)
    arrival: c => !mk(c, "imprevisto_resolvido")
      ? `${SKY("#59606B", "#9AA0A8")}${GROUND("#6E6A66")}<rect x="150" y="60" width="240" height="130" fill="#B98B66"/><rect x="235" y="110" width="70" height="80" fill="#5A3A22"/>
        <text x="270" y="95" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="16" fill="#FFF6E0">Sweet Corner</text>
        <text x="258" y="160" font-size="26">🔒</text><text x="246" y="138" font-size="11" fill="#FFF6E0">CLOSED</text>
        ${me(c, 110, 205)}${F.davi(440, 205)}<text x="140" y="110" font-size="20">😱</text>`
      : !mk(c, "combinado_firme")
      ? `<rect width="540" height="220" fill="#F3E3C8"/><rect y="176" width="540" height="44" fill="#C9A27E"/><rect x="420" y="60" width="80" height="120" fill="#8E6A55"/><rect x="430" y="70" width="60" height="110" fill="#5A3A22"/>
        ${F.bia(90, 196)}${F.maya(150, 198)}${F.kaua(210, 198)}${me(c, 270, 198)}${F.davi(455, 200)}<text x="485" y="110" font-size="20">💨</text><text x="80" y="100" font-size="18">⏰ 6:29</text>`
      : `<rect width="540" height="220" fill="#F3E3C8"/><rect y="176" width="540" height="44" fill="#C9A27E"/>
        ${F.bia(130, 198)}${F.maya(200, 198)}${F.kaua(270, 198)}${F.davi(340, 198)}${me(c, 410, 198)}<text x="60" y="60" font-size="18">⏰ 5:55 😄</text>`,
    // sexta, a sala (faixa ou caixa de pizza) ou o jardim (com o céu escuro)
    room: c => mk(c, "preparado_tempo")
      ? `<rect width="540" height="220" fill="#F6EBD9"/><rect y="176" width="540" height="44" fill="#C9A27E"/>${rainWin(30, 40)}${banner(c, 190, 30)}
        ${balloon2(440, 70, "#E0AE55")}${balloon2(470, 60, "#C77A98")}${balloon2(500, 75, "#62B891")}
        <rect x="200" y="120" width="150" height="56" rx="10" fill="#A26769"/><rect x="190" y="112" width="170" height="20" rx="8" fill="#B87C7E"/><text x="380" y="168" font-size="18">🛋️</text>`
      : `${SKY("#4C535C", "#8C939C")}<ellipse cx="120" cy="45" rx="130" ry="32" fill="#353B42"/><ellipse cx="400" cy="40" rx="150" ry="34" fill="#2F343B"/>
        ${GROUND("#6E8B4E")}<path d="M150 70 V140 M380 70 V140" stroke="#5A3A22" stroke-width="5"/>${banner(c, 160, 80)}
        ${balloon2(110, 120, "#E0AE55")}${balloon2(430, 120, "#C77A98")}<text x="250" y="190" font-size="22">🌳</text>`,
    // sexta, 6:29: tudo escuro, a maçaneta gira
    dark_door: c => `<rect width="540" height="220" fill="#1E1A22"/><rect x="380" y="40" width="100" height="150" fill="#2E2830"/><rect x="390" y="50" width="80" height="140" fill="#3A3138"/>
      <circle cx="400" cy="125" r="6" fill="#E0AE55"/><path d="M392 112 q8 -8 16 0" stroke="#E0AE55" stroke-width="2" fill="none"/>
      <g opacity=".55">${F.bia(80, 200)}${F.maya(140, 200)}${F.kaua(200, 200)}${me(c, 260, 200)}</g>
      <rect x="230" y="30" width="140" height="34" rx="12" fill="#FFF6E0"/><text x="300" y="52" text-anchor="middle" font-size="11" fill="#2B1721">Mom, why are we here? 🤔</text>`,
    // sexta, 6:30: SURPRISE!
    surprise: c => `<rect width="540" height="220" fill="#FFF3D6"/><rect y="176" width="540" height="44" fill="#C9A27E"/>${banner(c, 160, 14)}
      ${balloon2(60, 60, "#E0AE55")}${balloon2(90, 50, "#C77A98")}${balloon2(460, 55, "#62B891")}${balloon2(490, 66, "#E0AE55")}
      ${F.bia(70, 200)}${F.maya(125, 200)}${F.kaua(180, 200)}${F.davi(235, 200)}${me(c, 290, 200)}${F.nina(430, 200)}
      <rect x="320" y="150" width="70" height="26" rx="4" fill="#8E6A55"/>${mk(c, "imprevisto_resolvido") ? cake(355, 124) : cookies(355, 120)}
      <text x="420" y="100" font-size="20">😭💛</text><text x="160" y="80" font-size="16">🎉</text><text x="320" y="70" font-size="16">🎉</text>`,
    // a foto final: a mesma cena, com moldura
    party_photo: c => `${SCENE_LIB["surprise-party"].surprise(c)}<rect x="3" y="3" width="534" height="214" fill="none" stroke="#FFF" stroke-width="6"/><text x="500" y="208" font-size="18">📸</text>`
  };
})();
