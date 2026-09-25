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

    // ===============================
    // QUIZ FULLFØRT
    // ===============================

    const results = calculateMatches(answers);

    // Lagre resultatene
    sessionStorage.setItem(
        "matchingResults",
        JSON.stringify(results)
    );

    // Gå tilbake til profilsiden
    window.location.href = "index.html";
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



   // ===============================
// BEREGN MATCHING
// ===============================

function calculateMatches(answers) {


    // ===============================
    // EKSEMPEL-PRAKSISPLASSER
    // ===============================

    const results = [

        {
            name: "Finanstilsynet",
            line: "IT og teknologi",
            location: "Oslo",
            match: 70
        },

        {
            name: "Forbrukerrådet",
            line: "IT og teknologi",
            location: "Oslo",
            match: 70
        },

        {
            name: "Elkjøp Nordic AS",
            line: "Salg og kundeservice",
            location: "Oslo",
            match: 70
        },

        {
            name: "Sopra Steria AS",
            line: "IT og teknologi",
            location: "Oslo",
            match: 70
        },

        {
            name: "Telia",
            line: "IT og teknologi",
            location: "Oslo",
            match: 70
        }

    ];


    // ===============================
    // SPØRSMÅL 1
    // INTERESSEOMRÅDE
    // ===============================

    if (answers[0] === "IT og teknologi") {

        results[0].match += 20;

        results[1].match += 15;

        results[3].match += 15;

        results[4].match += 10;

    }


    if (answers[0] === "Salg og kundeservice") {

        results[2].match += 20;

    }


    // ===============================
    // SPØRSMÅL 2
    // HVA LIKER ELEVEN Å JOBBE MED?
    // ===============================

    if (answers[1] === "Data og teknologi") {

        results[0].match += 10;

        results[1].match += 10;

        results[3].match += 10;

    }


    if (answers[1] === "Mennesker og kundekontakt") {

        results[2].match += 10;

    }


    // ===============================
    // SPØRSMÅL 3
    // ARBEIDSMÅTE
    // ===============================

    if (answers[2] === "Sammen med andre") {

        results[0].match += 5;

        results[2].match += 5;

    }


    // ===============================
    // SPØRSMÅL 4
    // FERDIGHETER
    // ===============================

    if (answers[3] === "Tekniske ferdigheter") {

        results[0].match += 5;

        results[1].match += 5;

        results[3].match += 5;

    }


    if (answers[3] === "Kommunikasjon") {

        results[2].match += 5;

    }


    if (answers[3] === "Problemløsning") {

        results[0].match += 5;

        results[1].match += 5;

    }


    // ===============================
    // SPØRSMÅL 6
    // HVA ER VIKTIGST?
    // ===============================

    if (answers[5] === "Å lære nye ferdigheter") {

        results[0].match += 5;

        results[1].match += 5;

        results[3].match += 5;

    }


    if (answers[5] === "Et godt arbeidsmiljø") {

        results[2].match += 5;

    }


    // ===============================
    // MAKS 99%
    // ===============================

    results.forEach(function (place) {

        if (place.match > 99) {

            place.match = 99;

        }

    });


    // ===============================
    // SORTER HØYEST MATCH FØRST
    // ===============================

    results.sort(function (a, b) {

        return b.match - a.match;

    });


    return results;

}


// ===============================
// VIS RESULTATER PÅ PROFILSIDE
// ===============================

const resultsContainer =
    document.getElementById("resultsContainer");

if (resultsContainer) {

    const savedResults =
        sessionStorage.getItem("matchingResults");


    // Hvis quizzen nettopp er fullført
    if (savedResults) {

        const results =
            JSON.parse(savedResults);

        resultsContainer.innerHTML = "";


        results.forEach(function (place) {

            const resultCard =
                document.createElement("div");

            resultCard.classList.add("result-card");


            resultCard.innerHTML = `

                <div class="result-info">

                    <h3>${place.name}</h3>

                    <p class="result-line">
                        ${place.line}
                    </p>

                    <p class="result-location">
                        📍 ${place.location}
                    </p>

                </div>


                <div class="match-info">

                    <div class="match-text">

                        <strong>
                            ${place.match}%
                        </strong>

                        <span>
                            match
                        </span>

                    </div>


                    <div class="match-bar">

                        <div
                            class="match-progress"
                            style="width: ${place.match}%">
                        </div>

                    </div>

                </div>


                <button
                    class="read-more-button"
                    onclick="alert('Mer informasjon om ${place.name}')">

                    Les mer

                </button>

            `;

            resultsContainer.appendChild(resultCard);

        });


        // Fjern resultatene etter at de er vist
        // ved neste lasting av siden
        sessionStorage.removeItem("matchingResults");


    } else {

        // Ingen quiz-resultater
        resultsContainer.innerHTML = "";

    }

}