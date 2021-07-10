// tri alphabétique des array
function sortAllClasses() {
  ingredientSet.sort(compareValues('name'))
  ustensilSet.sort(compareValues('name'))
  applianceSet.sort(compareValues('name'))
}

function compareValues(key) {
  return function innerSort(a, b) {
  // localeCompare permet de traiter les accents pour qu'ils soient pris en compte à leur juste
  return a[key].localeCompare(b[key])
  }
}
