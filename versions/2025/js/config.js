/* Configuration and Global Variables */

// Configuration
var noTaskbar = 0;
var alwaysHideNSFW = true;

// Global dictionaries
var globalStoryDict = {};
var globalFolderDict = {};
var globalWindowDict = {};
var globalScrollDict = {};
var idList = [];

// UI state
var spawnEdge = 100;
var currentStory = null;
var current_folder = null;
var main_inbox = null;

// Random names for email senders
var randomNames = [
  'Rick Deckard',
  'James Bond',
  'Korben Dallas',
  'Danny Ocean',
  'Cha Tae-sik',
  'Homer Hickam',
  'Ben Wade',
  'Jon Osterman',
  'Vincent Freeman',
  'Llewelyn Moss',
  'Richard Winters',
  'Lewis Nixon',
  'George Luz',
  'Lynn Compton',
  'Ronald Speirs',
  'Anton Chigurh',
  'Irene Cassini',
  'Sam Bell',
  'Gerty',
  'Edward Blake',
  'Dan Evans',
  'Charlie Prince',
  'Quentin',
  'Jeong So-mi',
  'Bryan Mills',
  'Rusty Ryan',
  'Linus Caldwell',
  'Jean-Baptiste Emanuel Zorg',
  'Father Vito Cornelius',
  'Ruby Rhod',
  'Chief John Anderton'
];

function getRandomName() {
  return randomNames[Number(Math.floor(Math.random() * randomNames.length))];
}

function generateUid() {
  var uid = Math.floor((Math.random() * 100000) + 1);
  if (idList.indexOf(uid) > -1) {
    return generateUid();
  }
  return uid;
}
