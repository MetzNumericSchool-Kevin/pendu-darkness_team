//Utilisation de local storage pour stocker les données (mots, essais, etc...)
const mot = "pendule"
const placeLettre = document.querySelector("#word-display")
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

    for (i = 0; i < mot.length; i++) {
        if (mot[i] == key) {
            console.log(`Lettre trouvé à la position ${i}`)
            placeLettre.children[i].textContent = key
        }
    }
})

