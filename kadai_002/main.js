// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得（初期化時に取得）
let untypedfield;
let typedfield;
let wrap;
let start;
let count;
let scorefield;

// DOMが読み込まれた後に実行
window.addEventListener('DOMContentLoaded', () => {
    // 必要なHTML要素の取得
    untypedfield = document.getElementById('untyped');
    typedfield = document.getElementById('typed');
    wrap = document.getElementById('wrap');
    start = document.getElementById('start');
    count = document.getElementById('count');
    scorefield = document.getElementById('score');


    // 初期表示
    untypedfield.textContent = 'スタートボタンで開始';
    scorefield.textContent = '0';

    // ゲームスタート時の処理
    start.addEventListener('click', () => {
        timer();
        createText();
        start.style.display = 'none';
        document.addEventListener('keypress', keyPress);
    });
});

// 複数のテキストを格納する配列
const textLists = [
    'Hello World', 'This is my App', 'How are you?',
    'Today is sunny', 'I love JavaScript!', 'Good morning',
    'I am Japanese', 'Let it be', 'Samurai',
    'Typing Game', 'Information Technology',
    'I want to be a programmer', 'What day is today?',
    'I want to build a web app', 'Nice to meet you',
    'Chrome Firefox Edge Safari', 'machine learning',
    'Brendan Eich', 'John Resig', 'React Vue Angular',
    'Netscape Communications', 'undefined null NaN',
    'Thank you very much', 'Google Apple Facebook Amazon',
    'ECMAScript', 'console.log', 'for while if switch',
    'var let const', 'Windows Mac Linux iOS Android',
    'programming'
];

// ランダムなテキストを表示
const createText = () => {
    typed = '';
    typedfield.textContent = typed;
    let random = Math.floor(Math.random() * textLists.length);
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
    if (e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }

    // 正タイプの場合
    score++;
    scorefield.textContent = score;
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    if (untyped === '') {
        createText();
    }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
    let text = '';
    if (score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if (score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if (score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else if (score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }
    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));
    if (result === true) {
        window.location.reload();
    }
};

// カウントダウンタイマー
const timer = () => {
    let time = count.textContent;
    const id = setInterval(() => {
        time--;
        count.textContent = time;

        // カウントが0になったらタイマーを停止
        if (time <= 0) {
            clearInterval(id);

            // テキストエリアをクリア
            typedfield.textContent = '';
            untypedfield.textContent = '';

            // 「タイムアップ！」を.wrap内に表示
            const timeUpMessage = document.createElement('span');
            timeUpMessage.id = 'timeUp';
            timeUpMessage.textContent = 'タイムアップ！';
            wrap.appendChild(timeUpMessage);

            // 10ミリ秒後にゲーム判定結果のダイアログを表示
            setTimeout(() => {
                gameOver(null);
            }, 10);
        }
    }, 1000);
};