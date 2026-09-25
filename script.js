// ===============================
// HAMBURGERMENY
// ===============================

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");

if (menuButton && sideMenu) {
    menuButton.addEventListener("click", function () {
        sideMenu.classList.toggle("open");
    });
}


// ===============================
// MATCHING QUIZ
// ===============================

const questions = [
    {
        question: "Hvilket område interesserer deg mest?",
        type: "options",
        options: [
            "IT og teknologi",
            "Salg og kundeservice",
            "Helse og omsorg",
            "Design og kreativt arbeid"
        ]
    },

    {
        question: "Hva liker du best å jobbe med?",
        type: "options",
        options: [
            "Mennesker og kundekontakt",
            "Data og teknologi",
            "Praktiske oppgaver",
            "Kreative oppgaver"
        ]
    },

    {
        question: "Hvordan liker du best å jobbe?",
        type: "options",
        options: [
            "Sammen med andre",
            "Selvstendig",
            "En blanding av begge",
            "Jeg er ikke sikker"
        ]
    },

    {
        question: "Hvilke ferdigheter mener du beskriver deg best?",
        type: "options",
        options: [
            "Kommunikasjon",
            "Problemløsning",
            "Kreativitet",
            "Tekniske ferdigheter"
        ]
    },

    {
        question: "Hva ønsker du å lære mer om i praksisperioden?",
        type: "text"
    },

    {
        question: "Hva er viktigst for deg på en praksisplass?",
        type: "options",
        options: [
            "Å lære nye ferdigheter",
            "Et godt arbeidsmiljø",
            "Oppgaver som passer interessene mine",
            "Mulighet for videre jobb"
        ]
    },

    {
        question: "Er det noen type arbeidsoppgaver du helst ønsker å jobbe med?",
        type: "text"
    },

    {
        question: "Hvor langt er du villig til å reise til praksisplassen?",
        type: "options",
        options: [
            "Helst i nærområdet",
            "Opptil 30 minutter",
            "Opptil 1 time",
            "Reisevei er ikke så viktig"
        ]
    }
];

let currentQuestion = 0;

// Her lagres svarene til eleven
const answers = new Array(questions.length).fill(null);


// Henter elementer fra quizz.html
const questionElement = document.getElementById("question");
const answerOptions = document.getElementById("answerOptions");
const questionCounter = document.getElementById("questionCounter");
const progress = document.getElementById("progress");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");


// Koden under kjøres bare hvis vi faktisk er på quiz-siden
if (
    questionElement &&
    answerOptions &&
    questionCounter &&
    progress &&
    nextButton &&
    previousButton
) {

    function showQuestion() {

        const current = questions[currentQuestion];

        // Viser spørsmålet
        questionElement.textContent = current.question;

        // Oppdaterer "Spørsmål 1 av 8"
        questionCounter.textContent =
            `Spørsmål ${currentQuestion + 1} av ${questions.length}`;

        // Oppdaterer fremdriftslinjen
        const progressPercentage =
            ((currentQuestion + 1) / questions.length) * 100;

        progress.style.width = progressPercentage + "%";

        // Tømmer gamle svar
        answerOptions.innerHTML = "";


        // ===============================
        // SVARALTERNATIVER
        // ===============================

        if (current.type === "options") {

            current.options.forEach(function (option) {

                const button = document.createElement("button");

                button.classList.add("answer-button");
                button.textContent = option;

                // Hvis eleven allerede har valgt dette svaret
                if (answers[currentQuestion] === option) {
                    button.classList.add("selected");
                }

                button.addEventListener("click", function () {

                    // Fjerner selected fra alle andre
                    const allButtons =
                        document.querySelectorAll(".answer-button");

                    allButtons.forEach(function (btn) {
                        btn.classList.remove("selected");
                    });

                    // Marker valgt knapp
                    button.classList.add("selected");

                    // Lagre svaret
                    answers[currentQuestion] = option;
                });

                answerOptions.appendChild(button);
            });
        }


        // ===============================
        // FRITEKST
        // ===============================

        if (current.type === "text") {

            const textarea = document.createElement("textarea");

            textarea.classList.add("quiz-textarea");

            textarea.placeholder =
                "Skriv svaret ditt her...";

            // Viser tidligere svar hvis eleven går tilbake
            if (answers[currentQuestion]) {
                textarea.value = answers[currentQuestion];
            }

            textarea.addEventListener("input", function () {
                answers[currentQuestion] = textarea.value;
            });

            answerOptions.appendChild(textarea);
        }


        // Deaktiver tilbake på spørsmål 1
        previousButton.disabled = currentQuestion === 0;


        // Endrer teksten på siste spørsmål
        if (currentQuestion === questions.length - 1) {
            nextButton.textContent = "Fullfør quiz";
        } else {
            nextButton.textContent = "Neste";
        }
    }


    // ===============================
    // NESTE
    // ===============================

    nextButton.addEventListener("click", function () {

        // Sjekker at eleven har svart
        if (
            answers[currentQuestion] === null ||
            answers[currentQuestion].trim() === ""
        ) {
            alert("Velg eller skriv inn et svar før du går videre.");
            return;
        }


        if (currentQuestion < questions.length - 1) {

            currentQuestion++;
            showQuestion();

        } else {

            console.log("Quiz ferdig!");
            console.log(answers);

            alert("Quiz fullført!");

            // Senere kobler vi dette til matching-resultatene
        }
    });


    // ===============================
    // TILBAKE
    // ===============================

    previousButton.addEventListener("click", function () {

        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }

    });


    // Starter quizzen
    showQuestion();
}