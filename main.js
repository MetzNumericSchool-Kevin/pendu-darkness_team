//Utilisation de local storage pour stocker les données (mots, essais, etc...)
const mot = "pendu"
const placeLettre = document.querySelector("#word-display")
const nvlPartie = document.querySelector('.btn-primary')


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

