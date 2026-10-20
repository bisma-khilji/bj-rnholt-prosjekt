
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
        type: "multiple",
        options: [
            "IT og teknologi",
            "Salg og kundeservice",
            "Helse og omsorg",
            "Design og kreativt arbeid"
        ]
    },

    {
        question: "Hva liker du best å jobbe med?",
        type: "multiple",
        options: [
            "Mennesker og kundekontakt",
            "Data og teknologi",
            "Praktiske oppgaver",
            "Kreative oppgaver"
        ]
    },

    {
        question: "Hvordan liker du best å jobbe?",
        type: "single",
        options: [
            "Sammen med andre",
            "Selvstendig",
            "En blanding av begge",
            "Jeg er ikke sikker"
        ]
    },

    {
        question: "Hvilke ferdigheter mener du beskriver deg best?",
        type: "multiple",
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
        type: "multiple",
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
        type: "single",
        options: [
            "Helst i nærområdet",
            "Opptil 30 minutter",
            "Opptil 1 time",
            "Reisevei er ikke så viktig"
        ]
    }
];


// ===============================
// LAGRE SVAR
// ===============================

let currentQuestion = 0;

const answers = new Array(questions.length).fill(null);


// ===============================
// HENT HTML-ELEMENTER
// ===============================

const questionElement = document.getElementById("question");
const answerOptions = document.getElementById("answerOptions");
const questionCounter = document.getElementById("questionCounter");
const progress = document.getElementById("progress");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const answerInstruction = document.getElementById("answerInstruction");


// ===============================
// VIS QUIZ
// ===============================

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

        questionElement.textContent = current.question;

        // Oppdater fremdrift
        questionCounter.textContent =
            `Spørsmål ${currentQuestion + 1} av ${questions.length}`;

        const percentage =
            ((currentQuestion + 1) / questions.length) * 100;

        progress.style.width = percentage + "%";

        // Fjern gamle svaralternativer
        answerOptions.innerHTML = "";

        // Forklar om eleven kan velge flere
        if (answerInstruction) {

            if (current.type === "multiple") {
                answerInstruction.textContent =
                    "✓ Velg én eller flere alternativer";
            }

            else if (current.type === "single") {
                answerInstruction.textContent =
                    "Velg ett alternativ";
            }

            else {
                answerInstruction.textContent =
                    "Skriv svaret ditt nedenfor";
            }
        }


        // ===============================
        // SVARALTERNATIVER
        // ===============================

        if (
            current.type === "multiple" ||
            current.type === "single"
        ) {

            // Opprett en liste for flervalg
            if (
                current.type === "multiple" &&
                !Array.isArray(answers[currentQuestion])
            ) {
                answers[currentQuestion] = [];
            }

            current.options.forEach(function (option) {

                const button = document.createElement("button");

                button.type = "button";
                button.classList.add("answer-button");
                button.textContent = option;

                // Gjenopprett valgte svar
                let isSelected = false;

                if (current.type === "multiple") {
                    isSelected = answers[currentQuestion].includes(option);
                } else {
                    isSelected = answers[currentQuestion] === option;
                }

                if (isSelected) {
                    button.classList.add("selected");
                }

                button.setAttribute("aria-pressed", String(isSelected));

                button.addEventListener("click", function () {

                    if (current.type === "multiple") {

                        const selectedAnswers = answers[currentQuestion];

                        if (selectedAnswers.includes(option)) {

                            // Fjern svar ved nytt klikk
                            answers[currentQuestion] =
                                selectedAnswers.filter(function (answer) {
                                    return answer !== option;
                                });

                            button.classList.remove("selected");

                        } else {

                            // Legg til enda et svar
                            selectedAnswers.push(option);

                            button.classList.add("selected");
                        }

                    } else {

                        // Spørsmål der kun ett svar er tillatt
                        answers[currentQuestion] = option;

                        const allButtons =
                            answerOptions.querySelectorAll(".answer-button");

                        allButtons.forEach(function (btn) {
                            btn.classList.remove("selected");
                            btn.setAttribute("aria-pressed", "false");
                        });

                        button.classList.add("selected");
                    }

                    button.setAttribute(
                        "aria-pressed",
                        String(button.classList.contains("selected"))
                    );

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
            textarea.placeholder = "Skriv svaret ditt her...";

            if (typeof answers[currentQuestion] === "string") {
                textarea.value = answers[currentQuestion];
            }

            textarea.addEventListener("input", function () {
                answers[currentQuestion] = textarea.value;
            });

            answerOptions.appendChild(textarea);
        }


        // ===============================
        // NAVIGASJON
        // ===============================

        previousButton.disabled = currentQuestion === 0;

        if (currentQuestion === questions.length - 1) {
            nextButton.textContent = "Fullfør quiz 🎉";
        } else {
            nextButton.textContent = "Neste →";
        }
    }


    // ===============================
    // NESTE
    // ===============================

    nextButton.addEventListener("click", function () {

        const answer = answers[currentQuestion];

        // Sjekk at eleven har svart
        const isEmpty =
            answer === null ||
            (Array.isArray(answer) && answer.length === 0) ||
            (typeof answer === "string" && answer.trim() === "");

        if (isEmpty) {
            alert("Velg eller skriv inn et svar før du går videre.");
            return;
        }

        if (currentQuestion < questions.length - 1) {

            currentQuestion++;
            showQuestion();

        } else {

            // Quiz ferdig
            console.log("Quiz ferdig!");
            console.log(answers);

            // Lagre svarene
            sessionStorage.setItem(
                "quizAnswers",
                JSON.stringify(answers)
            );

            // Beregn matching
            const results = calculateMatches(answers);

            sessionStorage.setItem(
                "matchingResults",
                JSON.stringify(results)
            );

            // Tilbake til Min side
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


    showQuestion();
}


// ===============================
// BEREGN MATCHING
// ===============================

function calculateMatches(answers) {

    // Eksempelbedrifter i prototypen
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


    // Sjekker om et svar er valgt.
    // Fungerer både med ett svar og flere svar.
    function hasAnswer(questionIndex, value) {

        const answer = answers[questionIndex];

        if (Array.isArray(answer)) {
            return answer.includes(value);
        }

        return answer === value;
    }


    // ===============================
    // SPØRSMÅL 1 - INTERESSER
    // ===============================

    if (hasAnswer(0, "IT og teknologi")) {
        results[0].match += 20;
        results[1].match += 15;
        results[3].match += 15;
        results[4].match += 10;
    }

    if (hasAnswer(0, "Salg og kundeservice")) {
        results[2].match += 20;
    }

    if (hasAnswer(0, "Design og kreativt arbeid")) {
        results[3].match += 10;
        results[4].match += 5;
    }

    if (hasAnswer(0, "Helse og omsorg")) {
        results[1].match += 5;
    }


    // ===============================
    // SPØRSMÅL 2 - ARBEIDSOPPGAVER
    // ===============================

    if (hasAnswer(1, "Data og teknologi")) {
        results[0].match += 10;
        results[1].match += 10;
        results[3].match += 10;
    }

    if (hasAnswer(1, "Mennesker og kundekontakt")) {
        results[2].match += 10;
    }

    if (hasAnswer(1, "Kreative oppgaver")) {
        results[3].match += 5;
    }

    if (hasAnswer(1, "Praktiske oppgaver")) {
        results[2].match += 5;
    }


    // ===============================
    // SPØRSMÅL 3 - ARBEIDSMÅTE
    // ===============================

    if (hasAnswer(2, "Sammen med andre")) {
        results[0].match += 5;
        results[2].match += 5;
    }

    if (hasAnswer(2, "Selvstendig")) {
        results[1].match += 5;
        results[3].match += 5;
    }


    // ===============================
    // SPØRSMÅL 4 - FERDIGHETER
    // ===============================

    if (hasAnswer(3, "Tekniske ferdigheter")) {
        results[0].match += 5;
        results[1].match += 5;
        results[3].match += 5;
    }

    if (hasAnswer(3, "Kommunikasjon")) {
        results[2].match += 5;
    }

    if (hasAnswer(3, "Problemløsning")) {
        results[0].match += 5;
        results[1].match += 5;
    }

    if (hasAnswer(3, "Kreativitet")) {
        results[3].match += 5;
    }


    // ===============================
    // SPØRSMÅL 6 - VIKTIGST I PRAKSIS
    // ===============================

    if (hasAnswer(5, "Å lære nye ferdigheter")) {
        results[0].match += 5;
        results[1].match += 5;
        results[3].match += 5;
    }

    if (hasAnswer(5, "Et godt arbeidsmiljø")) {
        results[2].match += 5;
    }

    if (hasAnswer(5, "Oppgaver som passer interessene mine")) {
        results[3].match += 5;
        results[4].match += 5;
    }

    if (hasAnswer(5, "Mulighet for videre jobb")) {
        results[2].match += 5;
        results[4].match += 5;
    }


    // ===============================
    // MAKS 99% MATCH
    // ===============================

    results.forEach(function (place) {
        place.match = Math.min(99, place.match);
    });


    // ===============================
    // SORTER RESULTATENE
    // ===============================

    results.sort(function (a, b) {
        return b.match - a.match;
    });

    return results;
}


// ===============================
// VIS RESULTATER PÅ MIN SIDE
// ===============================

const resultsContainer =
    document.getElementById("resultsContainer");

if (resultsContainer) {

    const savedResults =
        sessionStorage.getItem("matchingResults");

    if (savedResults) {

        const results = JSON.parse(savedResults);

        resultsContainer.innerHTML = "";

        results.forEach(function (place) {

            const resultCard = document.createElement("div");

            resultCard.classList.add("result-card");

            resultCard.innerHTML = `

                <div class="result-top">

                    <span class="type-badge praksis">
                        🎓 Praksisplass
                    </span>

                    <span class="match-badge">
                        ${place.match}% match
                    </span>

                </div>

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
                        <strong>${place.match}%</strong>
                        <span>match</span>
                    </div>

                    <div class="match-bar">
                        <div
                            class="match-progress"
                            style="width: ${place.match}%">
                        </div>
                    </div>

                </div>

                <div class="result-actions">

                    <button
                        class="read-more-button"
                        onclick="alert('Mer informasjon om ${place.name}')">
                        Les mer
                    </button>

                    <a href="messages.html?company=${encodeURIComponent(place.name)}"
                    class="contact-button">
                     💬 Kontakt bedriften
                    </a>

                </div>

            `;

            resultsContainer.appendChild(resultCard);
        });

    } else {

        resultsContainer.innerHTML = "";

    }
}
