//Utilisation de local storage pour stocker les données (mots, essais, etc...)
const mot = "pendule"
const placeLettre = document.querySelector("#word-display")
const nbErreur = document.querySelector("#errors")
let compteErreur = 0
const contLettresJouees = document.querySelector("#letters-used")

// const nvlPartie = document.querySelector('.btn-primary')

window.addEventListener("load", () => {

    if (mot.length > placeLettre.children.length) {

        const nbAjout =  mot.length - placeLettre.children.length
        console.log(nbAjout,mot.length,placeLettre.children.length)

        for (i = 0; i < nbAjout; i++) {
            console.log("Boucle ajout")
            const nvlLettre = document.createElement("span")
            nvlLettre.classList.add("letter-placeholder")
            placeLettre.appendChild(nvlLettre)
        }
    } else {
        const nbSuppr = placeLettre.children.length - mot.length
        console.log(nbSuppr)

        for (i=0; i < nbSuppr ; i++) {
            const spanSuppr = document.querySelector(".letter-placeholder")
            spanSuppr.remove();
        }   
    } 
})

document.addEventListener('keydown', (event) => {
    const key = event.key
    console.log(key)
    
    if (!/^[a-z]$/.test(key)) {
        alert("Veuillez taper une lettre entre A et Z !");
    } else {
        for (i = 0; i < mot.length; i++) {
            if (mot[i] == key) {
                console.log(`Lettre trouvé à la position ${i}`)
                placeLettre.children[i].textContent = key
        }   
    }
        if (!mot.includes(key)) {
            console.log (compteErreur)
            compteErreur += 1
            nbErreur.textContent = compteErreur + "/5"
            const pendu = document.querySelector("#error-" + compteErreur)
            console.log(pendu)
            pendu.removeClass("hidden")
            pendu.classList.add("view")
        }
        const lettresJouees = document.createElement("span") 
        contLettresJouees.appendChild(lettresJouees)
        lettresJouees.textContent = key
        }     
})

