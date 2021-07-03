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
