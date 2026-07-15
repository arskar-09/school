import { db } from './firebase.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

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

    async savePoem() {
        const title = this.shadowRoot.getElementById('title').value;
        const body = this.shadowRoot.getElementById('body').value;
        if (!title || !body) return alert('제목과 내용을 모두 입력해주세요.');
        
        try {
            await addDoc(collection(db, "poems"), { title, body, wins: 0 });
            alert('시가 저장되었습니다!');
            this.shadowRoot.getElementById('title').value = '';
            this.shadowRoot.getElementById('body').value = '';
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('저장에 실패했습니다.');
        }
    }
}

class PoemSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    async render() {
        const querySnapshot = await getDocs(collection(db, "poems"));
        const poems = [];
        querySnapshot.forEach((doc) => {
            poems.push(doc.data());
        });

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
