// tri alphabétique des array
function sortAllArrays() {
  ingredientSet.sort(compareValues('upperName'))
  ustensilSet.sort(compareValues('upperName'))
  applianceSet.sort(compareValues('upperName'))
}

function compareValues(key) {
  return function innerSort(a, b) {
    return a[key].localeCompare(b[key])
  }
}