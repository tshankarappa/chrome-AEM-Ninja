// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function getCurrentTabUrl(callback) {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {

    var tab = tabs[0];

    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');
    var urls = new URL(tab.url);
    var domain = urls.hostname;
    callback(url,domain);
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
var siteRootPath;
var languagemastersPath;
var languagePath;
var languagecodelength;

chrome.storage.sync.get({
  openInNewTab: false,
  authorURL: 'http://localhost:4502',
  publishURL: 'http://localhost:4503',
  liveURL: 'https://www.example.com',
  showStage: false,
  stageAuthorURL: 'http://localhost:450',
  stagePublishURL: 'http://localhost:4503',
  stageLiveURL: 'https://stage.example.com',
  siteRootPath: '/content/aem-ninja',
  languagemastersPath: '/content/aem-ninja/language-masters/en',
  languagePath: '/content/aem-ninja/en-us',
  languagecodelength: '4'
}, function(items) {
  openInNewTab = items.openInNewTab;
  authorURL = items.authorURL;
  publishURL = items.publishURL;
  liveURL = items.liveURL;
  showStage = items.showStage;
  stageAuthorURL = items.stageAuthorURL;
  stagePublishURL = items.stagePublishURL;
  stageLiveURL = items.stageLiveURL;
  siteRootPath = items.siteRootPath;
  languagemastersPath = items.languagemastersPath;
  languagePath = items.languagePath;
  languagecodelength = items.languagecodelength;
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
  } else if(url.indexOf(previewURL)> -1){
    url = url.split(previewURL)[1].substring(3);
  }


  if (url.indexOf(".html") > -1) {
    url = url.split(".html")[0];
  }

  return url;

}

//excecute script

function redirect(url) {

  var script = 'window.location.href = "' + url + '";';
  if(openInNewTab)
  {
    script = "window.open('"+ url +"', '_blank');";
  }
  chrome.extension.getBackgroundPage().console.log(script);

  chrome.tabs.executeScript({
    code: script
  });

}

//when the user clicks on author

function changeToAuthor(url,domain) {

  url = (stg.indexOf('https://'+domain) > -1? stageAuthorURL: authorURL ) + '/editor.html' + languagePath + smartUrl(url) + '.html';
  redirect(url);
}

//when the user clicks on Author language masters

function changeToAuthorLanguageMasters(url,domain) {

  url = (stg.indexOf('https://'+domain) > -1? stageAuthorURL: authorURL ) + '/editor.html' + languagemastersPath + smartUrl(url) + '.html';
  redirect(url);
}

// To change the URL to publish

function changeToPublish(url,domain) {

  url = (stg.indexOf('https://'+domain) > -1? stagePublishURL : publishURL ) + languagePath.split(siteRootPath)[1] + smartUrl(url) ;
  redirect(url);
}

// To change the URL to live page

function changeToLive(url,domain) {

  url = (stg.indexOf('https://'+domain) > -1? stageLiveURL : liveURL ) + languagePath.split(siteRootPath)[1] + smartUrl(url) ;
  redirect(url);
}


// To see the page in view as published

function changeToAsPublished(url,domain) {

  if (url.indexOf("/en/") > -1) {
    url = (stg.indexOf('https://'+domain) > -1? stageAuthorURL : authorURL ) + languagemastersPath + smartUrl(url) + '.html';
  } else {
    url = (stg.indexOf('https://'+domain) > -1? stageAuthorURL : authorURL ) + languagePath + smartUrl(url) + '.html';

  }

  redirect(url);
}

// To see the page in view as published

function changeToAdmin(url,domain) {

  if (url.indexOf("/en/") > -1) {
    url = (stg.indexOf('https://'+domain) > -1? stageAuthorURL : authorURL ) + "/sites.html" + languagemastersPath + smartUrl(url);
  } else {
    url = (stg.indexOf('https://'+domain) > -1? stageAuthorURL : authorURL) + "/sites.html" + languagePath + smartUrl(url);
  }

  redirect(url);
}

// to hide the buttons based on the url.   
function hideButtons(url,domain) {

  var count = 0;

  //switch statement for sites
    switch(true)
      {
          
          case url.indexOf("sites.html") > -1 :
                                                document.getElementById('admin').className += ' hidden';
                                                count++;
                                                break;
              
          case url.indexOf("editor.html") > -1 && url.indexOf("language-masters") > -1 : 
                                                document.getElementById('languagemaster').className += ' hidden';
                                                count++;
                                                break;              
              
          case url.indexOf("editor.html") > -1 && url.indexOf("language-masters") <= -1 : 
                                                document.getElementById('author').className += ' hidden';
                                                count++;
                                                break;
              
          case url.indexOf(authorURL) > -1 && url.split(authorURL)[1].substring(0,4) =="/con" :
                                                document.getElementById('aspublished').className += ' hidden';
                                                count++;
                                                break;

          case url.indexOf(stageAuthorURL) > -1 && url.split(stageAuthorURL)[1].substring(0,4) =="/con" :
                                                document.getElementById('aspublished').className += ' hidden';
                                                count++;
                                                break;                                                
              
          case url.indexOf(publishURL) > -1 :   document.getElementById('publish').className += ' hidden';
                                                count++;
                                                break;

          case url.indexOf(stagePublishURL) > -1 :   document.getElementById('publish').className += ' hidden';
                                                count++;
                                                break;
              
          case url.indexOf(liveURL) > -1 :      document.getElementById('live').className += ' hidden';
                                                count++;
                                                break;

          case url.indexOf(stageLiveURL) > -1 :      document.getElementById('live').className += ' hidden';
                                                count++;
                                                break;                                                
                         
      }
     
    if(count<1) {
          document.getElementById('main').className += ' hidden';
          document.getElementById('error').className = ' ttt';
    }
            
}



document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url,domain) => {

    hideButtons(url,domain);
    document.getElementById("author").addEventListener("click", function() {
      changeToAuthor(url,domain);
      window.close();
    });

    document.getElementById("languagemaster").addEventListener("click", function() {
      changeToAuthorLanguageMasters(url,domain);
      window.close();
    });


    document.getElementById("publish").addEventListener("click", function() {
      changeToPublish(url,domain);
      window.close();
    });

    document.getElementById("live").addEventListener("click", function() {
      changeToLive(url,domain);
      window.close();
    });     

    document.getElementById("aspublished").addEventListener("click", function() {
      changeToAsPublished(url,domain);
      window.close();
    });

    document.getElementById("admin").addEventListener("click", function() {
      changeToAdmin(url,domain);
      window.close();
    });

});
  });



