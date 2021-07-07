// Class recipe
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
    this.displayAble = true
  }

  // charge les arrays à partir des datas des recettes
  initClasses = function () {
    // traitement des ingrédients
    this.ingredients.forEach(item => {
      if (ingredientSet.length == 0) {
        pushIngredient(item)
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
          pushRecipe(this.appliance, applianceSet)
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
        }
      })
      if (tagToAdd) {
        pushTag(arg1, arg2)
      }
    }
  }

  // affiche une recette
  displayRecipe = function () {
    let card = document.createElement('section')
    card.setAttribute('id', this.id)
    card.setAttribute('class', "card")
    recipesCont.append(card)
    let card_high = document.createElement('div')
    card_high.setAttribute('class', "card__high")
    card.append(card_high)
    let card_low = document.createElement('div')
    card_low.setAttribute('class', "card__low")
    card.append(card_low)
    let card_low_h = document.createElement('div')
    card_low_h.setAttribute('class', "card__low-h")
    card_low.append(card_low_h)
    let card_low_hname = document.createElement('div')
    card_low_hname.setAttribute('class', "card__low-hname")
    card_low_hname.textContent = this.name
    card_low_h.append(card_low_hname)
    let card_low_htp = document.createElement('div')
    card_low_htp.setAttribute('class', "card__low-htp")
    card_low_h.append(card_low_htp)
    let card_low_htpi = document.createElement('i')
    card_low_htpi.setAttribute('class', "far fa-clock")
    card_low_htp.append(card_low_htpi)
    let card_low_htpt = document.createElement('div')
    card_low_htpt.setAttribute('class', "card__low-htpt")
    card_low_htpt.textContent = this.time
    card_low_htp.append(card_low_htpt)
    let card_low_c = document.createElement('div')
    card_low_c.setAttribute('class', "card__low-c")
    card_low.append(card_low_c)
    let card_low_cl = document.createElement('div')
    card_low_cl.setAttribute('class', "card__low-cl")
    card_low_c.append(card_low_cl)
    this.ingredients.forEach(i => {
      let card_low_cll = document.createElement('div')
      card_low_cll.setAttribute('class', "card__low-cll")
      let lib =""
      if (i.quantity) {
        lib = ": " + i.quantity
        if (i.unit) {
          lib = lib + " " + i.unit
        }
      }
      card_low_cll.textContent = i.ingredient + lib
      card_low_cl.append(card_low_cll)
    })
    let card_low_cr = document.createElement('div')
    card_low_cr.setAttribute('class', "card__low-cr")
    card_low_cr.textContent = this.description
    card_low_c.append(card_low_cr)
  }
}