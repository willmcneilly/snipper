(function(root, $, undefined) {

  "use strict";


/* snipper main */

// Base function.
var snipper = function(ele) {

  var eleToSnip = ele,
      snippet = null,
      extractor = null;

  var Snippet = function() {
    var id = null,
        html = null,
        cssBuffer = null;

    var _generateID = function() {
      // always start with a letter (for DOM friendlyness)
      var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
      do {
          // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
          var ascicode=Math.floor((Math.random()*42)+48);
          if (ascicode<58 || ascicode>64){
              // exclude all chars between : (58) and @ (64)
              idstr+=String.fromCharCode(ascicode);
          }
      } while (idstr.length<32);

      return (idstr);
    };

    var _init = function() {
      id = _generateID();
    };

    _init();
  };

  var Extractor = function(ele, snippet) {

    var clonedHTML = null;

    var _deepClone = function(ele){
      return $(ele).clone();
    };

    var _wrapEle = function(ele) {
      return ele.wrapAll('<div></div>').parent();
    };

    var _appendToDOM = function(ele) {
      $('body').append(ele);
    };

    var _removeFromDOM = function(ele) {
      $(ele).remove();
    };

    var _getComputedStylesForElement = function(ele) {
      return root.getComputedStyle(ele).cssText;
    };

    var _extractCSS = function(ele, snippet) {
      var nodeNum = 0;

      ele.find('*').each(function() {
        var eleID = snippet.id + '-' + nodeNum;
        var cssProperties = _getComputedStylesForElement($(this)[0]);
        var cssObj = {
          id: eleID,
          properies: cssProperties
        };

        snippet.cssBuffer.push(cssObj);
        $(this).attr('data-snippet-id', eleID);
        nodeNum += 1;
      });

    };

    var _cleanUpHTMLBlock = function(ele) {
      ele.find('*').each(function() {
        $(this).removeClass();
        $(this).attr('id', $(this).attr('data-snippet-id'));
      });
    };

    var _addProcessedHTMLBlockToSnippet = function(snippet) {
      snippet.html = clonedHTML;
    };

  };


  var _createSnippet = function() {
    return new Snippet();
  };

  var _createExtractor = function(ele, snippet) {
    return new Extractor(ele, snippet);
  };

  var _init = function() {
    snippet = _createSnippet();
    extractor = _createExtractor(ele, snippet);
    debugger;
  };

  _init();

  return {
    init: function() {
      _init();
    }
  };
};


// Version.
snipper.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.snipper = snipper;


}(this, $));
