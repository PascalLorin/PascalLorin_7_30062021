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

// affichage de la page principale avec toutes les recettes au lancement
function displayAllRecipes() {
  effaceCards()
  recipeSet.forEach(r => {
    r.displayRecipe()
  })
}

// affichage de la page principale avec les recettes sélectionnées
function displaySelRecipes() {
  effaceCards()
  recipeSet.forEach(r => {
    for (let i of displayAbleRecipes) {
      if (i == r.id) {
        r.displayRecipe()
        break
      }
    }
  })
}

// traitement des listes déroulantes
function selectItem(event) {
  // className contient la catégorie [11] et l'index de l'item [13.."]
  let itemSelected = event.currentTarget.id
  let itemClass = event.currentTarget.className
  treatCat(itemSelected, itemClass)
  selRecipes()
}

// clic sur un tag : annulation de la sélection
// réaffiche les recettes en fonction du nouvel état des tags
function removeTag(event) {
  debugger
  let sTag = event.currentTarget.id
  let i = 0
  for (let t of tagSet) {
    if (sTag == t.name) {
      switch (t.cat) {
        case "0":
          tagN = treatCat1(order)
          break;
        case "1":
          tagN = treatCat1(order)
          break;
        case "2":
          tagN = treatCat2(order)
          break;
        case "3":
          tagN = treatCat3(order)
          break;
      }
    }
    tagSetCont.removeChild(i)
    wTagSet = tagSet
    tagSet = wTagSet.splice(i, 1)
    if (tagSet.length == 0) {
      displayAllRecipes()
    } else {
      treatTags()
      displaySelRecipes()
    }
    break
  }
}

function treatTags() {
  tagSet.forEach(t => {
    t.recipes.forEach(r => {
      taggedRecipes.push(r)
    })
  })
}

function selectSearch() {
  //  Rechercher en majuscules ce qui est saisi.
  //  Afficher les recettes qui correspondent.
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
        }
        if (displayAbleRecipes.length == 0) {
          alert("Aucune recette ne correspond à ces critères de recherche")
        }
      }
    }
  }
}

function selRecipes() {
  // supprime les doublons dans taggedRecipes et
  if (taggedRecipes.length > 2) {
    let wArray1 = taggedRecipes.slice(0, 1)
    let wArray2 = taggedRecipes.slice(1)
    taggedRecipes = [...new Set(wArray1.concat(wArray2))]
  }
  // initialise displayAbleRecipes avant de la recharger
  displayAbleRecipes = []
  debugger
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
    removeCatsDisplay()
    displayAbleRecipes.forEach(r => {
      initCatsDisplay(r)
    })
  }
  displaySelRecipes()
}

function removeCatsDisplay() {
  ingredientSet.forEach(i => {
    i.displayAble = false
  })
  ustensilSet.forEach(i => {
    i.displayAble = false
  })
  applianceSet.forEach(i => {
    i.displayAble = false
  })
}

// modifier pour cat "0"
function initCatsDisplay(r) {
  recipeSet[r - 1].ingredients.forEach(i => {
    for (w of ingredientSet) {
      if (i == w.name) {
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
        recipe.initClasses()
        recipe.convUpperCase()
      }
      toUpperNameClasses()
      sortAllClasses()
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