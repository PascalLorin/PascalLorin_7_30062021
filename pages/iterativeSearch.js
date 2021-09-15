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
            lastSearchTagName.textContent = item
            tagSet[tagSet.length - 1].name = item
            tagSet[tagSet.length - 1].upperName = wItem
          }
        } else {
          tagToAdd = true
          debugger // traitement de backspace
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
  debugger
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

function createTag(item, recipe, wItem, cat) {
  let newItem = {
    name: item,
    recipes: [recipe],
    upperName: wItem
  }
  let newTag = new Tag(newItem, cat)
  newTag.addTag()
}