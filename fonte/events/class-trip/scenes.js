SCENE_LIB["class-trip"] = (() => {
  // os amigos (os mesmos rostos dos outros eventos), com roupa de praia, e o aluno (pele e cabelo do perfil)
  const F = {
    bia: (x, y, o) => person(x, y, Object.assign({ skin: "#8D5A3C", hair: "#1E1210", style: "curly", shirt: "#7A4FB0" }, o)),
    maya: (x, y, o) => person(x, y, Object.assign({ skin: "#E7B996", hair: "#5A3A22", style: "long", shirt: "#3E8E6B" }, o)),
    kaua: (x, y, o) => person(x, y, Object.assign({ skin: "#C68A62", hair: "#2B1B16", style: "cap", shirt: "#E07A3E" }, o)),
    davi: (x, y, o) => person(x, y, Object.assign({ skin: "#F1C9A5", hair: "#3B2416", style: "short", shirt: "#2F7DA8" }, o)),
    duarte: (x, y, o) => person(x, y, Object.assign({ skin: "#A86F4C", hair: "#4A4A4A", style: "short", shirt: "#3E6E8E" }, o)),
    tiao: (x, y, o) => person(x, y, Object.assign({ skin: "#8D5A3C", hair: "#B8B0A8", style: "short", shirt: "#E9E2D5" }, o))
  };
  const me = (c, x, y, o) => person(x, y, Object.assign({ skin: (c.me || {}).skin, hair: (c.me || {}).hair, style: (c.me || {}).style, shirt: (c.me || {}).shirt || "#C77A98" }, o));
  const mk = (c, k) => (c.marks || {})[k] === true;
  const hatOn = c => (c.flags || []).includes("chapeu_engracado");
  // chapéus: o do aluno (pescador engraçado ou boné comum) e o abacaxi da Maya
  const fishHat = (x, y) => `<path d="M${x - 22} ${y} Q${x} ${y - 8} ${x + 22} ${y} Z" fill="#C9A04A"/><rect x="${x - 13}" y="${y - 16}" width="26" height="14" rx="5" fill="#D9B45A"/>
    <path d="M${x + 10} ${y - 14} q12 -10 14 6" stroke="#2B1721" stroke-width="1.2" fill="none"/><circle cx="${x + 24}" cy="${y - 6}" r="3" fill="#E07A3E"/>`;
  const plainCap = (x, y) => `<path d="M${x - 14} ${y - 4} Q${x} ${y - 20} ${x + 14} ${y - 4} Z" fill="#5C6670"/><rect x="${x + 6}" y="${y - 6}" width="16" height="4" rx="2" fill="#5C6670"/>`;
  const pineapple = (x, y) => `<ellipse cx="${x}" cy="${y - 10}" rx="11" ry="9" fill="#E0AE55"/><path d="M${x - 6} ${y - 18} l3 -10 l3 8 l3 -10 l3 8" stroke="#3E8E6B" stroke-width="3" fill="none"/>`;
  const myHat = (c, x, y) => hatOn(c) ? fishHat(x, y - 84) : plainCap(x, y - 82);
  const redNose = (c, x, y) => mk(c, "lista_praia") ? "" : `<circle cx="${x}" cy="${y - 70}" r="4" fill="#E2463A"/>`;
  const sea = (calm) => `${SKY(calm ? "#8FC6E6" : "#5C6670", calm ? "#DCEFF7" : "#9AA0A8")}
    <rect y="110" width="540" height="110" fill="${calm ? "#2F8FB8" : "#3E6E80"}"/>
    <g stroke="${calm ? "#9ED3EA" : "#B9C9D0"}" stroke-width="2" fill="none" opacity=".8"><path d="M20 130 q20 -6 40 0 t40 0"/><path d="M200 150 q20 -6 40 0 t40 0"/><path d="M380 128 q20 -6 40 0 t40 0"/></g>`;
  const sand = (y) => `<path d="M0 ${y} Q270 ${y - 14} 540 ${y} V220 H0 Z" fill="#EBD9A8"/>`;
  const sun = (x, y) => `<circle cx="${x}" cy="${y}" r="20" fill="#F2C94C"/>`;
  const turtle = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s || 1})"><ellipse rx="22" ry="14" fill="#5E8B4A"/><path d="M-12 -6 L0 -12 L12 -6 L12 6 L0 12 L-12 6 Z" fill="#7BA65E"/>
    <circle cx="26" cy="-2" r="7" fill="#7BA65E"/><circle cx="29" cy="-4" r="1.5" fill="#2B1721"/><ellipse cx="-14" cy="14" rx="8" ry="4" fill="#7BA65E"/><ellipse cx="14" cy="14" rx="8" ry="4" fill="#7BA65E"/></g>`;
  const fish = (x, y, col) => `<g transform="translate(${x} ${y})"><ellipse rx="10" ry="6" fill="${col}"/><path d="M-9 0 L-17 -6 L-17 6 Z" fill="${col}"/><circle cx="5" cy="-1" r="1.5" fill="#2B1721"/></g>`;
  const corals = (y) => `<path d="M60 ${y} q-8 -30 6 -46 M66 ${y - 26} q14 -10 16 -26 M70 ${y} q10 -20 24 -24" stroke="#E07A8A" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M430 ${y} q4 -36 -8 -50 M434 ${y - 20} q16 -6 24 -24" stroke="#F2A65A" stroke-width="7" fill="none" stroke-linecap="round"/>
    <ellipse cx="250" cy="${y - 6}" rx="40" ry="14" fill="#C77A98"/><ellipse cx="320" cy="${y - 4}" rx="24" ry="10" fill="#9B6BB5"/>`;
  const bus = (x, y) => `<rect x="${x}" y="${y}" width="240" height="96" rx="12" fill="#E7B53C"/><rect x="${x}" y="${y + 70}" width="240" height="10" fill="#2B1721" opacity=".15"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${x + 14 + i * 52}" y="${y + 14}" width="42" height="30" rx="4" fill="#CFE3EA"/>`).join("")}
    <circle cx="${x + 50}" cy="${y + 96}" r="16" fill="#2B1721"/><circle cx="${x + 190}" cy="${y + 96}" r="16" fill="#2B1721"/>
    <text x="${x + 120}" y="${y + 64}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="13" fill="#6D2E46">CORAL BEACH 🏖️</text>`;
  const boatShape = (x, y) => `<path d="M${x - 90} ${y} L${x + 90} ${y} L${x + 70} ${y + 30} L${x - 70} ${y + 30} Z" fill="#FFF6E0" stroke="#8E6A55" stroke-width="2"/>
    <rect x="${x - 90}" y="${y + 6}" width="180" height="6" fill="#2F7DA8"/><text x="${x + 40}" y="${y + 26}" font-size="10" font-weight="700" fill="#6D2E46">TIÃO</text>`;
  const jacket = (x, y) => `<rect x="${x - 12}" y="${y - 52}" width="24" height="26" rx="5" fill="#E2463A" opacity=".9"/>`;
  return {
    // capa: o ônibus da turma na praia, com o mar e a tartaruga
    cover: () => `${sea(true)}${sun(470, 40)}${sand(170)}${bus(30, 70)}
      ${turtle(440, 140, .9)}${F.bia(330, 206)}${F.maya(380, 208)}${F.kaua(430, 206, { shirt: "#E07A3E" })}${pineapple(380, 120)}
      <text x="300" y="60" font-size="22">⛵</text>`,
    // quarta, videochamada: o Davi numa cadeira em cima de uma bola
    davi_chair: () => `<rect width="540" height="220" fill="#EFE6D6"/><rect y="186" width="540" height="34" fill="#BFB3A2"/>
      <rect x="360" y="20" width="120" height="166" fill="#B98B66"/><rect x="368" y="28" width="104" height="70" fill="#A27552"/>
      <rect x="380" y="6" width="90" height="14" rx="6" fill="#E07A3E"/><path d="M380 13 H470" stroke="#FFF6E0" stroke-width="2"/>
      <circle cx="270" cy="170" r="16" fill="#FFF" stroke="#2B1721" stroke-width="2"/><path d="M262 162 l8 4 l8 -4" stroke="#2B1721" stroke-width="1.5" fill="none"/>
      <g transform="rotate(-8 270 140)"><rect x="244" y="140" width="52" height="8" rx="2" fill="#8E6A55"/><rect x="248" y="148" width="5" height="10" fill="#6E5245"/><rect x="287" y="148" width="5" height="10" fill="#6E5245"/>
      ${F.davi(270, 142, { s: .85 })}</g><path d="M284 76 L330 40" stroke="#F1C9A5" stroke-width="6" stroke-linecap="round"/>
      <text x="200" y="80" font-size="18">😎</text><path d="M230 176 q-8 -6 -14 0 M310 176 q8 -6 14 0" stroke="#8E8A80" stroke-width="2" fill="none"/>
      <text x="20" y="30" font-size="16" fill="#6E5C63">📹 Davi</text>`,
    // quarta, foto da Maya: o Kauã vermelho depois de uma hora na piscina
    kaua_red: () => `${SKY("#9FC3D8", "#E8EEF0")}<rect y="120" width="540" height="100" fill="#7CC6E0"/><rect y="112" width="540" height="10" fill="#E9E2D5"/>
      ${sun(80, 40)}${F.kaua(300, 210, { skin: "#D9604A", shirt: "#E07A3E" })}<circle cx="300" cy="140" r="4" fill="#B5342A"/>
      <text x="330" y="90" font-size="22">🦐</text><text x="250" y="96" font-size="18">🥵</text>
      <rect x="2" y="2" width="536" height="216" fill="none" stroke="#FFF" stroke-width="4"/>`,
    // sexta, 6:30: o portão da escola (todos na hora / o Davi correndo atrás do ônibus)
    gate: c => `${SKY("#F6C48E", "#FBE7CF")}${GROUND("#9C948A")}
      <rect x="20" y="40" width="10" height="150" fill="#5C6670"/><rect x="150" y="40" width="10" height="150" fill="#5C6670"/>
      ${[40, 60, 80, 100, 120, 140].map(x => `<rect x="${x}" y="60" width="4" height="130" fill="#7E8C95"/>`).join("")}<rect x="20" y="40" width="140" height="14" fill="#6D2E46"/>
      <text x="90" y="51" text-anchor="middle" font-size="9" font-weight="700" fill="#FFF6E0">SCHOOL</text>
      ${mk(c, "encontro_combinado")
        ? `${bus(280, 76)}${F.duarte(200, 198)}${F.bia(240, 200)}${F.maya(60, 200)}${F.kaua(110, 200)}${F.davi(160, 200)}${me(c, 260, 204, { s: .9 })}<text x="180" y="80" font-size="16">⏰ 6:30</text>`
        : `${bus(300, 76)}${F.davi(200, 200)}<rect x="180" y="128" width="16" height="22" rx="3" fill="#8E6A55"/><text x="150" y="110" font-size="20">🏃💨</text>
           <text x="232" y="60" font-size="16">STOP! 😱</text><text x="40" y="80" font-size="16">⏰ 6:59</text>`}`,
    // sexta, 7:30: no ônibus, o lanche (caprichado / só biscoito)
    bus_lunch: c => `<rect width="540" height="220" fill="#E6E2D8"/><rect y="0" width="540" height="50" fill="#C9C2B8"/>
      ${[30, 150, 270, 390].map(x => `<rect x="${x}" y="8" width="100" height="34" rx="4" fill="#CFE3EA"/>`).join("")}
      <rect y="176" width="540" height="44" fill="#9C948A"/><rect x="150" y="120" width="240" height="60" rx="8" fill="#6D2E46" opacity=".25"/>
      ${me(c, 220, 200)}${F.kaua(320, 200)}
      ${mk(c, "promessa_familia")
        ? `<rect x="234" y="140" width="56" height="30" rx="5" fill="#62B891"/><text x="238" y="162" font-size="16">🥪🍇</text><rect x="292" y="126" width="26" height="18" fill="#FFF6E0" transform="rotate(10 300 134)"/><text x="296" y="140" font-size="10">💜</text>`
        : `<rect x="236" y="144" width="40" height="24" rx="3" fill="#E9D3A8" stroke="#8E6A55"/><text x="240" y="161" font-size="9" fill="#6E5245">crackers</text><text x="200" y="110" font-size="18">😅</text>
           <text x="292" y="150" font-size="16">🥪</text>`}<text x="470" y="100" font-size="20">🚌</text>`,
    // sexta, 9:00: a praia (protetor ou nariz vermelho; chapéu engraçado ou boné)
    beach: c => `${sea(true)}${sun(80, 40)}${sand(160)}
      <path d="M440 200 L440 110" stroke="#5A3A22" stroke-width="4"/><path d="M380 116 Q440 70 500 116 Z" fill="#E07A3E"/><path d="M410 116 Q440 82 470 116" fill="#FFF6E0" opacity=".5"/>
      ${F.bia(80, 210)}${F.maya(140, 210)}${pineapple(140, 124)}${F.kaua(200, 210)}${F.davi(380, 210)}
      ${me(c, 290, 210)}${myHat(c, 290, 210)}${redNose(c, 290, 210)}
      ${mk(c, "lista_praia") ? `<rect x="316" y="160" width="12" height="24" rx="3" fill="#F2C94C"/><text x="312" y="152" font-size="14">☀️</text>` : `<text x="312" y="120" font-size="18">🦐</text>`}`,
    // sexta, 10:00: o barco no mar calmo / ou o Kauã no mar até os joelhos
    boat: c => mk(c, "barco_cedo")
      ? `${sea(true)}${sun(470, 40)}${boatShape(270, 120)}
        ${F.kaua(220, 118, { s: .7 })}<rect x="211" y="84" width="18" height="18" rx="4" fill="#E2463A" opacity=".9"/>${F.tiao(320, 118, { s: .7 })}${me(c, 270, 118, { s: .7 })}
        ${turtle(110, 176, .9)}<text x="60" y="150" font-size="16">🐢!!!</text>`
      : `${sea(true)}${sun(470, 40)}${sand(185)}${F.kaua(270, 196)}<rect x="230" y="150" width="80" height="40" fill="#2F8FB8" opacity=".75"/>
        <path d="M232 152 q20 -6 40 0 t38 0" stroke="#9ED3EA" stroke-width="2" fill="none"/>${me(c, 380, 212)}${F.bia(440, 212)}<text x="296" y="96" font-size="18">😄</text>`,
    // sexta, 10:30: o recife (máscaras / caixa de plástico) ou as nuvens escuras ao longe
    reef: c => !mk(c, "barco_cedo")
      ? `${SKY("#8FC6E6", "#DCEFF7")}<ellipse cx="420" cy="60" rx="140" ry="36" fill="#4C535C"/><ellipse cx="500" cy="80" rx="90" ry="26" fill="#3F4650"/>
        <rect y="110" width="540" height="110" fill="#2F8FB8"/>${sand(190)}${F.maya(120, 212)}<path d="M136 120 L260 80" stroke="#E7B996" stroke-width="6" stroke-linecap="round"/>
        ${F.bia(200, 212)}${me(c, 280, 212)}<text x="230" y="110" font-size="18">😬</text>`
      : `<rect width="540" height="220" fill="#2A8DB2"/><rect width="540" height="40" fill="#5FB4D6"/>
        <g fill="#BFE3F0" opacity=".6"><circle cx="100" cy="70" r="3"/><circle cx="108" cy="58" r="2"/><circle cx="400" cy="80" r="3"/></g>
        ${corals(214)}${fish(150, 110, "#F2C94C")}${fish(190, 130, "#62B6E8")}${fish(360, 100, "#F2C94C")}${fish(400, 140, "#E07A3E")}${turtle(470, 70, .7)}
        ${mk(c, "mascaras_resolvidas")
          ? `<g transform="translate(270 40)"><ellipse rx="34" ry="20" fill="#2B1721" opacity=".85"/><ellipse rx="28" ry="15" fill="#CFE3EA" opacity=".7"/><text x="-10" y="6" font-size="14">👀</text></g><text x="20" y="30" font-size="18">🤿</text>`
          : `<rect x="230" y="10" width="80" height="44" fill="#E8F4F8" opacity=".55" stroke="#FFF" stroke-width="2"/><text x="252" y="38" font-size="14">👀</text><text x="20" y="30" font-size="18">📦😂</text>`}`,
    // sexta, 1:55: o Davi dorme na areia e a onda vem vindo
    wave: () => `${SKY("#7E8E9A", "#C9D3D9")}<rect y="100" width="540" height="120" fill="#3E7E98"/>${sand(170)}
      <path d="M0 150 Q80 70 170 120 Q200 140 230 130 Q190 160 120 166 L0 170 Z" fill="#5FA9C9"/><path d="M60 110 q30 -20 60 -6 t50 10" stroke="#FFF" stroke-width="4" fill="none"/>
      <g transform="rotate(-90 330 196)">${F.davi(330, 196, { s: .8 })}</g><text x="300" y="160" font-size="16">😴💤</text>
      ${F.maya(470, 210)}<text x="500" y="110" font-size="18">😂</text>`,
    // sexta, 2:00: a chuva; no quiosque com sorvete (barco cedo) ou no aquário (barco cancelado)
    storm: c => mk(c, "barco_cedo")
      ? `${SKY("#4C535C", "#8C939C")}${[40, 110, 190, 260, 330, 410, 480].map((x, i) => `<path d="M${x} ${20 + (i % 3) * 20} l-6 16" stroke="#BFD3E0" stroke-width="2"/>`).join("")}${GROUND("#C9B49A")}
        <rect x="110" y="70" width="320" height="16" fill="#8E6A55"/><path d="M90 74 L270 30 L450 74 Z" fill="#C9A04A"/><rect x="120" y="86" width="8" height="104" fill="#8E6A55"/><rect x="412" y="86" width="8" height="104" fill="#8E6A55"/>
        ${F.bia(170, 200)}${F.maya(230, 200)}${me(c, 290, 200)}${F.kaua(350, 200)}<text x="304" y="176" font-size="16">🍦</text><text x="364" y="176" font-size="16">🍦</text><text x="460" y="60" font-size="22">⛈️</text>`
      : `<rect width="540" height="220" fill="#1F4E66"/><rect x="40" y="30" width="460" height="150" rx="10" fill="#2F8FB8" stroke="#8E6A55" stroke-width="6"/>
        ${corals(176)}${fish(140, 80, "#F2C94C")}${fish(380, 110, "#E07A3E")}${turtle(270, 100, 1.3)}
        <g opacity=".95">${F.kaua(150, 214, { s: .8 })}${me(c, 330, 214, { s: .8 })}${F.bia(400, 214, { s: .8 })}</g><text x="170" y="150" font-size="16">🐢!!!</text>`,
    // a foto final: a turma na areia, com os chapéus, o nariz vermelho e a tartaruga
    trip_photo: c => `${sea(true)}${sun(470, 36)}${sand(160)}
      ${F.duarte(60, 210)}${F.bia(120, 210)}${F.maya(180, 210)}${pineapple(180, 124)}${me(c, 240, 210)}${myHat(c, 240, 210)}${redNose(c, 240, 210)}
      ${F.kaua(300, 210)}${jacket(300, 210)}${F.davi(360, 210)}${turtle(460, 186, .8)}
      ${mk(c, "mascaras_resolvidas") ? `<text x="400" y="140" font-size="18">🤿</text>` : `<rect x="396" y="122" width="30" height="22" fill="#E8F4F8" opacity=".7" stroke="#FFF"/>`}
      <rect x="3" y="3" width="534" height="214" fill="none" stroke="#FFF" stroke-width="6"/><text x="500" y="208" font-size="18">📸</text>`
  };
})();
