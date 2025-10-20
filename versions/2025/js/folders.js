/* Folder Management */

function myFolder() {
  this.after = '';
  this.count = 0;
  this.emailDict = {};
  this.subredditname = '';
  this.strippedID = '';
}

function makeFolder(name) {
  return makeFolder2(name, false);
}

function makeFolder2(name, custom) {
  var strippedID = 'folder_' + name.replace(/\s/g, '');
  globalFolderDict[strippedID] = new myFolder();
  globalFolderDict[strippedID].strippedID = strippedID;
  globalFolderDict[strippedID].subredditname = name;
  
  // Microsoft Outlook folder item template
  var tempHTML = '<div class="folder-item" id="' + strippedID + '">' + name + '</div>';
  
  $('.foldwraphi').removeClass('foldwraphi');
  $('.active').removeClass('active');
  
  // Append to both #folders (new UI) and .folderholder (legacy hook)
  $('#folders').append(tempHTML);
  $('.folderholder').append('<div class="afolderwrapper"><div class="afolder" id="legacy_' + strippedID + '">' + name + '</div></div>');
  
  $('#' + strippedID).click(folderIconClick);
  return globalFolderDict[strippedID];
}

function folderIconClick() {
  $('.foldwraphi').removeClass('foldwraphi');
  $('.active').removeClass('active');
  $(this).addClass('active');
  $(this).parent().addClass('foldwraphi');
  folderClick($(this).attr('id'));
}

function folderClick(folder_name) {
  if (globalFolderDict[folder_name] == null) {
    return 0;
  }
  tempFolderName = folder_name;
  current_folder = globalFolderDict[folder_name];
  
  if (globalFolderDict[folder_name].count == 0) {
    $('#previewarea').html('<img src="loading.gif">');
    var link = '';
    if (folder_name == 'folder_FrontPage') {
      link = getRedditDomain() + '/.json';
    } else {
      link = getRedditDomain() + '/r/' + globalFolderDict[folder_name].subredditname + '/.json';
    }
    link = link + '?jsonp=folderCallback';
    $.get(link, folderCallback, 'jsonp');
  } else {
    displayFolder(folder_name);
  }
}

function folderCallback(data) {
  $('.afolder').click(folderIconClick);
  var thefolder = globalFolderDict[tempFolderName];
  if (console.log) {
    console.log('Loaded subreddit data:', data);
  }
  var after = data.data.after;
  globalFolderDict[tempFolderName].after = after;
  globalFolderDict[tempFolderName].count += 25;
  for (var i = 0; i < data.data.children.length; i++) {
    var story = new myStory(data.data.children[i], thefolder, false);
  }
  displayFolder(tempFolderName);
}

function displayFolder(folder_name) {
  if (current_folder == globalFolderDict[folder_name]) {
    $('#previewarea').html('');
    for (key in globalFolderDict[folder_name].emailDict) {
      globalFolderDict[folder_name].emailDict[key].addToArea();
    }
    $('#previewarea').append('<input type="button" value="Load more posts" onclick="moarButton()" >');
    onReload();
  }
}

function moarButton() {
  var link = '';
  if (current_folder.strippedID == 'folder_FrontPage') {
    link = getRedditDomain() + '/.json';
  } else {
    link = getRedditDomain() + '/r/' + current_folder.subredditname + '/.json';
  }
  link = link + '?after=' + current_folder.after + '&jsonp=folderCallback';
  $.get(link, folderCallback, 'jsonp');
}
