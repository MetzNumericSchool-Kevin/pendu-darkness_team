// DOM Elements
const placeLettre = document.querySelector("#word-display");
const contLettresJouees = document.querySelector("#letters-used");
const nbErreur = document.querySelector("#errors");
const btnNew = document.querySelector(".btn-primary");

// Données du jeu
const mots = ["pendu", "pendule", "javascript"];
let mot = "";
let lettresDejaJouees = [];
let compteErreur = 0;
const maxErreurs = 5;

// ========================================
// Fonction pour démarrer une nouvelle partie
// ========================================
function nouvellePartie() {
    // Réinitialiser variables
    compteErreur = 0;
    lettresDejaJouees = [];
    nbErreur.textContent = `0/${maxErreurs}`;
    contLettresJouees.innerHTML = "";
    placeLettre.innerHTML = "";

    // Réinitialiser le pendu
    for (let i = 1; i <= maxErreurs; i++) {
        const pendu = document.querySelector(`#error-${i}`);
        if (pendu) {
            pendu.classList.remove("view");
            pendu.classList.add("hidden");
        }
    }

    // Tirer un mot aléatoire
    mot = mots[Math.floor(Math.random() * mots.length)];
    console.log("Mot choisi :", mot);

    // Créer les placeholders pour le mot
    for (let i = 0; i < mot.length; i++) {
        const span = document.createElement("span");
        span.classList.add("letter-placeholder");
        placeLettre.appendChild(span);
    }

    // Réactiver l'écoute clavier
    document.removeEventListener("keydown", handleKey);
    document.addEventListener("keydown", handleKey);
}

// ========================================
// Fonction de gestion des touches clavier
// ========================================
function handleKey(event) {
    if (compteErreur >= maxErreurs) return;

    const key = event.key.toLowerCase();

    // Vérification de la lettre
    if (!/^[a-z]$/.test(key)) {
        alert("Veuillez taper une lettre entre A et Z !");
        return;
    }

    if (lettresDejaJouees.includes(key)) {
        alert("Lettre déjà utilisée");
        return;
    }

    lettresDejaJouees.push(key);

    // Créer le badge pour la lettre jouée
    const lettresJouees = document.createElement("div");
    lettresJouees.classList.add("badge");
    lettresJouees.textContent = key;

    // Vérifier si la lettre est dans le mot
    let trouve = false;
    for (let i = 0; i < mot.length; i++) {
        if (mot[i] === key) {
            placeLettre.children[i].textContent = key;
            trouve = true;
        }
    }

    if (trouve) {
        lettresJouees.classList.add("badge-success");
    } else {
        compteErreur++;
        nbErreur.textContent = `${compteErreur}/${maxErreurs}`;
        const pendu = document.querySelector(`#error-${compteErreur}`);
        if (pendu) {
            pendu.classList.remove("hidden");
            pendu.classList.add("view");
        }
        lettresJouees.classList.add("badge-error");
    }

    contLettresJouees.appendChild(lettresJouees);

    // Fin de partie si max erreurs atteint
    if (compteErreur === maxErreurs) {
    // Laisser le temps au DOM de se mettre à jour
		setTimeout(() => {
			alert("Partie terminée");
			document.removeEventListener("keydown", handleKey);
		}, 50); // 50ms suffisent
	}
}

// ========================================
// Événements
// ========================================
btnNew.addEventListener("click", nouvellePartie);
window.addEventListener("load", nouvellePartie);
