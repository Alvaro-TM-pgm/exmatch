const EXES = [
    {
        name: "Maria Rita",
        age: 17,
        image: "Maria Rita 1.jpeg", 
        colors: ["#df5d9c", "#6b3cba"],
        compatibility: 98,
        description: "Uma história que o algoritmo se recusou a esquecer.",
        reason: "Histórico amoroso detectado."
    },
     {
        name: "Isabelly Marry",
        age: 17,
        image: "Isa 1.jpeg", 
        colors: ["#df5d9c", "#6b3cba"],
        compatibility: 98,
        description: "Uma história que o algoritmo se recusou a esquecer.",
        reason: "Histórico amoroso detectado."
    },
    {
        name: "Clarisse Alves",
        age: 17,
        image: "Clarisse 1.jpeg", 
        colors: ["#e68c61", "#8b3b95"],
        compatibility: 96,
        description: "O passado voltou com uma nova notificação.",
        reason: "Memórias antigas encontradas."
    },
    {
        name: "Laura Rayssa",
        age: 18,
        image: "Laura 1.jpeg",
        colors: ["#3e9bb5", "#6d48a6"],
        compatibility: 94,
        description: "Você achou que tinha acabado. O algoritmo discorda.",
        reason: "Histórico relevante encontrado."
    }
];

const $ = s => document.querySelector(s);

let current = 0;
let passAttempts = 0;
let searchingShown = false;

const passLines = [
    "Tem certeza?",
    "Você realmente acha que consegue fugir do passado?",
    "Ela já está no histórico. Não adianta.",
    "PASSAR NÃO APAGA MEMÓRIAS.",
    "Erro: impossível fugir das ex."
];


// ==============================
// NAVEGAÇÃO ENTRE TELAS
// ==============================

function go(id) {
    document
        .querySelectorAll(".screen")
        .forEach(x => x.classList.remove("active"));

    const screen = $("#" + id);

    if (screen) {
        screen.classList.add("active");
    }
}


// ==============================
// TOAST
// ==============================

function toast(message) {
    const t = $("#toast");

    if (!t) return;

    t.textContent = message;
    t.classList.add("visible");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        t.classList.remove("visible");
    }, 2400);
}


// ==============================
// RENDERIZAÇÃO DOS CARDS
// ==============================

function renderCard() {
    const ex = EXES[current];

    if (!ex) {
        go("final");
        return;
    }

    $("#counter").textContent = current + 1;
    $("#total").textContent = EXES.length;

    $("#progress-bar").style.width =
        `${((current + 1) / EXES.length) * 100}%`;

    const photo = ex.image
        ? `background-image:linear-gradient(transparent 38%,#180d2bd9),url('${ex.image}');background-size:cover;background-position:center`
        : `--c1:${ex.colors[0]};--c2:${ex.colors[1]}`;

    $("#dating-card").innerHTML = `
        <div class="photo" style="${photo}">
            ${
                ex.image
                    ? ""
                    : '<div class="portrait"><span></span></div>'
            }

            <div class="photo-info">
                <h2>${ex.name}, ${ex.age}</h2>
                <small>
                    COMPATIBILIDADE: ${ex.compatibility}%
                </small>
            </div>
        </div>

        <div class="card-copy">
            <span class="compat">
                MATCH ALTAMENTE SUSPEITO
            </span>

            <p>${ex.description}</p>

            <div class="reason">
                <strong>MOTIVO DO MATCH</strong>
                <span>${ex.reason}</span>
            </div>
        </div>
    `;
}


// ==============================
// ANIMAÇÃO DO CARD
// ==============================

function moveCard(direction, done) {
    const c = $("#dating-card");

    if (!c) return;

    c.style.transition =
        "transform .35s ease, opacity .35s ease";

    c.style.transform =
        `translateX(${direction * 520}px) rotate(${direction * 18}deg)`;

    c.style.opacity = "0";

    setTimeout(() => {
        c.style.transition = "";
        c.style.transform = "";
        c.style.opacity = "1";

        if (typeof done === "function") {
            done();
        }
    }, 360);
}


// ==============================
// PRÓXIMO CARD
// ==============================

function nextCard() {
    current++;
    passAttempts = 0;

    if (current < EXES.length) {
        renderCard();
        return;
    }

    if (!searchingShown) {
        searchingShown = true;

        go("searching");

        setTimeout(() => {
            $("#new-count").textContent = EXES.length;

            $("#more-title").innerHTML =
                `novos perfis<br>encontrados.`;

            go("more");
        }, 1800);

    } else {
        go("final");
    }
}


// ==============================
// BOTÃO PASSAR
// ==============================

function pass() {
    if (passAttempts < passLines.length) {
        toast(passLines[passAttempts++]);
        return;
    }

    moveCard(-1, nextCard);
}


// ==============================
// BOTÃO CURTIR
// ==============================

function like() {
    moveCard(1, () => {
        launchConfetti();
        go("match");
    });
}


// ==============================
// CONFETES
// ==============================

function launchConfetti() {
    const canvas = $("#confetti");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width =
        canvas.offsetWidth * devicePixelRatio;

    canvas.height =
        canvas.offsetHeight * devicePixelRatio;

    ctx.scale(
        devicePixelRatio,
        devicePixelRatio
    );

    const bits = Array.from(
        { length: 130 },
        () => ({
            x:
                Math.random() *
                canvas.offsetWidth,

            y:
                -20 -
                Math.random() *
                canvas.offsetHeight *
                0.4,

            vy:
                2 +
                Math.random() * 4,

            vx:
                -2 +
                Math.random() * 4,

            c:
                [
                    "#ff74ad",
                    "#fff0a5",
                    "#aa83ff",
                    "#fff"
                ][
                    Math.floor(
                        Math.random() * 4
                    )
                ],

            s:
                4 +
                Math.random() * 6,

            r:
                Math.random() * 6
        })
    );

    let frame = 0;

    (function draw() {
        ctx.clearRect(
            0,
            0,
            canvas.offsetWidth,
            canvas.offsetHeight
        );

        bits.forEach(b => {
            b.x += b.vx;
            b.y += b.vy;

            b.vy += 0.05;
            b.r += 0.11;

            ctx.save();

            ctx.translate(
                b.x,
                b.y
            );

            ctx.rotate(b.r);

            ctx.fillStyle = b.c;

            ctx.fillRect(
                -b.s / 2,
                -b.s / 2,
                b.s,
                b.s * 0.65
            );

            ctx.restore();
        });

        if (frame++ < 180) {
            requestAnimationFrame(draw);
        }
    })();
}


// ==============================
// BOTÕES data-go
// ==============================

document
    .querySelectorAll("[data-go]")
    .forEach(b => {
        b.onclick = () => {
            go(b.dataset.go);
        };
    });


// ==============================
// BOTÃO OPÇÕES
// ==============================

const optionsBtn = $("#options-btn");

if (optionsBtn) {
    optionsBtn.onclick = () => {
        current = 0;
        searchingShown = false;

        renderCard();
        go("cards");
    };
}


// ==============================
// BOTÃO PASSAR
// ==============================

const passBtn = $("#pass-btn");

if (passBtn) {
    passBtn.onclick = pass;
}


// ==============================
// BOTÃO CURTIR
// ==============================

const likeBtn = $("#like-btn");

if (likeBtn) {
    likeBtn.onclick = like;
}


// ==============================
// MOSTRAR MAIS
// ==============================

const showMore = $("#show-more");

if (showMore) {
    showMore.onclick = () => {
        current = 0;

        renderCard();
        go("cards");
    };
}


// ==============================
// REINICIAR
// ==============================

const restartBtn = $("#restart-btn");

if (restartBtn) {
    restartBtn.onclick = () => {
        current = 0;
        searchingShown = false;

        go("welcome");
    };
}


// ==============================
// ACEITAR
// ==============================

const acceptBtn = $("#accept-btn");

if (acceptBtn) {
    acceptBtn.onclick = () => {
        go("accepted");
    };
}


// ==============================
// SWIPE NO CELULAR / MOUSE
// ==============================

let startX = 0;

const datingCard = $("#dating-card");

if (datingCard) {

    datingCard.addEventListener(
        "pointerdown",
        e => {
            startX = e.clientX;
        }
    );

    datingCard.addEventListener(
        "pointerup",
        e => {

            const delta =
                e.clientX - startX;

            if (Math.abs(delta) > 70) {

                if (delta > 0) {
                    like();
                } else {
                    pass();
                }
            }
        }
    );
}


// ==============================
// CONTADOR INICIAL
// ==============================

const exCount = $("#ex-count");

if (exCount) {
    exCount.textContent = EXES.length;
}
