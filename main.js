import { db } from './firebase.js';
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

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
                <input type="text" id="topic" placeholder="시 주제">
                <textarea id="body" rows="10" placeholder="여기에 시를 작성하세요..."></textarea>
                <button id="save">시 저장하기</button>
            </div>
        `;
        this.shadowRoot.getElementById('save').addEventListener('click', () => this.savePoem());
    }

    async savePoem() {
        console.log("savePoem called");
        const title = this.shadowRoot.getElementById('title').value;
        const topic = this.shadowRoot.getElementById('topic').value;
        const body = this.shadowRoot.getElementById('body').value;
        console.log("Title:", title, "Topic:", topic, "Body:", body);
        
        if (!title || !body) return alert('제목과 내용을 모두 입력해주세요.');
        
        const saveButton = this.shadowRoot.getElementById('save');
        saveButton.textContent = '저장 중...';
        saveButton.disabled = true;

        try {
            await addDoc(collection(db, "poems"), { title, topic, body, wins: 0, createdAt: new Date() });
            console.log("Document successfully written!");
            alert('시가 저장되었습니다!');
            this.shadowRoot.getElementById('title').value = '';
            this.shadowRoot.getElementById('topic').value = '';
            this.shadowRoot.getElementById('body').value = '';
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('저장에 실패했습니다: ' + e.message);
        } finally {
            saveButton.textContent = '시 저장하기';
            saveButton.disabled = false;
        }
    }
}

class PoemSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.poems = [];
        this.unsubscribe = null;
    }

    connectedCallback() {
        this.unsubscribe = onSnapshot(collection(db, "poems"), (snapshot) => {
            this.poems = snapshot.docs.map(doc => doc.data());
            this.render();
        });
    }

    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render() {
        if (this.poems.length < 2) {
            this.shadowRoot.innerHTML = '<p style="text-align:center; margin-top:2rem;">시 고르기를 하려면 최소 2개의 시가 필요합니다!</p>';
            return;
        }
        
        const p1 = this.poems[Math.floor(Math.random() * this.poems.length)];
        let p2 = this.poems[Math.floor(Math.random() * this.poems.length)];
        while (p1 === p2 && this.poems.length > 1) {
            p2 = this.poems[Math.floor(Math.random() * this.poems.length)];
        }

        this.shadowRoot.innerHTML = `
            <style>
                .container { display: flex; flex-direction: column; gap: 3rem; margin-top: 3rem; align-items: center; }
                .card { background: white; padding: 4rem; border-radius: 20px; box-shadow: var(--shadow); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-align: left; width: 100%; max-width: 900px; box-sizing: border-box; }
                .card:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); }
                .vs { font-weight: bold; font-size: 3rem; color: var(--primary-color); text-align: center; }
                h3 { font-size: 2.5rem; margin-bottom: 2rem; color: var(--primary-color); }
                p { font-size: 1.8rem; line-height: 2; white-space: pre-wrap; }
            </style>
            <h2 style="text-align:center;">마음에 드는 시를 선택하세요</h2>
            <div class="container">
                <div class="card" id="p1"><h3>${p1.title}</h3><p>${p1.body}</p></div>
                <div class="vs">VS</div>
                <div class="card" id="p2"><h3>${p2.title}</h3><p>${p2.body}</p></div>
            </div>
        `;
        this.shadowRoot.getElementById('p1').addEventListener('click', () => this.render());
        this.shadowRoot.getElementById('p2').addEventListener('click', () => this.render());
    }
}

class PoemList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.poems = [];
        this.unsubscribe = null;
    }

    connectedCallback() {
        this.unsubscribe = onSnapshot(collection(db, "poems"), (snapshot) => {
            this.poems = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            this.render();
        });
    }

    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .list-container { padding: 2rem; }
                .poem-item { background: white; padding: 1.5rem; margin-bottom: 1rem; border-radius: 8px; box-shadow: var(--shadow); }
                h3 { margin-top: 0; }
                .topic { font-size: 0.9rem; color: #666; margin-bottom: 0.5rem; }
            </style>
            <h2>시 목록</h2>
            <div class="list-container">
                ${this.poems.map(p => `
                    <div class="poem-item">
                        <h3>${p.title}</h3>
                        ${p.topic ? `<p class="topic">주제: ${p.topic}</p>` : ''}
                        <p>${p.body}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

customElements.define('poem-editor', PoemEditor);
customElements.define('poem-selector', PoemSelector);
customElements.define('poem-list', PoemList);

// Router
const app = document.getElementById('app');
document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view === 'editor') app.innerHTML = '<poem-editor></poem-editor>';
        else if (view === 'selector') app.innerHTML = '<poem-selector></poem-selector>';
        else if (view === 'list') app.innerHTML = '<poem-list></poem-list>';
    });
});

// Default view
app.innerHTML = '<poem-editor></poem-editor>';
