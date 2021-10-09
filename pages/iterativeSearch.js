//  traitement du champs de recherche
//  recherche en majuscules ce qui a été saisi
//  puis afficher les recettes qui correspondent ou msg erreur
function selectSearch(event) {
  switch (event.key) {
    case "Escape":
      reInitPage()
      return
  }
  if (search.value.length > 2) {
    taggedRecipes = []
    let wSearch = toUpperName(search.value)
    let tSearch = search.value.split(" ")
    let wString = wSearch.split(" ")
    let l = wString.length
    for (let i = 0; i < l; i++) {
      if (tSearch[i].length > 2) {
        if (l > 1 && i < l - 1) {
          tSearch[i] += " "
          wString[i] += " "
        }
        if (i == l - 1 && tSearch[i].length > 2) {
          if (event.key == 'Space' || event.key == "click") {
            tSearch[i] += " "
            wString[i] += " "
          }
          if (iterativeSearch(tSearch[i], wString[i])) {
            let wArray = taggedRecipes
            taggedRecipes = [...new Set([].concat(wArray))]
            selRecipes()
            displaySelRecipes()
          } else {
            alert("Aucune recette ne correspond à ces critères de recherche")
          }
        }
      }
    }
  }
}

// recherche itérative dans l'intitulé, la description et les ingrédients de toutes les recettes
// retourne true si trouvé
function iterativeSearch(item, wItem) {
  let recipeFounded = false
  recipeSet.forEach(w => {
    let recipeMatch = false
    if (w.upperDescription.includes(wItem) || w.upperName.includes(wItem)) {
      recipeMatch = true
    }
    w.upperIngredients.forEach(ingr => {
      if (ingr.includes(wItem)) {
        recipeMatch = true
      }
    })
    if (recipeMatch) {
      recipeFounded = true
      tagToAdd = false
      taggedRecipes.push(w.id)
      if (tagSet.length == 0) {
        tagToAdd = true
      } else {
//        if (tagSet[tagSet.length - 1].cat == "0") {
          if (wItem.includes(tagSet[tagSet.length - 1].upperName)) {
            if (tagSet[tagSet.length - 1].upperName != wItem) {
              let parent = document.getElementById(tagSet[tagSet.length - 1].name)
              parent.setAttribute('id', item)
              lastSearchTagName.textContent = item
              tagSet[tagSet.length - 1].name = item
              tagSet[tagSet.length - 1].upperName = wItem
              tagSet[tagSet.length - 1].recipes = []
            }
          } else {
            tagToAdd = true
          }
//        }
      }
      if (tagToAdd) {
        createTag(item, w.id, wItem, "0")
      } else {
        if (!tagSet[tagSet.length - 1].recipes.includes(w.id)) {
          tagSet[tagSet.length - 1].recipes.push(w.id)
        }
      }
    }
  })
  return recipeFounded
}
