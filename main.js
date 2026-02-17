//Utilisation de local storage pour stocker les données (mots, essais, etc...)

const lettresDejaJouees = [];
const mots = ["pendu", "pendule", "javascript"];
const placeLettre = document.querySelector("#word-display");
const contLettresJouees = document.querySelector("#letters-used");
const nbErreur = document.querySelector("#errors");
const btnNew = document.querySelector(".btn-primary");

let mot = "";
let compteErreur = 0;


// Fonction pour démarrer une nouvelle partie
function nouvellePartie() {

	// Tirer un mot aléatoire depuis la liste
	mot = mots[Math.floor(Math.random() * mots.length)];
	console.log("Mot choisi :", mot);

	for (i= 0; i < 5; i++) {

		console.log(`avant traitement ${compteErreur}`)
		const pendu = document.querySelector("#error-" + compteErreur);
		pendu.classList.remove("view");
		pendu.classList.add("hidden");
		compteErreur -= 1
		console.log(`après traitement ${compteErreur}`)

	}

	// Réinitialiser variables
	compteErreur = 0;
	lettresDejaJouees.length = 0; // vide le tableau

	if (nbErreur) nbErreur.textContent = "0/5";
	contLettresJouees.innerHTML = "";
	placeLettre.innerHTML = "";

	// Créer les placeholders pour le mot
	for (let i = 0; i < mot.length; i++) {
		const span = document.createElement("span");
		span.classList.add("letter-placeholder");
		placeLettre.appendChild(span);
	}

	const pendu = document.querySelector("#error-" + compteErreur);
}

// Bouton Nouvelle Partie
btnNew.addEventListener("click", () => {
	nouvellePartie();
});

// Démarrer le jeu automatiquement au chargement
window.addEventListener("load", () => {
	nouvellePartie();
});

function handleKey(event) {
	if (compteErreur >= 5) return; // stop si déjà 5 erreurs

	const key = event.key.toLowerCase();

	if (!/^[a-z]$/.test(key)) {
		alert("Veuillez taper une lettre entre A et Z !");
		return;
	}

	if (lettresDejaJouees.includes(key)) {
		alert("Lettre déjà utilisée");
		return;
	}

	lettresDejaJouees.push(key);

	const lettresJouees = document.createElement("div");
	lettresJouees.classList.add("badge");
	lettresJouees.textContent = key;

	let trouve = false;
	for (let i = 0; i < mot.length; i++) {
		if (mot[i] === key) {
			console.log(`Lettre trouvée à la position ${i}`);
			placeLettre.children[i].textContent = key;
			trouve = true;
		}
	}

	if (trouve) {
		lettresJouees.classList.add("badge-success");

	} else {
		compteErreur += 1;
		nbErreur.textContent = compteErreur + "/5";
		const pendu = document.querySelector("#error-" + compteErreur);
		pendu.classList.remove("hidden");
		pendu.classList.add("view");
		lettresJouees.classList.add("badge-error");
	}

	contLettresJouees.appendChild(lettresJouees);

	if (compteErreur === 5) {
		alert("Partie terminée");
		nouvellePartie()
		document.removeEventListener("keydown", handleKey);
	}
}

document.addEventListener("keydown", handleKey);
