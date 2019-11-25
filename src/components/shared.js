import {by639_1} from 'iso-language-codes'
import rtlDetect from 'rtl-detect';

export default {
  imageextensions: ['jpg', 'jpeg', 'png', 'svg'],
  //gets on structure for annotation; gets contents of the annotation 'on' field and places it into a list for multi image.
  on_structure: function(anno){
    if (typeof anno['on'] === 'undefined'){
      return 'undefined';
    } else if (typeof anno['on'][0] !== 'undefined' && typeof anno['on'][0] !== 'string'){
      return anno['on'];
    } else {
      return [anno['on']];
    }
  },
  // get and parse settings from styling or config. This will check the config element in the page and the inline styling.
  //For inline styling it will split out the values, change boolean and int strings into correct values and remove whitespace.
  getsettings: function(vueinfo, ismulti=false) {
    var styling = vueinfo.styling;
    var settings = {};
    if (!ismulti && document.getElementById("config") !== null && document.getElementById("config").innerHTML != ''){
      settings = JSON.parse(document.getElementById("config").innerHTML);
    }
    if (styling) {
      var items = styling.split(";").filter(function(el) { return el != ""; });
      for (var j=0; j<items.length; j++){
        var keyvalue = items[j].split(":")
        var value = items[j].substring(items[j].indexOf(':')+1).trim();
        value = value == 'false' ? false : value;
        value = value == 'true' ? true : value;
        value = parseInt(value) && parseInt(value).toString().length == value.length ? parseInt(value) : value;
        settings[keyvalue[0].trim()] = value;
      }
    }
    if (vueinfo.annotationurl){
      settings.hide_autorunbutton == undefined ? settings.hide_autorunbutton = true : '';
      settings.hide_nextbuttons == undefined ? settings.hide_nextbuttons = true : '';
      settings.hide_overlaybutton == undefined ? settings.hide_overlaybutton = true : '';
      settings.startposition == undefined ? settings.startposition = 0 : '';
    }
    return settings;
  },
  // Get ocr, text, tags, languages, authors, and type of annotation;
  //Will go through the annotation resource (oa) or body (w3 annotation) field to get various fields
  //Looks at type in resource field to define which item the resource belongs to.
  chars: function(anno) {
    var res = anno.body ? anno.body : anno.resource ? anno.resource : '';
    var textual_body = [];
    var tags = [];
    var ocr = [];
    var shapetype;
    var langs;
    var authors = [];
    var label = anno.label ? anno.label : anno.resource && anno.resource.label ? anno.resource.label : undefined;
    res = [].concat(res);
    anno.bodyValue ? textual_body.push(anno.bodyValue) : '';
    for (var i=0; i < res.length; i++){
      var res_data = res[i];
      var value = res_data['value'] ? res_data['value'] : res_data['chars'];
      value = decodeURIComponent(escape(unescape(encodeURIComponent(value))));
      if (res_data.creator || res_data['annotatedBy'] || res_data['oa:annotatedBy']){
        var sectionauthor = this.getAuthor(res_data).split(", ");
        value += `<div class="authorship">Written by: ${[... new Set(sectionauthor)].join(", ")} </div>`;
      }
      var type = Object.keys(res_data)[Object.keys(res_data).findIndex(element => element.includes("type"))];
      var purpose = res_data['purpose'] ? res_data['purpose'].split("#").slice(-1)[0] : res_data[type] ? res_data[type] : 'dctypes:text';
      purpose = purpose.toLowerCase()
      if (res_data[type] === 'TextualBody'){
        if (purpose === 'tagging'){
          tags.push(value);
        } else if (value){
          if (purpose == 'transcribing'){
            ocr.push(value);
          } else {
            textual_body.push(`<div class="${purpose}">${value}</div>`);
          }
        }
      } else if (res_data[type] === 'oa:Tag'){
        tags.push(value);
      } else if (res_data[type] === 'Choice') {
        langs = res_data['items'].map(element => `<option value="${element['language']}" ${navigator.language.indexOf(element['language']) > -1 ? 'selected' : ''}>${by639_1[element['language']]['nativeName'] ? by639_1[element['language']]['nativeName'] : element['language']}</option>`);
        var values = res_data['items'].map(element => JSON.parse(`{"purpose": "${purpose}", "language": "${element['language']}", "value": "${decodeURIComponent(escape(unescape(encodeURIComponent(element['value']))))}"}`));
        textual_body = textual_body.concat(values)
      } else if (res_data[type] === 'dctypes:Image') {
          textual_body.push(`<img src="${res_data['@id']}">
          <div class="attribution">${res_data['attribution']}</div>
          <div class="caption">${res_data['description']}</div>`);
      } else if (res_data[type] === 'dctypes:Dataset') {
        textual_body.push(`<a href="${res_data['@id']}">Download dataset (${res_data['format']})</a>`);
      } else if (res_data[type] === 'cnt:ContentAsText') {
        ocr.push(value);
      } else if (value) {
        textual_body.push(`<div class="${purpose}">${value}</div>`);
      }
      if (res_data.selector){
        shapetype = res_data.selector.value;
      }
    }
    authors = this.getAuthor(anno);
    return {'ocr': ocr, 'textual_body':textual_body,'tags':tags, 'type': shapetype, 'languages':langs, 'label':label, 'language': res_data['language'], 'authors': authors};
  },
  //get canvas information and section of image annotated.
  //Looks at selector field to see if selector exists and portion of the canvas is defined in the field.
  //Tries to find the canvas defined in the annotation.
  //Looks at canvasId to see if section of image is defined in the canvasId
  canvasRegion: function(canvasId, ondict){
    var canvasRegion;
    if (ondict && typeof ondict.selector !== 'undefined') {
      canvasRegion = ondict.selector.value ? ondict.selector.value : ondict.selector.default.value;
      canvasRegion = canvasRegion.split("=").slice(-1)[0]
    }
    if (typeof canvasId !== 'string'){
      if (canvasId.selector){
        if (canvasId.selector.constructor === Array){
          var selectors = canvasId.selector.filter(element => element.value.indexOf('xywh') > -1);
          canvasRegion = selectors[0].value.split("=").slice(-1)[0];
        } else {
          canvasRegion = canvasId.selector.value.split("=").slice(-1)[0];
        }
      }
      if (canvasId['source']){
        canvasId = canvasId.source;
      }
      canvasId = canvasId['id'] ? canvasId['id'] : canvasId['@id'] ? canvasId['@id'] : canvasId ;
    }
    if (canvasId.indexOf("#xywh") > -1){
      canvasRegion = canvasId.split("#")[1].split("=")[1];
      canvasId = canvasId.split("#")[0];
    } else if (!canvasRegion) {
      canvasRegion = "full";
    }
    canvasRegion != 'full' ? canvasRegion = canvasRegion.split(",").map(element => element.replace(/[^0-9]/g, '')).join(",") : "";
    return {'canvasId':canvasId.replace("/info.json", ""), 'canvasRegion':canvasRegion};
  },
  //get the manifest link from annotation;
  //looks at specific fields for the manifest associated with the annotation.
  // partof and partofmain looks at two different poritions of the annotation to see if any field contains 'partof'.
  //The partof field defines the manifest but tends to have some parity in terms of formating people use (partOf, dcterms:partOf).
  manifestlink: function(manifesturl, anno, responsedata) {
    var manifestlink;
    if (manifesturl === undefined || manifesturl === ''){
      var target_dict = anno['target'] ? anno['target'] : this.on_structure(anno)[0];
      var partof = Object.keys(target_dict)[Object.keys(target_dict).findIndex(element => element.toLowerCase().includes("partof"))];
      var partofmain = Object.keys(responsedata)[Object.keys(responsedata).findIndex(element => element.toLowerCase().includes("partof"))];
      var manifest_dict = partof ? target_dict[partof] : partofmain ? responsedata[partofmain] : this.on_structure(anno)[0]['within'];
      manifest_dict = manifest_dict ? manifest_dict : responsedata['within'] ? responsedata['within']['within'] : '';
      manifestlink = manifest_dict['id'] ? manifest_dict['id'] : manifest_dict['@id'] ?  manifest_dict['@id'] : manifest_dict;
    } else {
      manifestlink = manifesturl;
    }
    return manifestlink;
  },
  //get SVG path from annotation; looks at specific fields and gets the path without the SVG container from a field in the annotation.
  getSVGoverlay: function(ondict){
    var svg_path;
    if (ondict && ondict.selector && ondict.selector.item !== undefined){
      var svg_elem = document.createElement( 'html' );
      svg_elem.innerHTML = ondict.selector.item.value;
      var path = svg_elem.getElementsByTagName('path')[0];
      svg_path = path;
    }
    return svg_path;
  },
  // parse author information; looks at creator field. Is going to be expanded to reflect OA standards
  getAuthor: function(annotation) {
    var authors = [];
    var authorfield = annotation.creator ? annotation.creator : annotation['annotatedBy'] ? annotation['annotatedBy'] : annotation['oa:annotatedBy'] ? annotation['oa:annotatedBy'] : '';
    if (!Array.isArray(authorfield)) {
      authorfield = [authorfield];
    }
    authorfield = authorfield.filter(function (el) {
      return el != null && el != '';
    });
    for (var au = 0; au<authorfield.length; au++){
      var author = authorfield[au];
      var author_string = author['name'] ? author['name'] : author['label'] ? author['label'] : author;
      authors.push(author_string)
    }
    return [... new Set(authors)].join(', ');
  },
  getTagDict: function(alltags, settings, checked) {
    var tagdict = {}
    var tags = Array.from(new Set(alltags)).sort();
    for (var tc=0; tc<tags.length; tc++){
      if (tags[tc] != '' && tags[tc]){
        var jsonparse = settings.tagscolor ? JSON.parse(settings.tagscolor.replace(/'/g, '"')) : '';
        var set_color = jsonparse && jsonparse[tags[tc]] ? jsonparse[tags[tc]] : '';
        var randomcolor = set_color ? set_color : '#'+Math.random().toString(16).substr(-6);
        var count = alltags.filter(i => i === tags[tc]).length;
        tagdict[tags[tc]] = {'color':randomcolor, 'checked': checked, 'count': count};
      }
    }
    return tagdict;
  },
  //Create HTML element using chars data; This uses the data from the chars() function up above.
  //It takes the chars data and renders the data as an HTML object.
  createContent: function(annotation, currentlang, storyboard) {
    var text = ''
    var filter = annotation ? Object.values(annotation).filter(el => el && el.length > 0) : [];
    if (filter.length > 0){
      var language = currentlang ? currentlang : annotation['language'];
      var direction = language && rtlDetect.isRtlLang(language) ? 'rtl' : 'ltr';
      var directiontext = `<span style="direction: ${direction};">`
      text = directiontext
      text += annotation['label'] ? `<div class="title">${annotation['label']}</div>` : ``;
      var oldtext = annotation['textual_body'];
      var ocr = annotation['ocr'];
      var authors = annotation['authors'];
      if (currentlang && oldtext[0] && oldtext[0]['language']) {
        var correctdata = oldtext.filter(element => element['language'] === currentlang);
        if(correctdata.length > 0){
          text += `<div class="${correctdata[0]['purpose']}">${correctdata[0]['value']}</div>`
        } else {
          var langtranslation = by639_1[currentlang]['nativeName'];
          text += `Translation not avaliable in "${langtranslation ? langtranslation : currentlang}"`;
        }
      } else {
        text += `${oldtext.join("")}`;
      }
      text += `${ocr.length > 0 && !storyboard ? `<div id="ocr">${ocr}</div>` : ``}`;
      text += `${authors ? `<div class="authorship">Written by: ${authors}</div>` : ``}`;
      if (storyboard){
        text += `${annotation['tags'].length > 0 ? `<div class="tags">Tags: ${annotation['tags'].join(", ")}</div>` : ``}`
      }
      text += '</span>'
      var ocrtext = `${ocr.length > 0 ? `${directiontext}<div id="ocr">${ocr.join(" ")}</div></span>` : ``}`
      var isempty = /<span style="direction: (ltr|rtl);"><\/span>/g;
      if (isempty.test(text)){
        if (ocr.length > 0 && storyboard){
          text = ocrtext
        } else {
          text = ''
        }
      }
    }
    return {'anno':text, 'transcription': ocrtext};
  },
  getExtension: function (tile) {
    return tile.split('?')[0].split('.').slice(-1)[0].toLowerCase();
  },
  getTileFormat: function(tilesource) {
    var extension = this.getExtension(tilesource)
    if (this.imageextensions.includes(extension)){
        tilesource = { type: 'image', url:  `${tilesource}` }
    }
    return tilesource;
  },
  isURL: function(annotationurl, settings) {
    var parseString = this.parseInput(annotationurl);
    var isURL = parseString.constructor === String ? true : false;
    var id = settings.customid ? settings.customid : annotationurl
    if (!isURL) {
      id = settings.customid ? settings.customid : parseString['@id'] ? parseString['@id'] : parseString['id'] ? parseString['id'] : Math.random().toString(36).substring(7);
    }
    id = id.replace(/\/\s*$/, "").split("/").pop().replace("-list", "").replace(".json","")
    return {'isURL': isURL, 'json': parseString, 'id': id};
  },
  parseInput: function(annotation) {
    try {
      return JSON.parse(document.getElementById(annotation).innerHTML)
    }
    catch(err) {
      return annotation;
    }
  },
  flatten: function(array, element) {
    if (element) {
      return array.reduce((acc, val) => acc.concat(val[element]), [])
    } else {
      return array.reduce((acc, val) => acc.concat(val), [])
    }
  },
  keyboardShortcuts: function(type, vueinfo){
    var buttons = vueinfo.buttons;
    var shortcuts = {
      'autorun': {'icon': buttons['autorunbutton'], 'label': 'Auto Run', 'shortcut': ['b', '1']},
      'info': {'icon': buttons['info'], 'label': 'Info Button', 'shortcut': ['i', '2']},
      'overlay': {'icon': buttons['overlaybutton'], 'label': 'Toggle', 'shortcut': ['o', '4']},
      'zoomin' : {'icon': '<i class="fas fa-search-plus"></i>', 'label': 'Zoom In', 'shortcut': ['z', '+', 'shift+up']},
      'zoomout' :{'icon': '<i class="fas fa-search-minus"></i>', 'label': 'Zoom Out', 'shortcut': ['m', '-', 'shift+down']},
      'home' : {'icon': '<i class="fas fa-home"></i>', 'label': 'Home', 'shortcut': ['h', '0']},
      'prev' : {'icon': '<i class="fa fa-arrow-left"></i>', 'label': 'Previous', 'shortcut': ['p', ',', 'shift+left']},
      'next' : {'icon': '<i class="fa fa-arrow-right"></i>', 'label': 'Next', 'shortcut': ['n', '.', 'shift+right']},
      'fullscreen' : {'icon': buttons['expandbutton'], 'label': 'Fullscreen', 'shortcut': ['alt+f', ';']},
      'close' : {'icon': '<i class="fas fa-times"></i>', 'label': 'Close', 'shortcut': ['x', '6']},
      'hide' : {'icon': buttons['hide_button'], 'label': 'Collapse text', 'shortcut': ['c', '7']},
      'shortcut' : {'icon': buttons['keyboard'], 'label': 'Keyboard Shortcuts', 'shortcut': ['s', '8']}
    }
    if ((type == 'storyboard' && Object.keys(vueinfo.tagslist).length > 0) || (type=='multistoryboard' && vueinfo.tags)){
      shortcuts['tags'] = {'icon': buttons['tags'], 'label': 'Tags', 'shortcut': ['t', '3']};
    }
    if ((type == 'storyboard' && vueinfo.layerslist.length > 0) || (type=='multistoryboard' && vueinfo.layerslist)){
      shortcuts['layers'] = {'icon': buttons['layer'], 'label': 'Layers', 'shortcut': ['l', '5']};
    }
    if (vueinfo.settings.tts){
      shortcuts['playpause'] = {'icon': buttons['playpause'], 'label': 'Play/Pause', 'shortcut': ['r', '9']}
    }
    if(vueinfo.$parent.range){
      shortcuts['prevanno'] = {'icon': '<i class="fa fa-chevron-left"></i>', 'label': 'Previous Annotation', 'shortcut': vueinfo.$parent.prevshortcut};
      shortcuts['nextanno'] = {'icon': '<i class="fa fa-chevron-right"></i>', 'label': 'Next Annotation', 'shortcut': vueinfo.$parent.nextshortcut};
    }
    var hasocr = this.flatten(vueinfo.annotations.map(element=>element.ocr));
    var hastext = this.flatten(vueinfo.annotations.map(element=>element.textual_body));
    if (hasocr.length > 0 && hastext.length > 0){
      shortcuts['transcription'] = {'icon': buttons.anno, 'label': 'Toggle between transcription/annotation', 'shortcut': ['a', '/']};
    }
    var removefields = Object.keys(vueinfo.settings).filter(element => element.indexOf('hide_') > -1);
    for (var hd=0; hd<removefields.length; hd++){
      if (vueinfo.settings[removefields[hd]]){
        var field = removefields[hd];
        var removefield = field.split("_").slice(-1)[0].split("button")[0];
        delete shortcuts[removefield];
        if (removefield == 'next') {
          delete shortcuts['prev']
        }
      }
    }
    return shortcuts;
  }
}
