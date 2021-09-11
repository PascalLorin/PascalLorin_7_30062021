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
        if (t.name == this.name) {
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
    lastSearchTagName = tagName 
    tagB.append(tagName)
    let tagCont = document.createElement('div')
    tagCont.setAttribute('class', "tag_cont")
    tagB.append(tagCont)
    let tagIcon = document.createElement('span')
    tagIcon.setAttribute('class', "fa fa-close")
    tagCont.append(tagIcon)
  }
}