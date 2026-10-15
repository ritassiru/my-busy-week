SCENE_LIB["culture-fair"] = (() => {
  // os amigos (os mesmos rostos da festa) e o aluno (pele e cabelo do perfil; camiseta verde se escolheu na terça)
  const GREEN = ["#3E8E6B", "#4FA37A"];
  const F = {
    bia: (x, y, o) => person(x, y, Object.assign({ skin: "#8D5A3C", hair: "#1E1210", style: "curly", shirt: GREEN[0] }, o)),
    maya: (x, y, o) => person(x, y, Object.assign({ skin: "#E7B996", hair: "#5A3A22", style: "long", shirt: GREEN[1] }, o)),
    kaua: (x, y, o) => person(x, y, Object.assign({ skin: "#C68A62", hair: "#2B1B16", style: "cap", shirt: GREEN[0] }, o)),
    davi: (x, y, o) => person(x, y, Object.assign({ skin: "#F1C9A5", hair: "#3B2416", style: "short", shirt: GREEN[1] }, o)),
    mom: (x, y, o) => person(x, y, Object.assign({ skin: "#A86F4C", hair: "#2B1B16", style: "bun", shirt: "#A26769" }, o)),
    rosa: (x, y, o) => person(x, y, Object.assign({ skin: "#C68A62", hair: "#B8B0A8", style: "bun", shirt: "#B5651D" }, o)),
    judge: (x, y, o) => person(x, y, Object.assign({ skin: "#D9A57E", hair: "#4A4A4A", style: "short", shirt: "#3E4A5C" }, o))
  };
  const me = (c, x, y, o) => person(x, y, Object.assign({ skin: (c.me || {}).skin, hair: (c.me || {}).hair, style: (c.me || {}).style,
    shirt: (c.flags || []).includes("camiseta_verde") ? GREEN[0] : "#2F7DA8" }, o));
  const mk = (c, k) => (c.marks || {})[k] === true;
  // o cartaz: colorido (com as canetinhas) ou na caneta azul; amassado se foi de ônibus
  const poster = (c, x, y, w, h) => {
    const cor = mk(c, "material_completo"), am = !mk(c, "promessa_familia");
    const corpo = cor
      ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#CFE8F2"/><rect x="${x}" y="${y + h * .72}" width="${w}" height="${h * .28}" fill="#7DBA6E"/>
        <text x="${x + w / 2}" y="${y + 16}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="12" fill="#6D2E46">VILA SERENA 2050</text>
        <rect x="${x + w * .12}" y="${y + h * .42}" width="${w * .18}" height="${h * .3}" fill="#E0AE55"/><rect x="${x + w * .1}" y="${y + h * .38}" width="${w * .22}" height="5" fill="#2F7DA8"/>
        <rect x="${x + w * .66}" y="${y + h * .36}" width="${w * .16}" height="${h * .36}" fill="#C77A98"/><rect x="${x + w * .64}" y="${y + h * .32}" width="${w * .2}" height="5" fill="#2F7DA8"/>
        <circle cx="${x + w * .48}" cy="${y + h * .6}" r="${h * .1}" fill="#3E8E6B"/><rect x="${x + w * .47}" y="${y + h * .62}" width="3" height="${h * .12}" fill="#5A3A22"/>
        <rect x="${x + w * .36}" y="${y + h * .26}" width="${w * .26}" height="${h * .1}" rx="4" fill="#E07A3E"/><circle cx="${x + w * .4}" cy="${y + h * .37}" r="3" fill="#2B1721"/><circle cx="${x + w * .58}" cy="${y + h * .37}" r="3" fill="#2B1721"/>`
      : `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#FBFAF4"/>
        <text x="${x + w / 2}" y="${y + 16}" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="11" fill="#2A4F9E">Vila Serena 2050</text>
        <g stroke="#2A4F9E" stroke-width="1.2" fill="none"><rect x="${x + w * .14}" y="${y + h * .42}" width="${w * .16}" height="${h * .3}"/><rect x="${x + w * .66}" y="${y + h * .36}" width="${w * .14}" height="${h * .36}"/>
        <circle cx="${x + w * .48}" cy="${y + h * .58}" r="${h * .09}"/><path d="M${x + 8} ${y + h * .78} H${x + w - 8}"/><rect x="${x + w * .36}" y="${y + h * .24}" width="${w * .24}" height="${h * .1}" rx="4"/></g>`;
    const rugas = am ? `<g stroke="#8E8A80" stroke-width="1" opacity=".7" fill="none"><path d="M${x + 4} ${y + h * .3} L${x + w * .3} ${y + h * .45} L${x + w * .55} ${y + h * .3} L${x + w - 4} ${y + h * .5}"/>
        <path d="M${x + w * .2} ${y + h - 4} L${x + w * .35} ${y + h * .6} L${x + w * .7} ${y + h * .8}"/></g>` : "";
    return `<g>${corpo}${rugas}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#4E3F38" stroke-width="2"/></g>`;
  };
  // a apresentação: folhas coloridas (gráfica) ou a lápis (desenhada à mão)
  const pages = (c, x, y) => mk(c, "impressao_resolvida")
    ? `<rect x="${x + 6}" y="${y - 6}" width="44" height="56" fill="#FFF" stroke="#8E6A55"/><rect x="${x}" y="${y}" width="44" height="56" fill="#FFF" stroke="#8E6A55"/>
      <rect x="${x + 5}" y="${y + 6}" width="34" height="18" fill="#62B891"/><rect x="${x + 5}" y="${y + 28}" width="34" height="4" fill="#E07A3E"/><rect x="${x + 5}" y="${y + 36}" width="24" height="4" fill="#2F7DA8"/>`
    : `<rect x="${x + 6}" y="${y - 6}" width="44" height="56" fill="#FFF" stroke="#8E6A55"/><rect x="${x}" y="${y}" width="44" height="56" fill="#FFF" stroke="#8E6A55"/>
      <g stroke="#6E6A66" stroke-width="1" fill="none"><rect x="${x + 6}" y="${y + 8}" width="20" height="14"/><path d="M${x + 6} ${y + 30} H${x + 38} M${x + 6} ${y + 38} H${x + 30} M${x + 6} ${y + 46} H${x + 34}"/></g>`;
  // a maquete do Davi: prédios e árvores numa base
  const model = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s || 1})"><rect x="-50" y="0" width="100" height="10" rx="2" fill="#8E6A55"/>
    <rect x="-42" y="-30" width="16" height="30" fill="#E0AE55"/><rect x="-22" y="-44" width="14" height="44" fill="#C77A98"/><rect x="-4" y="-24" width="18" height="24" fill="#CFE3EA"/>
    <circle cx="26" cy="-12" r="9" fill="#3E8E6B"/><rect x="25" y="-4" width="3" height="5" fill="#5A3A22"/><circle cx="41" cy="-9" r="7" fill="#62B891"/>
    <rect x="-30" y="-58" width="30" height="8" rx="4" fill="#E07A3E"/></g>`;
  const table = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="10" rx="2" fill="#8E6A55"/><rect x="${x + 6}" y="${y + 10}" width="6" height="${186 - y}" fill="#6E5245"/><rect x="${x + w - 12}" y="${y + 10}" width="6" height="${186 - y}" fill="#6E5245"/>`;
  const gym = () => `<rect width="540" height="220" fill="#E9DFCC"/><rect y="0" width="540" height="24" fill="#B9A48C"/>
    <path d="M0 24 H540" stroke="#8E6A55" stroke-width="3"/>${[60, 180, 300, 420].map(x => `<rect x="${x}" y="34" width="60" height="34" rx="3" fill="#CFE3EA" stroke="#8E6A55"/>`).join("")}
    <rect y="176" width="540" height="44" fill="#C9955A"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${i * 70} 176 V220" stroke="#B5814A" stroke-width="2"/>`).join("")}`;
  const courtyard = () => `${SKY("#9FC3D8", "#E8EEF0")}<ellipse cx="70" cy="110" rx="38" ry="34" fill="#4F8E5A" transform="rotate(-14 70 110)"/><rect x="66" y="128" width="8" height="58" fill="#5A3A22" transform="rotate(-6 70 160)"/>
    <ellipse cx="480" cy="104" rx="40" ry="34" fill="#4F8E5A" transform="rotate(-16 480 104)"/><rect x="476" y="124" width="8" height="62" fill="#5A3A22" transform="rotate(-6 480 160)"/>
    ${GROUND("#C9B49A")}<rect y="176" width="540" height="14" fill="#BFA98E"/>
    <g stroke="#FFF" stroke-width="3" stroke-linecap="round" fill="none" opacity=".85"><path d="M120 50 q40 -10 80 0 t80 0"/><path d="M260 80 q40 -10 80 0 t70 0"/><path d="M140 110 q30 -8 60 0"/></g>`;
  return {
    // capa: o estande do grupo na feira, com o cartaz e a maquete
    cover: () => `${gym()}
      <rect x="150" y="30" width="240" height="30" rx="6" fill="#3E8E6B"/>
      <text x="270" y="51" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="16" fill="#FFF6E0">CULTURE FAIR 🎨</text>
      ${poster({ marks: { material_completo: true, promessa_familia: true } }, 200, 70, 140, 76)}
      ${table(150, 140, 240)}${model(330, 140, .8)}<text x="170" y="134" font-size="18">🍪</text>
      ${F.bia(100, 198)}${F.maya(150, 200)}${F.kaua(420, 198)}${F.davi(470, 200)}`,
    // quarta, videochamada: o Davi de skate com a maquete nos braços
    davi_model: () => `<rect width="540" height="220" fill="#EFE6D6"/><rect y="176" width="540" height="44" fill="#BFB3A2"/>
      <rect x="30" y="40" width="120" height="80" rx="4" fill="#CFE3EA"/><path d="M90 40 V120 M30 80 H150" stroke="#FFF" stroke-width="4"/>
      ${F.davi(270, 180, { shirt: "#2F7DA8" })}
      <path d="M256 146 L246 166 M284 146 L294 166" stroke="#F1C9A5" stroke-width="7" stroke-linecap="round"/>${model(270, 170, .55)}
      <rect x="226" y="182" width="90" height="8" rx="4" fill="#E07A3E"/><circle cx="240" cy="194" r="6" fill="#2B1721"/><circle cx="302" cy="194" r="6" fill="#2B1721"/>
      <path d="M330 186 h30 M335 176 h22" stroke="#8E8A80" stroke-width="2"/><text x="300" y="70" font-size="18">😎</text><text x="20" y="30" font-size="16" fill="#6E5C63">📹 Davi</text>`,
    // quarta, foto da Bia: o papel voa na frente do ventilador
    fan_poster: () => `<rect width="540" height="220" fill="#F2EBDD"/><rect y="176" width="540" height="44" fill="#C9B49A"/>
      <g transform="translate(110 110)"><circle r="52" fill="none" stroke="#5C6670" stroke-width="5"/>
        ${[0, 90, 180, 270].map(a => `<ellipse rx="40" ry="12" fill="#9AA6AE" transform="rotate(${a + 20}) translate(22 0)"/>`).join("")}<circle r="9" fill="#2B1721"/></g>
      <rect x="104" y="160" width="12" height="20" fill="#5C6670"/><rect x="80" y="178" width="60" height="8" rx="3" fill="#5C6670"/>
      <g stroke="#7A8C96" stroke-width="2" fill="none" stroke-linecap="round"><path d="M175 90 h50"/><path d="M175 110 h70"/><path d="M175 130 h44"/></g>
      ${F.bia(420, 196, { shirt: "#7A4FB0" })}<rect x="268" y="66" width="70" height="50" fill="#FBFAF4" stroke="#8E6A55" transform="rotate(-24 300 90)"/>
      <path d="M388 120 L340 104" stroke="#8D5A3C" stroke-width="6" stroke-linecap="round"/><text x="440" y="96" font-size="20">😱</text>
      <rect x="2" y="2" width="536" height="216" fill="none" stroke="#FFF" stroke-width="4"/>`,
    // sexta, 11 a.m.: a Dona Rosa entrega a apresentação colorida
    print_shop: c => `<rect width="540" height="220" fill="#EDE6DA"/><rect y="150" width="540" height="70" fill="#9C8A7A"/><rect y="142" width="540" height="12" fill="#6E5C63"/>
      <text x="270" y="38" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="22" fill="#B5651D">Copy Corner 🖨️</text>
      <rect x="40" y="70" width="80" height="72" rx="6" fill="#C9C2B8"/><rect x="50" y="62" width="60" height="12" fill="#FFF"/><rect x="54" y="90" width="52" height="8" rx="3" fill="#5C6670"/>
      ${F.rosa(190, 142)}${pages(c, 250, 88)}${me(c, 400, 200)}<text x="440" y="90" font-size="20">😍</text>`,
    // sexta, ao meio-dia: a gráfica fechada; a Maya desenha a apresentação à mão
    shop_closed: c => `${SKY("#B9D3E2", "#F2E6D3")}${GROUND("#9C948A")}
      <rect x="60" y="50" width="220" height="140" fill="#D8C8B4"/><rect x="60" y="40" width="220" height="24" fill="#B5651D"/>
      <text x="170" y="57" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="14" fill="#FFF6E0">Copy Corner</text>
      <rect x="130" y="100" width="80" height="90" fill="#6E5C63"/><rect x="138" y="118" width="64" height="22" rx="3" fill="#FFF6E0"/>
      <text x="170" y="134" text-anchor="middle" font-size="11" font-weight="700" fill="#B5651D">CLOSED 🔒</text>
      ${F.maya(380, 200)}<rect x="400" y="120" width="46" height="58" fill="#FFF" stroke="#8E6A55" transform="rotate(8 420 150)"/>
      <path d="M410 140 l20 -6 M410 152 l24 -4" stroke="#6E6A66" stroke-width="1.5"/><text x="440" y="114" font-size="18">✏️</text><text x="230" y="90" font-size="20">😬</text>`,
    // sexta, saída: a mãe leva o cartaz de carro (promessa cumprida)
    car_poster: c => `${SKY("#B9D3E2", "#F2E6D3")}${GROUND("#7E7A74")}
      <path d="M90 175 Q100 120 170 115 L330 115 Q390 118 420 160 L450 165 Q460 185 440 190 L100 190 Q80 188 90 175 Z" fill="#6D2E46"/>
      <rect x="180" y="125" width="70" height="35" rx="6" fill="#CFE3EA"/><rect x="262" y="125" width="70" height="35" rx="6" fill="#CFE3EA"/>
      <circle cx="160" cy="192" r="20" fill="#2B1721"/><circle cx="380" cy="192" r="20" fill="#2B1721"/>
      <g transform="translate(215 162) scale(.55)">${F.mom(0, 0)}</g><g transform="translate(297 162) scale(.55)">${me(c, 0, 0)}</g>
      <g transform="translate(150 60)">${poster(c, 0, 0, 120, 52)}</g><text x="60" y="60" font-size="22">🚗</text>`,
    // sexta, saída: o ônibus cheio e o cartaz amassado (promessa quebrada)
    bus_poster: c => `<rect width="540" height="220" fill="#E6E2D8"/><rect y="0" width="540" height="40" fill="#C9C2B8"/>
      ${[30, 150, 270, 390].map(x => `<rect x="${x}" y="8" width="100" height="26" rx="4" fill="#CFE3EA"/>`).join("")}
      <path d="M0 50 H540" stroke="#8E8A80" stroke-width="4"/><rect y="186" width="540" height="34" fill="#9C948A"/>
      ${person(60, 200, { skin: "#D9A57E", hair: "#4A4A4A", style: "short", shirt: "#8E8A80" })}${person(120, 200, { skin: "#8D5A3C", hair: "#1E1210", style: "long", shirt: "#B04F6E" })}
      ${me(c, 260, 200)}<g transform="rotate(-8 300 120)">${poster(c, 280, 90, 110, 60)}</g>
      ${person(440, 200, { skin: "#F1C9A5", hair: "#6B3E1F", style: "bun", shirt: "#E07A3E" })}${person(495, 200, { skin: "#C68A62", hair: "#2B1B16", style: "cap", shirt: "#5C6670" })}
      <text x="220" y="80" font-size="20">😩</text><text x="20" y="80" font-size="22">🚌</text>`,
    // sexta, chegada: todos à 1, ou o Davi às 1:55 com a mesa nas costas
    arrival: c => mk(c, "montagem_combinada")
      ? `${gym()}${F.bia(110, 198)}${F.maya(180, 198)}${F.kaua(250, 198)}${F.davi(320, 198)}${me(c, 390, 198)}
        ${table(400, 150, 110)}<text x="40" y="100" font-size="18">⏰ 1:00 😄</text>`
      : `${gym()}${F.bia(80, 198)}${F.maya(140, 198)}${F.kaua(200, 198)}${me(c, 260, 198)}
        <g transform="rotate(-10 450 120)"><rect x="390" y="96" width="120" height="10" rx="2" fill="#8E6A55"/><rect x="396" y="106" width="6" height="40" fill="#6E5245"/><rect x="498" y="106" width="6" height="40" fill="#6E5245"/></g>
        ${F.davi(450, 200)}<text x="490" y="80" font-size="20">💨</text><text x="40" y="100" font-size="18">⏰ 1:55 😱</text>`,
    // sexta, 2 p.m.: o estande no ginásio ou no pátio (o vento já começa)
    stand: c => `${mk(c, "vento_preparado") ? gym() : courtyard()}
      ${poster(c, 190, 46, 160, 92)}${table(160, 146, 220)}${model(320, 146, .7)}${pages(c, 180, 92 + 16)}<text x="250" y="140" font-size="18">🍪</text>
      ${F.bia(80, 198)}${F.maya(130, 200)}${me(c, 420, 198)}${F.kaua(470, 200)}`,
    // sexta, 3 p.m.: no ginásio, tudo firme / no pátio, o vento leva os cartazes
    gym_safe: c => `${gym()}${[60, 180, 300, 420].map(x => `<path d="M${x + 10} 50 q10 -8 20 0 t20 0" stroke="#FFF" stroke-width="2" fill="none"/>`).join("")}
      ${poster(c, 190, 60, 150, 84)}${table(160, 150, 220)}${model(320, 150, .7)}
      ${F.bia(90, 198)}${F.maya(140, 200)}${me(c, 420, 198)}${F.kaua(470, 200)}<text x="105" y="100" font-size="18">😎</text><text x="470" y="60" font-size="18">🌬️</text>`,
    wind: c => `${courtyard()}${table(150, 150, 200)}
      <g transform="rotate(-28 430 70)">${poster(c, 380, 40, 110, 60)}</g><rect x="250" y="20" width="44" height="30" fill="#FBFAF4" stroke="#8E6A55" transform="rotate(18 270 35)"/>
      ${F.bia(200, 198)}${F.kaua(120, 198)}<text x="104" y="120" font-size="18">🍪</text>${me(c, 300, 198)}${F.davi(470, 200)}
      <text x="440" y="130" font-size="20">🏃</text><text x="20" y="40" font-size="22">🌬️💨</text>`,
    // sexta, 3:15: a Maya apresenta para os jurados
    judges: c => `${mk(c, "vento_preparado") ? gym() : courtyard()}
      ${poster(c, 170, 40, 150, 84)}${table(150, 150, 200)}${model(300, 150, .65)}
      ${F.maya(240, 200)}<g transform="translate(262 134) scale(.8)">${pages(c, 0, 0)}</g><text x="208" y="92" font-size="16">💬</text>
      ${F.bia(110, 200)}${me(c, 60, 200)}${F.judge(420, 200)}${person(480, 200, { skin: "#8D5A3C", hair: "#1E1210", style: "bun", shirt: "#5C6670" })}
      <rect x="436" y="146" width="26" height="32" rx="3" fill="#FFF6E0" stroke="#8E6A55"/><text x="455" y="100" font-size="18">😊</text>`,
    // a foto final: o grupo com a medalha, com moldura
    fair_photo: c => `${mk(c, "vento_preparado") ? gym() : courtyard()}${poster(c, 190, 30, 160, 90)}
      ${F.bia(110, 198)}${F.maya(180, 198)}${F.kaua(250, 198)}${F.davi(320, 198)}${me(c, 390, 198)}
      <path d="M172 140 L180 158 L188 140" stroke="#C0392B" stroke-width="3" fill="none"/><circle cx="180" cy="166" r="9" fill="#E0AE55" stroke="#B5651D" stroke-width="2"/>
      ${model(470, 186, .7)}<text x="40" y="60" font-size="20">🎉</text>
      <rect x="3" y="3" width="534" height="214" fill="none" stroke="#FFF" stroke-width="6"/><text x="500" y="208" font-size="18">📸</text>`
  };
})();
