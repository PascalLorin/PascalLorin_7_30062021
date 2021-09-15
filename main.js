// initialisation de l'affichage recettes et items des catégories
function removeItems(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// supprime les cards affichées (s'il y en a...)
function effaceCards() {
  element = document.getElementById('cards-cont')
  if (element) {
    removeItems(element)
  }
}

// clic sur un tag : annulation de la sélection
// réaffiche les recettes en fonction du nouvel état des tags
function removeTag(event) {
  let sTag = event.currentTarget.id
  hideCat1()
  hideCat2()
  hideCat3()
  let i = 0
  for (let t of tagSet) {
    if (sTag == t.name) {
      debugger
      element = document.getElementById(sTag)
      tagSetCont.removeChild(element)
      tagSet.splice(i, 1)
      if (tagSet.length == 0) {
        setCatsDisplay(true)
        displayAllRecipes()
      } else {
        treatTags()
        displaySelRecipes()
      }
    } else {
      i++
    }
  }
}

function treatTags() {
  taggedRecipes = []
  tagSet.forEach(t => {
    t.recipes.forEach(r => {
      taggedRecipes.push(r)
    })
  })
  selRecipes()
  displaySelRecipes()
}

// traitement des listes déroulantes
function selectItem(event) {
  // className contient la catégorie [11] et l'index de l'item [13.."]
  let itemSelected = event.currentTarget.id
  let itemClass = event.currentTarget.className
  treatCat(itemSelected, itemClass)
  selRecipes()
  displaySelRecipes()
  switch (itemClass[11]) {
    case "1":
      hideCat1()
      break
    case "2":
      hideCat2()
      break
    case "3":
      hideCat3()
      break
  }
}

//  traitement du champs de recherche
//  rechercher en majuscules ce qui est saisi.
//  puis afficher les recettes qui correspondent.
function selectSearch() {
  hideCat1()
  hideCat2()
  hideCat3()
  taggedRecipes = []
  if (search.value.length > 2) {
    let wSearch = toUpperName(search.value)
    let tSearch = search.value.split(" ")
    let wString = wSearch.split(" ")
    for (let i = 0; i < wString.length; i++) {
      if (tSearch[i].length > 2) {
        if (wSearch[wSearch.length - 1] == " " || wString.length > 1) {
          tSearch[i] += " "
          wString[i] += " "
        }
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

function setCatsDisplay(state) {
  ingredientSet.forEach(i => {
    i.displayAble = state
  })
  ustensilSet.forEach(i => {
    i.displayAble = state
  })
  applianceSet.forEach(i => {
    i.displayAble = state
  })
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

// génère les noms en majuscule de chaque Array
function toUpperNameArrays() {
  ingredientSet.forEach(item => {
    item.upperName = toUpperName(item.name)
  })
  ustensilSet.forEach(item => {
    item.upperName = toUpperName(item.name)
  })
  applianceSet.forEach(item => {
    item.upperName = toUpperName(item.name)
  })
}

// supprime les accents, la ponctuation et les espaces multiples
function toUpperName(wString) {
  let convString = replaceAccent(wString)
  let punctuationLess = convString.replace(/[.,'\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
  let finalString = punctuationLess.replace(/\s{2,}/g, " ");
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