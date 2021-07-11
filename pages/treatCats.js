var element;

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
  ingredientSet.forEach(ingredient => {
    item = document.createElement('div')
    item.textContent = ingredient.name
    item.setAttribute('id',ingredient.name)
    item.setAttribute('class',"itemS itemC1")
    item.setAttribute('aria-label',3)
    element.append(item)
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
  applianceSet.forEach(appliance => {
    item = document.createElement('div')
    item.textContent = appliance.name
    item.setAttribute('id',appliance.name)
    item.setAttribute('class',"itemS itemC2")
    item.setAttribute('aria-label',3)
    element.append(item)
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
  ustensilSet.forEach(ustensil => {
    item = document.createElement('div')
    item.textContent = ustensil.name
    item.setAttribute('id',ustensil.name)
    item.setAttribute('class',"itemS itemC3")
    item.setAttribute('aria-label',3)
    element.append(item)
  })
}

function hideCat1() {
  element = document.getElementById('cat1ItemD')
  element.style.display = "none"
  element = document.getElementById('cat1ItemM')
  element.style.display = "flex"
}

function hideCat2() {
  element = document.getElementById('cat2ItemD')
  element.style.display = "none"
  element = document.getElementById('cat2ItemM')
  element.style.display = "flex"
  return
}

function hideCat3() {
  element = document.getElementById('cat3ItemD')
  element.style.display = "none"
  element = document.getElementById('cat3ItemM')
  element.style.display = "flex"
}

function treatCat(cat, item) {
  switch (cat) {
    case "1":
      treatCat1(item)
      break;
    case "2":
      treatCat2(item)
      break;
    case "3":
      treatCat3(item)
      break;
  }
}

function treatCat1(item) {
  alert("CAT1 "+item)
}

function treatCat2(item) {
  alert("CAT2 "+item)
}

function treatCat3(item) {
  alert("CAT3 "+item)
}