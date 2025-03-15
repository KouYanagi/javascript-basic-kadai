const btn = document.getElementById('btn');
const txt = document.getElementById('text')

btn.addEventListener('click', () => {
    txt.innerHTML = 'ボタンをクリックしました';
});