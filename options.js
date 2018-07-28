// Saves options to chrome.storage
function save_options() {

var openInNewTab=document.getElementById('openInNewTab').checked;
var authorURL=document.getElementById('authorURL').value;
var publishURL=document.getElementById('publishURL').value;
var liveURL=document.getElementById('liveURL').value;   
var siteRootPath=document.getElementById('siteRootPath').value;
var languagemastersPath=document.getElementById('languagemastersPath').value;
var languagePath=document.getElementById('languagePath').value;
var languagecodelength=document.getElementById('languagecodelength').value;
var showStage = document.getElementById('showStage').checked;
var stageAuthorURL = document.getElementById('stageAuthorURL').value;
var stagePublishURL = document.getElementById('stagePublishURL').value;
var stageLiveURL = document.getElementById('stageLiveURL').value;

chrome.storage.sync.set({
openInNewTab:openInNewTab, 
authorURL:authorURL,
publishURL:publishURL,
liveURL:liveURL,   
siteRootPath:siteRootPath,
languagemastersPath:languagemastersPath,
languagePath:languagePath,
languagecodelength:languagecodelength,
showStage:showStage,
stageAuthorURL:stageAuthorURL,
stagePublishURL:stagePublishURL,
stageLiveURL:stageLiveURL
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


//chrome.storage.sync.clear()   to clear the storage while developing. 


// Restores state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values.
    chrome.storage.sync.get({
    openInNewTab: false,  
    authorURL:'localhost:4502',
    publishURL:'localhost:4503',
    liveURL:'https://www.example.com',   
    siteRootPath:'/content/aem-ninja',
    languagemastersPath:'/content/aem-ninja/language-masters/en',
    languagePath:'/content/aem-ninja/en-us',
    languagecodelength: '4',
    showStage: false,
    stageAuthorURL: 'https://localhost:4502',
    stagePublishURL: 'https://localhost:4503',
    stageLiveURL: 'https://stage.example.com' }, function(items) {
    document.getElementById('openInNewTab').checked = items.openInNewTab;  
    document.getElementById('authorURL').value = items.authorURL;
    document.getElementById('publishURL').value=items.publishURL;
    document.getElementById('liveURL').value=items.liveURL;   
    document.getElementById('siteRootPath').value=items.siteRootPath;
    document.getElementById('languagemastersPath').value=items.languagemastersPath;
    document.getElementById('languagePath').value=items.languagePath;
    document.getElementById('languagecodelength').value=items.languagecodelength;
    document.getElementById('showStage').checked=items.showStage;
    document.getElementById('stageAuthorURL').value=items.stageAuthorURL;
    document.getElementById('stagePublishURL').value=items.stagePublishURL;
    document.getElementById('stageLiveURL').value=items.stageLiveURL;
    
    showstageOptions();
      });
}

function showstageOptions(){
      var disp="none";
      if(document.getElementById("showStage").checked) disp="block";
      document.getElementById("stage").style.display=disp;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

// to show or hide the stage options
document.getElementById("showStage").addEventListener("click",showstageOptions);