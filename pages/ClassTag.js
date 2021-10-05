// Class tag
// Contructeur
class Tag {
  constructor(item, cat) {
    this.name = item.name       // nom du tag
    this.recipes = item.recipes // Id des recipes qui le contiennent
    this.cat = cat              // catégorie du tag
    this.upperName = item.upperName
  }

  // recherche si le tag existe déjà
  addTag = function () {
    var tagToAdd = true
    if (tagSet.length == 0) {
      this.pushTag()
    } else {
      tagSet.forEach(t => {
        if (t.upperName == this.upperName) {
          tagToAdd = false
        }
      })
      if (tagToAdd) {
        this.pushTag()
      }
    }
  }

  // crée l'array des tags à partir de l'élément traité
  // ajoute eventListener(s) pour pouvoir supprimer le(s) tag(s)
  pushTag = function () {
    tagSet.push(this)
    this.displayTag()
    const tagBtn = document.querySelectorAll(".tag")
    tagBtn.forEach((btn) => btn.addEventListener("click", removeTag))
  }

  // Affiche le tag nouvellement créé
  displayTag = function () {
    let tagB = document.createElement('button')
    tagB.setAttribute('id', this.upperName)
    tagB.setAttribute('class', "tag tag" + this.cat)
    tagSetCont.append(tagB)
    let tagName = document.createElement('div')
    tagName.textContent = this.name
    tagName.setAttribute('class', "tag_name")
    if (this.cat == "0") {
      lastSearchTagName = tagName
    }
    tagB.append(tagName)
    let tagCont = document.createElement('div')
    tagCont.setAttribute('class', "tag_cont")
    tagB.append(tagCont)
    let tagIcon = document.createElement('span')
    tagIcon.setAttribute('class', "fa fa-close")
    tagCont.append(tagIcon)
  }
}

// création d'un nouveau tag
function createTag(item, recipe, wItem, cat) {
  let newItem = {
    name: item,
    recipes: [recipe],
    upperName: wItem
  }
  let newTag = new Tag(newItem, cat)
  newTag.addTag()
}

// clic sur un tag : annulation de la sélection
function removeTag(event) {
  let sTag = event.currentTarget.id
  element = event.currentTarget
  deleteTag(sTag, false)
}

// suppression du tag
// réaffiche les recettes en fonction du nouvel état des tags
function deleteTag(sTag, back) {
  hideCats()
  let i = 0
  for (let t of tagSet) {
    if (sTag == t.upperName) {
      if (t.cat == "0") {
        if (back) {
          wStr = search.value.splice(search.value.length - 1, "")
        } else {
          wStr = search.value.replace(t.name, "")
        }
        search.value = wStr.replace(/\s{2,}/g, " ")
      }
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
  foundRecipes = []
  tagSet.forEach(t => {
    t.recipes.forEach(r => {
      foundRecipes.push(recipeSet[r - 1])
    })
  })
  selRecipes()
}
/*
function treatLastTag0() {
  let wLng = lastSearchTagName.textContent.length
  let wStr = lastSearchTagName.textContent.slice(0,lastSearchTagName.textContent.length -1)
  let uStr = wStr.toUpperCase()
  for (let i = tagSet.length - 1; i > -1; i--) {
    if (tagSet[i].cat == "0") {
      if (wLng > 3) {
        element = document.getElementById(lastSearchTagName.textContent.toUpperCase())
        let div = element.firstChild
        element.setAttribute('id',uStr)
        div.textContent = wStr
        tagSet[i].name = wStr
        tagSet[i].upperName = uStr
        return
      } else {
        deleteTag(lastSearchTagName.textContent, true)
      }
    }
  }
}
*/