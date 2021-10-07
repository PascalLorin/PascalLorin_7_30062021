// initialisation de l'affichage recettes et items des catégories
function removeItems(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

function reInitPage() {
  tagSet = []
  search.value = ""
  removeItems(tagSetCont)
  setCatsDisplay(true)
  displayAllRecipes()
}

// sélectionne les recettes à afficher
// taggedRecipes est la tableau des recettes qui sont pointées par au moins un tag
// initialise displayAbleRecipes avant de la recharger
// displayableRecipes est la tableau des recettes qui sont pointées par tous les tags
function selRecipes() {
  displayAbleRecipes = []
  taggedRecipes.forEach(rT => {
    let displayAble = true
    for (let tS of tagSet) {
      if (!tS.recipes.includes(rT)) {
        displayAble = false
        break
      }
    }
    if (displayAble) {
      displayAbleRecipes.push(rT)
    }
  })
  if (displayAbleRecipes.length > 0) {
    displayAbleRecipes.sort((a, b) => a - b)
    setCatsDisplay(false)
    displayAbleRecipes.forEach(r => {
      initCatsDisplay(r)
    })
  }
}

// rend affichable les items des catégories de la recette
function initCatsDisplay(r) {
  recipeSet[r - 1].ingredients.forEach(i => {
    for (w of ingredientSet) {
      if (i.ingredient == w.name) {
        w.displayAble = true
        break
      }
    }
  })
  recipeSet[r - 1].ustensils.forEach(i => {
    for (w of ustensilSet) {
      if (i == w.name) {
        w.displayAble = true
        break
      }
    }
  })
  for (w of applianceSet) {
    if (recipeSet[r - 1].appliance == w.name) {
      w.displayAble = true
      break
    }
  }
}

// supprime les accents, la ponctuation et les espaces multiples
function toUpperName(wString) {
  let convString = replaceAccent(wString)
  let punctuationLess = convString.replace(/[.,'\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
  let finalString = punctuationLess.replace(/\s{2,}/g, " ")
  return finalString.toUpperCase()
}

// Supprime les accents
function replaceAccent(str) {
  for (let i = 0; i < accent.length; i++) {
    str = str.replace(accent[i], noaccent[i])
  }
  return str
}

// fonction de récupération des données JSON au chargement de la page
// et exécution de la page principale
function loadJson() {
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
        recipe.loadArrays()
        recipe.convUpperCase()
      }
      toUpperNameArrays()
      sortAllArrays()
      recipesCont = document.getElementById('cards-cont')
      tagSetCont = document.getElementById('tags')
      displayAllRecipes()
      // DOM Elements & events listeners
      const search = document.getElementById("search")
      const btnSearch = document.getElementById("btnSearch")
      const dispBtn = document.querySelectorAll(".catDown")
      const hideBtn = document.querySelectorAll(".catUp")
      search.addEventListener('keyup', selectSearch)
      btnSearch.addEventListener('click', selectSearch)
      dispBtn.forEach((btn) => btn.addEventListener("click", dispCat))
      hideBtn.forEach((btn) => btn.addEventListener("click", hideCat))
    })
}

// exécution du script
loadJson()