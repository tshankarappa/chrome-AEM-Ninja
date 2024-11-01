// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');
    var urls = new URL(tab.url);
    var domain = urls.hostname;
    callback(url, domain);
  });
}



/*
This are the variables to be fetched from options tab
*/
var openInNewTab;
var authorURL;
var publishURL;
var liveURL;
var stageAuthorURL;
var stagePublishURL;
var stageLiveURL;
var previewURL;
var siteRootPath;
var languagemastersPath;
var languagePath;
var languagecodelength;
var showAssetShare;
var assetshareURL;
//this value is retreived from DOM
var isPublished;
var prd = [];
var stg = [];


chrome.storage.sync.get({
  openInNewTab: false,
  authorURL: 'https://author-p80902-e698709.adobeaemcloud.com',
  publishURL: 'https://publish-p80902-e698709.adobeaemcloud.com',
  liveURL: 'https://www.esri.com',
  showStage: false,
  stageAuthorURL: 'https://author-p80902-e698665.adobeaemcloud.com',
  stagePublishURL: 'https://publish-p80902-e698665.adobeaemcloud.com',
  stageLiveURL: 'https://uat.esri.com',
  previewURL: 'https://preview.esri.com',
  siteRootPath: '/content/esri-sites',
  languagemastersPath: '/content/esri-sites/language-masters/en',
  languagePath: '/content/esri-sites/en-us',
  languagecodelength: '4',
  showAssetShare: false,
  assetshareURL: 'https://assets.esri.com',
  dynamicMediaURL: 'https://esri-h.assetsadobe.com/is/image',
  brandportalURL: 'https://esri.brand-portal.adobe.com'
}, function (items) {
  openInNewTab = items.openInNewTab;
  authorURL = items.authorURL;
  publishURL = items.publishURL;
  liveURL = items.liveURL;
  showStage = items.showStage;
  stageAuthorURL = items.stageAuthorURL;
  stagePublishURL = items.stagePublishURL;
  stageLiveURL = items.stageLiveURL;
  previewURL = items.previewURL;
  siteRootPath = items.siteRootPath;
  languagemastersPath = items.languagemastersPath;
  languagePath = items.languagePath;
  languagecodelength = items.languagecodelength;
  showAssetShare = items.showAssetShare;
  assetshareURL = items.assetshareURL;
  dynamicMediaURL = items.dynamicMediaURL;
  brandportalURL = items.brandportalURL;
  prd = [items.authorURL, items.publishURL, items.liveURL];
  stg = [items.stageAuthorURL, items.stagePublishURL, items.stageLiveURL];
});

//fetch the only required parameters from the URL
function smartUrl(url) {

  if (url.indexOf(languagemastersPath) > -1) {
    url = url.split(languagemastersPath)[1];
  } else if (url.indexOf(languagePath) > -1) {
    url = url.split(languagePath)[1];
  } else if (url.indexOf(liveURL) > -1) {
    url = url.split(liveURL)[1].substring(parseInt(languagecodelength) + 2);
  } else if (url.indexOf(publishURL) > -1) {
    url = url.split(publishURL)[1].substring(parseInt(languagecodelength) + 2);
  } else if (url.indexOf(stageLiveURL) > -1) {
    url = url.split(stageLiveURL)[1].substring(parseInt(languagecodelength) + 2);
  } else if (url.indexOf(stagePublishURL) > -1) {
    url = url.split(stagePublishURL)[1].substring(parseInt(languagecodelength) + 2);
  } else if (url.indexOf(previewURL) > -1) {
    url = url.split(previewURL)[1].substring(parseInt(languagecodelength) + 2);
  }


  if (url.indexOf(".html") > -1) {
    url = url.split(".html")[0];
  }

  if (url.indexOf("#") > -1) {
    url = url.split("#")[0];
  }

  return url;

}

//clean the url to use in assets options
function smartAssetsUrl(url) {

  if (url.indexOf(authorURL) > -1)
    url = url.split(authorURL + "/assetdetails.html")[1];
  else if (url.indexOf(brandportalURL) > -1)
    url = '/content/dam' + url.split(brandportalURL + "/assetdetails.html/content/dam/mac/esri")[1];
  else if (url.indexOf(liveURL) > -1)
    url = url.split(liveURL)[1];
  return url;
}


//excecute script

function redirect(url) {

  var script = 'window.location.href = "' + url + '";';
  if (openInNewTab) {
    script = "window.open('" + url + "', '_blank');";
  }
 

  chrome.tabs.executeScript({
    code: script
  });

}

//when the user clicks on author

function changeToAuthor(url, domain) {

  url = (stg.indexOf('https://' + domain) > -1 ? stageAuthorURL : authorURL) + '/editor.html' + languagePath + smartUrl(url) + '.html';
  redirect(url);
}

//when the user clicks on Author language masters

function changeToAuthorLanguageMasters(url, domain) {

  url = (stg.indexOf('https://' + domain) > -1 ? stageAuthorURL : authorURL) + '/editor.html' + languagemastersPath + smartUrl(url) + '.html';
  redirect(url);
}

// To change the URL to publish

function changeToPublish(url, domain) {

  url = (stg.indexOf('https://' + domain) > -1 ? stagePublishURL : publishURL) + languagePath.split(siteRootPath)[1] + smartUrl(url);
  redirect(url);
}

// To change the URL to live page

function changeToLive(url, domain) {

  url = (stg.indexOf('https://' + domain) > -1 ? stageLiveURL : liveURL) + languagePath.split(siteRootPath)[1] + smartUrl(url);
  redirect(url);
}

// To change the URL to Preview

function changeToPreview(url, domain) {

  url = previewURL + languagePath.split(siteRootPath)[1] + smartUrl(url);
  redirect(url);
}

// To see the page in view as published

function changeToAsPublished(url, domain) {

  if (url.indexOf("/en/") > -1) {
    url = (stg.indexOf('https://' + domain) > -1 ? stageAuthorURL : authorURL) + languagemastersPath + smartUrl(url) + '.html';
  } else {
    url = (stg.indexOf('https://' + domain) > -1 ? stageAuthorURL : authorURL) + languagePath + smartUrl(url) + '.html';

  }

  redirect(url);
}

// To see the page in view as published

function changeToAdmin(url, domain) {

  if (url.indexOf("/en/") > -1) {
    url = (stg.indexOf('https://' + domain) > -1 ? stageAuthorURL : authorURL) + "/sites.html" + languagemastersPath + smartUrl(url);
  } else {
    url = (stg.indexOf('https://' + domain) > -1 ? stageAuthorURL : authorURL) + "/sites.html" + languagePath + smartUrl(url);
  }

  redirect(url);
}


// To change the asset share URL to aem assets

function changeToAEMAssets(url) {

  url = authorURL + '/assets.html' + smartAssetsUrl(url);
  redirect(url);
}

// To change the assets url to brandportal

function changeToBrandportal(url) {

  url = brandportalURL + '/assetdetails.html/content/dam/mac/esri' + smartAssetsUrl(url).split("/content/dam")[1];
  redirect(url);
}

// To change the asset share URL to aem assets

function changeToAssetsLive(url) {

  url = liveURL + smartAssetsUrl(url);
  redirect(url);
}

// To change url from aem assets to asset share

function changeToAssetShare(url) {

  url = assetshareURL + smartAssetsUrl(url) + '.form.html/content/dam/esri/asset_share/assets/assetviewer.html';
  redirect(url);
}

// To change url from aem assets to show only image

function changeToOnlyImage(url) {

  url = assetshareURL + smartAssetsUrl(url);
  redirect(url);
}


// To change url from aem assets to show 1280 rendition

function changeToImage1280(url) {

  url = assetshareURL + smartAssetsUrl(url) + ".thumb.1280.1280.png";
  redirect(url);
}

// To change url from aem assets to show 319 rendition

function changeToImage319(url) {

  url = assetshareURL + smartAssetsUrl(url) + ".thumb.319.319.png";
  redirect(url);
}

// To change url from aem assets to show 48 rendition

function changeToImage48(url) {

  url = assetshareURL + smartAssetsUrl(url) + ".thumb.48.48.png";
  redirect(url);
}

//dynamic media
function changeToEmailw600(url) {

  url = dynamicMediaURL + smartAssetsUrl(url) + "?$email-w600$";
  redirect(url);
}


function changeToEmailw560(url) {

  url = dynamicMediaURL + smartAssetsUrl(url) + "?$email-w560$";
  redirect(url);
}

function changeToEmailw260(url) {

  url = dynamicMediaURL + smartAssetsUrl(url) + "?$email-w260$";
  redirect(url);
}

function changeToEmailw160(url) {

  url = dynamicMediaURL + smartAssetsUrl(url) + "?$email-w160$";
  redirect(url);
}



// to hide the buttons based on the url.   
function hideButtons(url, domain) {

  var count = 0;

  //switch statement for sites
  if (url.indexOf("dam") <= -1) {
    switch (true) {

      case url.indexOf("sites.html") > -1:
        document.getElementById('admin').className += ' hidden';
        count++;
        break;

      case url.indexOf("editor.html") > -1 && url.indexOf("language-masters") > -1:
        document.getElementById('languagemaster').className += ' hidden';
        count++;
        break;

      case url.indexOf("editor.html") > -1 && url.indexOf("language-masters") <= -1:
        document.getElementById('author').className += ' hidden';
        count++;
        break;

      case url.indexOf(authorURL) > -1 && url.split(authorURL)[1].substring(0, 4) == "/con":
        document.getElementById('aspublished').className += ' hidden';
        count++;
        break;

      case url.indexOf(stageAuthorURL) > -1 && url.split(stageAuthorURL)[1].substring(0, 4) == "/con":
        document.getElementById('aspublished').className += ' hidden';
        count++;
        break;

      case url.indexOf(publishURL) > -1: document.getElementById('publish').className += ' hidden';
        count++;
        break;

      case url.indexOf(stagePublishURL) > -1: document.getElementById('publish').className += ' hidden';
        count++;
        break;

      //special case condition for ESRI to not to show options for any page that don't have 4 digit language code     
      case url.indexOf(liveURL) > -1 && !(/^(\/[a-z]{2}-[a-z]{2}\/)$/.test(url.split(liveURL)[1].substring(0, parseInt(languagecodelength) + 3))):
        break;

      case url.indexOf(liveURL) > -1: document.getElementById('live').className += ' hidden';
        count++;
        break;

      case url.indexOf(stageLiveURL) > -1: document.getElementById('live').className += ' hidden';
        count++;
        break;

      case url.indexOf(previewURL) > -1: document.getElementById('preview').className += ' hidden';
        count++;
        break;

    }
  }
  else if (showAssetShare && url.indexOf("dam") > -1 && url.indexOf("assets.html") <= -1 && url.indexOf("mediaportal.html") <= -1) {

    document.getElementById('main').className += ' hidden';

    count++;
    document.getElementById('assets').className = ' ';
    switch (true) {
      case url.indexOf(authorURL) > -1: document.getElementById('aemAssets').className += ' hidden';
        break;

      case url.indexOf(brandportalURL) > -1: document.getElementById('brandportal').className += ' hidden';
        break;

      case url.indexOf(liveURL) > -1: document.getElementById('assetslive').className += ' hidden';
        break;

      default: count--; document.getElementById('assets').className = ' hsidden';
        break;


    }
  }
  //injecting css for pardot team.
  else if (url.indexOf("pardot") > -1) {
    var script = `document.getElementsByClassName('importHTML')[0].style.display="none"`;
    chrome.tabs.executeScript({
      code: script
    });
  }

  if (count < 1) {
    document.getElementById('main').className += ' hidden';
    document.getElementById('error').className = '  ';
  }
  if (stg.indexOf('https://' + domain) > -1)
    document.getElementById('preview').className += ' hidden';
}



document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url, domain) => {

    hideButtons(url, domain);
    document.getElementById("author").addEventListener("click", function () {
      changeToAuthor(url, domain);
      trackButton("author");
      window.close();
    });

    document.getElementById("languagemaster").addEventListener("click", function () {
      changeToAuthorLanguageMasters(url, domain);
      trackButton("languagemaster");
      window.close();
    });


    document.getElementById("publish").addEventListener("click", function () {
      changeToPublish(url, domain);
      trackButton("publish");
      window.close();
    });

    document.getElementById("live").addEventListener("click", function () {
      changeToLive(url, domain);
      trackButton("live");
      window.close();
    });

    document.getElementById("preview").addEventListener("click", function () {
      changeToPreview(url, domain);
      trackButton("preview");
      window.close();
    });

    document.getElementById("aspublished").addEventListener("click", function () {
      changeToAsPublished(url, domain);
      trackButton("aspublished");
      window.close();
    });

    document.getElementById("admin").addEventListener("click", function () {
      changeToAdmin(url, domain);
      trackButton("admin");
      window.close();
    });

    document.getElementById("aemAssets").addEventListener("click", function () {
      changeToAEMAssets(url);
      trackButton("aemAssets");
      window.close();
    });

    document.getElementById("brandportal").addEventListener("click", function () {
      changeToBrandportal(url);
      trackButton("brandportal");
      window.close();
    });

    document.getElementById("assetslive").addEventListener("click", function () {
      changeToAssetsLive(url);
      trackButton("assetslive");
      window.close();
    });

  });
});



