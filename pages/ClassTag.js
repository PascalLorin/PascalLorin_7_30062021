// Class tag
// Contructeur
class Tag {
  constructor(arg1, arg2) {
    this.name = arg1            // nom du tag
    this.type = arg2            // catégorie du tag
    this.recipes = []           // Id des recipes qui le contiennent
    this.displayAble = false    // Tag affichable
    this.selected = false       // Tag sélectionné
  }
}

  // crée l'array des tags à partir de l'élément traité
  pushTag = function (arg1, arg2) {
    var tag = tagSet.push(arg1, arg2)
    pushRecipe(tagSet)
  }

  addTag = function (arg1, arg2) {
    if (tagSet.length == 0) {
      pushTag(arg1, arg2)
    } else {
      var tagToAdd = true
      tagSet.forEach(t => {
        if (t.name == arg1) {
          pushRecipe(tagSet)
          tagToAdd = false
        }
      })
      if (tagToAdd) {
        pushTag(arg1, arg2)
      }
    }
  }
