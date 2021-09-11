var classes;
// display cat clicked
function dispCat(event) {
  let cat = event.currentTarget.id
  switch (cat) {
    case "cat1Down":
      dispCat1()
      break;
    case "cat2Down":
      dispCat2()
      break;
    case "cat3Down":
      dispCat3()
      break;
  }
  const itemSel = document.querySelectorAll(".itemS")
  itemSel.forEach((btn) => btn.addEventListener("click", selectItem))
}

// hide cat clicked
function hideCat(event) {
  let cat = event.currentTarget.id
  switch (cat) {
    case "cat1Up":
      hideCat1()
      break;
    case "cat2Up":
      hideCat2()
      break;
    case "cat3Up":
      hideCat3()
      break;
  }
}

// ingredients list display 
function dispCat1() {
  hideCat2()
  hideCat3()
  element = document.getElementById('cat1ItemM')
  element.style.display = "none"
  element = document.getElementById('cat1ItemD')
  element.style.display = "flex"
  element = document.getElementById('cat1ItemC')
  // display all ingredients
  let i = 0
  ingredientSet.forEach(ingredient => {
    classes = "itemS itemC1 " + i.toString()
    item = document.createElement('div')
    item.textContent = ingredient.name
    item.setAttribute('id', ingredient.name)
    item.setAttribute('class', classes)
    item.setAttribute('aria-label', 3)
    if (!ingredient.displayAble) {
      item.style.display = "none"
    }
    element.append(item)
    i++
  })
}

// appliances list display
function dispCat2() {
  hideCat1()
  hideCat3()
  element = document.getElementById('cat2ItemM')
  element.style.display = "none"
  element = document.getElementById('cat2ItemD')
  element.style.display = "flex"
  element = document.getElementById('cat2ItemC')
  // display all appliances
  let i = 0
  applianceSet.forEach(appliance => {
    classes = "itemS itemC2 " + i.toString()
    item = document.createElement('div')
    item.textContent = appliance.name
    item.setAttribute('id', appliance.name)
    item.setAttribute('class', classes)
    item.setAttribute('aria-label', 3)
    if (!appliance.displayAble) {
      item.style.display = "none"
    }
    element.append(item)
    i++
  })
}

// ustensils list display
function dispCat3() {
  hideCat1()
  hideCat2()
  element = document.getElementById('cat3ItemM')
  element.style.display = "none"
  element = document.getElementById('cat3ItemD')
  element.style.display = "flex"
  element = document.getElementById('cat3ItemC')
  // display all ustensils
  let i = 0
  ustensilSet.forEach(ustensil => {
    classes = "itemS itemC3 " + i.toString()
    item = document.createElement('div')
    item.textContent = ustensil.name
    item.setAttribute('id', ustensil.name)
    item.setAttribute('class', classes)
    item.setAttribute('aria-label', 3)
    if (!ustensil.displayAble) {
      item.style.display = "none"
    }
      element.append(item)
    i++
  })
}

function hideCat1() {
  element = document.getElementById('cat1ItemC')
  if (element) {
    removeItems(element)
  }
  element = document.getElementById('cat1ItemD')
  element.style.display = "none"
  element = document.getElementById('cat1ItemM')
  element.style.display = "flex"
}

function hideCat2() {
  element = document.getElementById('cat2ItemC');
  if (element) {
    removeItems(element)
  }
  element = document.getElementById('cat2ItemD')
  element.style.display = "none"
  element = document.getElementById('cat2ItemM')
  element.style.display = "flex"
  return
}

function hideCat3() {
  element = document.getElementById('cat3ItemC');
  if (element) {
    removeItems(element)
  }
  element = document.getElementById('cat3ItemD')
  element.style.display = "none"
  element = document.getElementById('cat3ItemM')
  element.style.display = "flex"
}

function treatCat(itemSelected, itemClass) {
  let cat = itemClass[11]
  let order = parseInt(itemClass.substring(13))
  let tag;
  switch (cat) {
    case "1":
      tagN = treatCat1(order)
      break;
    case "2":
      tagN = treatCat2(order)
      break;
    case "3":
      tagN = treatCat3(order)
      break;
  }
  newTag = new Tag(tagN, cat)
  newTag.addTag()
}

function treatCat1(order) {
  ingredientSet[order].recipes.forEach(r => {
    taggedRecipes.push(r)
  })
  return ingredientSet[order]
}

function treatCat2(order) {
  applianceSet[order].recipes.forEach(r => {
    taggedRecipes.push(r)
  })
  return applianceSet[order]
}

function treatCat3(order) {
  ustensilSet[order].recipes.forEach(r => {
    taggedRecipes.push(r)
  })
  return ustensilSet[order]
}