class PoemEditor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .editor-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: var(--shadow); }
                input, textarea { width: 100%; margin-bottom: 1rem; padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
                button { background: var(--primary-color); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; transition: opacity 0.2s; }
                button:hover { opacity: 0.9; }
            </style>
            <div class="editor-card">
                <h2>시 작성하기</h2>
                <input type="text" id="title" placeholder="시 제목">
                <textarea id="body" rows="10" placeholder="여기에 시를 작성하세요..."></textarea>
                <button id="save">시 저장하기</button>
            </div>
        `;
        this.shadowRoot.getElementById('save').addEventListener('click', () => this.savePoem());
    }

    savePoem() {
        const title = this.shadowRoot.getElementById('title').value;
        const body = this.shadowRoot.getElementById('body').value;
        if (!title || !body) return alert('제목과 내용을 모두 입력해주세요.');
        
        const poems = JSON.parse(localStorage.getItem('poems') || '[]');
        poems.push({ title, body, wins: 0 });
        localStorage.setItem('poems', JSON.stringify(poems));
        alert('시가 저장되었습니다!');
        this.shadowRoot.getElementById('title').value = '';
        this.shadowRoot.getElementById('body').value = '';
    }
}

class PoemSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        const poems = JSON.parse(localStorage.getItem('poems') || '[]');
        if (poems.length < 2) {
            this.shadowRoot.innerHTML = '<p style="text-align:center; margin-top:2rem;">시 고르기를 하려면 최소 2개의 시가 필요합니다!</p>';
            return;
        }
        
        const p1 = poems[Math.floor(Math.random() * poems.length)];
        let p2 = poems[Math.floor(Math.random() * poems.length)];
        while (p1 === p2 && poems.length > 1) {
            p2 = poems[Math.floor(Math.random() * poems.length)];
        }

        this.shadowRoot.innerHTML = `
            <style>
                .container { display: flex; gap: 2rem; align-items: center; justify-content: center; margin-top: 2rem; }
                .card { background: white; padding: 2rem; border-radius: 16px; box-shadow: var(--shadow); flex: 1; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-align: center; }
                .card:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); }
                .vs { font-weight: bold; font-size: 1.5rem; color: var(--primary-color); }
            </style>
            <h2 style="text-align:center;">마음에 드는 시를 선택하세요</h2>
            <div class="container">
                <div class="card" id="p1"><h3>${p1.title}</h3><p>${p1.body.substring(0, 50)}...</p></div>
                <div class="vs">VS</div>
                <div class="card" id="p2"><h3>${p2.title}</h3><p>${p2.body.substring(0, 50)}...</p></div>
            </div>
        `;
        this.shadowRoot.getElementById('p1').addEventListener('click', () => { this.render(); });
        this.shadowRoot.getElementById('p2').addEventListener('click', () => { this.render(); });
    }
}

customElements.define('poem-editor', PoemEditor);
customElements.define('poem-selector', PoemSelector);

// Router
const app = document.getElementById('app');
document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        app.innerHTML = view === 'editor' ? '<poem-editor></poem-editor>' : '<poem-selector></poem-selector>';
    });
});

// Default view
app.innerHTML = '<poem-editor></poem-editor>';
