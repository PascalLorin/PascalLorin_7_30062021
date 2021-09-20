// search input value in all the recipes's name & description and ingredientSet
// return true if found
function iterativeSearch(item, wItem) {
  let found = false
  recipeSet.forEach(w => {
    let tagToAdd = false
    if (w.upperDescription.includes(wItem) || w.upperName.includes(wItem)) {
      found = true
      taggedRecipes.push(w.id)
      let wTag = tagSet[tagSet.length - 1]
      if (tagSet.length == 0) {
        tagToAdd = true
      } else {
        if (wItem.includes(wTag.upperName)) {
          if (wTag.upperName != wItem) {
            let parent = document.getElementById(wTag.name)
            parent.setAttribute('id',item)
            lastSearchTagName.textContent = item
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
    }
  })
  // recherche itérative du tag saisi dans l'array des ingrédients
  ingredientSet.forEach(ingr => {
    if (ingr.upperName.includes(wItem)) {
      found = true
      ingr.recipes.forEach(r => {
        taggedRecipes.push(r)
      })
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
