// Class recipe
class Recipe {
  constructor(arg) {
    this.id = arg.id
    this.name = arg.name + " "
    this.servings = arg.servings
    this.ingredients = arg.ingredients
    this.time = arg.time
    this.description = arg.description + " "
    this.appliance = arg.appliance
    this.ustensils = arg.ustensils
    this.upperName
    this.upperDescription
    this.upperIngredients = []
  }

  // Transforme la description en majuscules sans accents
  convUpperCase = function () {
    this.upperName = toUpperName(this.name) + " "
    this.upperDescription = toUpperName(this.description) + " "
    for (let i = 0; i < this.ingredients.length; i++) {
      this.upperIngredients[i] = toUpperName(this.ingredients[i].ingredient) + " "
    }
  }

  // charge les arrays à partir des datas de la recette
  loadArrays = function () {
    let addItem = true
    let newItem
    // traitement des ingrédients
    this.ingredients.forEach(item => {
      addItem = true
      for (let i = 0; i < ingredientSet.length; i++) {
        if (item.ingredient == ingredientSet[i].name) {
          ingredientSet[i].recipes.push(this.id)
          addItem = false
          break
        }
      }
      if (addItem) {
        newItem = new Ingredient(item.ingredient, this.id)
        ingredientSet.push(newItem)
      }
    })
    // traitement de l'appareil
    addItem = true
    for (let i = 0; i < applianceSet.length; i++) {
      if (this.appliance == applianceSet[i].name) {
        applianceSet[i].recipes.push(this.id)
        addItem = false
        break
      }
    }
    if (addItem) {
      newItem = new Appliance(this.appliance, this.id)
      applianceSet.push(newItem)
    }
    // traitement des ustensiles
    this.ustensils.forEach(item => {
      addItem = true
      for (let i = 0; i < ustensilSet.length; i++) {
        if (item == ustensilSet[i].name) {
          ustensilSet[i].recipes.push(this.id)
          addItem = false
          break
        }
      }
      if (addItem) {
        newItem = new Ustensil(item, this.id)
        ustensilSet.push(newItem)
      }
    })
  }

  // affiche une recette
  displayRecipe = function () {
    let card = document.createElement('article')
    card.setAttribute('id', this.id)
    card.setAttribute('class', "card")
    recipesCont.append(card)
    let card_high = document.createElement('div')
    card_high.setAttribute('class', "card__high")
    card_high.textContent = this.id
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
    let card_low_cl = document.createElement('p')
    card_low_cl.setAttribute('class', "card__low-cl")
    card_low_c.append(card_low_cl)
    this.ingredients.forEach(i => {
      let card_low_cll = document.createElement('div')
      card_low_cll.setAttribute('class', "card__low-cll")
      let lib = ""
      if (i.quantity) {
        lib = ": " + i.quantity
        if (i.unit) {
          lib = lib + " " + i.unit
        }
      }
      card_low_cll.textContent = i.ingredient + lib
      card_low_cl.append(card_low_cll)
    })
    let card_low_cr = document.createElement('p')
    card_low_cr.setAttribute('class', "card__low-cr")
    card_low_cr.textContent = this.description
    card_low_c.append(card_low_cr)
  }
}

// Lance la recherche des recettes affichables 
// puis les affiche ou msg d'erreur
function displayRecipes() {
  if (foundRecipes.length > 0) {
    selRecipes()
  }
  if (displayAbleRecipes.length > 0) {
    displaySelRecipes()
  } else {
    alert("Aucune recette ne correspond à ces critères de recherche")
  }
}

// affichage de la page principale avec toutes les recettes au lancement
function displayAllRecipes() {
  removeItems(recipesCont)
  recipeSet.forEach(r => {
    r.displayRecipe()
  })
}

// affichage de la page principale avec les recettes sélectionnées
function displaySelRecipes() {
  removeItems(recipesCont)
  displayAbleRecipes.forEach(r => {
    r.displayRecipe()
  })
}

// sélectionne les recettes à afficher
// foundRecipes est la tableau des recettes qui sont pointées par au moins un tag
// displayableRecipes est la tableau des recettes qui sont pointées par tous les tags
// initialise displayAbleRecipes avant de la recharger
function selRecipes() {
  displayAbleRecipes = []
  foundRecipes.forEach(rT => {
    console.log(rT)
    let displayAble = true
    for (let tS of tagSet) {
      console.log(tS)
      console.log(tS.recipes)
      console.log(tS.recipes.includes(rT.id))
      if (!tS.recipes.includes(rT.id)) {
        displayAble = false
        break
      }
    }
    if (displayAble) {
      displayAbleRecipes.push(rT)
    }
  })
  if (displayAbleRecipes) {
    let wArray = displayAbleRecipes
    displayAbleRecipes = [...new Set(wArray)]
    setCatsDisplay(false)
    displayAbleRecipes.forEach(r => {
      initCatsDisplay(r)
    })
  }
}

// permet de n'afficher que les tags des recettes sélectionnées
function initCatsDisplay(r) {
  r.ingredients.forEach(i => {
    for (w of ingredientSet) {
      if (i.ingredient == w.name) {
        w.displayAble = true
        break
      }
    }
  })
  r.ustensils.forEach(i => {
    for (w of ustensilSet) {
      if (i == w.name) {
        w.displayAble = true
        break
      }
    }
  })
  for (w of applianceSet) {
    if (r.appliance == w.name) {
      w.displayAble = true
      break
    }
  }
}