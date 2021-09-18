// initialisation de l'affichage recettes et items des catégories
function removeItems(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function reInitPage() {
  tagSet = []
  search.value = ""
  removeItems(tagSetCont)
  setCatsDisplay(true)
  displayAllRecipes()
}

//  traitement du champs de recherche
//  rechercher en majuscules ce qui est saisi.
//  puis afficher les recettes qui correspondent.
function selectSearch(event) {
  hideCats()
  switch (event.key) {
    case "Escape":
      reInitPage()
      return
    case "Backspace":
      treatLastTag0()
      treatTags()
      break
  }
  if (search.value.length > 2) {
    let tSearch = search.value.split(" ")
    let wSearch = toUpperName(search.value)
    let wString = wSearch.split(" ")
    let l = wString.length
    for (let i = 0; i < l; i++) {
      if (tSearch[i].length > 2) {
        if (l > 1 && i < l - 1) {
          tSearch[i] += " "
          wString[i] += " "
        }
        taggedRecipes = []
        if (iterativeSearch(tSearch[i], wString[i])) {
          selRecipes()
          displaySelRecipes()
        }
        if (displayAbleRecipes.length == 0) {
          alert("Aucune recette ne correspond à ces critères de recherche")
        }
      }
    }
  }
}

// sélectionne les recettes à afficher
// taggedRecipes est la tableau des recettes qui sont pointées par au moins un tag
function selRecipes() {
  // supprime les doublons dans taggedRecipes
  if (taggedRecipes.length > 2) {
    let wArray1 = taggedRecipes.slice(0, 1)
    let wArray2 = taggedRecipes.slice(1)
    taggedRecipes = [...new Set(wArray1.concat(wArray2))]
  }
  // initialise displayAbleRecipes avant de la recharger
  // displayableRecipes est la tableau des recettes qui sont pointées par tous les tags
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

// modifier pour cat "0" ???
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