//Utilisation de local storage pour stocker les données (mots, essais, etc...)
let compteErreur = 0;
const lettresDejaJouees = [];
const mot = "pendu"
const placeLettre = document.querySelector("#word-display"); 
const contLettresJouees = document.querySelector("#letters-used");
const nbErreur = document.querySelector("#errors");

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
        document.removeEventListener("keydown", handleKey);
    }
}

document.addEventListener("keydown", handleKey);



