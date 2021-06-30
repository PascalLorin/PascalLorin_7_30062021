"use strict"
// initialisation de l'affichage
// supprime les cards affichées (s'il y en a...)
function effaceCards() {
  let listeCards = document.getElementsByClassName('rcard')
  let length = listeCards.length
  if (length > 0) {
    let parentCard = listeCards[0].parentNode
    for (let i = 0; i < length; i++) {
      parentCard.removeChild(listeCards[0])
    }
  }
}

// affichage de la page principale avec toutes les recettes au lancement
function displayRecipeAll() {
  effaceCards()
  recipeSet.forEach(r => {
    r.displayRecipe()
  })
}

// affichage des recettes possédant au moins un critère sélectionné
function displayRecipeSel() {
  effaceCards()
  setAllRecipes()

  tagSet.forEach(t => {
    if (t.state == true) {
      recipes.forEach(id => {
        if (recipeToDisplay.length == 0) {
          recipeToDisplay.push(id)
        } else {
          if (recipeToDisplay == id) {
            break
          } else {
            recipeToDisplay.push(id)
          }
        }
      })
    }
  })
}

// clic sur un tag : sélection ou annulation de la sélection
// réaffiche les recettes en fonction du nouvel état des tags
function select(event) {
  let sTag = event.currentTarget.id
  for (let t of tagSet) {
    if (sTag == t.name) {
      t.switchTag()
      if (t.state) {
        event.currentTarget.setAttribute('class', "tagSelect tagBtnNav")
      } else {
        event.currentTarget.setAttribute('class', "tagNotSelect tagBtnNav")
      }
      break
    }
  }
  setAllRecipes()
  if (allRecipes) {
    displayRecipeAll()
  } else {
    displayRecipeSel()
  }
}

// fonction de récupération des données JSON au chargement de la page
// et exécution de la page principale
function loadJson() {
  let response = fetch(fichierJson)
    .then(response => response.json())
    .then(function (data) {
      let recipes = data.recipes
      for (let r of recipes) {
        recipeSet.push(new Recipe(r))
        r.initClasses()
      }
      displayRecipeAll()
      // DOM Elements & events listeners : click sur un bouton tag
      const navBtn = document.querySelectorAll(".tagBtnNav")
      navBtn.forEach((btn) => btn.addEventListener("click", selectTagMain))
    })
}

//************ exécution du script ****************
loadJson()