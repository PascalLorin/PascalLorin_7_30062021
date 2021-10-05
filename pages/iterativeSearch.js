// recherche itérative dans l'intitulé, la description et les ingrédients de toutes les recettes
// retourne true si trouvé
function iterativeSearch(item, wItem) {
  let found = false
  recipeSet.forEach(w => {
    let tagToAdd = false
    if (w.upperDescription.includes(wItem) || w.upperName.includes(wItem) || w.ingredients) {
      found = true
      taggedRecipes.push(w.id)
      let wTag = tagSet[tagSet.length - 1]
      if (tagSet.length == 0) {
        tagToAdd = true
      } else {
        if (wItem.includes(wTag.upperName)) {
          if (wTag.upperName != wItem) {
            let parent = document.getElementById(wTag.name)
            parent.setAttribute('id', item)
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
    let tSearch = search.value.split(" ")
    let wSearch = toUpperName(search.value)
    let wString = wSearch.split(" ")
    let l = wString.length
    taggedRecipes = []
    for (let i = 0; i < l; i++) {
      if (tSearch[i].length > 2) {
        if (l > 1 && i < l - 1) {
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
