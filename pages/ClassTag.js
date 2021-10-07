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
    if (tagSet.length == 0) {
      this.pushTag()
    } else {
      var tagToAdd = true
      tagSet.forEach(t => {
        if (t.upperName.includes(this.upperName)) {
          tagToAdd = false
        }
      })
      if (tagToAdd) {
        this.pushTag()
      }
    }
  }

  // crée l'array des tags à partir de l'élément traité
  // ajoute eventListener(s) pour supprimer le(s) tag(s)
  pushTag = function () {
    tagSet.push(this)
    this.displayTag()
    const tagBtn = document.querySelectorAll(".tag")
    tagBtn.forEach((btn) => btn.addEventListener("click", removeTag))
  }

  // Affiche le tag nouvellement créé
  displayTag = function () {
    let tagB = document.createElement('button')
    tagB.setAttribute('id', this.name)
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
  deleteTag(sTag, false)
}

// suppression du tag
// réaffiche les recettes en fonction du nouvel état des tags
function deleteTag(sTag, back) {
  hideCats()
  let i = 0
  for (let t of tagSet) {
    if (sTag == t.name) {
      if (t.cat == "0") {
        if (back) {
          wStr = search.value.replace(sTag.substring(0, sTag.length - 1), "")
        } else {
          wStr = search.value.replace(sTag, "")
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
  taggedRecipes = []
  tagSet.forEach(t => {
    t.recipes.forEach(r => {
      taggedRecipes.push(r)
    })
  })
  selRecipes()
}

function treatLastTag0() {
  let wLng = lastSearchTagName.textContent.length
  for (let i = tagSet.length - 1; i > -1; i--) {
    if (tagSet[i].cat == "0") {
      if (wLng > 3) {
        let wStr = lastSearchTagName.textContent.substring(0, wLng - 1)
        let parent = document.getElementById(lastSearchTagName.textContent)
        parent.setAttribute('id', wStr)
        lastSearchTagName.textContent = wStr
        tagSet[i].name = wStr
        tagSet[i].upperName = tagSet[i].upperName.substring(0, wLng - 1)
        return
      } else {
        deleteTag(lastSearchTagName.textContent,true)
        return
      }
    }
  }
}