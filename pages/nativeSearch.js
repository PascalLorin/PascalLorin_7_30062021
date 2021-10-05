var wSearch
var tSearch
var wString
var l

//  traitement du champs de recherche
//  rechercher en majuscules ce qui est saisi.
//  puis afficher les recettes qui correspondent.
function selectSearch(event) {
  if (search.value.length > 2) {
    foundRecipes = []
    wSearch = toUpperName(search.value)
    tSearch = search.value.split(" ")
    wString = wSearch.split(" ")
    l = wString.length
    for (let i = 0; i < l; i++) {
      console.log(tSearch[i])
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
        }
        if (tSearch[i].length > 2) {
          let sArray = foundRecipes
          let wArray1 = nativeSearch(tSearch[i], wString[i])
          let wArray2 = foundRecipes
          foundRecipes = [...new Set((wArray1).concat(wArray2))]
          if (wArray1.length > 0 && foundRecipes != sArray) {
            if (i == l - 1) {
              genTag(wArray1,tSearch[i], wString[i], i)
            }
            displayRecipes()
          } else {
            alert("Aucune recette ne correspond à ce critère de recherche")
          }
        }
      }
    }
  }
}

// Crée l'array des recipes incluant le mot saisi
function nativeSearch(item, wItem) {
  return recipeSet.filter(r => findTag(r, item, wItem))
}

// search input value in all the recipes's name & description and ingredientSet
// return true if found
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

genTag = function (wArray1,item, wItem, i) {
  wArray1.forEach(r => {
    let wTag = tagSet[tagSet.length - 1]
    tagToAdd = false
    if (tagSet.length == 0) {
      tagToAdd = true
    } else {
      let str = wTag.upperName.substring(0, wItem.length - 1)
      if (i == l - 1 && !wItem.includes(str)) {
        tagToAdd = true
      } else {
        if (wItem.includes(wTag.upperName)) {
          if (wItem != wTag.upperName) {
            element = document.getElementById(wTag.upperName)
            element.setAttribute('id', wItem)
            let div = element.firstChild
            div.textContent = item
            tagSet[tagSet.length - 1].name = item
            tagSet[tagSet.length - 1].upperName = wItem
            tagSet[tagSet.length - 1].recipes = []
          }
        }
      }
    }
    if (tagToAdd) {
      createTag(item, r.id, wItem, "0")
    } else {
      let recipeToAdd = true
      for (let i = 0; i < wTag.recipes.length - 1; i++) {
        if (wTag.recipes[i] == r.id) {
          recipeToAdd = false
          break
        }
      }
      if (recipeToAdd) {
        tagSet[tagSet.length - 1].recipes.push(r.id)
      }
    }
  })
}