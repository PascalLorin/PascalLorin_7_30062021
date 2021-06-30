// Class recipe
// Contructeur
class Recipe {
  constructor(arg) {
    this.id = arg.id
    this.name = arg.name
    this.servings = arg.servings
    this.ingredients = arg.ingredients
    this.time = arg.time
    this.description = arg.description
    this.appliance = arg.appliance
    this.ustensils = arg.ustensils
    this.displayAble = false
  }

  // charge les arrays à partir des datas des recettes
  initClasses = function () {

    // traitement des ingrédients
    this.ingredients.forEach(item => {
      if (ingredientSet.length == 0) {
        pushIngrediant(item)
        pushRecipe(ingredientSet)
      } else {
        for (ingredient of ingredientSet) {
          if (item == ingredient.name) {
            pushRecipe(ingredientSet)
            break
          }
        }
      }
    })

    // traitement des ustensiles
    this.ustensils.forEach(item => {
      if (ustensilSet.length == 0) {
        pushUstensil(item)
        pushRecipe(ustensilSet)
      } else {
        for (ustensil of ustensilSet) {
          if (item == ustensil.name) {
            pushRecipe(ustensilSet)
            break
          }
        }
      }
    })

    // traitement de l'appareil
    if (applianceSet.length == 0) {
      pushAppliance(this.appliance)
      pushRecipe(this.appliance, applianceSet)
    } else {
      for (appliance of applianceSet) {
        if (this.appliance == appliance.name) {
          pushRecipe(applianceSet)
          break
        }
      }
    }
  }

  // ajoute l'ingrédient à l'array ingredientSet
  pushIngredient = function (item) {
    var ingredient = new Ingredient(item)
    addTag(item, 1)
  }

  // ajoute l'ustensile à l'array ustensilSet
  pushUstensil = function (item) {
    var ustensil = new Ustensil(item)
    addTag(item, 2)
  }

  // ajoute l'appareil à l'array applianceSet
  pushAppliance = function (item) {
    var appliance = new Appliance(item)
    addTag(item, 3)
  }

  // ajoute le N° de la recette à l'array passée en paramètre
  pushRecipe = function (array) {
    array.recipes.push(this.id)
  }

  // crée l'array des tags à partir de l'élément traité
  pushTag = function (arg1, arg2) {
    var tag = tagSet.push(arg1, arg2)
    pushRecipe(tagset)
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
          break
        }
      })
      if (tagToAdd) {
        pushTag(arg1, arg2)
      }
    }
  }

  // affiche une recette
  displayRecipe = function {
    var rcard = document.createElement('article')

  }
}