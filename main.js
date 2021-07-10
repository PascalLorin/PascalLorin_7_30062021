"use strict"
// initialisation de l'affichage
// supprime les cards affichées (s'il y en a...)
function effaceCards() {
  let listeCards = document.getElementsByClassName('card')
  while (listeCards.length > 0) {
    let parentCard = listeCards[0].parentNode
    parentCard.removeChild(listeCards[0])
  }
}

// affichage de la page principale avec toutes les recettes au lancement
function displayRecipeAll() {
  recipesCont = document.getElementById('cards-cont')
  effaceCards()
  recipeSet.forEach(r => {
    if (r.displayAble) {
      r.displayRecipe()
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
  displayRecipeAll()
}

function selectSearch() {
  alert(search.value.length)
  if (search.value.length > 3) {
    alert(search.value)
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
        let recipe = new Recipe(r)
        recipeSet.push(recipe)
        recipe.initClasses()
      }
      sortAllClasses()
      debugger
      displayRecipeAll()
      // DOM Elements & events listeners : click sur un bouton tag
      const search = document.getElementById("search")
      const btnSearch = document.getElementById("btnSearch")
      const navBtn = document.querySelectorAll(".tagBtnNav")
      search.addEventListener('keyup', selectSearch)
      btnSearch.addEventListener('click', selectSearch)
      navBtn.forEach((btn) => btn.addEventListener("click", selectTagMain))
    })
}

// exécution du script
loadJson()