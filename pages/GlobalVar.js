"use strict"
// constantes et variables globales
const fichierJson = "./public/data/recipes.js";
var recipeSet = [];       // array des objets recipes contenues dans le fichier Json
var ingredientSet = [];   // array des objets ingredient chargé à partir des recettes
var applianceSet = [];    // array des objets appliance chargé à partir des recettes
var ustensilSet = [];     // array des objets ustensil chargé à partir des recettes
var tagSet = [];          // array des tags chargé à partir des ingredient, appliance & ustensil
var recipeToDisplay = []; // array des recipes à afficher à partir du(es) tag(s) sélectionné(s)
var allRecipes;           // pour afficher toutes les recettes si aucun tag n'est sélectionné
var recipesCont;          // élement HTML contenant l'affichage des recettes
