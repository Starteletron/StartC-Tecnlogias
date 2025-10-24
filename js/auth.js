<script>
// auth.js – controle de sessão e assinatura (MVP usando Apps Script)
// Como usar: inclua este arquivo em TODAS as páginas protegidas ANTES de renderizar o conteúdo
// <script src="js/auth.js"></script>


(function(){
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzxwuTOLB2aZZO4jpt3CgkqlUr0AtVwnUC2e6UCc2zsAC3IeEd4YlLzeoj_LObbKcWV/exec";


async function requireAuth() {
const session = JSON.parse(localStorage.getItem('starc_session') || "null");
if (!session || !session.email || !session.token) {
redirectLogin();
return;
}


try {
const res = await fetch(APPS_SCRIPT_URL, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ tipo: 'session-validate', token: session.token })
});
const data = await res.json();
if (data.status !== 'ok' || data.subscription !== 'active') {
redirectLogin();
}
} catch {
redirectLogin();
}
}


function redirectLogin(){
const target = encodeURIComponent(location.pathname + location.search);
location.href = `login.html?redirect=${target}`;
}


// Exponha global para páginas públicas que queiram verificar manualmente
window.STARC_AUTH = { requireAuth };


// Auto-execução se a página marcar que é protegida
if (document.currentScript && document.currentScript.dataset.protected === 'true') {
requireAuth();
}
})();
</script>
