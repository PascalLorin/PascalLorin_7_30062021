// tri alphabétique des array
function sortAllClasses() {
  ingredientSet.sort(compareValues('upperName'))
  ustensilSet.sort(compareValues('upperName'))
  applianceSet.sort(compareValues('upperName'))
}

function compareValues(key) {
  return function innerSort(a, b) {
  }
}
 
function toUpperNameClasses() {
  ingredientSet.forEach(item => {
    item.upperName = toUpperName(item.name)
  })
  ustensilSet.forEach(item => {
    item.upperName = toUpperName(item.name)
  })
  applianceSet.forEach(item => {
    item.upperName = toUpperName(item.name)
  })
}