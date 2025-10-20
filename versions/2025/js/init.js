/* Application Initialization */

$(document).ready(function() {
  onResize();
  $(window).resize(onResize);
  
  // Initialize default subreddits
  main_inbox = makeFolder('Front Page');
  makeFolder('gaming');
  makeFolder('pics');
  makeFolder('askreddit');
  makeFolder('jokes');
  makeFolder('funny');
  makeFolder('iama');
  makeFolder('wtf');
  
  // Set initial folder
  $('#folder_FrontPage').parent().addClass('foldwraphi');
  folderClick('folder_FrontPage');
  
  // Setup keyboard shortcuts
  $('.authorandstuff').keyup(function(event) {
    if (event.keyCode == 82) { // 'R' key
      var id = $('.commentroothi').parent().attr('id');
      if (id != null) {
        spawnReplyWindow(id);
      } else {
        spawnCommandWindow();
      }
    }
  });
  
  console.log('MSOutlookit 2025 initialized!');
});
