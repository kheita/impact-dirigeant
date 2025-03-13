// Configuration des axes d'évaluation
const axes = [
    {
        id: 'decision',
        titre: 'Prise de décision',
        description: 'Évalue votre capacité à prendre des décisions stratégiques et opérationnelles',
        couleur: '#3182ce'
    },
    {
        id: 'equipes',
        titre: 'Gestion des équipes',
        description: 'Mesure votre aptitude à diriger et développer vos collaborateurs',
        couleur: '#38a169'
    },
    {
        id: 'communication',
        titre: 'Communication',
        description: 'Analyse votre efficacité dans la transmission des messages et la gestion des relations',
        couleur: '#805ad5'
    },
    {
        id: 'vision',
        titre: 'Vision stratégique',
        description: 'Évalue votre capacité à définir et mettre en œuvre une stratégie claire',
        couleur: '#d69e2e'
    },
    {
        id: 'adaptabilite',
        titre: 'Adaptabilité',
        description: 'Mesure votre flexibilité face aux changements et aux défis',
        couleur: '#e53e3e'
    }
];

// Questions du questionnaire
const questions = [
    // Prise de décision
    {
        axe: 'decision',
        question: "Comment gérez-vous la prise de décisions stratégiques importantes ?",
        options: [
            { texte: "Je prends des décisions rapides basées sur mon intuition", score: 2 },
            { texte: "Je collecte quelques informations clés avant de décider", score: 3 },
            { texte: "J'analyse en profondeur toutes les données disponibles", score: 4 },
            { texte: "Je combine analyse approfondie et consultation des parties prenantes", score: 5 }
        ]
    },
    {
        axe: 'decision',
        question: "Comment gérez-vous l'incertitude dans vos prises de décision ?",
        options: [
            { texte: "J'évite de prendre des décisions en situation d'incertitude", score: 1 },
            { texte: "Je reporte les décisions jusqu'à avoir plus d'informations", score: 2 },
            { texte: "J'évalue les risques et prends des décisions calculées", score: 4 },
            { texte: "Je vois l'incertitude comme une opportunité d'innovation", score: 5 }
        ]
    },
    // Gestion des équipes
    {
        axe: 'equipes',
        question: "Comment développez-vous les compétences de vos équipes ?",
        options: [
            { texte: "Je laisse chacun se former selon ses besoins", score: 2 },
            { texte: "J'organise des formations ponctuelles", score: 3 },
            { texte: "J'ai mis en place un plan de développement structuré", score: 4 },
            { texte: "Je crée un environnement d'apprentissage continu", score: 5 }
        ]
    },
    {
        axe: 'equipes',
        question: "Comment gérez-vous les conflits au sein de l'équipe ?",
        options: [
            { texte: "J'évite les confrontations", score: 1 },
            { texte: "J'interviens uniquement si nécessaire", score: 2 },
            { texte: "Je facilite le dialogue entre les parties", score: 4 },
            { texte: "Je transforme les conflits en opportunités d'amélioration", score: 5 }
        ]
    },
    // Communication
    {
        axe: 'communication',
        question: "Comment communiquez-vous la vision de l'entreprise ?",
        options: [
            { texte: "Je communique rarement sur la vision", score: 1 },
            { texte: "Je partage la vision lors des réunions importantes", score: 3 },
            { texte: "Je communique régulièrement sur nos objectifs", score: 4 },
            { texte: "J'implique les équipes dans l'élaboration de la vision", score: 5 }
        ]
    },
    {
        axe: 'communication',
        question: "Comment gérez-vous la communication en situation de crise ?",
        options: [
            { texte: "Je limite la communication au minimum", score: 1 },
            { texte: "Je communique uniquement les informations essentielles", score: 2 },
            { texte: "Je maintiens une communication transparente et régulière", score: 4 },
            { texte: "Je mets en place une stratégie de communication proactive", score: 5 }
        ]
    },
    // Vision stratégique
    {
        axe: 'vision',
        question: "Comment élaborez-vous la stratégie de votre entreprise ?",
        options: [
            { texte: "Je me concentre sur les opérations quotidiennes", score: 1 },
            { texte: "Je définis des objectifs à court terme", score: 2 },
            { texte: "Je développe une vision à long terme", score: 4 },
            { texte: "J'implique toutes les parties prenantes dans la stratégie", score: 5 }
        ]
    },
    {
        axe: 'vision',
        question: "Comment anticipez-vous les évolutions du marché ?",
        options: [
            { texte: "Je réagis aux changements quand ils surviennent", score: 1 },
            { texte: "Je suis les tendances principales", score: 3 },
            { texte: "J'analyse en profondeur les signaux du marché", score: 4 },
            { texte: "Je crée des scénarios d'évolution et m'y prépare", score: 5 }
        ]
    },
    // Adaptabilité
    {
        axe: 'adaptabilite',
        question: "Comment réagissez-vous face aux changements imprévus ?",
        options: [
            { texte: "Je préfère maintenir les processus existants", score: 1 },
            { texte: "J'adapte progressivement nos pratiques", score: 3 },
            { texte: "Je saisis les opportunités de changement", score: 4 },
            { texte: "Je provoque le changement pour rester compétitif", score: 5 }
        ]
    },
    {
        axe: 'adaptabilite',
        question: "Comment gérez-vous l'innovation dans votre entreprise ?",
        options: [
            { texte: "Je privilégie les méthodes éprouvées", score: 1 },
            { texte: "J'adopte les innovations du marché", score: 3 },
            { texte: "J'encourage activement l'innovation", score: 4 },
            { texte: "Je crée une culture d'innovation permanente", score: 5 }
        ]
    }
];

let currentQuestion = 0;
const answers = [];

// Initialisation du questionnaire
window.onload = function() {
    displayQuestion();
    updateProgress();
};

// Affichage de la question courante
function displayQuestion() {
    const questionnaireDiv = document.getElementById('questionnaire');
    const question = questions[currentQuestion];
    
    let html = `
        <div class="question-container active">
            <div class="section">
                <div class="question">${question.question}</div>
                <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        const selected = answers[currentQuestion] === index ? 'selected' : '';
        html += `
            <div class="option ${selected}" onclick="selectOption(${index})">
                ${option.texte}
                <span class="score-indicator">${option.score}/5</span>
            </div>
        `;
    });
    
    html += '</div></div></div>';
    questionnaireDiv.innerHTML = html;
    
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').innerHTML = 
        currentQuestion === questions.length - 1 ? 'Terminer' : 'Suivant';
    
    document.getElementById('progress-percentage').textContent = 
        Math.round(((currentQuestion + 1) / questions.length) * 100) + '%';
}

// Sélection d'une option
function selectOption(index) {
    answers[currentQuestion] = index;
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
}

// Navigation
function nextQuestion() {
    if (answers[currentQuestion] === undefined) {
        alert('Veuillez sélectionner une réponse avant de continuer.');
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateProgress();
    } else {
        showEmailForm();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgress();
    }
}

// Mise à jour de la barre de progression
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

// Calcul des scores par axe
function calculateScores() {
    const scores = {};
    axes.forEach(axe => {
        scores[axe.id] = {
            total: 0,
            count: 0,
            moyenne: 0
        };
    });

    questions.forEach((q, index) => {
        const reponse = answers[index];
        const score = q.options[reponse].score;
        scores[q.axe].total += score;
        scores[q.axe].count++;
    });

    axes.forEach(axe => {
        scores[axe.id].moyenne = scores[axe.id].total / scores[axe.id].count;
    });

    return scores;
}

// Génération des recommandations
function generateRecommendations(scores) {
    const recommendations = [];
    
    // Recommandations générales basées sur les scores
    axes.forEach(axe => {
        const score = scores[axe.id].moyenne;
        
        if (score <= 2) {
            recommendations.push({
                axe: axe.titre,
                niveau: 'Attention',
                texte: `Votre score en ${axe.titre.toLowerCase()} est faible. Il est crucial de développer cet aspect de votre leadership.`,
                actions: [
                    `Suivre une formation en ${axe.titre.toLowerCase()}`,
                    'Mettre en place un plan d'action spécifique',
                    'Solliciter l'accompagnement d'un mentor'
                ]
            });
        } else if (score <= 3.5) {
            recommendations.push({
                axe: axe.titre,
                niveau: 'À améliorer',
                texte: `Vous avez des bases solides en ${axe.titre.toLowerCase()}, mais il existe une marge de progression significative.`,
                actions: [
                    'Identifier les points spécifiques à améliorer',
                    'Participer à des ateliers de perfectionnement',
                    'Échanger avec d'autres dirigeants sur leurs pratiques'
                ]
            });
        } else if (score <= 4.5) {
            recommendations.push({
                axe: axe.titre,
                niveau: 'Bon niveau',
                texte: `Vous démontrez une bonne maîtrise de ${axe.titre.toLowerCase()}. Continuez à vous perfectionner.`,
                actions: [
                    'Partager vos bonnes pratiques avec votre équipe',
                    'Explorer des approches innovantes',
                    'Mesurer régulièrement votre impact'
                ]
            });
        } else {
            recommendations.push({
                axe: axe.titre,
                niveau: 'Excellence',
                texte: `Vous excellez en ${axe.titre.toLowerCase()}. Votre expertise peut servir de modèle.`,
                actions: [
                    'Devenir mentor pour d'autres dirigeants',
                    'Documenter et partager vos méthodes',
                    'Innover dans vos pratiques'
                ]
            });
        }
    });

    return recommendations;
}

// Génération et téléchargement du PDF
function generatePDF() {
    const email = document.getElementById('email').value;
    if (!email || !email.includes('@')) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    const scores = calculateScores();
    const recommendations = generateRecommendations(scores);
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Style et couleurs
    const colors = {
        primary: '#1a365d',
        secondary: '#2c5282',
        text: '#2d3748',
        light: '#718096'
    };

    // En-tête
    doc.setFontSize(24);
    doc.setTextColor(colors.primary);
    doc.text('Rapport de Leadership', 20, 20);

    // Sous-titre et date
    doc.setFontSize(12);
    doc.setTextColor(colors.text);
    doc.text('Analyse détaillée de votre impact en tant que dirigeant', 20, 30);
    doc.setTextColor(colors.light);
    doc.text('Date du diagnostic : ' + new Date().toLocaleDateString(), 20, 40);

    // Résumé des scores
    let yPos = 60;
    doc.setFontSize(16);
    doc.setTextColor(colors.primary);
    doc.text('Synthèse des résultats', 20, yPos);
    
    yPos += 10;
    axes.forEach(axe => {
        yPos += 10;
        const score = scores[axe.id].moyenne;
        doc.setFontSize(12);
        doc.setTextColor(colors.text);
        doc.text(`${axe.titre}: ${score.toFixed(1)}/5`, 20, yPos);
    });

    // Graphique radar (simulation visuelle avec texte)
    yPos += 20;
    doc.setFontSize(16);
    doc.setTextColor(colors.primary);
    doc.text('Points forts et axes d'amélioration', 20, yPos);

    // Recommandations détaillées
    yPos += 20;
    recommendations.forEach(rec => {
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(colors.primary);
        doc.text(`${rec.axe} - ${rec.niveau}`, 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(colors.text);
        const lines = doc.splitTextToSize(rec.texte, 170);
        doc.text(lines, 20, yPos);
        
        yPos += lines.length * 7 + 5;
        doc.setFontSize(10);
        rec.actions.forEach(action => {
            doc.text('• ' + action, 25, yPos);
            yPos += 7;
        });
        
        yPos += 10;
    });

    // Plan d'action personnalisé
    if (yPos > 250) {
        doc.addPage();
        yPos = 20;
    }

    doc.setFontSize(16);
    doc.setTextColor(colors.primary);
    doc.text('Plan d'action recommandé', 20, yPos);
    
    yPos += 15;
    doc.setFontSize(11);
    doc.setTextColor(colors.text);
    const actionSteps = [
        'Court terme (1-3 mois) : Focus sur les points d'amélioration immédiats',
        'Moyen terme (3-6 mois) : Développement des compétences identifiées',
        'Long terme (6-12 mois) : Transformation durable des pratiques'
    ];

    actionSteps.forEach(step => {
        const lines = doc.splitTextToSize(step, 170);
        doc.text(lines, 20, yPos);
        yPos += lines.length * 7 + 5;
    });

    // Pied de page
    doc.setFontSize(8);
    doc.setTextColor(colors.light);
    doc.text('Document confidentiel - Généré le ' + new Date().toLocaleDateString(), 20, 280);
    doc.text('Pour plus d'informations : ' + email, 20, 285);

    // Téléchargement
    doc.save('rapport-leadership-impact.pdf');
}

// Affichage du formulaire email
function showEmailForm() {
    document.getElementById('questionnaire').style.display = 'none';
    document.getElementById('email-form').style.display = 'block';
    document.querySelector('.navigation').style.display = 'none';
} 