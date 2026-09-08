const questions = [
  { category: 'Historia', q: 'W którym roku odbyła się bitwa pod Grunwaldem?', a: ['966', '1410', '1791', '1918'], c: 1 },
  { category: 'Sport', q: 'W którym sporcie używa się lotki?', a: ['Tenis', 'Squash', 'Badminton', 'Golf'], c: 2 },
  { category: 'Muzyka', q: 'Który instrument ma klawisze, pedały i struny?', a: ['Flet', 'Trąbka', 'Bęben', 'Fortepian'], c: 3 },
  { category: 'Zwierzęta', q: 'Które zwierzę ma trąbę?', a: ['Żyrafa', 'Zebra', 'Hipopotam', 'Słoń'], c: 3 },
];
questions.unshift(...suppliedQuestions);
const playableQuestions = questions.filter(question => question.enabled !== false);
const usedQuestions = new Set();
function questionKey(question) {
  const text = question.q.toLocaleLowerCase('pl').replace(/[„”"'’?.:…]/g, '').replace(/\s+/g, ' ').trim();
  // The supplied bank includes differently worded versions of these questions.
  const equivalentTopics = [
    [/stolic.*australii/, 'capital-australia'],
    [/najbliżej słońca/, 'closest-planet'],
    [/pompuje krew/, 'heart-organ'],
    [/kowboj.*toy story/, 'toy-story-cowboy'],
    [/naturalny satelita ziemi/, 'earth-moon'],
    [/zmieszaniu.*(żółt|niebiesk)/, 'paint-green'],
  ];
  for (const [pattern, key] of equivalentTopics) if (pattern.test(text)) return key;
  // Repeated generic prompts (e.g. true/false) are distinct by their answers.
  return text + '|' + [...question.a].map(a => a.toLocaleLowerCase('pl').trim()).sort().join('|');
}
function remainingQuestions() {
  const unique = new Map();
  playableQuestions.forEach(question => {
    const key = questionKey(question);
    if (!usedQuestions.has(key) && !unique.has(key)) unique.set(key, question);
  });
  return [...unique.values()];
}
const playerNames = ['Jasio', 'Zuzia', 'Marcin', 'Aneta', 'Bartek', 'Sylwia'];
const app = document.querySelector('#app');
let players = 2, focus = 0, questionIndex = 0, scores = [], locked = false, screen = 'opening';
let confirmedPlayers = Array(playerNames.length).fill(false);
let participants = [], lives = [], currentPlayer = 0, currentQuestion = null, roundPhase = 'draw-player', timerId = null, timeLeft = 30;
let drawCounts = [];
function fairPlayerPool() {
  const active = lives.map((life, i) => life > 0 ? i : -1).filter(i => i >= 0);
  const minimum = Math.min(...active.map(i => drawCounts[i]));
  return active.filter(i => drawCounts[i] === minimum);
}
const keys = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', Enter: 'ok', ' ': 'ok', Escape: 'back', Backspace: 'back', BrowserBack: 'back' };

let drawAudio = null;
function unlockDrawAudio() {
  try {
    const AudioEngine = window.AudioContext || window.webkitAudioContext;
    if (!AudioEngine) return;
    if (!drawAudio) drawAudio = new AudioEngine();
    if (drawAudio.state === 'suspended') drawAudio.resume().catch(() => {});
  } catch { /* Unsupported audio must not interrupt the game. */ }
}
// Unlock sound during a real click or remote-control key press.
document.addEventListener('click', unlockDrawAudio, true);
document.addEventListener('keydown', unlockDrawAudio, true);
function playDrawClick() {
  if (!drawAudio || drawAudio.state !== 'running') return;
  const oscillator = drawAudio.createOscillator();
  const gain = drawAudio.createGain();
  const now = drawAudio.currentTime;
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(1100, now);
  oscillator.frequency.exponentialRampToValueAtTime(500, now + .035);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(.12, now + .003);
  gain.gain.exponentialRampToValueAtTime(.001, now + .04);
  oscillator.connect(gain);
  gain.connect(drawAudio.destination);
  oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  oscillator.start(now);
  oscillator.stop(now + .045);
}

const heartbeatVoices = new Set();
function stopHeartbeat() {
  heartbeatVoices.forEach(voice => { voice.gain.disconnect(); voice.oscillator.stop(); });
  heartbeatVoices.clear();
  document.querySelector('.timer')?.classList.remove('timer-urgent');
}
function playHeartbeat() {
  if (!drawAudio || drawAudio.state !== 'running') return;
  [0, .18].forEach((delay, index) => {
    const oscillator = drawAudio.createOscillator();
    const gain = drawAudio.createGain();
    const at = drawAudio.currentTime + delay;
    const voice = { oscillator, gain };
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(100, at);
    oscillator.frequency.exponentialRampToValueAtTime(45, at + .14);
    gain.gain.setValueAtTime(0, drawAudio.currentTime);
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(index ? .16 : .24, at + .012);
    gain.gain.exponentialRampToValueAtTime(.001, at + .16);
    oscillator.connect(gain);
    gain.connect(drawAudio.destination);
    heartbeatVoices.add(voice);
    oscillator.onended = () => {
      oscillator.disconnect(); gain.disconnect(); heartbeatVoices.delete(voice);
    };
    oscillator.start(at);
    oscillator.stop(at + .18);
  });
}
let musicBus = null, musicLoop = null, musicStep = 0, musicNext = 0;
function syncMusic() {
  if (screen === 'opening') {
    clearInterval(musicLoop);
    musicLoop = null;
    if (musicBus) { musicBus.disconnect(); musicBus = null; }
    return;
  }
  if (!drawAudio || drawAudio.state !== 'running' || musicLoop !== null) return;
  musicBus = drawAudio.createGain();
  musicBus.gain.value = .2;
  musicBus.connect(drawAudio.destination);
  musicStep = 0;
  musicNext = drawAudio.currentTime + .05;
  const note = (midi, at, duration, volume, type) => {
    const oscillator = drawAudio.createOscillator();
    const gain = drawAudio.createGain();
    oscillator.type = type;
    oscillator.frequency.value = 440 * Math.pow(2, (midi - 69) / 12);
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(volume, at + .04);
    gain.gain.exponentialRampToValueAtTime(.001, at + duration);
    oscillator.connect(gain); gain.connect(musicBus);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    oscillator.start(at); oscillator.stop(at + duration + .02);
  };
  const chords = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 59], [55, 59, 62, 65]];
  const schedule = () => {
    if (drawAudio.state !== 'running') return;
    if (musicNext < drawAudio.currentTime) musicNext = drawAudio.currentTime + .05;
    while (musicNext < drawAudio.currentTime + .2) {
      const chord = chords[Math.floor(musicStep / 16) % chords.length];
      note(chord[[0, 2, 1, 3, 2, 1, 3, 2][musicStep % 8]] + 12, musicNext, .55, .22, 'sine');
      if (musicStep % 4 === 0) note(chord[0] - 12, musicNext, .85, .3, 'triangle');
      if (musicStep % 16 === 0) chord.forEach(pitch => note(pitch, musicNext, 3.8, .07, 'sine'));
      musicStep++;
      musicNext += .25;
    }
  };
  schedule();
  musicLoop = setInterval(schedule, 100);
}
document.addEventListener('click', () => { unlockDrawAudio(); if (drawAudio) drawAudio.resume().then(syncMusic).catch(() => {}); });
document.addEventListener('keydown', () => { unlockDrawAudio(); if (drawAudio) drawAudio.resume().then(syncMusic).catch(() => {}); });
const participantVoice = new Audio();
const categoryVoiceFiles = {
  'Wiedza ogólna': 'k_wiedza_ogolna.mp3',
  'Historia': 'k_historia.mp3',
  'Geografia': 'k_geografia.mp3',
  'Filmy i seriale': 'k_filmy_i_seriale.mp3',
  'Muzyka': 'k_muzyka.mp3',
  'Jedzenie i kuchnia': 'k_jedzenie_i_kuchnia.mp3',
  'Nauka i technologia': 'k_nauka_i_technologia.mp3',
  'Sport': 'k_sport.mp3',
  'Zwierzęta': 'k_zwierzeta.mp3',
  'Polska': 'polska.mp3',
  'Świat': 'k_swiat.mp3',
  'Gry komputerowe': 'k_gry_komputerowe.mp3',
  'Internet i memy': 'k_internet_i_memy.mp3',
  'Gwiazdy i celebryci': 'k_gwiazdy_i_celebryci.mp3',
  'Kto to powiedział?': 'k_kto_to_powiedzial.mp3',
  'Prawda czy fałsz': 'k_prawda_czy_falsz.mp3',
  'Lata 90. i 2000.': 'k_lata_90_i_2000.mp3',
  'Dziwne fakty': 'k_dziwne_fakty.mp3',
  'Obiadowy Mix': 'k_obiadowy_mix.mp3',
};
participantVoice.preload = 'auto';
let renderedScreen = null;
let cancelParticipantVoice = null;
function stopParticipantVoice() {
  participantVoice.pause();
  if (cancelParticipantVoice) cancelParticipantVoice();
}
function playParticipantVoice(file) {
  stopParticipantVoice();
  return new Promise(resolve => {
    const finish = () => {
      participantVoice.removeEventListener('ended', finish);
      participantVoice.removeEventListener('error', finish);
      if (cancelParticipantVoice === finish) cancelParticipantVoice = null;
      resolve();
    };
    cancelParticipantVoice = finish;
    participantVoice.addEventListener('ended', finish, { once: true });
    participantVoice.addEventListener('error', finish, { once: true });
    participantVoice.src = './assets/' + file;
    participantVoice.currentTime = 0;
    participantVoice.play().catch(finish);
  });
}
function toggleParticipant(index) {
  confirmedPlayers[index] = !confirmedPlayers[index];
  focus = index;
  render();
  playParticipantVoice(playerNames[index].toLowerCase() + '.mp3');
}
function render() {
  if (screen !== renderedScreen) {
    stopParticipantVoice();
    if (screen === 'setup') playParticipantVoice('uczestnicy.mp3');
    renderedScreen = screen;
  }
  syncMusic();
  if (screen !== 'game') stopHeartbeat();
  if (screen === 'opening') return opening();
  if (screen === 'setup') return setup();
  if (screen === 'game') return game();
  result();
}
function opening() {
  app.innerHTML = `<section class="screen opening"><video class="scene-video" playsinline preload="auto"><source src="./assets/intro.mp4" type="video/mp4"></video><div class="scene-shade"></div><button class="primary focused" data-begin>Rozpocznij</button></section>`;
  const video = document.querySelector('.scene-video');
  const begin = () => {
    document.querySelector('[data-begin]').remove();
    video.play().catch(() => { screen = 'setup'; focus = 0; render(); });
  };
  video.addEventListener('ended', () => { screen = 'setup'; focus = 0; render(); });
  document.querySelector('[data-begin]').onclick = begin;
  window.beginOpening = begin;
}
// Keep the decoded video mounted while replacing only the scene controls.
function renderVideoScene(markup) {
  const template = document.createElement('template');
  template.innerHTML = markup;
  const next = template.content.firstElementChild;
  const current = app.firstElementChild;
  const video = current?.querySelector('.scene-video');
  if (!video || video.querySelector('source')?.getAttribute('src') !== next.querySelector('source').getAttribute('src')) {
    app.replaceChildren(next);
    return;
  }
  current.className = next.className;
  for (const child of [...current.children]) {
    if (child !== video && !child.classList.contains('scene-shade')) child.remove();
  }
  for (const child of [...next.children]) {
    if (!child.matches('.scene-video, .scene-shade')) current.append(child);
  }
}
function setup() {
  renderVideoScene(`<section class="screen setup"><video class="scene-video" muted playsinline preload="auto" aria-hidden="true"><source src="./assets/mo2.mp4" type="video/mp4"></video><div class="scene-shade"></div><div class="player-panel"><h2>Wybierz graczy</h2><div class="player-grid">${playerNames.map((name, i) => `<button class="player-choice ${focus===i?'focused':''} ${confirmedPlayers[i]?'confirmed':''}" data-player-index="${i}">${name}</button>`).join('')}</div></div><button class="primary continue-button ${focus===playerNames.length?'focused':''}" data-continue>Dalej</button></section>`);
  document.querySelectorAll('[data-player-index]').forEach(b => b.onclick = () => toggleParticipant(+b.dataset.playerIndex));
  document.querySelector('[data-continue]').onclick = continueToGame;
}
function continueToGame() {
  const selected = confirmedPlayers.filter(Boolean).length;
  if (!selected) return;
  players = selected;
  start();
}
function playSuccess() {
  if (!drawAudio || drawAudio.state !== 'running') return;
  [523.25, 659.25, 783.99, 1046.5].forEach((frequency, i) => {
    const oscillator = drawAudio.createOscillator();
    const gain = drawAudio.createGain();
    const at = drawAudio.currentTime + i * .12;
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, at);
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(.13, at + .015);
    gain.gain.exponentialRampToValueAtTime(.001, at + .3);
    oscillator.connect(gain);
    gain.connect(drawAudio.destination);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    oscillator.start(at);
    oscillator.stop(at + .32);
  });
}
function playHeartBreak() {
  if (!drawAudio || drawAudio.state !== 'running') return;
  const length = Math.floor(drawAudio.sampleRate * .32);
  const buffer = drawAudio.createBuffer(1, length, drawAudio.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) samples[i] = Math.random() * 2 - 1;
  const source = drawAudio.createBufferSource();
  const filter = drawAudio.createBiquadFilter();
  const gain = drawAudio.createGain();
  const now = drawAudio.currentTime;
  source.buffer = buffer;
  filter.type = 'highpass';
  filter.frequency.value = 1000;
  gain.gain.setValueAtTime(.001, now);
  gain.gain.linearRampToValueAtTime(.2, now + .008);
  gain.gain.exponentialRampToValueAtTime(.001, now + .3);
  source.connect(filter); filter.connect(gain); gain.connect(drawAudio.destination);
  source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  source.start(now);
}
function breakHeart(player) {
  const card = document.querySelectorAll('.score')[player];
  const row = card?.querySelector('.life-hearts');
  const heart = row?.children[lives[player]];
  if (!heart) return;
  row.setAttribute('aria-label', lives[player] + ' życia');
  heart.classList.add('heart-breaking');
  heart.textContent = '';
  for (let i = 0; i < 6; i++) {
    const shard = document.createElement('span');
    shard.className = 'heart-shard';
    shard.textContent = '♥';
    shard.style.setProperty('--piece', i);
    shard.style.setProperty('--shard-x', ((i % 3) - 1) * 24 + 'px');
    shard.style.setProperty('--shard-y', (i < 3 ? -24 : 30) + 'px');
    shard.style.setProperty('--shard-angle', (i % 2 ? 38 : -38) + 'deg');
    heart.append(shard);
  }
  playHeartBreak();
  setTimeout(() => {
    if (!heart.isConnected) return;
    heart.classList.remove('heart-breaking');
    heart.classList.add('life-empty');
    heart.textContent = '♥';
    if (!lives[player]) card.classList.add('out');
  }, 950);
}
function playFailure() {
  if (!drawAudio || drawAudio.state !== 'running') return;
  [220, 174.61, 130.81].forEach((frequency, i) => {
    const oscillator = drawAudio.createOscillator();
    const gain = drawAudio.createGain();
    const at = drawAudio.currentTime + i * .22;
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, at);
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(.18, at + .02);
    gain.gain.exponentialRampToValueAtTime(.001, at + .35);
    oscillator.connect(gain);
    gain.connect(drawAudio.destination);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    oscillator.start(at);
    oscillator.stop(at + .36);
  });
}
let previousRoundWon = null;
function randomClip(prefix, count) {
  return prefix + (1 + Math.floor(Math.random() * count)) + '.mp3';
}
function roundCommentPool(won) {
  const pool = Array.from({ length: 7 }, (_, i) => 'neut_com' + (i + 1) + '.mp3');
  if (won !== null) {
    const prefix = won ? 'win_com' : 'lost_com';
    for (let i = 1; i <= 5; i++) pool.push(prefix + i + '.mp3');
  }
  return pool;
}
function showRound() {
  clearTimeout(timerId);
  roundPhase = 'round-intro';
  render();
  const board = document.querySelector('.game-board');
  const pool = roundCommentPool(previousRoundWon);
  const narration = playParticipantVoice(questionIndex === 0
    ? 'runda1.mp3' : pool[Math.floor(Math.random() * pool.length)]);
  const hold = new Promise(resolve => { timerId = setTimeout(resolve, 2000); });
  Promise.all([narration, hold]).then(() => {
    if (screen !== 'game' || roundPhase !== 'round-intro' || !board.isConnected) return;
    roundPhase = 'draw-player';
    render();
    animateDraw();
  });
}
function start() {
  previousRoundWon = null;
  usedQuestions.clear();
  participants = playerNames.filter((_, i) => confirmedPlayers[i]);
  if (!participants.length) participants = playerNames.slice(0, players);
  players = participants.length; lives = Array(players).fill(3); scores = Array(players).fill(0); drawCounts = Array(players).fill(0); questionIndex = 0; focus = 0; locked = false; screen = 'game'; showRound();
}
function animateDraw() {
  clearTimeout(timerId);
  const phase = roundPhase;
  const isPlayer = phase === 'draw-player';
  const options = isPlayer
    ? participants.map((name, i) => lives[i] > 0 ? i : -1).filter(i => i >= 0)
    : [...new Set(remainingQuestions().map(q => q.category))];
  const eligible = isPlayer ? fairPlayerPool() : options;
  const winner = eligible[Math.floor(Math.random() * eligible.length)];
  const panel = document.querySelector('.draw');
  const label = panel.querySelector('h1');
  const drawVoice = playParticipantVoice(
    (isPlayer ? 'losowanie_zawodnika' : 'losuj_kategorie') +
    (1 + Math.floor(Math.random() * 5)) + '.mp3'
  );
  const started = performance.now();
  let index = 0;
  let displayedValue;
  const display = value => {
    if (value !== displayedValue) playDrawClick();
    displayedValue = value;
    label.textContent = isPlayer ? participants[value] : value;
    if (isPlayer) document.querySelectorAll('.score').forEach((card, i) => card.classList.toggle('active', i === value));
  };
  const tick = () => {
    if (screen !== 'game' || roundPhase !== phase || !panel.isConnected) return;
    const progress = Math.min((performance.now() - started) / 5000, 1);
    if (progress >= 1) {
      display(winner);
      if (isPlayer) {
        currentPlayer = winner;
        drawCounts[winner] += 1;
      }
      else {
        const pool = remainingQuestions().filter(q => q.category === winner);
        currentQuestion = pool[Math.floor(Math.random() * pool.length)];
        usedQuestions.add(questionKey(currentQuestion));
      }
      panel.classList.add('draw-settled');
      const voice = drawVoice.then(() => {
          if (screen !== 'game' || roundPhase !== phase || !panel.isConnected) return;
          const file = isPlayer
            ? participants[winner].toLowerCase() + '.mp3'
            : categoryVoiceFiles[winner];
          if (file) return playParticipantVoice(file);
        });
      const hold = new Promise(resolve => { timerId = setTimeout(resolve, 1200); });
      Promise.all([voice, hold]).then(() => {
        if (screen === 'game' && roundPhase === phase && panel.isConnected) nextPhase();
      });
      return;
    }
    display(options[index++ % options.length]);
    const delay = Math.round(480 - 420 * progress);
    label.style.setProperty('--draw-step', delay + 'ms');
    label.classList.remove('draw-flip');
    void label.offsetWidth;
    label.classList.add('draw-flip');
    timerId = setTimeout(tick, delay);
  };
  tick();
}
function nextPhase() {
  if (screen !== 'game') return;
  if (roundPhase === 'draw-player') { roundPhase = 'draw-category'; render(); animateDraw(); }
  else if (roundPhase === 'draw-category') { roundPhase = 'reveal'; timeLeft = 30; focus = -1; render(); revealQuestion(); }
}
function revealQuestion() {
  const narration = currentQuestion.audio ? playParticipantVoice(currentQuestion.audio) : Promise.resolve();
  const heading = document.querySelector('.question-text');
  const timer = document.querySelector('.timer');
  const answers = [...document.querySelectorAll('[data-answer]')];
  const letters = Array.from(currentQuestion.q);
  const typed = document.createElement('span');
  typed.className = 'typed-question';
  heading.classList.add('question-typing');
  heading.append(typed);
  timer.style.visibility = 'hidden';
  answers.forEach(button => {
    button.disabled = true;
    button.classList.remove('focused');
    button.classList.add('answer-pending');
  });
  let letterIndex = 0;
  let answerIndex = 0;
  const active = () => screen === 'game' && roundPhase === 'reveal' && heading.isConnected;
  const showAnswer = () => {
    if (!active()) return;
    if (answerIndex < answers.length) {
      answers[answerIndex++].classList.remove('answer-pending');
      timerId = setTimeout(showAnswer, 450);
      return;
    }
    narration.then(() => {
      if (!active()) return;
      roundPhase = 'question';
      answers.forEach(button => { button.disabled = false; });
      timer.style.visibility = '';
      startTimer();
    });
  };
  const typeLetter = () => {
    if (!active()) return;
    typed.textContent = letters.slice(0, ++letterIndex).join('');
    if (letterIndex < letters.length) timerId = setTimeout(typeLetter, 35);
    else {
      heading.textContent = currentQuestion.q;
      heading.classList.remove('question-typing');
      timerId = setTimeout(showAnswer, 300);
    }
  };
  typeLetter();
}
function startTimer() {
  clearInterval(timerId);
  stopHeartbeat();
  let lastHeartbeatSecond = null;
  let halfTimeAnnounced = false;
  const deadline = performance.now() + 30000;
  const heading = document.querySelector('.question-text');
  const frame = document.createElement('div');
  frame.className = 'question-frame';
  heading.before(frame);
  frame.append(heading);
  frame.insertAdjacentHTML('beforeend', '<svg class="time-border" aria-hidden="true"><rect x="3" y="3" width="100%" height="100%" rx="22" pathLength="100"/></svg>');
  const border = frame.querySelector('rect');
  const update = () => {
    const remaining = Math.max(0, deadline - performance.now());
    timeLeft = Math.ceil(remaining / 1000);
    const timer = document.querySelector('.timer');
    if (timer) timer.textContent = timeLeft + 's';
    if (!halfTimeAnnounced && remaining > 0 && remaining <= 15000) {
      halfTimeAnnounced = true;
      playParticipantVoice(randomClip('timehalf', 3));
    }
    if (remaining > 0 && timeLeft < 10 && timeLeft !== lastHeartbeatSecond) {
      lastHeartbeatSecond = timeLeft;
      playHeartbeat();
      if (timer) {
        timer.classList.remove('timer-urgent');
        void timer.offsetWidth;
        timer.classList.add('timer-urgent');
      }
    }
    border.style.strokeDashoffset = 100 * (1 - remaining / 30000);
    frame.style.setProperty('--time-color', 'hsl(' + (remaining / 30000 * 150) + ', 95%, 65%)');
    if (!remaining) { clearInterval(timerId); resolveAnswer(null); }
  };
  update();
  timerId = setInterval(update, 50);
}
function game() {
  if (roundPhase === 'round-intro') {
    renderVideoScene(`<section class="screen game"><video class="scene-video" muted playsinline preload="auto" aria-hidden="true"><source src="./assets/mo2.mp4" type="video/mp4"></video><div class="scene-shade"></div><div class="game-board"><div class="draw draw-settled"><h1>Runda ${questionIndex + 1}</h1></div></div></section>`);
    return;
  }
  const player = participants[currentPlayer];
  const main = roundPhase === 'draw-player' ? `<div class="draw"><span>LOSOWANIE GRACZA</span><h1>${player || '...'}</h1></div>` : roundPhase === 'draw-category' ? `<div class="draw"><span>LOSOWANIE KATEGORII</span><h1>${currentQuestion?.category || '...'}</h1></div>` : `<div class="question"><div class="hud"><span>${currentQuestion.category}</span><span class="timer">${timeLeft}s</span></div><h2 class="question-text">${currentQuestion.q}</h2><div class="answers">${currentQuestion.a.map((a,i)=>`<button class="answer ${focus===i?'focused':''}" data-answer="${i}"><span class="letter">${'ABCD'[i]}</span>${a}</button>`).join('')}</div></div>`;
  renderVideoScene(`<section class="screen game"><video class="scene-video" muted playsinline preload="auto" aria-hidden="true"><source src="./assets/mo2.mp4" type="video/mp4"></video><div class="scene-shade"></div><div class="game-board">${main}<div class="scoreboard">${participants.map((name,i)=>`<div class="score ${i===currentPlayer?'active':''} ${lives[i]===0?'out':''}">${name}<br><strong class="life-hearts" aria-label="${lives[i]} życia">${Array.from({length: 3}, (_, heart) => `<span class="life-heart ${heart >= lives[i] ? 'life-empty' : ''}" aria-hidden="true">♥</span>`).join('')}</strong><span class="score-points">${scores[i]} pkt</span></div>`).join('')}</div></div></section>`);
  document.querySelectorAll('[data-answer]').forEach(b => b.onclick = () => answer(+b.dataset.answer));
}
function answer(selected) {
  if (locked || roundPhase !== 'question' || !Number.isInteger(selected) || selected < 0 || selected > 3) return; clearInterval(timerId); resolveAnswer(selected);
}
function animatePoints(element, from, to) {
  if (!element) return;
  const started = performance.now();
  const duration = 850;
  const tick = now => {
    if (!element.isConnected) return;
    const progress = Math.min(1, (now - started) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = (progress < 1 ? Math.floor(from + (to - from) * eased) : to) + ' pkt';
    if (progress < 1) requestAnimationFrame(tick);
    else element.classList.add('points-total-pulse');
  };
  element.classList.remove('points-total-pulse');
  element.textContent = from + ' pkt';
  requestAnimationFrame(tick);
}
function resolveAnswer(selected) {
  if (locked) return; locked = true; const correct = selected === currentQuestion.c;
  previousRoundWon = correct;
  stopHeartbeat();
  document.querySelectorAll('[data-answer]').forEach(b => { const i = +b.dataset.answer; b.classList.toggle('correct', i === currentQuestion.c); b.classList.toggle('wrong', selected !== null && i === selected && !correct); });
  if (!correct) { lives[currentPlayer] -= 1; breakHeart(currentPlayer); }
  else {
    const bonus = Math.max(0, Math.min(30, timeLeft));
    const previousScore = scores[currentPlayer];
    scores[currentPlayer] += 100 + bonus;
    const points = document.querySelectorAll('.score-points')[currentPlayer];
    animatePoints(points, previousScore, scores[currentPlayer]);
    const feedback = document.createElement('div');
    feedback.className = 'points-earned';
    feedback.textContent = participants[currentPlayer] + ': +' + (100 + bonus) + ' pkt (100 + ' + bonus + ' s)';
    document.querySelector('.question').append(feedback);
  }
  const board = document.querySelector('.game-board');
  const narration = playParticipantVoice(selected === null
    ? randomClip('timeout', 3)
    : randomClip(correct ? 'okej' : 'zla', 7));
  const hold = new Promise(resolve => {
    timerId = setTimeout(resolve, correct ? 1200 : 2500);
  });
  Promise.all([narration, hold]).then(async () => {
    const active = () => screen === 'game' && board.isConnected;
    if (!active()) return;
    if (!correct && lives[currentPlayer] === 0) {
      await playParticipantVoice(participants[currentPlayer].toLowerCase() + '.mp3');
      if (!active()) return;
      await playParticipantVoice(randomClip('gameover', 2));
      if (!active()) return;
    }
    correct ? playReward() : beginNextRound();
  });
}
function playReward() {
  if (screen !== 'game') return;
  const video = document.querySelector('.scene-video');
  roundPhase = 'reward';
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    video.removeEventListener('ended', finish);
    video.removeEventListener('error', finish);
    if (screen === 'game' && roundPhase === 'reward' && video.isConnected) beginNextRound();
  };
  video.addEventListener('ended', finish, { once: true });
  video.addEventListener('error', finish, { once: true });
  video.muted = false;
  video.volume = 1;
  if (video.ended) video.currentTime = 0;
  video.play().catch(finish);
}
function winnerIndexes() {
  if (remainingQuestions().length === 0) {
    const best = Math.max(...scores);
    return scores.map((score, i) => score === best ? i : -1).filter(i => i >= 0);
  }
  return lives.map((life, i) => life > 0 ? i : -1).filter(i => i >= 0);
}
async function announceWinners() {
  const panel = document.querySelector('.result');
  const active = () => screen === 'result' && panel.isConnected;
  for (const i of winnerIndexes()) {
    if (!active()) return;
    await playParticipantVoice(participants[i].toLowerCase() + '.mp3');
  }
  if (active() && winnerIndexes().length) await playParticipantVoice('winner.mp3');
}
function beginNextRound() {
  clearTimeout(timerId); clearInterval(timerId);
  const alive = lives.filter(Boolean).length;
  if ((players > 1 && alive === 1) || alive === 0 || remainingQuestions().length === 0) {
    screen = 'result'; focus = 0; render(); announceWinners(); return;
  }
  locked = false; questionIndex += 1; showRound();
}
function addFireworks(panel) {
  const sky = document.createElement('div');
  sky.className = 'fireworks';
  sky.setAttribute('aria-hidden', 'true');
  const bursts = [
    [14, 22, 40, 0], [84, 19, 185, .8], [31, 12, 315, 1.6],
    [73, 58, 145, 2.4], [12, 70, 265, 3.2], [89, 78, 20, 4],
  ];
  for (const [x, y, hue, delay] of bursts) {
    const burst = document.createElement('div');
    burst.className = 'firework-burst';
    burst.style.left = x + '%';
    burst.style.top = y + '%';
    burst.style.setProperty('--spark-color', 'hsl(' + hue + ', 100%, 72%)');
    burst.style.setProperty('--burst-delay', delay + 's');
    for (let i = 0; i < 24; i++) {
      const spark = document.createElement('i');
      const angle = Math.PI * 2 * i / 24;
      const radius = i % 2 ? 125 : 180;
      spark.style.setProperty('--spark-x', Math.cos(angle) * radius + 'px');
      spark.style.setProperty('--spark-y', Math.sin(angle) * radius + 'px');
      burst.append(spark);
    }
    sky.append(burst);
  }
  panel.prepend(sky);
}
function result() {
  const winnerIds = winnerIndexes();
  const winners = winnerIds.map(i => participants[i]).join(' i ');
  const title = winnerIds.length ? winners + (winnerIds.length > 1 ? ' wygrywają!' : ' wygrywa!') : 'Koniec gry';
  const description = remainingQuestions().length === 0 ? 'Pytania wyczerpane — wygrywa najwyższy wynik.' : winnerIds.length ? 'Ostatni gracz z życiami wygrywa!' : 'Wszystkie życia zostały wykorzystane.';
  app.innerHTML = `<section class="screen result"><div class="trophy">🏆</div><div class="eyebrow">Koniec gry</div><h1>${title}</h1><p class="lead">${description}</p><div class="scoreboard">${scores.map((s,i)=>`<div class="score ${winnerIds.includes(i)?'active':''}">${participants[i]}<br><strong>${s} pkt</strong></div>`).join('')}</div><button class="primary ${focus===0?'focused':''}" data-restart>Gramy jeszcze raz</button><p class="hint">OK — nowa gra</p></section>`;
  document.querySelector('[data-restart]').onclick = start;
  addFireworks(document.querySelector('.result'));
}
document.addEventListener('keydown', e => {
  const action = keys[e.key]; if (!action) return; e.preventDefault();
  if (screen === 'opening') { if (action === 'ok') window.beginOpening?.(); }
  else if (screen === 'setup') { if (['left','right','up','down'].includes(action)) { const shifts={left:-1,right:1,up:-3,down:3}; const next=focus+shifts[action]; if(next>=0&&next<=playerNames.length) { focus=next; render(); } } else if(action==='ok') { if (focus===playerNames.length) continueToGame(); else toggleParticipant(focus); } else if(action==='back') { screen='opening'; focus=0; render(); } }
  else if (screen === 'game') { if (action==='back') { clearTimeout(timerId); clearInterval(timerId); screen='setup'; focus=0; render(); } else if (!locked && roundPhase === 'question' && ['left','right','up','down'].includes(action)) { const grid={left:-1,right:1,up:-2,down:2}; const next=focus < 0 ? 0 : focus+grid[action]; if(next>=0&&next<4) { focus=next; document.querySelectorAll('[data-answer]').forEach((button, i) => button.classList.toggle('focused', i === focus)); } } else if(action==='ok'&&!locked) answer(focus); }
  else if (action==='ok') start(); else if(action==='back') { screen='setup'; focus=0; render(); }
});
render();
