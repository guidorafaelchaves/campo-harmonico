const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTE_PT = ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"];
const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
const ROMANS = ["I", "ii", "iii", "IV", "V", "vi", "vii"];
const DEGREE_FEEL = [
  "Casa. Ponto de chegada.",
  "Prepara. Comeca a conversa.",
  "Cor suave. Toca a familia da tonica.",
  "Abre. Parece janela.",
  "Puxa. Quer resolver.",
  "Escurece sem sair de casa.",
  "Instavel. Bom para passar rapido."
];
const QUALITIES = [
  { suffix: "", tones: [0, 4, 7, 11] },
  { suffix: "m", tones: [0, 3, 7, 10] },
  { suffix: "m", tones: [0, 3, 7, 10] },
  { suffix: "", tones: [0, 4, 7, 11] },
  { suffix: "7", tones: [0, 4, 7, 10] },
  { suffix: "m", tones: [0, 3, 7, 10] },
  { suffix: "m7b5", tones: [0, 3, 6, 10] }
];
const TUNING = [
  { name: "G", midi: 43 },
  { name: "D", midi: 38 },
  { name: "A", midi: 33 },
  { name: "E", midi: 28 }
];
const REGIONS = {
  low: [0, 5],
  mid: [3, 8],
  high: [7, 12],
  all: [0, 12]
};

const PROGRESSIONS = [
  {
    id: "home-tension-home",
    group: "guided",
    name: "Casa - tensao - casa",
    formula: "I - V - I",
    degrees: [0, 4, 0],
    feeling: "O jeito mais direto de sentir dominante resolvendo.",
    mission: "Toque so tonicas e perceba o V puxando de volta para o I.",
    songs: ["Trechos de hinos, cancoes folk e finais de frases tonais."]
  },
  {
    id: "1451",
    group: "guided cadence",
    name: "Abrir, puxar, voltar",
    formula: "I - IV - V - I",
    degrees: [0, 3, 4, 0],
    feeling: "Casa, janela aberta, tensao e chegada.",
    mission: "Use tonica + quinta e escute a diferenca entre IV e V.",
    songs: ["La Bamba - Ritchie Valens", "Twist and Shout - The Isley Brothers / Beatles"]
  },
  {
    id: "1564",
    group: "guided color",
    name: "Pop classico",
    formula: "I - V - vi - IV",
    degrees: [0, 4, 5, 3],
    feeling: "Brilho, tensao, cor menor e abertura.",
    mission: "Toque em loop e tente cantar a tonica de cada acorde antes dela soar.",
    songs: ["Let It Be - The Beatles", "No Woman No Cry - Bob Marley", "With or Without You - U2"]
  },
  {
    id: "1645",
    group: "color",
    name: "Balada circular",
    formula: "I - vi - IV - V",
    degrees: [0, 5, 3, 4],
    feeling: "Casa, sombra menor, abertura e chamada.",
    mission: "Compare I e vi: notas diferentes, mas sensacao de familia.",
    songs: ["Stand by Me - Ben E. King", "Earth Angel - The Penguins", "Blue Moon - Richard Rodgers / Lorenz Hart"]
  },
  {
    id: "6415",
    group: "color",
    name: "Comeca menor",
    formula: "vi - IV - I - V",
    degrees: [5, 3, 0, 4],
    feeling: "Comeca emocional e resolve com brilho.",
    mission: "Comece no relativo menor e encontre o caminho mais curto ate o I.",
    songs: ["Compasso pop moderno em muitas baladas e worship songs."]
  },
  {
    id: "251",
    group: "guided cadence",
    name: "Preparar, puxar, chegar",
    formula: "ii - V - I",
    degrees: [1, 4, 0],
    feeling: "A frase classica de preparacao e resolucao.",
    mission: "Toque tetrades devagar e perceba como a setima do V quer cair.",
    songs: ["Autumn Leaves - Joseph Kosma", "Satin Doll - Duke Ellington / Billy Strayhorn"]
  },
  {
    id: "1625",
    group: "cadence",
    name: "Volta circular",
    formula: "I - vi - ii - V",
    degrees: [0, 5, 1, 4],
    feeling: "Casa vira ciclo e prepara retorno.",
    mission: "Use a camada caminho e observe a menor distancia entre acordes.",
    songs: ["Heart and Soul - Hoagy Carmichael", "Blue Moon - Richard Rodgers / Lorenz Hart"]
  },
  {
    id: "36251",
    group: "cadence",
    name: "Descida de preparacoes",
    formula: "iii - vi - ii - V - I",
    degrees: [2, 5, 1, 4, 0],
    feeling: "Uma escada longa ate casa.",
    mission: "Foque na conducao: cada acorde entrega o proximo.",
    songs: ["Turnarounds de jazz, bossa nova e standards."]
  },
  {
    id: "1454",
    group: "guided",
    name: "Groove de tres acordes",
    formula: "I - IV - V - IV",
    degrees: [0, 3, 4, 3],
    feeling: "Base direta para tocar e cantar por cima.",
    mission: "Fique so em tonica e quinta. O objetivo e pulso, nao velocidade.",
    songs: ["Familia de blues, rock and roll e country."]
  },
  {
    id: "1234",
    group: "guided",
    name: "Subida diatonica",
    formula: "I - ii - iii - IV",
    degrees: [0, 1, 2, 3],
    feeling: "Sobe por dentro do tom sem grandes saltos.",
    mission: "Diga o nome do grau antes de tocar cada alvo.",
    songs: ["Passagens de ligacao em arranjos pop e gospel."]
  }
];

const els = {};
let state = {
  key: 0,
  progressionId: "1564",
  selectedDegree: 0,
  layer: "root",
  region: "mid",
  bpm: 76,
  currentEventIndex: -1,
  currentEvent: null,
  nextEvent: null,
  isPlaying: false,
  randomOn: false,
  randomStartedAt: 0,
  randomDuration: 20,
  randomTimer: null
};
let audioCtx;
let timers = [];
let oscillators = [];

function pc(value) {
  return ((value % 12) + 12) % 12;
}

function noteName(pcValue) {
  return NOTE_NAMES[pc(pcValue)];
}

function notePt(pcValue) {
  return NOTE_PT[pc(pcValue)];
}

function freq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function getProgression() {
  return PROGRESSIONS.find((item) => item.id === state.progressionId) || PROGRESSIONS[0];
}

function degreeRootPc(degree) {
  return pc(state.key + MAJOR_SCALE[degree]);
}

function chordName(degree) {
  const quality = QUALITIES[degree];
  return `${noteName(degreeRootPc(degree))}${quality.suffix}`;
}

function allFretPositions(pcValue) {
  const [minFret, maxFret] = REGIONS[state.region];
  const positions = [];
  TUNING.forEach((string, stringIndex) => {
    for (let fret = 0; fret <= 12; fret += 1) {
      const midi = string.midi + fret;
      if (pc(midi) === pc(pcValue)) {
        const inRegion = fret >= minFret && fret <= maxFret;
        positions.push({ stringIndex, fret, midi, inRegion });
      }
    }
  });
  const regional = positions.filter((item) => item.inRegion);
  return regional.length ? regional : positions;
}

function choosePosition(pcValue, previousMidi) {
  const positions = allFretPositions(pcValue);
  if (!positions.length) {
    return { stringIndex: 3, fret: 0, midi: 40 + pcValue };
  }
  if (typeof previousMidi !== "number") {
    return positions[Math.floor(positions.length / 2)];
  }
  return positions
    .slice()
    .sort((a, b) => Math.abs(a.midi - previousMidi) - Math.abs(b.midi - previousMidi))[0];
}

function layerIntervals(degree, nextDegree) {
  const quality = QUALITIES[degree];
  if (state.layer === "root") return [0];
  if (state.layer === "root5") return [0, 7];
  if (state.layer === "triad") return quality.tones.slice(0, 3);
  if (state.layer === "seventh") return quality.tones;
  const nextRoot = pc(degreeRootPc(nextDegree));
  const root = pc(degreeRootPc(degree));
  const approach = pc(nextRoot - 1);
  return [root, pc(root + 7), pc(root + quality.tones[1]), approach].map((item) => pc(item - root));
}

function buildEvents() {
  const progression = getProgression();
  const events = [];
  let previousMidi;
  progression.degrees.forEach((degree, chordIndex) => {
    const nextDegree = progression.degrees[(chordIndex + 1) % progression.degrees.length];
    const rootPc = degreeRootPc(degree);
    const intervals = layerIntervals(degree, nextDegree);
    intervals.forEach((interval, noteIndex) => {
      const pcValue = pc(rootPc + interval);
      const position = choosePosition(pcValue, previousMidi);
      previousMidi = position.midi;
      events.push({
        degree,
        chordIndex,
        noteIndex,
        pc: pcValue,
        midi: position.midi,
        stringIndex: position.stringIndex,
        fret: position.fret,
        roman: ROMANS[degree],
        chord: chordName(degree)
      });
    });
  });
  return events;
}

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playBass(midi, duration = 0.4, accent = false) {
  ensureAudio();
  const start = audioCtx.currentTime + 0.01;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(freq(midi), start);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(accent ? 760 : 560, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(accent ? 0.17 : 0.11, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
  oscillators.push(osc);
}

function clearPlayback() {
  timers.forEach(clearTimeout);
  timers = [];
  oscillators.forEach((osc) => {
    try {
      osc.stop();
    } catch (error) {
      // Oscillator may already have stopped.
    }
  });
  oscillators = [];
}

function stopLoop() {
  clearPlayback();
  state.isPlaying = false;
  state.currentEventIndex = -1;
  state.currentEvent = null;
  state.nextEvent = null;
  render();
}

function playLoop() {
  clearPlayback();
  const events = buildEvents();
  if (!events.length) return;
  state.isPlaying = true;
  const stepMs = 60000 / state.bpm;
  events.forEach((event, index) => {
    timers.push(
      setTimeout(() => {
        if (!state.isPlaying) return;
        state.currentEventIndex = index;
        state.currentEvent = event;
        state.nextEvent = events[(index + 1) % events.length];
        playBass(event.midi, Math.min(stepMs / 1000 * 0.72, 0.5), event.noteIndex === 0);
        render();
      }, index * stepMs)
    );
  });
  timers.push(
    setTimeout(() => {
      if (state.isPlaying) playLoop();
    }, events.length * stepMs + 80)
  );
}

function playDegree(degree) {
  state.selectedDegree = degree;
  const position = choosePosition(degreeRootPc(degree), state.currentEvent?.midi);
  state.currentEvent = {
    degree,
    chordIndex: 0,
    noteIndex: 0,
    pc: degreeRootPc(degree),
    midi: position.midi,
    stringIndex: position.stringIndex,
    fret: position.fret,
    roman: ROMANS[degree],
    chord: chordName(degree)
  };
  state.nextEvent = null;
  state.currentEventIndex = -1;
  playBass(position.midi, 0.5, true);
  render();
}

function randomPool() {
  if (state.randomScope === "all") return PROGRESSIONS;
  if (state.randomScope === "cadence") return PROGRESSIONS.filter((item) => item.group.includes("cadence"));
  if (state.randomScope === "color") return PROGRESSIONS.filter((item) => item.group.includes("color"));
  return PROGRESSIONS.filter((item) => item.group.includes("guided"));
}

function chooseRandomProgression() {
  const pool = randomPool();
  const current = state.progressionId;
  const options = pool.length > 1 ? pool.filter((item) => item.id !== current) : pool;
  const next = options[Math.floor(Math.random() * options.length)];
  if (!next) return;
  state.progressionId = next.id;
  state.randomStartedAt = Date.now();
  playLoop();
  render();
}

function startRandomFlow() {
  state.randomOn = true;
  state.randomDuration = Math.max(5, Number(els.randomSeconds.value) || 20);
  chooseRandomProgression();
  clearInterval(state.randomTimer);
  state.randomTimer = setInterval(() => {
    const elapsed = (Date.now() - state.randomStartedAt) / 1000;
    if (elapsed >= state.randomDuration) {
      chooseRandomProgression();
      return;
    }
    updateRandomStatus();
  }, 300);
  updateRandomStatus();
}

function stopRandomFlow() {
  state.randomOn = false;
  clearInterval(state.randomTimer);
  state.randomTimer = null;
  stopLoop();
  updateRandomStatus();
}

function updateRandomStatus() {
  if (!els.randomStatus) return;
  if (!state.randomOn) {
    els.randomStatus.textContent = "Fluxo parado.";
    els.randomMeter.value = 0;
    return;
  }
  const elapsed = (Date.now() - state.randomStartedAt) / 1000;
  const remaining = Math.max(0, Math.ceil(state.randomDuration - elapsed));
  els.randomStatus.textContent = `Rodando "${getProgression().formula}". Proxima em ${remaining}s.`;
  els.randomMeter.value = Math.min(100, (elapsed / state.randomDuration) * 100);
}

function renderSelectors() {
  const keys = [0, 7, 2, 9, 4, 11, 5, 10, 3, 8, 1, 6];
  els.keySelect.innerHTML = "";
  keys.forEach((key) => {
    const option = new Option(`${NOTE_NAMES[key]} / ${NOTE_PT[key]}`, String(key));
    els.keySelect.add(option);
  });
  els.keySelect.value = String(state.key);
}

function renderDegreeButtons() {
  els.degreeButtons.innerHTML = "";
  ROMANS.forEach((roman, degree) => {
    const button = document.createElement("button");
    button.className = `degree-button${state.selectedDegree === degree ? " active" : ""}`;
    button.type = "button";
    button.textContent = roman;
    button.title = DEGREE_FEEL[degree];
    button.addEventListener("click", () => playDegree(degree));
    els.degreeButtons.appendChild(button);
  });
}

function renderSequenceStrip() {
  const progression = getProgression();
  els.sequenceStrip.innerHTML = "";
  progression.degrees.forEach((degree, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `step-card${state.currentEvent?.chordIndex === index ? " active" : ""}`;
    card.innerHTML = `<strong>${chordName(degree)}</strong><span>${ROMANS[degree]}</span>`;
    card.addEventListener("click", () => playDegree(degree));
    els.sequenceStrip.appendChild(card);
  });
}

function renderFretboard() {
  const progression = getProgression();
  const scalePcs = MAJOR_SCALE.map((item) => pc(state.key + item));
  const sequencePcs = progression.degrees.map((degree) => degreeRootPc(degree));
  const activeDegree = state.currentEvent?.degree ?? progression.degrees[0];
  const rootPc = degreeRootPc(activeDegree);
  const chordPcs = QUALITIES[activeDegree].tones.map((tone) => pc(rootPc + tone));
  els.fretboard.innerHTML = "";

  const labels = document.createElement("div");
  labels.className = "fret-labels";
  labels.innerHTML = "<span></span>" + Array.from({ length: 13 }, (_, fret) => `<span>${fret}</span>`).join("");
  els.fretboard.appendChild(labels);

  TUNING.forEach((string, stringIndex) => {
    const row = document.createElement("div");
    row.className = "string-row";
    const name = document.createElement("div");
    name.className = "string-name";
    name.textContent = string.name;
    row.appendChild(name);

    for (let fret = 0; fret <= 12; fret += 1) {
      const midi = string.midi + fret;
      const currentPc = pc(midi);
      const cell = document.createElement("button");
      const isTarget = state.currentEvent?.stringIndex === stringIndex && state.currentEvent?.fret === fret;
      const isNext = state.nextEvent?.stringIndex === stringIndex && state.nextEvent?.fret === fret;
      const isRoot = currentPc === rootPc;
      const classes = ["fret"];
      if (scalePcs.includes(currentPc)) classes.push("scale");
      if (sequencePcs.includes(currentPc) || chordPcs.includes(currentPc)) classes.push("chord");
      if (isRoot) classes.push("root");
      if (isNext) classes.push("next");
      if (isTarget) classes.push("target");
      cell.type = "button";
      cell.className = classes.join(" ");
      cell.innerHTML = `<span class="note-dot">${notePt(currentPc)}</span>`;
      cell.addEventListener("click", () => {
        state.currentEvent = {
          degree: activeDegree,
          chordIndex: 0,
          noteIndex: 0,
          pc: currentPc,
          midi,
          stringIndex,
          fret,
          roman: "",
          chord: noteName(currentPc)
        };
        state.nextEvent = null;
        playBass(midi, 0.46, true);
        render();
      });
      row.appendChild(cell);
    }
    els.fretboard.appendChild(row);
  });
}

function renderNotePath() {
  const events = buildEvents();
  els.notePath.innerHTML = "";
  events.forEach((event, index) => {
    const pill = document.createElement("span");
    pill.className = `note-pill${index === state.currentEventIndex ? " active" : ""}`;
    pill.textContent = `${event.roman}:${notePt(event.pc)} ${TUNING[event.stringIndex].name}${event.fret}`;
    els.notePath.appendChild(pill);
  });
}

function renderMissions() {
  els.missionGrid.innerHTML = "";
  PROGRESSIONS.forEach((item) => {
    const card = document.createElement("article");
    card.className = "mission-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <span class="tag">${item.formula}</span>
      <strong>${item.name}</strong>
      <p>${item.mission}</p>
    `;
    const load = () => {
      state.progressionId = item.id;
      state.currentEvent = null;
      state.nextEvent = null;
      playLoop();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    card.addEventListener("click", load);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") load();
    });
    els.missionGrid.appendChild(card);
  });
}

function renderSongExamples() {
  els.songExamples.innerHTML = "";
  PROGRESSIONS.filter((item) => item.songs?.length).forEach((item) => {
    const card = document.createElement("article");
    card.className = "song-card";
    card.innerHTML = `
      <span class="tag">${item.formula}</span>
      <strong>${item.name}</strong>
      <p>${item.feeling}</p>
      <ul>${item.songs.map((song) => `<li>${song}</li>`).join("")}</ul>
    `;
    els.songExamples.appendChild(card);
  });
}

function renderHeader() {
  const progression = getProgression();
  const current = state.currentEvent;
  els.currentProgressionName.textContent = `${progression.formula} - ${progression.name}`;
  els.currentProgressionFeeling.textContent = progression.feeling;
  els.stageTitle.textContent = progression.name;
  els.stageSubtitle.textContent = progression.mission;
  els.currentRoman.textContent = current?.roman || progression.formula;
  els.currentChord.textContent = current?.chord || chordName(progression.degrees[0]);
}

function render() {
  renderHeader();
  renderDegreeButtons();
  renderSequenceStrip();
  renderFretboard();
  renderNotePath();
  updateRandomStatus();
}

function bind() {
  els.keySelect.addEventListener("change", (event) => {
    state.key = Number(event.target.value);
    stopLoop();
    render();
  });
  els.layerSelect.addEventListener("change", (event) => {
    state.layer = event.target.value;
    if (state.isPlaying) playLoop();
    render();
  });
  els.regionSelect.addEventListener("change", (event) => {
    state.region = event.target.value;
    if (state.isPlaying) playLoop();
    render();
  });
  els.bpmInput.addEventListener("input", (event) => {
    state.bpm = Number(event.target.value);
    els.bpmValue.textContent = String(state.bpm);
  });
  els.bpmInput.addEventListener("change", () => {
    if (state.isPlaying) playLoop();
  });
  els.playButton.addEventListener("click", playLoop);
  els.stopButton.addEventListener("click", () => {
    state.randomOn = false;
    stopRandomFlow();
  });
  els.randomScope.addEventListener("change", (event) => {
    state.randomScope = event.target.value;
  });
  els.randomStart.addEventListener("click", startRandomFlow);
  els.randomNext.addEventListener("click", chooseRandomProgression);
  els.randomStop.addEventListener("click", stopRandomFlow);
}

function boot() {
  [
    "keySelect",
    "layerSelect",
    "regionSelect",
    "bpmInput",
    "bpmValue",
    "playButton",
    "stopButton",
    "degreeButtons",
    "randomSeconds",
    "randomScope",
    "randomStart",
    "randomNext",
    "randomStop",
    "randomStatus",
    "randomMeter",
    "currentProgressionName",
    "currentProgressionFeeling",
    "stageTitle",
    "stageSubtitle",
    "currentRoman",
    "currentChord",
    "sequenceStrip",
    "fretboard",
    "notePath",
    "missionGrid",
    "songExamples"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
  state.randomScope = els.randomScope.value;
  renderSelectors();
  bind();
  renderMissions();
  renderSongExamples();
  render();
}

boot();
