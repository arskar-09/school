/**
 * ==========================================================================
 * Poetry Duel - Core JavaScript Logic & AI Poet Engine
 * ==========================================================================
 */

// --- Constants & Database ---

// 1. A rich list of lyrical Korean poetry topic recommendations
const RECOMMENDED_TOPICS = [
  "새벽 세 시의 빗소리", "너의 오래된 지우개", "기억의 유통기한", "시간의 모서리",
  "어제 흘린 별똥별", "서랍 속의 편지", "코코아의 온도", "바람이 지나간 숲",
  "첫사랑의 이름", "겨울 나무의 겨울잠", "지하철 4호선 창가", "유리창의 성에",
  "길고양이의 정오", "바다로 흐르는 강", "파란색 연필", "식어가는 홍차",
  "낮에 뜨는 반달", "가을날의 들꽃", "마음의 미로", "숨겨둔 비밀정원",
  "발자국 없는 하얀 눈밭", "눈을 감았을 때의 빛", "잊혀진 열쇠", "비행기 구름",
  "가로등 밑의 춤꾼", "우산 속 두 사람", "소리 없는 포옹", "마지막 벚꽃잎"
];

// 2. High-quality metaphor catalogs for Korean poem construction
const POETIC_VOCABULARY = {
  lyrical: {
    opening: [
      "그곳에 불어오던 [주제]의 흔적을 아시나요",
      "가만히 눈을 감으면 [주제]이 그리움으로 물듭니다",
      "흘러가는 구름 뒤편에 [주제]를 띄워 보내던 날",
      "나지막이 불러보는 [주제]의 마디마다",
      "[주제]처럼 불어온 바람결에 가슴이 시리던 저녁"
    ],
    middle: [
      "초록빛 서정의 언덕 너머로 흩날리던 고요,\n오래된 책장 사이에 말려둔 들꽃같이",
      "은하수가 흐르는 가슴 아린 하늘 위로\n우리의 수많은 계절이 별빛처럼 박혀 가네",
      "따스한 눈물 한 방울이 고여 드는 골목길,\n지나간 뒷모습은 언제나 노을을 닮았기에",
      "손끝에 스치는 촉촉한 숨결 하나로\n잊혀져 가던 밤의 심장박동을 다시 깨운다"
    ],
    closing: [
      "그리하여 [주제]은 영원한 사랑의 문장이 되리라.",
      "마음의 창가에 머물다 갈 [주제]의 멜로디여.",
      "오늘 밤도 나는 [주제]의 온기를 가슴에 품고 잠든다.",
      "스쳐 가는 모든 인연이 [주제]으로 남기를 바라며."
    ],
    titles: ["[주제]의 기억", "[주제]에게 부치는 편지", "어느 [주제]의 고백", "[주제]이 머무는 밤"]
  },
  modern: {
    opening: [
      "[주제], 그것은 차갑고 사각형의 형태",
      "우리는 매일 [주제]의 이면을 스치며 걸어간다",
      "도시의 소음 속에서 박제된 [주제] 하나",
      "가끔은 [주제]이라는 기호가 마음에 던져진다",
      "유리창에 투영된 [주제]의 실루엣"
    ],
    middle: [
      "신호등이 바뀌는 매 순간의 공백,\n일정한 박자로 무너지는 콘크리트 숲",
      "서로의 시선이 교차하지 못하는 평행선 위\n스마트폰 화면에 비친 메마른 얼굴들",
      "아무도 줍지 않는 영수증 같은 문장 속에서\n조용히 지워지는 어제의 실낱같은 의미",
      "소용돌이치는 데이터의 바다 아래,\n차가운 메탈의 질감으로 깨어나는 순간"
    ],
    closing: [
      "그저 무감각하게 반짝이는 [주제]의 좌표일 뿐.",
      "결국 [주제]이라는 기하학적 고독에 수렴한다.",
      "아무도 읽지 않는 [주제]의 해시태그.",
      "그렇게 [주제]은 하나의 코드로 남겨졌다."
    ],
    titles: ["[주제]의 온도차", "디지털 [주제]", "[주제]에 관한 짧은 리포트", "[주제]과 공간"]
  },
  melancholy: {
    opening: [
      "텅 빈 빗방울 속으로 무너지는 [주제]의 무게",
      "아무도 찾지 않는 방, [주제]만이 구석을 지킨다",
      "[주제]마저 쓸쓸한 어둠의 그늘로 스며들 때",
      "한 모금 들이켠 한숨 끝에 고이는 [주제]",
      "차가운 서리가 내린 [주제]의 기억을 만진다"
    ],
    middle: [
      "째깍거리는 시계 침의 규칙적인 조롱,\n홀로 깨어 있는 새벽 세 시의 쓸쓸한 침묵",
      "빛바랜 사진첩에서 걸어 나온 그림자처럼\n오래전에 멈춰버린 눈물의 화석을 줍는다",
      "마지막 온기마저 빼앗긴 겨울밤의 끝자리,\n시려오는 발끝을 감싸 안고 나지막이 흐느끼던",
      "차가운 허공에 무의미하게 부서지는 입김,\n가까스로 버텨온 하루가 가라앉는 밤"
    ],
    closing: [
      "그렇게 [주제]은 차디찬 흔적이 되어 얼어붙었다.",
      "지우려 애쓸수록 선명해지는 [주제]의 흉터.",
      "결국 흉터가 되어버린 [주제]을 붙안고 운다.",
      "아무도 들여다보지 않는 [주제]의 슬픈 방."
    ],
    titles: ["재가 된 [주제]", "[주제]과 새벽의 한숨", "우울한 [주제]의 독백", "끝내 잊혀질 [주제]"]
  },
  hopeful: {
    opening: [
      "어두운 터널 끝에서 [주제]의 등불을 만납니다",
      "작은 씨앗 속에서 꿈틀대는 [주제]의 봄눈",
      "시린 바람 속에서도 당신의 [주제]은 따스하군요",
      "기억할게요, 힘들 때 손을 잡아주던 [주제]의 미소",
      "새아침의 햇살이 가만히 [주제]을 어루만집니다"
    ],
    middle: [
      "겨울눈이 녹아 시냇물로 조잘거리는 소리,\n서로의 시린 뺨을 가만히 보듬어 안는 온기",
      "다시 피어날 그날을 아는 풀잎처럼,\n작은 흔들림에도 단단해지는 꿈을 향하여",
      "함께 걸어가는 발걸음마다 피어나는 꽃씨들,\n거친 풍랑 속에서도 우린 마주 보며 미소 짓네",
      "밤하늘의 어둠이 짙어질수록 뚜렷해지는\n가장 낮은 곳에서 비치는 저 눈부신 등대빛"
    ],
    closing: [
      "당신이 있어 이 거친 삶도 참 눈부신 [주제]이 됩니다.",
      "어둠 끝에 반드시 피어날 [주제]의 아침을 축복하며.",
      "우리 마음에 영원한 봄을 품어줄 [주제]이여.",
      "가만히 쓰다듬는 [주제] 속에 새 생명이 움트네."
    ],
    titles: ["눈부신 [주제]", "너의 마음에 [주제]을 심다", "[주제]이 피워낸 봄날", "위로의 [주제]"]
  }
};

// 3. AI critic comment template structures
const CRITIC_TEMPLATES = {
  user_win: [
    "작품 A(사용자)의 섬세한 정취와 통찰력이 깊은 공감을 자아내어 작품 B(AI)의 세련된 논리마저 부드럽게 감싸 안았습니다. 주제 '[주제]'를 향한 진솔하고 감성적인 고백이 투표자의 감성을 완벽히 뒤흔든 훌륭한 결과입니다.",
    "정형화된 문장 구조를 깨부수고 영혼의 호흡을 담아낸 작품 A(사용자)의 승리입니다. AI(작품 B)의 깔끔한 묘사도 돋보였으나, 인간 특유의 따뜻하고 불완전하면서도 깊은 은유를 담은 '[주제]'의 서사가 더 뜨거운 울림을 전했습니다.",
    "문학은 기교가 아닌 진심임을 다시금 일깨우는 결과입니다. [주제]를 통해 삶의 틈새를 바라보는 사용자(작품 A)의 성찰적 고뇌와 리듬감은, AI(작품 B)가 구현할 수 없는 경이로운 심상을 만들어냈습니다."
  ],
  ai_win: [
    "작품 B(AI)의 고도로 정제된 어휘 배열과 빈틈없는 문학적 전개가 관객의 마음을 정교하게 터치했습니다. 사용자(작품 A)가 표출한 날 것의 뜨거운 열정도 훌륭했으나, 고유의 창작 스타일에 맞춘 감성 구조가 정밀하게 작동한 인상적인 결과입니다.",
    "이번 대결에서는 AI(작품 B)가 보편적 인간 감정의 궤적을 훌륭히 포착해 냈습니다. 주제 '[주제]'를 다각도로 형상화하고 문장의 대칭과 호흡을 우아하게 다듬은 것이, 사용자(작품 A)의 진솔함 대비 더 폭넓은 찬사를 얻은 원동력입니다.",
    "구조의 완결성과 가독성 측면에서 작품 B(AI)의 미적 균형이 시선을 사로잡았습니다. 비록 차가운 칩에서 자아낸 문장이라 할지라도, 선택한 장르의 무드를 정교하게 분석해 자아낸 감동이 사용자(작품 A)의 개성을 간소한 차이로 앞질렀습니다."
  ]
};

// --- Application State ---

let appState = {
  currentStep: 'section-topic', // ID of currently active step card
  topic: '',
  aiStyle: 'lyrical', // lyrical, modern, melancholy, hopeful
  userPoem: { title: '', content: '' },
  aiPoem: { title: '', content: '' },
  matchup: {
    poemA: { title: '', content: '', author: '' }, // author: 'user' | 'ai'
    poemB: { title: '', content: '', author: '' },
    votedAuthor: null // 'user' | 'ai'
  },
  history: [] // Historical records stored in localStorage
};

// --- Helper Functions ---

/**
 * Automatically adjust Korean postpositions based on the word's last syllable.
 * Handles the delicate phonological rules of the Korean language.
 */
function getPostposition(word, type) {
  if (!word || typeof word !== 'string') return '';
  const lastChar = word.charAt(word.length - 1);
  const code = lastChar.charCodeAt(0);
  
  // Check if character is a Hangul syllable (Unicode 0xAC00 to 0xD7A3)
  if (code < 44032 || code > 55203) {
    // Return standard fallback if not Korean
    const fallbacks = { subject: '이', topic: '은', object: '을', instrumental: '으로', comitative: '과' };
    return word + fallbacks[type];
  }
  
  const hasJongseong = (code - 44032) % 28 !== 0;

  switch (type) {
    case 'subject': // 이 / 가
      return hasJongseong ? `${word}이` : `${word}가`;
    case 'topic': // 은 / 는
      return hasJongseong ? `${word}은` : `${word}는`;
    case 'object': // 을 / 를
      return hasJongseong ? `${word}을` : `${word}를`;
    case 'instrumental': // 으로 / 로
      // Exception: If the final consonant is Rieul ('ㄹ' / jongseong index 8), use '로' instead of '으로'
      const jongseongIdx = (code - 44032) % 28;
      if (hasJongseong && jongseongIdx !== 8) {
        return `${word}으로`;
      }
      return `${word}로`;
    case 'comitative': // 과 / 와
      return hasJongseong ? `${word}과` : `${word}와`;
    default:
      return word;
  }
}

/**
 * Replaces placeholders in our poetry database with grammatically adjusted topic words.
 * Ensures exquisite natural syntax.
 */
function renderPoeticTemplate(template, topic) {
  let text = template;
  
  // Replace the grammatical variations first
  text = text.replaceAll('[주제]가', getPostposition(topic, 'subject'));
  text = text.replaceAll('[주제]이', getPostposition(topic, 'subject'));
  text = text.replaceAll('[주제]는', getPostposition(topic, 'topic'));
  text = text.replaceAll('[주제]은', getPostposition(topic, 'topic'));
  text = text.replaceAll('[주제]를', getPostposition(topic, 'object'));
  text = text.replaceAll('[주제]을', getPostposition(topic, 'object'));
  text = text.replaceAll('[주제]로', getPostposition(topic, 'instrumental'));
  text = text.replaceAll('[주제]으로', getPostposition(topic, 'instrumental'));
  text = text.replaceAll('[주제]와', getPostposition(topic, 'comitative'));
  text = text.replaceAll('[주제]과', getPostposition(topic, 'comitative'));
  
  // Fallback for simple replacement
  text = text.replaceAll('[주제]', topic);
  
  return text;
}

// --- AI simulated writing engine ---

/**
 * Custom algorithmic engine to build high-quality context-aware Korean poetry
 */
function generateAIPoem(topic, style) {
  const vocab = POETIC_VOCABULARY[style];
  if (!vocab) return { title: '시제', content: '시를 짓지 못했습니다.' };

  // Select random elements from vocabulary templates
  const selectRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  const rawTitle = selectRandom(vocab.titles);
  const rawOpening = selectRandom(vocab.opening);
  const rawMiddle = selectRandom(vocab.middle);
  const rawClosing = selectRandom(vocab.closing);

  // Parse and link templates
  const title = renderPoeticTemplate(rawTitle, topic);
  const formattedContent = [
    renderPoeticTemplate(rawOpening, topic),
    "\n",
    renderPoeticTemplate(rawMiddle, topic),
    "\n",
    renderPoeticTemplate(rawClosing, topic)
  ].join("\n");

  return { title, content: formattedContent };
}

/**
 * Generate a dynamic critic review based on final voting winner and topic.
 */
function getCriticReview(winner, topic) {
  const templates = CRITIC_TEMPLATES[winner === 'user' ? 'user_win' : 'ai_win'];
  const baseComment = templates[Math.floor(Math.random() * templates.length)];
  return baseComment.replaceAll('[주제]', topic);
}

// --- State Routing / Page Controller ---

function showSection(sectionId) {
  // Hide all sections, remove active class
  document.querySelectorAll('.step-card').forEach(sec => {
    sec.classList.remove('active');
  });

  // Show target section, add active class
  const targetSec = document.getElementById(sectionId);
  if (targetSec) {
    targetSec.classList.add('active');
    appState.currentStep = sectionId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// --- Local Storage Integration ---

function saveToLocalStorage() {
  localStorage.setItem('poetry_duel_state', JSON.stringify(appState.history));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem('poetry_duel_state');
  if (data) {
    try {
      appState.history = JSON.parse(data);
    } catch (e) {
      console.error("Error parsing history from localStorage:", e);
      appState.history = [];
    }
  }
}

// --- View Updates & UI Renderers ---

/**
 * Update aggregate stats everywhere in the UI
 */
function updateUIStats() {
  const total = appState.history.length;
  const userWins = appState.history.filter(item => item.winner === 'user').length;
  const aiWins = appState.history.filter(item => item.winner === 'ai').length;
  const winRate = total > 0 ? Math.round((userWins / total) * 100) : 0;

  // Header stats text
  const statsBadgeText = document.getElementById('header-stats-text');
  if (statsBadgeText) {
    statsBadgeText.textContent = `전적: ${userWins}승 ${aiWins}패 (${winRate}%)`;
  }

  // Dashboard stats (Section 5)
  const statsTotal = document.getElementById('stats-total');
  const statsUserWins = document.getElementById('stats-user-wins');
  const statsAiWins = document.getElementById('stats-ai-wins');
  const statsWinRate = document.getElementById('stats-win-rate');

  if (statsTotal) statsTotal.textContent = `${total}회`;
  if (statsUserWins) statsUserWins.textContent = `${userWins}회`;
  if (statsAiWins) statsAiWins.textContent = `${aiWins}회`;
  if (statsWinRate) statsWinRate.textContent = `${winRate}%`;
}

/**
 * Update the historical list of past matchups
 */
function renderArchiveGrid() {
  const emptyState = document.getElementById('empty-archive-state'); // Wait, let's look at ID in index.html: empty-archive-message
  const emptyMsg = document.getElementById('empty-archive-message');
  const gridContainer = document.getElementById('archive-cards-grid');

  if (!gridContainer) return;

  if (appState.history.length === 0) {
    if (emptyMsg) emptyMsg.classList.remove('d-none');
    gridContainer.classList.add('d-none');
  } else {
    if (emptyMsg) emptyMsg.classList.add('d-none');
    gridContainer.classList.remove('d-none');
    
    // Clear previous items
    gridContainer.innerHTML = '';

    // Render cards from newest to oldest
    appState.history.slice().reverse().forEach((item, index) => {
      // Find actual index in original array
      const originalIndex = appState.history.length - 1 - index;
      
      const card = document.createElement('div');
      card.className = 'archive-card';
      card.dataset.index = originalIndex;

      const dateStr = new Date(item.date).toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const winnerTagClass = item.winner === 'user' ? 'tag-user-won' : 'tag-ai-won';
      const winnerTagText = item.winner === 'user' ? '시인 승리' : 'AI 승리';

      card.innerHTML = `
        <div class="archive-card-meta">
          <span class="archive-card-date">${dateStr}</span>
          <span class="badge-winner-tag ${winnerTagClass}">${winnerTagText}</span>
        </div>
        <div class="archive-card-details">
          <span class="archive-card-topic">주제: ${item.topic}</span>
          <h4 class="archive-card-titles">
            당신: ${item.userPoem.title || '제목 없음'}<br>
            AI: ${item.aiPoem.title || '제목 없음'}
          </h4>
        </div>
        <div class="archive-card-action">
          <span>대결 작품 읽기</span>
          <i data-lucide="chevron-right"></i>
        </div>
      `;

      card.addEventListener('click', () => {
        openPoemModal(originalIndex);
      });

      gridContainer.appendChild(card);
    });

    lucide.createIcons();
  }
}

/**
 * Open detail viewer modal for archived dual
 */
function openPoemModal(originalIndex) {
  const item = appState.history[originalIndex];
  if (!item) return;

  const modal = document.getElementById('poem-viewer-modal');
  const modalTopic = document.getElementById('modal-topic-text');
  
  const modalUserTitle = document.getElementById('modal-user-title');
  const modalUserContent = document.getElementById('modal-user-content');
  const modalUserBox = document.getElementById('modal-poem-box-user');
  const modalUserVote = document.getElementById('modal-user-vote-tag');

  const modalAiTitle = document.getElementById('modal-ai-title');
  const modalAiContent = document.getElementById('modal-ai-content');
  const modalAiBox = document.getElementById('modal-poem-box-ai');
  const modalAiVote = document.getElementById('modal-ai-vote-tag');

  if (!modal) return;

  // Set topic
  if (modalTopic) modalTopic.textContent = `대결 주제: ${item.topic}`;

  // User poem details
  if (modalUserTitle) modalUserTitle.textContent = item.userPoem.title || '제목 없음';
  if (modalUserContent) modalUserContent.textContent = item.userPoem.content;
  
  // AI poem details
  if (modalAiTitle) modalAiTitle.textContent = item.aiPoem.title || '제목 없음';
  if (modalAiContent) modalAiContent.textContent = item.aiPoem.content;

  // Configure award badges based on winner
  if (item.winner === 'user') {
    modalUserBox.className = 'modal-poem-box voted-winner';
    if (modalUserVote) modalUserVote.textContent = '★ 선택받은 작품';
    modalAiBox.className = 'modal-poem-box voted-loser';
    if (modalAiVote) modalAiVote.textContent = '작품 완료';
  } else {
    modalUserBox.className = 'modal-poem-box voted-loser';
    if (modalUserVote) modalUserVote.textContent = '작품 완료';
    modalAiBox.className = 'modal-poem-box voted-winner';
    if (modalAiVote) modalAiVote.textContent = '★ 선택받은 작품';
  }

  modal.classList.remove('d-none');
}

function closePoemModal() {
  const modal = document.getElementById('poem-viewer-modal');
  if (modal) modal.classList.add('d-none');
}

// --- Core Workflow Logic ---

/**
 * Initialize current suggestion and reset views
 */
function initTopicSetup() {
  const randomSuggestion = RECOMMENDED_TOPICS[Math.floor(Math.random() * RECOMMENDED_TOPICS.length)];
  const topicInput = document.getElementById('topic-input');
  if (topicInput) {
    topicInput.value = randomSuggestion;
  }
}

/**
 * Starts the dual workspace
 */
function startDuelFlow() {
  const topicInput = document.getElementById('topic-input');
  
  let chosenTopic = topicInput.value.trim();
  if (!chosenTopic) {
    chosenTopic = RECOMMENDED_TOPICS[Math.floor(Math.random() * RECOMMENDED_TOPICS.length)];
    if (topicInput) topicInput.value = chosenTopic;
  }

  // Choose a random AI style under the hood to write diverse, surprise-filled poems!
  const styles = ['lyrical', 'modern', 'melancholy', 'hopeful'];
  const chosenStyle = styles[Math.floor(Math.random() * styles.length)];

  // Set state
  appState.topic = chosenTopic;
  appState.aiStyle = chosenStyle;

  // Reset writing board
  const userTitleInput = document.getElementById('poem-title');
  const userContentInput = document.getElementById('poem-content');
  const charCounter = document.getElementById('char-count');
  const submitBtn = document.getElementById('btn-submit-poem');

  if (userTitleInput) userTitleInput.value = '';
  if (userContentInput) userContentInput.value = '';
  if (charCounter) charCounter.textContent = '0';
  if (submitBtn) submitBtn.disabled = true;

  // Set visual indicators
  document.querySelectorAll('.current-topic-display').forEach(el => {
    el.textContent = chosenTopic;
  });

  // Reset AI Wait status panel
  const aiStatus = document.getElementById('ai-status');
  const aiVisualText = document.getElementById('ai-visual-text');
  const aiTypingDots = document.getElementById('ai-typing-dots');
  
  if (aiStatus) aiStatus.textContent = '대기 중...';
  if (aiVisualText) aiVisualText.textContent = '당신이 시를 적어내길 기다리고 있습니다...';
  if (aiTypingDots) aiTypingDots.classList.add('d-none');

  // Go to workspace
  showSection('section-workspace');
}

/**
 * Handle user typing. Stimulate AI writing progress in real-time as user types.
 */
function handleUserWriting(e) {
  const text = e.target.value;
  const countSpan = document.getElementById('char-count');
  const submitBtn = document.getElementById('btn-submit-poem');

  if (countSpan) countSpan.textContent = text.length;

  // Submit is only unlocked if poem has content (at least 15 chars to encourage genuine writing)
  if (submitBtn) {
    submitBtn.disabled = text.trim().length < 15;
  }

  // Simulate AI poet focusing / reacting based on user writing depth
  const aiStatus = document.getElementById('ai-status');
  const aiVisualText = document.getElementById('ai-visual-text');
  const aiTypingDots = document.getElementById('ai-typing-dots');

  if (text.trim().length >= 15 && text.trim().length < 100) {
    if (aiStatus) aiStatus.textContent = '시상 구상 중...';
    if (aiVisualText) aiVisualText.textContent = '시인의 방에 불이 켜졌습니다. AI가 당신의 정서를 조화롭게 물들이고 있습니다.';
    if (aiTypingDots) aiTypingDots.classList.remove('d-none');
  } else if (text.trim().length >= 100) {
    if (aiStatus) aiStatus.textContent = '시 쓰는 중...';
    if (aiVisualText) aiVisualText.textContent = 'AI 시인이 깊은 명상 속에서 영감 어린 첫 구절을 써 내려가는 중입니다.';
    if (aiTypingDots) aiTypingDots.classList.remove('d-none');
  }
}

/**
 * Processes completed user poem and shuffles comparison cards.
 */
function submitPoems() {
  const userTitleInput = document.getElementById('poem-title');
  const userContentInput = document.getElementById('poem-content');

  const uTitle = userTitleInput.value.trim() || `${appState.topic}에 대하여`;
  const uContent = userContentInput.value.trim();

  // 1. Generate user poem data
  appState.userPoem = { title: uTitle, content: uContent };

  // 2. Generate actual AI poem using our algorithm
  const aiPoemData = generateAIPoem(appState.topic, appState.aiStyle);
  appState.aiPoem = aiPoemData;

  // 3. Shuffle cards A & B to construct a true blind comparison!
  const isUserPoemA = Math.random() < 0.5;

  if (isUserPoemA) {
    appState.matchup.poemA = { title: uTitle, content: uContent, author: 'user' };
    appState.matchup.poemB = { title: aiPoemData.title, content: aiPoemData.content, author: 'ai' };
  } else {
    appState.matchup.poemA = { title: aiPoemData.title, content: aiPoemData.content, author: 'ai' };
    appState.matchup.poemB = { title: uTitle, content: uContent, author: 'user' };
  }

  appState.matchup.votedAuthor = null;

  // 4. Render duel cards in Section 3
  const titleA = document.getElementById('display-title-a');
  const contentA = document.getElementById('display-content-a');
  const titleB = document.getElementById('display-title-b');
  const contentB = document.getElementById('display-content-b');

  if (titleA) titleA.textContent = appState.matchup.poemA.title;
  if (contentA) contentA.textContent = appState.matchup.poemA.content;
  if (titleB) titleB.textContent = appState.matchup.poemB.title;
  if (contentB) contentB.textContent = appState.matchup.poemB.content;

  // Go to Duel section
  showSection('section-duel');
}

/**
 * Complete the voting duel, reveal real identities, and compile critique.
 */
function castVote(targetCard) { // targetCard: 'A' or 'B'
  const chosenPoem = targetCard === 'A' ? appState.matchup.poemA : appState.matchup.poemB;
  const winnerAuthor = chosenPoem.author; // 'user' or 'ai'

  appState.matchup.votedAuthor = winnerAuthor;

  // Save duel in history
  const historyItem = {
    date: new Date().toISOString(),
    topic: appState.topic,
    userPoem: appState.userPoem,
    aiPoem: appState.aiPoem,
    winner: winnerAuthor,
    style: appState.aiStyle
  };

  appState.history.push(historyItem);
  saveToLocalStorage();

  // Configure Result Reveal section aesthetics
  const resultTitle = document.getElementById('result-message-title');
  const userCard = document.getElementById('reveal-actor-user');
  const aiCard = document.getElementById('reveal-actor-ai');
  const userTitleEl = document.getElementById('reveal-user-title');
  const aiTitleEl = document.getElementById('reveal-ai-title');
  const aiStyleName = document.getElementById('reveal-ai-style-name');
  
  const userBadge = document.getElementById('badge-user-result');
  const aiBadge = document.getElementById('badge-ai-result');

  // Set titles
  if (userTitleEl) userTitleEl.textContent = appState.userPoem.title;
  if (aiTitleEl) aiTitleEl.textContent = appState.aiPoem.title;

  const KoreanStyleNames = { lyrical: '서정시', modern: '현대시', melancholy: '독백시', hopeful: '위로시' };
  if (aiStyleName) aiStyleName.textContent = KoreanStyleNames[appState.aiStyle] || '시 창작';

  // Configure winner styles
  if (winnerAuthor === 'user') {
    if (resultTitle) resultTitle.textContent = "축하합니다! 시인님의 운율이 승리했습니다.";
    if (userCard) userCard.className = "reveal-actor-card winner-rose";
    if (aiCard) aiCard.className = "reveal-actor-card";
    if (userBadge) userBadge.textContent = "🏆 선택된 시제";
    if (aiBadge) aiBadge.textContent = "작품 완료";
  } else {
    if (resultTitle) resultTitle.textContent = "AI 시인의 시상이 심금을 울렸습니다.";
    if (userCard) userCard.className = "reveal-actor-card";
    if (aiCard) aiCard.className = "reveal-actor-card winner";
    if (userBadge) userBadge.textContent = "작품 완료";
    if (aiBadge) aiBadge.textContent = "🏆 선택된 시상";
  }

  // Fetch critic evaluation
  const criticText = document.getElementById('critic-comment-text');
  if (criticText) {
    criticText.textContent = getCriticReview(winnerAuthor, appState.topic);
  }

  // Update stats across screens
  updateUIStats();

  // Transition to Results
  showSection('section-result');
}

/**
 * Wipes out local storage history safely with confirmation prompt
 */
function clearAllHistory() {
  if (appState.history.length === 0) return;
  
  const confirmClean = confirm("정말로 모든 대결 기록을 지우시겠습니까? 자아낸 모든 주옥같은 시들이 사라집니다.");
  if (confirmClean) {
    appState.history = [];
    saveToLocalStorage();
    updateUIStats();
    renderArchiveGrid();
  }
}

// --- Setup Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
  // Load existing local storage items
  loadFromLocalStorage();
  updateUIStats();

  // Initialize first topic
  initTopicSetup();

  // Compile Lucide Icons
  lucide.createIcons();

  // -- SECTION 1 (Topic Selection) Events --
  const btnRandomTopic = document.getElementById('btn-random-topic');
  if (btnRandomTopic) {
    btnRandomTopic.addEventListener('click', () => {
      initTopicSetup();
      // Animate input field pop transition
      const topicInput = document.getElementById('topic-input');
      if (topicInput) {
        topicInput.style.transform = 'scale(0.98)';
        topicInput.style.borderColor = 'var(--color-accent-rose)';
        topicInput.style.transition = 'transform 0.15s ease, border-color 0.15s ease';
        setTimeout(() => {
          topicInput.style.transform = 'scale(1)';
          topicInput.style.borderColor = '';
        }, 150);
      }
    });
  }

  const btnStartDuel = document.getElementById('btn-start-duel');
  if (btnStartDuel) {
    btnStartDuel.addEventListener('click', startDuelFlow);
  }

  // -- SECTION 2 (Workspace) Events --
  const userContentArea = document.getElementById('poem-content');
  if (userContentArea) {
    userContentArea.addEventListener('input', handleUserWriting);
  }

  const btnBackToTopic = document.getElementById('btn-back-to-topic');
  if (btnBackToTopic) {
    btnBackToTopic.addEventListener('click', () => {
      const discard = confirm("작성 중인 시를 취소하고 처음으로 돌아가시겠습니까?");
      if (discard) showSection('section-topic');
    });
  }

  const btnSubmitPoem = document.getElementById('btn-submit-poem');
  if (btnSubmitPoem) {
    btnSubmitPoem.addEventListener('click', submitPoems);
  }

  // -- SECTION 3 (Duel voting) Events --
  document.querySelectorAll('.btn-vote').forEach(button => {
    button.addEventListener('click', (e) => {
      const targetCard = e.currentTarget.dataset.target;
      castVote(targetCard);
    });
  });

  // -- SECTION 4 (Result Dashboard) Events --
  const btnGoHistory = document.getElementById('btn-go-history');
  if (btnGoHistory) {
    btnGoHistory.addEventListener('click', () => {
      renderArchiveGrid();
      showSection('section-archive');
    });
  }

  const btnRestartFlow = document.getElementById('btn-restart-flow');
  if (btnRestartFlow) {
    btnRestartFlow.addEventListener('click', () => {
      const topicInput = document.getElementById('topic-input');
      if (topicInput) topicInput.value = '';
      initTopicSetup();
      showSection('section-topic');
    });
  }

  // Header Badge (Click to see History directly)
  const statsBadge = document.getElementById('stats-badge');
  if (statsBadge) {
    statsBadge.addEventListener('click', () => {
      renderArchiveGrid();
      showSection('section-archive');
    });
  }

  // -- SECTION 5 (Archive) Events --
  const btnClearHistory = document.getElementById('btn-clear-history');
  if (btnClearHistory) {
    btnClearHistory.addEventListener('click', clearAllHistory);
  }

  const btnArchiveBack = document.getElementById('btn-archive-back');
  if (btnArchiveBack) {
    btnArchiveBack.addEventListener('click', () => {
      showSection('section-topic');
    });
  }

  const btnArchiveStart = document.getElementById('btn-archive-start-poetry');
  if (btnArchiveStart) {
    btnArchiveStart.addEventListener('click', () => {
      showSection('section-topic');
    });
  }

  // -- MODAL CLOSE Events --
  const btnCloseModal = document.getElementById('btn-close-modal');
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closePoemModal);
  }

  const modalOverlay = document.getElementById('poem-viewer-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closePoemModal();
    });
  }
});
