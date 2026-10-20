
// ===============================
// MELDINGER - BJØRNHOLT MATCH
// ===============================

// Eksempelsamtaler
const conversations = [
    {
        name: "Sopra Steria AS",
        initials: "SS",
        message: "Hei! Vi ønsker å invitere deg til et intervju.",
        interview: true
    },
    {
        name: "Telia",
        initials: "T",
        message: "Hei! Vi har mottatt søknaden din.",
        interview: false
    },
    {
        name: "Elkjøp Nordic AS",
        initials: "E",
        message: "Hei! Kan du fortelle litt om interessene dine?",
        interview: false
    },
    {
        name: "Finanstilsynet",
        initials: "F",
        message: "Hei! Vi har mottatt søknaden din.",
        interview: false
    },
    {
        name: "Forbrukerrådet",
        initials: "FR",
        message: "Takk for søknaden din!",
        interview: false
    }
];


// Hent HTML-elementene
const conversationList = document.getElementById("conversationList");
const chatMessages = document.getElementById("chatMessages");
const chatCompany = document.getElementById("chatCompany");
const chatAvatar = document.getElementById("chatAvatar");
const chatType = document.getElementById("chatType");
const messageInput = document.getElementById("messageInput");
const messageForm = document.getElementById("messageForm");

const params = new URLSearchParams(window.location.search);
const companyName = params.get("company");

let selectedCompany = conversations.findIndex(function(company) {
    return company.name === companyName;
});

if (selectedCompany === -1) {
    selectedCompany = 0;
}


// ===============================
// VIS BEDRIFTER
// ===============================

function showCompanies() {

    conversationList.innerHTML = "";

    conversations.forEach(function(company, index) {

        const button = document.createElement("button");
        button.className = "conversation";
        button.type = "button";

        if (index === selectedCompany) {
            button.classList.add("active-conversation");
        }

        button.textContent = "💬 " + company.name;

        button.addEventListener("click", function() {
            selectedCompany = index;
            showCompanies();
            showChat();
        });

        conversationList.appendChild(button);
    });
}


// ===============================
// VIS CHAT
// ===============================

function showChat() {

    const company = conversations[selectedCompany];

    chatCompany.textContent = company.name;
    chatAvatar.textContent = company.initials;
    chatType.textContent = "🎓 Praksisplass";

    chatMessages.innerHTML = "";

    // Melding fra bedriften
    const message = document.createElement("div");
    message.className = "message company-message";
    message.textContent = company.message;

    chatMessages.appendChild(message);


    // Intervjuinvitasjon
    if (company.interview) {

        const interview = document.createElement("div");
        interview.className = "interview-card";

        interview.innerHTML = `
            <div>
                <h3>📹 Teams-intervju</h3>
                <p>27. oktober kl. 13:00</p>
                <p>Teams-lenke kommer her.</p>
            </div>
        `;

        chatMessages.appendChild(interview);
    }


    // Vis meldinger eleven har skrevet
    if (company.replies) {

        company.replies.forEach(function(text) {

            const reply = document.createElement("div");
            reply.className = "message user-message";
            reply.textContent = text;

            chatMessages.appendChild(reply);
        });
    }
}


// ===============================
// SEND MELDING
// ===============================

messageForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const text = messageInput.value.trim();

    if (text === "") return;

    const company = conversations[selectedCompany];

    if (!company.replies) {
        company.replies = [];
    }

    company.replies.push(text);

    messageInput.value = "";

    showChat();
});


// Start meldingssiden
showCompanies();
showChat();
