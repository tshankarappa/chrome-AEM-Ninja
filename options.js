// Saves options to chrome.storage
function save_options() {

  save_local();

  var openInNewTab = document.getElementById('openInNewTab').checked;
  var authorURL = document.getElementById('authorURL').value;
  var publishURL = document.getElementById('publishURL').value;
  var liveURL = document.getElementById('liveURL').value;
  var previewURL = document.getElementById('previewUrl').value;
  var siteRootPath = document.getElementById('siteRootPath').value;
  var languagemastersPath = document.getElementById('languagemastersPath').value;
  var languagePath = document.getElementById('languagePath').value;
  var languagecodelength = document.getElementById('languagecodelength').value;
  var showAssetShare = document.getElementById('showAssetShare').checked;
  var assetshareURL = document.getElementById('assetshareURL').value;
  var dynamicMediaURL = document.getElementById('dynamicMediaURL').value;
  var showStage = document.getElementById('showStage').checked;
  var stageAuthorURL = document.getElementById('stageAuthorURL').value;
  var stagePublishURL = document.getElementById('stagePublishURL').value;
  var stageLiveURL = document.getElementById('stageLiveURL').value;
  var brandportalURL = document.getElementById('brandportalURL').value;

  chrome.storage.sync.set({
    openInNewTab: openInNewTab,
    authorURL: authorURL,
    publishURL: publishURL,
    liveURL: liveURL,
    previewURL: previewURL,
    siteRootPath: siteRootPath,
    languagemastersPath: languagemastersPath,
    languagePath: languagePath,
    languagecodelength: languagecodelength,
    showAssetShare: showAssetShare,
    assetshareURL: assetshareURL,
    dynamicMediaURL: dynamicMediaURL,
    showStage: showStage,
    stageAuthorURL: stageAuthorURL,
    stagePublishURL: stagePublishURL,
    stageLiveURL: stageLiveURL
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
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
    authorURL: 'https://author-p80902-e698709.adobeaemcloud.com',
    publishURL: 'https://publish-p80902-e698709.adobeaemcloud.com',
    liveURL: 'https://www.esri.com',
    previewURL: 'https://preview.esri.com',
    siteRootPath: '/content/esri-sites',
    languagemastersPath: '/content/esri-sites/language-masters/en',
    languagePath: '/content/esri-sites/en-us',
    languagecodelength: '4',
    showAssetShare: true,
    assetshareURL: 'https://assets.esri.com',
    dynamicMediaURL: 'https://esri-h.assetsadobe.com/is/image',
    showStage: true,
    stageAuthorURL: 'https://author-p80902-e698665.adobeaemcloud.com',
    stagePublishURL: 'https://publish-p80902-e698665.adobeaemcloud.com',
    stageLiveURL: 'https://uat.esri.com',
    brandportalURL: 'https://esri.brand-portal.adobe.com'
  }, function (items) {
    document.getElementById('openInNewTab').checked = items.openInNewTab;
    document.getElementById('authorURL').value = items.authorURL;
    document.getElementById('publishURL').value = items.publishURL;
    document.getElementById('liveURL').value = items.liveURL;
    document.getElementById('previewUrl').value = items.previewURL;
    document.getElementById('siteRootPath').value = items.siteRootPath;
    document.getElementById('languagemastersPath').value = items.languagemastersPath;
    document.getElementById('languagePath').value = items.languagePath;
    document.getElementById('languagecodelength').value = items.languagecodelength;
    document.getElementById('showAssetShare').checked = items.showAssetShare;
    document.getElementById('assetshareURL').value = items.assetshareURL;
    document.getElementById('dynamicMediaURL').value = items.dynamicMediaURL;
    document.getElementById('showStage').checked = items.showStage;
    document.getElementById('stageAuthorURL').value = items.stageAuthorURL;
    document.getElementById('stagePublishURL').value = items.stagePublishURL;
    document.getElementById('stageLiveURL').value = items.stageLiveURL;
    document.getElementById('brandportalURL').value = items.brandportalURL;
    showAssetShareOptions();
    showstageOptions();
  });
}

function showAssetShareOptions() {
  var disp = "none";
  if (document.getElementById("showAssetShare").checked) disp = "block";
  document.getElementById("assets").style.display = disp;
}

function showstageOptions() {
  var disp = "none";
  if (document.getElementById("showStage").checked) disp = "block";
  document.getElementById("stage").style.display = disp;
}
function save_local() {

  var color = document.getElementById('authorURL').value;


  localStorage.setItem("thilak", color);
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
// to show or hide the asset share options
document.getElementById("showAssetShare").addEventListener("click", showAssetShareOptions);
document.getElementById("showStage").addEventListener("click", showstageOptions);

