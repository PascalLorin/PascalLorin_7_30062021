"use strict"
// constantes et variables globales
const fichierJson = "./public/data/recipes.js";
var recipeSet = [];         // array des objets recipe contenus dans le fichier Json
var ingredientSet = [];     // array des objets ingredient chargé à partir des recettes
var applianceSet = [];      // array des objets appliance chargé à partir des recettes
var ustensilSet = [];       // array des objets ustensil chargé à partir des recettes
var tagSet = [];            // array des tags chargé à partir des ingredient, appliance, ustensil et saisie
var taggedRecipes = []      // array des #recipes incluant les tags
var displayAbleRecipes = [] // array des #recipes à afficher
var recipesCont;            // l'élement HTML contenant l'affichage des recettes
var tagSetCont;             // l'élement HTML contenant l'affichage des tags
var lastSearchTagName;      // l'élement HTML contenant le tag en cours de saisie
var element;                // nom générique pour toutes les manipulations du DOM
var accent = [
  /[\300-\306]/g, /[\340-\346]/g, // A, a
  /[\310-\313]/g, /[\350-\353]/g, // E, e
  /[\314-\317]/g, /[\354-\357]/g, // I, i
  /[\322-\330]/g, /[\362-\370]/g, // O, o
  /[\331-\334]/g, /[\371-\374]/g, // U, u
  /[\321]/g, /[\361]/g, // N, n
  /[\307]/g, /[\347]/g, // C, c
];
var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
