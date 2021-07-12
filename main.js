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
  effaceCards()
  recipeSet.forEach(r => {
    r.displayRecipe()
  })
}

// affichage de la page principale avec les recettes sélectionnées
function displayRecipeSel() {
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
  let tagSuppr = false
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
  if (search.value.length > 2) {
    alert(search.value)
  }
}


function selectItem(event) {
  let itemSelected = event.currentTarget.id
  let itemClass = event.currentTarget.className[11]
  treatCat(itemClass, itemSelected)
  displayRecipeSel()
}

// fonction de récupération des données JSON au chargement de la page
// et exécution de la page principale
function loadJson() {
  let element;
  element = document.getElementById('cat1ItemD')
  element.style.display = "none"
  element = document.getElementById('cat2ItemD')
  element.style.display = "none"
  element = document.getElementById('cat3ItemD')
  element.style.display = "none"
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
      recipesCont = document.getElementById('cards-cont')
      displayRecipeAll()

      // DOM Elements & events listeners
      const search = document.getElementById("search")
      const btnSearch = document.getElementById("btnSearch")
      const dispBtn = document.querySelectorAll(".catDown")
      const hideBtn = document.querySelectorAll(".catUp")
      const navBtn = document.querySelectorAll(".tagBtnNav")
      search.addEventListener('keyup', selectSearch)
      btnSearch.addEventListener('click', selectSearch)
      dispBtn.forEach((btn) => btn.addEventListener("click", dispCat))
      hideBtn.forEach((btn) => btn.addEventListener("click", hideCat))
      navBtn.forEach((btn) => btn.addEventListener("click", selectTagMain))
    })
}

// exécution du script
loadJson()