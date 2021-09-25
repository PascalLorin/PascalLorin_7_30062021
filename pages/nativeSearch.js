// search input value in all the recipes's name & description and ingredientSet
// return true if found
function nativeSearch(item, wItem) {
  foundRecipes = recipeSet.filter(r => findTag(r, item, wItem))
  if (foundRecipes.length) {
    foundRecipes.forEach(w => {
      let wTag = tagSet[tagSet.length - 1]
      tagToAdd = false
      if (tagSet.length == 0) {
        tagToAdd = true
      } else {
        if (wItem.includes(wTag.upperName)) {
          if (wTag.upperName != wItem) {
            element = document.getElementById(wTag.upperName)
            element.setAttribute('id', wItem)
//            lastSearchTagName.textContent = item
            let div = element.firstChild
            div.textContent = item
            tagSet[tagSet.length - 1].name = item
            tagSet[tagSet.length - 1].upperName = wItem
            tagSet[tagSet.length - 1].recipes = []
          }
        } else {
          tagToAdd = true
        }
      }
      if (tagToAdd) {
        createTag(item, w.id, wItem, "0")
      } else {
        let recipeToAdd = true
        for (let i = 0; i < wTag.recipes.length - 1; i++) {
          if (wTag.recipes[i] == w.id) {
            recipeToAdd = false
            break
          }
        }
        if (recipeToAdd) {
          tagSet[tagSet.length - 1].recipes.push(w.id)
        }
      }
    })
  }
  // recherche itérative du tag saisi dans l'array des ingrédients
  ingredientSet.forEach(ingr => {
    if (ingr.upperName.includes(wItem)) {
      ingr.recipes.forEach(r => {
        foundRecipes.push(recipeSet[r - 1])
      })
    }
  })
  if (foundRecipes.length) {
    let wArray = foundRecipes
    foundRecipes = [...new Set(wArray)]
  }
  return foundRecipes
}

function findTag(r, item, wItem) {
  let found = false
  if (r.upperDescription.includes(wItem) || r.upperName.includes(wItem)) {
    found = true
  }
  r.upperIngredients.forEach(i => {
    if (i.includes(wItem)) {
      found = true
    }
  })
  return found
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
  }
  if (search.value.length > 2) {
    foundRecipes = []
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
/*
        if (tagSet.length > 0) {
          for (let t = 0; t < tagSet.length - 1; t++) {
            if (tagSet[t].upperName.includes(wString[i])) {
              alert("Ce critère est déjà sélectionné")
              deleteTag(tagSet[t].name, false)
              return false
            }
          }
        }
*/
        let foundRecipes = nativeSearch(tSearch[i], wString[i])
        displayRecipes()
      }
    }
  }
}


function displayRecipes() {
  if (foundRecipes) {
    selRecipes()
    displaySelRecipes()
  }
  if (displayAbleRecipes.length == 0) {
    alert("Aucune recette ne correspond à ces critères de recherche")
  }
}