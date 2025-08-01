import rtlDetect from 'rtl-detect';
import constants from './constants';

export default {
  textoverlay:{
    'opacity': 100,
    'fontcolor': '#000000',
    'background': 'none'
  },
  buttons: {
    'autorun': '<i class="fas fa-magic"></i>',
    'autorunoff': '<i class="fas fa-stop-circle"></i>',
    'overlay': '<i class="fas fa-toggle-off"></i>',
    'overlayoff': '<i class="fas fa-toggle-on"></i>',
    'textoverlay': '<i class="fas fa-align-justify"></i>',
    'annooff': '<i class="fas fa-pen-nib"></i>',
    'anno': '<i class="fas fa-file-alt"></i>',
    'hide' : '<i class="fas fa-caret-up"></i>',
    'hideoff' : '<i class="fas fa-caret-down"></i>',
    'collapsehide' : '<i class="fas fa-caret-left"></i>',
    'collapsehideoff' : '<i class="fas fa-caret-right"></i>',
    'playpause': '<i class="fas fa-play"></i>',
    'playpauseoff': '<i class="fas fa-pause"></i>',
    'tags': '<i class="fas fa-tag"></i>',
    'reload': '<i class="fas fa-redo"></i>',
    'info': '<i class="fas fa-info-circle"></i>',
    'layers': '<i class="fas fa-layer-group"></i>',
    'keyboard': '<i class="fas fa-keyboard"></i>',
    'rangeprev' : '<i class="fas fa-chevron-left"></i>',
    'rangenext': '<i class="fas fa-chevron-right"></i>',
    'perpage': '<i class="fas fa-book-open"></i>',
    'fullscreen': '<i class="fas fa-expand"></i>',
    'fullscreenoff': '<i class="fas fa-compress"></i>',
    'settings': '<i class="fas fa-cog"></i>'
  },
  booleanitems: {
    isexcerpt: false,
    isoverlaytoggled: false,
    istextoverlaytoggled: false,
    annoinfoshown: false,
    imageinfoshown: false,
    additionalinfoshown: false,
    tocshown: false,
    istranscription: false,
    collectioninfoshown: false
  },
  objectToNewObject: function(object) {
    return JSON.parse(JSON.stringify(object));
  },
  imageextensions: ['jpeg', 'jpg', 'png', 'svg', 'bmp', 'gif', 'apng', 'avif', 'jfif', 'pjpeg', 'pjp', 'webp', 'ico', 'cur'],
  //gets on structure for annotation; gets contents of the annotation 'on' field and places it into a list for multi image.
  on_structure: function(anno){
    if (!anno['on'] || typeof anno['on'] === 'undefined'){
      return undefined;
    } else if (anno['on'].constructor.name === 'Array'){
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
        value = value && value.constructor.name == 'String' ? this.tryJsonParse(value) : value;
        settings[keyvalue[0].trim()] = value;
      }
    }
    if (settings.annoview == 'scrollview'){
      settings.startposition = settings.startposition != undefined ? settings.startposition : 1;
      settings.hide_nextbuttons = settings.hide_nextbuttons != undefined ? settings.hide_nextbuttons : true;
    }

    if (Object.keys(settings).join("").indexOf('toggle') > -1 && vueinfo.booleanitems){
      const toggles = ['overlay', 'textoverlay']
      for (var tog=0;tog<toggles.length; tog++){
        const togglesetting = settings[`toggle${toggles[tog]}`];
        if (togglesetting){
          vueinfo.booleanitems[`is${toggles[tog]}toggled`] = togglesetting;
        }
      }
    }
    if (Object.keys(settings).join("").indexOf('textoverlay') > -1 && vueinfo.textoverlay) {
      const fields = ['opacity', 'fontcolor', 'background']
      for (var fi=0; fi<fields.length; fi++){
        const setting = settings[`textoverlay${fields[fi]}`];
        if (setting){
          vueinfo.textoverlay[fields[fi]] = setting;
        }
      }
    }
    if (settings.tagscolor) {
      settings.tagscolor = Object.keys(settings.tagscolor).reduce((out, key) => {
        out[this.tagsToClass(key)] = settings.tagscolor[key]
        return out;
      }, {});
    }
    return settings;
  },
  parseCharValue: function(value) {
    try {
      const parsevalue = JSON.parse(value);
      if (parsevalue.constructor.name != 'Array' || parsevalue.constructor.name != 'Object'){
        return value;
      }
      const context = parsevalue['@context'];
      var newvalue = ''
      for (var key in parsevalue){
        if (key != '@context'){
          newvalue += `<div class="${context ? context[key] : key}">${key}: ${parsevalue[key]}</div>`
        }
      }
      return newvalue;
    } catch(err) {
      return value;
    }
  },
  stripHTML: function(text){
    var div = document.createElement("div");
    div.innerHTML = text;
    return (div.textContent || div.innerText || "").trim();
  },
  colorDict: function (styleContent, styleclass) {
    var colordict = {}
    var stylesheet = ''
    var doc = document.implementation.createHTMLDocument(""),
    styleElement = document.createElement("style");
    styleElement.textContent = styleContent;
    doc.body.appendChild(styleElement);
    var rules = styleElement.sheet.cssRules;
    for (var r=0; r<rules.length; r++){
       var reg="." + styleclass + "[. {]";
       var regextest = new RegExp(reg);
       if (regextest.test(rules[r].cssText)){
         const tag = rules[r].selectorText.replaceAll('.', '').replace(styleclass, "").trim();
         colordict[tag] = rules[r].style.color;
         stylesheet += rules[r].cssText;
       }
    }
    return {'colordict': colordict, 'stylesheet': stylesheet};
  },
  tagsToClass: function(tag) {
    var regex = "-?[_a-zA-Z]+[_a-zA-Z0-9-]*";
    var group = tag && tag.group ? tag.group : '';
    tag = tag && tag.value ? tag.value : tag;
    if (tag.length > 0){
      return [...`${group ? group.toLowerCase() : group}${tag.toLowerCase()}`.matchAll(regex)].join("");
    } else {
      return ''
    }
  },
  groupToClass: function(group) {
    var regex = "-?[_a-zA-Z]+[_a-zA-Z0-9-]*";
    return [...`${group ? group.toLowerCase() : group}`.matchAll(regex)].join("");
  },
  getLongEdge: function(viewer) {
    const size = viewer.world.getItemAt(0).getContentSize();
    const checkviewer = viewer.viewport.viewerElementToImageCoordinates(viewer.viewport.getContainerSize());
    const newheight = checkviewer['x']/size['x']*size['y'];
    if (size['y']-checkviewer['y'] > size['x']-checkviewer['x'] && newheight - checkviewer['y'] > 0) {
      return 'vertical';
    }  else {
      return 'horizontal';
    }
  },
  // Get ocr, text, tags, languages, authors, and type of annotation;
  //Will go through the annotation resource (oa) or body (w3 annotation) field to get various fields
  //Looks at type in resource field to define which item the resource belongs to.
  chars: function(anno, currentlang='') {
    var res = anno.body ? anno.body : anno.resource ? anno.resource : '';
    var textual_body = [];
    var tags = [];
    var ocr = [];
    var shapetype;
    var langs;
    var authors = [];
    var geometry;
    var stylesheet;
    var styles = anno.stylesheet ? anno.stylesheet.value : '';
    var charclass = anno.target && anno.target.styleClass ? anno.target.styleClass : '';
    if (styles && anno.stylesheet.type.toLowerCase() == 'cssstylesheet') {
      var colordict = this.colorDict(styles, anno.target.styleClass)
      styles = colordict['colordict'];
      stylesheet = colordict['stylesheet'];
    } 
    var label = anno.label ? anno.label : anno.resource && anno.resource.label ? anno.resource.label : undefined;
    res = [].concat(res);
    anno.bodyValue ? textual_body.push(anno.bodyValue) : '';
    for (var i=0; i < res.length; i++){
      var res_data = res[i];
      var typefield = Object.keys(res_data)[Object.keys(res_data).findIndex(element => element.includes("type"))];
      var type = res_data[typefield];
      var value = res_data['value'] ? res_data['value'] : res_data['@value'] ? res_data['@value'] : res_data['chars'];
      var purpose = res_data['purpose'] ? res_data['purpose'].split("#").slice(-1)[0] : anno['motivation'] && !Array.isArray(anno['motivation']) ? anno['motivation'] : type;
      purpose = purpose ? purpose.toLowerCase() : purpose;
      if (res_data.selector){
        shapetype = res_data.selector.value;
      }
      if (res_data['geometry']) {
        geometry = res_data['geometry'];
      }
      if (value) {
        var id = res_data['@id'] ? res_data['@id'] : res_data['id'] ? res_data['id'] : '';
        value = decodeURIComponent(escape(unescape(encodeURIComponent(value))));
        id ? value = `<a href="${id}" target="_blank">${value}</a?>` : '';
        value = this.parseCharValue(value);
        if (res_data.creator || res_data['annotatedBy'] || res_data['oa:annotatedBy']){
          var sectionauthor = this.getAuthor(res_data).split(", ");
          value += purpose != 'tagging' && type !== 'oa:Tag' ? `<div class="authorship">Written by: ${[... new Set(sectionauthor)].join(", ")}</div>` : '';
        }
        if (type === 'TextualBody'){
          if (purpose === 'tagging'){
            tags.push({'value': value, 'group': ''});
          } else if (purpose == 'transcribing' || purpose == 'supplementing'){
            ocr.push(value);
          } else {
            textual_body.push(`<div class="${purpose}">${value}</div>`);
          }
        } else if (type === 'oa:Tag'){
          tags.push({'value': value, 'group': ''});
        } else if (type === 'dctypes:Dataset' || type === 'Dataset') {
          if (res_data['@id']){
            textual_body.push(`<a href="${res_data['@id']}">Download dataset (${res_data['format']})</a>`)
          } else if (purpose == 'tagging') {
            tags.push(res_data['value'])
          } else if (purpose == 'transcribing' || purpose == 'supplementing'){
            ocr.push(res_data['value'])
          } else {
            textual_body.push(`<div class="${purpose}">${value}</div>`)
          }
        } else if (type === 'cnt:ContentAsText' && (type.toLowerCase() === purpose || purpose.indexOf('painting') > -1)) {
          ocr.push(value);
        } else {
          textual_body.push(`<div class="${purpose}">${value}</div>`);
        }
      } else if (type === 'Choice') {
        langs = res_data['items'].map(element => `<option value="${element['language']}"${currentlang.indexOf(element['language']) > -1 || navigator.language.indexOf(element['language']) > -1 ? ' selected' : ''}>${constants.getLangLabel(element['language'])}</option>`);
        var values = [];
        res_data['items'].map(element => values.push(this.createItemsDict(purpose, element)));
        textual_body = textual_body.concat(values)
      } else if (type === 'dctypes:Image' || type === 'Image') {
        var imgdata = `<img src="${this.getId(res_data)}">`
        imgdata += res_data['attribution'] ? `<div class="attribution">${res_data['attribution']}</div>` : ''
        imgdata += res_data['description'] ? `<div class="caption">${res_data['description']}</div>` : ''
        textual_body.push(imgdata);
      }
    }
    authors = this.getAuthor(anno);
    return {'ocr': ocr, 'textual_body':textual_body,
      'tags':tags, 'type': shapetype, 'languages':langs,
      'label':label, 'language': res_data ? res_data['language'] : '',
      'authors': authors, 'styles': styles, 'stylesheet':  stylesheet,
      'itemclass': charclass, 'geometry': geometry};
  },
  createItemsDict: function(purpose, element) {
    var value = decodeURIComponent(escape(unescape(encodeURIComponent(element['value']))));
    var dict = {'purpose': purpose, 'language': element['language'], 'value': value}
    return dict;
  },
  selectorParser: function(selector) {
    var item = selector.item ? selector.item.value : selector.default ? selector.default.value : selector.value;
    var svg_overlay = this.getSVGoverlay(item);
    if (svg_overlay){
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.id = 'getBounds';
      svg.appendChild(svg_overlay)
      var element = document.getElementsByClassName('annonaview');
      element = element.length > 0 ? element[0] : document.getElementsByTagName('body')[0];
      element.appendChild(svg);
      const bounds = document.getElementById('getBounds').getBBox();
      element.removeChild(svg)
      return {'bounds':`${bounds['x']},${bounds['y']},${bounds['width']},${bounds['height']}`, 'svg': svg_overlay}
    } else {
      return {'bounds': item.split("=").slice(-1)[0], 'svg': undefined}
    }
  },
  findLimits: function(path, xywh) {
    var l = path.getTotalLength();
    const pt1 = path.getPointAtLength(0);
    const lstpt = path.getPointAtLength(l);
    var point1 = {'p': 0, 'x': pt1['x'], 'y': pt1['y']};
    var point2 = {'p': l, 'x': lstpt['x'], 'y': lstpt['y']};
    var point3 = {'p': 0, 'x': pt1['x'], 'y': pt1['y']};
    var point4 = {'p': 0, 'x': lstpt['x'], 'y': lstpt['y']};
    const leftbottom = {'x': xywh[0], 'y': xywh[1]+xywh[3]}
    const lefttop = {'x': xywh[0], 'y': xywh[1]}
    const rightbottom = {'x': xywh[0]+xywh[2], 'y': xywh[1]+xywh[3]}
    const righttop = {'x': xywh[0]+xywh[2], 'y': xywh[1]}
    for (var p = 0; p < l; p++) {
      var coords = path.getPointAtLength(p);
      var dict = {'p': p, 'x': coords['x'], 'y': coords['y'] };

      if (this.diffpt(coords, leftbottom) <= this.diffpt(point1, leftbottom)){
        point1 = dict;
      }
      if (this.diffpt2(coords, rightbottom) <= this.diffpt2(point2, rightbottom)){
          point2 = dict;
      }
      if (this.diffpt2(coords, lefttop) <= this.diffpt2(point3, lefttop)){
        point3 = dict;
      }
      if (this.diffpt2(coords, righttop) <= this.diffpt2(point4, righttop)){
        point4 = dict;
      }
    }
    return {'start': point1, 'end': point2, 'topleft': point3, 'topright': point4}
  },
  diffpt: function(coords, point) {
    const diffpt =Math.sqrt(((point['x']-coords.x)**2) + ((point['y']-coords.y)**2))
    return diffpt;
  },
  diffpt2: function(coords, point2) {
    var diffpt2 = Math.abs(coords['x']-point2['x']) + Math.sqrt(((point2['x']-coords.x)**2) + ((point2['y']-coords.y)**2));
    return diffpt2;
  },
  polyToPath: function(poly) {
    var path = document.createElementNS("http://www.w3.org/2000/svg","path");
    var pathdata = 'M'+poly.getAttribute('points');
    if (poly.tagName=='polygon') pathdata+='z';
    path.setAttribute('d',pathdata);
    return path;
  },
  findSVGcoords: function(svg_overlay, xywh) {
    var limits;
    try {
      if (svg_overlay.points){
        svg_overlay = this.polyToPath(svg_overlay);
      }
      limits = this.findLimits(svg_overlay, xywh);
    } catch (except){
      return {'path': 'M'}
    }
    var fontsize;
    const leftside = Math.sqrt(((limits['start']['x']-limits['topleft']['x'])**2) + ((limits['start']['y']-limits['topleft']['y'])**2));
    const rightside = Math.sqrt(((limits['end']['x']-limits['topright']['x'])**2) + ((limits['end']['y']-limits['topright']['y'])**2));
    fontsize = leftside > rightside ? leftside : rightside;
    const subtract = (limits['start']['p']- limits['end']['p']);
    var start = limits['start']['p'];
    var end = limits['end']['p'];
    var reverse = false;
    if (subtract < 0){
      start = limits['end']['p'];
      end = limits['start']['p'];
      reverse = true;
    }
    var path = ''
    for (var p = start; p > end; p--) {
     var coords = svg_overlay.getPointAtLength(p);
     path += `${coords['x']},${coords['y']} `;
    }
    path = reverse ? path.split(" ").reverse().join(" ").trim() :path;
    var newsvgpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    newsvgpath.setAttribute('d', 'M' + path.trim());
    var length = newsvgpath.getTotalLength();
    var id = svg_overlay.id ? svg_overlay.id : Math.random().toString(36).substring(2,7);
    id += '-ocrtextoverlaypath'
    return {'path': 'M' + path.trim(), 'fontsize': fontsize*1.1, 'textLength': length, 'pathid': id};
  },
  createPath: function(svgpath) {
    var path = document.createElement('path');
    path.setAttribute('d', svgpath.getAttribute('d'));
    return path;
  },
  textOverlayHTML: function(xywh, ocrlist, svgpath=false){
    var svgitems = ''
    if (svgpath){
      svgitems = this.findSVGcoords(svgpath, xywh);
    }
    var ocr = this.stripHTML(ocrlist.join('\n').replace(/<div class="authorship">[\s\S]*?<\/div>/g, ''))
    const multiline = ocr.split('\n');
    var innerHTML = '';
    if (svgitems && svgitems['path'] != 'M' && multiline.length < 2){
      const svgfill = svgpath.getAttribute('d') ? this.createPath(svgpath) : svgpath;
      svgfill.setAttribute("style", "z-index:-1;");
      svgfill.setAttribute('fill', 'none');
      svgfill.setAttribute('stroke', 'none');
      svgfill.classList = 'svgBackground';
      innerHTML = `
      ${svgfill.outerHTML}
      <def>
      <path id="${svgitems['pathid']}" d="${svgitems['path']}" fill="none"  stroke-width="30" stroke="red"/>
      </def>
      <text class="textOverlayText" textLength="${svgitems['textLength']}" font-size="${svgitems['fontsize']}" lengthAdjust="spacingAndGlyphs">
        <textPath textLength="${svgitems['textLength']}" font-size="${svgitems['fontsize']}" xlink:href="#${svgitems['pathid']}" text-anchor="start" lengthAdjust="spacingAndGlyphs">
          ${ocr}
        </textPath>
      </text>
      `
    } else {
      const x = xywh[0];
      const y = xywh[1]+xywh[3];
      const shouldbemultiline = xywh[3]/multiline.length > 10;
      if (shouldbemultiline){
        for (var nl=0; nl<multiline.length; nl++){
          const fontsize = xywh[3]/multiline.length;
          const y = xywh[1] + (fontsize*(nl+1));
          innerHTML +=
          `<text class="textOverlayText" textLength="${xywh[2]}" font-size="${fontsize}" x="${xywh[0]}" y="${y}" lengthAdjust="spacingAndGlyphs">
            ${multiline[nl]}
          </text>`
        }
      } else {
        innerHTML = `
        <text class="textOverlayText" x="${x}" y="${y}" textLength="${xywh[2]}" font-size="${xywh[3]*1.1}" lengthAdjust="spacingAndGlyphs">
            ${ocr}
        </text>
      `
      }
    }
    return innerHTML;
  },
  //get canvas information and section of image annotated.
  //Looks at selector field to see if selector exists and portion of the canvas is defined in the field.
  //Tries to find the canvas defined in the annotation.
  //Looks at canvasId to see if section of image is defined in the canvasId
  canvasRegion: function(canvasId, ondict){
    var canvasRegion;
    var svg;
    var ispct = false;
    if (ondict && ondict.selector) {
       var parser = this.selectorParser(ondict.selector);
       canvasRegion = parser['bounds'];
       svg = parser['svg'];
    }
    if (canvasId && typeof canvasId !== 'string'){
      if (canvasId.selector){
        var canvasSelector = canvasId.selector;
        if (canvasId.selector.constructor === Array){
          var selectors = canvasId.selector.filter(element => element.value.indexOf('svg') > -1);
          selectors = selectors.length > 0 ? selectors : canvasId.selector.filter(element => element.value.indexOf('xywh') > -1);
          canvasSelector = selectors[0];
        }
        var ciparser = this.selectorParser(canvasSelector);
        canvasRegion = ciparser['bounds'];
        svg = ciparser['svg'];
      }
      if (canvasId['source']){
        var hasId = canvasId.source.constructor.name == 'String' ? canvasId.source : this.getId(canvasId.source);
        canvasId = hasId.constructor.name == 'String' ? canvasId.source : canvasId;
      }
      canvasId = this.getId(canvasId);
    }
    if (canvasId && canvasId.indexOf("#xywh") > -1){
      canvasRegion = canvasId.split("#")[1].split("=")[1];
      if (canvasId.indexOf("pct") > -1){
        ispct = true;
      }
      canvasId = canvasId.split("#")[0];
    } 
    if (!canvasRegion || canvasRegion.trim() === '') {
      canvasRegion = "full";
    }
    if (canvasRegion && canvasRegion.indexOf("percent") > -1){
      ispct = true;
    }
    canvasRegion != 'full' ? canvasRegion = canvasRegion.split(",").map(element => element.replace(/[^0-9.]/g, '')).join(",") : "";
    if (ispct) {
      canvasRegion = `pct:${canvasRegion}`
    }
    return {'canvasId':canvasId.replace("/info.json", ""), 'canvasRegion':canvasRegion, 'svg': svg};
  },
  //get the manifest link from annotation;
  //looks at specific fields for the manifest associated with the annotation.
  // partof and partofmain looks at two different poritions of the annotation to see if any field contains 'partof'.
  //The partof field defines the manifest but tends to have some parity in terms of formating people use (partOf, dcterms:partOf).
  manifestlink: function(manifesturl, anno, responsedata) {
    var manifestlink;
    if (manifesturl === undefined || manifesturl === ''){
      var on_structure = this.on_structure(anno);
      on_structure = on_structure ? on_structure[0] : on_structure;
      var target_dict = anno['target'] ? anno['target'] : on_structure;
      if (target_dict){
        var partoffield = Object.keys(target_dict)[Object.keys(target_dict).findIndex(element => element.toLowerCase().includes("partof"))];
        var partof = partoffield ? target_dict[partoffield] : '';
        var partofmain = Object.keys(responsedata)[Object.keys(responsedata).findIndex(element => element.toLowerCase().includes("partof"))];
        if (!partof && target_dict['source']) {
          partoffield = Object.keys(target_dict['source'])[Object.keys(target_dict['source']).findIndex(element => element.toLowerCase().includes("partof"))];
          var partof = partoffield ? target_dict['source'][partoffield] : '';
        }
      }
      partof = partof ? partof : anno['partOf'];
      var manifest_dict = partof && Array.isArray(partof) ? partof[0] : partof ? partof : partofmain ? responsedata[partofmain] : on_structure ? on_structure['within']: undefined;
      manifest_dict = manifest_dict ? manifest_dict : responsedata['within'] ? responsedata['within']['within'] : '';
      manifestlink = this.getId(manifest_dict);
    } else {
      manifestlink = manifesturl;
    }
    return manifestlink;
  },
  getAnnotations: function(annotation){
    var anno = annotation.resources ? annotation.resources : annotation.items ? annotation.items : annotation;
    anno = [].concat(anno);
    return anno;
  },
  getValueField: function(element) {
    if (element){
      return element['@value'] ? element['@value'] : element['value'] ? element['value'] : element;
    }
  },
  parseMetaFields: function(value, lang=false) {
    var fieldvalue = '';
    if (value){
      var language = lang ? lang : window.navigator.language.split("-")[0];
      var splitlang = language ? language.split("-")[0] : '';
      fieldvalue = Array.isArray(value) && language ? value.filter(elem => this.getField(elem, 'language') === language || this.getField(elem, 'language') === splitlang) : value;
      fieldvalue = fieldvalue.constructor.name == 'Object' && fieldvalue[language] ? fieldvalue[language] : fieldvalue;
      fieldvalue = fieldvalue && fieldvalue.length > 0 ? fieldvalue : value;
      fieldvalue = Array.isArray(fieldvalue) ? fieldvalue.map(element => this.getValueField(element)).join("/") : fieldvalue;
      fieldvalue = this.getValueField(fieldvalue);
      fieldvalue = fieldvalue && fieldvalue.constructor.name == 'Object' ? Object.values(fieldvalue).join(" ") : fieldvalue;
    }
    return fieldvalue;
  },
  getField: function(elem, field) {
    return elem[`@${field}`] ? elem[`@${field}`] : elem[field] ? elem[field] : elem;
  },
  getHTMLMeta: function(canvas_data, link, label, settings, lang=false, ignoretitle=false){
    var title = ''
    var text = ''
    var description = canvas_data.description ? canvas_data.description : canvas_data.summary;
    var attribution = canvas_data.attribution ? canvas_data.attribution : canvas_data.requiredStatement;
    var metadata = [{'label':label, 'value' : `${ link ? `<a href="${link}" target="_blank">${link}</a>` : ''}`},{'label':'title', 'value': canvas_data.label}, {'label':'description', 'value': description },
    {'label': 'attribution', 'value': attribution},{'label': 'license', 'value': canvas_data.license}, {'label': 'rights', 'value': canvas_data.rights}]
    const metafields = ['metadata', 'seeAlso', 'rendering', 'homepage']
    for (var mf=0; mf<metafields.length; mf++){
      metadata = canvas_data[metafields[mf]] ? metadata.concat(canvas_data[metafields[mf]]) : metadata;
    }
    for (var j=0; j<metadata.length; j++){
      var labelvalue = metadata[j]['value'] && metadata[j]['value']['label'] ?  metadata[j]['value']['label'] : metadata[j]['label'];
      var label = this.parseMetaFields(labelvalue, lang);
      var value = this.parseMetaFields(metadata[j]['value'], lang);
      if (metadata[j]['type'] == 'Dataset' || metadata[j]['format']) {
        value = this.getId(metadata[j])
        value = value ? `<a href="${value}">${value}</a>` : '';
      }
      if (label === 'title' && j == 1 && !settings.title){
        title = value;
      }
      var titlecheck = ignoretitle ? label !== 'title' : true;
      if (value && value !== '' && titlecheck){
        text += `<div id="${label}">${label ? `<b>${label.charAt(0).toUpperCase() + label.slice(1)}: ` : `` }</b>${value}</div>`
      }
    }
    return {'title': title, 'text': text}
  },
  getCanvasId: function(anno){
    var ondict = this.on_structure(anno);
    var canvasId = '';
    if (anno.target) {
      canvasId = anno.target;
    } else if(ondict) {
      if (ondict[0] && ondict[0].full) {
        canvasId = ondict.map(element => element.full);
      } else if (ondict[0] && ondict[0].source) {
        canvasId = ondict.map(element => element.source);
      } else {
        canvasId = this.flatten(ondict);
      }
    }
    canvasId = [].concat(canvasId);
    return canvasId;
  },
  //get SVG path from annotation; looks at specific fields and gets the path without the SVG container from a field in the annotation.
  getSVGoverlay: function(selectoritem){
    var svg_path;
    if (selectoritem){
      var svg_elem = document.createElement( 'html' );
      svg_elem.innerHTML = selectoritem;
      var path = svg_elem.getElementsByTagName('path')[0];
      var svgitem = svg_elem.getElementsByTagName('svg')[0];  
      if (svgitem){
        path = svgitem.children[0];
      }
      svg_path = path;
    }
    return svg_path;
  },
  // parse author information; looks at creator field. Is going to be expanded to reflect OA standards
  getAuthor: function(annotation) {
    var authors = [];
    var authorfield = annotation.creator ? annotation.creator : annotation['annotatedBy'] ? annotation['annotatedBy'] : annotation['oa:annotatedBy'] ? annotation['oa:annotatedBy'] : '';
    authorfield = authorfield['name'] ? authorfield['name'] : authorfield['id'] ? authorfield['id'] : authorfield;
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
  getTagDict: function(tags, settings, checked, existingtaglist=false) {
    var tagdict = {}
    for (var tc=0; tc<tags.length; tc++){
      var tagvalue = tags[tc].value ? tags[tc].value : tags[tc];
      var group = tags[tc].group ? this.groupToClass(tags[tc].group) : '';
      var set_color;
      if (tagvalue != '' && tagvalue){
        var tagclassvalue = this.tagsToClass(tags[tc]);
        if(existingtaglist) {
          set_color = existingtaglist[tagclassvalue];
          set_color = set_color ? set_color.color : existingtaglist[group] ? existingtaglist[group].color : false;
        }
        if (settings.tagscolor) {
          set_color = settings.tagscolor[tagclassvalue];
          set_color = set_color ? set_color : settings.tagscolor[group];
        }
        var randomcolor = set_color ? set_color : '#'+Math.random().toString(16).substr(-6);
        if (group && !settings.tagscolor[group]) {
          settings.tagscolor[group] = randomcolor;
        }
        var count = tags.filter(i => this.tagsToClass(i) === tagclassvalue).length;
        tagdict[tagclassvalue] = {'color':randomcolor, 'checked': checked, 'group': tags[tc]['group'] ,'count': count, 'key': tagclassvalue, 'label': tagvalue.split("_").join(" ")};
      }
    }
    return tagdict;
  },

  groupBy: function(dict, f){
    return Object.values(dict).reduce((out, val) => {
      let getby = typeof f === 'function' ? '' + f(val) : val[f];
      let by = getby ? getby : ''
      let dict = out[by] = out[by] || {'count': 0, 'tags': [], 'checked': val.checked}
      dict['tags'].push(val);
      dict['tags'] = this.sortBy(dict['tags'], 'key')
      if (val.checked == false){
        dict['checked'] = false;
      }
      dict['color'] = val.color;
      dict['count'] += val['count'];
      return out;
    }, {});
  },
  sortBy: function(arry, field){
    return arry.sort((a, b) => (a[field] > b[field]) ? 1 : -1)
  },
  parseObject: function(object, currentlang) {
    if (object.constructor.name == 'Object'){
      const lang = currentlang ? currentlang : Object.keys(object)[0];
      const item = object[lang];
      return item.constructor.name == 'Array' ? item.join("\n") : item;
    }
    return object
  },
  //Create HTML element using chars data; This uses the data from the chars() function up above.
  //It takes the chars data and renders the data as an HTML object.
  createContent: function(annotation, currentlang, imageview=false) {
    var text = ''
    var annoreturntext = '';
    var annoreturntranscription = '';
    var filter = annotation ? Object.values(annotation).filter(el => el && el.length > 0) : [];
    if (filter.length > 0){
      var language = currentlang ? currentlang : annotation['language'];
      var direction = language && rtlDetect.isRtlLang(language) ? 'rtl' : 'ltr';
      var directiontext = `<span style="direction: ${direction};">`
      var oldtext = annotation['textual_body'];
      const title = annotation['label'] ? `<div class="title">${this.parseObject(annotation['label'], currentlang)}</div>` : ``;
      var ocr = annotation['ocr'];
      if (currentlang && oldtext[0] && oldtext[0]['language']) {
        var correctdata = oldtext.filter(element => element['language'] === currentlang);
        if(correctdata.length > 0){
          text = `<div class="${correctdata[0]['purpose']}">${correctdata[0]['value']}</div>`
        } else {
          var langtranslation = constants.getLangLabel(currentlang);
          text = `Translation not avaliable in "${langtranslation ? langtranslation : currentlang}"`;
        }
      } else {
        text = `${oldtext.join("")}`;
      }
      ocr = ocr.length > 0 ? `<div id="ocr">${ocr.join("")}</div>` : '';
      var authors = annotation['authors']? `<div class="authorship">Written by: ${annotation['authors']}</div>` : ''
      var tags = `${annotation['tags'].length > 0 ? `<div class="tags">Tags: ${annotation['tags'].map(tag => tag['value'] ? tag['value'] : tag).join(", ")}</div>` : ``}`

    var template = `${directiontext}`+
      `${title}`+
      `*replacementtext*${authors}`+
      `${!imageview ? tags : ''}`+
      `</span>` +
      `${annotation && annotation.stylesheet ? 
        `<style>${annotation.stylesheet}</style>` : ''}`.replace(/\s\s+/g, ' ');
    if (imageview && ocr) {
      text += ocr;
    } else if(!text && ocr) {
      text = ocr;
    }
    const empty = `${directiontext}</span>`;
    const annoreplacetext = template.replace('*replacementtext*', text);
    annoreturntext = annoreplacetext == empty ? '' : annoreplacetext;
    const annoreplacetranscript = ocr ? template.replace('*replacementtext*', ocr) : '';
    annoreturntranscription = annoreplacetranscript == empty ? '' : annoreplacetranscript;
    }
    return {'anno':annoreturntext, 'transcription': annoreturntranscription};
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
    if (annotationurl.constructor == String && annotationurl.indexOf('base64,') > -1){
      var stripdata = annotationurl.split('base64,').slice(-1)[0]
      annotationurl = JSON.parse(atob(stripdata))
    }
    var parseString = this.parseInput(annotationurl);
    var isURL = parseString.constructor === String ? true : false;
    var id = settings.customid ? settings.customid : annotationurl;
    if (!isURL) {
      id = settings.customid ? settings.customid : parseString['@id'] ? parseString['@id'] : parseString['id'] ? parseString['id'] : Math.random().toString(36).substring(7);
    }
    id = id.replace(/\/\s*$/, "").split("/").slice(-2).join("_").replace("-list", "").replace(".json","")
    return {'isURL': isURL, 'json': parseString, 'id': id.replace(/[~`!@#$%^&*()+={};:'"<>.,?]/g, '')};
  },
  parseInput: function(annotation) {
    try {
      return JSON.parse(document.getElementById(annotation).innerHTML)
    }
    catch(err) {
      return annotation;
    }
  },
  tryJsonParse: function(input) {
    try {
      return JSON.parse(input.replace(/'/g, '"'))
    }
    catch(err) {
      return input;
    }
  },
  flatten: function(array, element) {
    return constants.flatten(array, element);
  },
  getCanvasTile: function(image, addinfo=false) {
    var imgResource = image.resource ? image.resource : image.body ? image.body : image;
    imgResource = imgResource.items ? imgResource.items : imgResource;
    const iiifimage = imgResource && JSON.stringify(imgResource).indexOf('http://iiif.io/api/image/') > -1 ? true : false;
    imgResource = imgResource.constructor.name == 'Array' ? imgResource[0] : imgResource;
    var canvas_tile = imgResource.service && imgResource.service.constructor.name == 'Array' ? this.getId(imgResource.service[0]).split("/full/")[0] : imgResource.service ? this.getId(imgResource.service).split("/full/")[0] :this.getId(imgResource);
    canvas_tile = this.iiifOrImageCheck(canvas_tile, addinfo, iiifimage)
    return {'canvas_tile': canvas_tile, 'img_resource': imgResource};
  },
  iiifOrImageCheck: function(canvas_tile, addinfo, iiifimage=false){
    if (this.imageextensions.indexOf(this.getExtension(canvas_tile)) < 0 || iiifimage){
      canvas_tile += canvas_tile.slice(-1) !== '/' ? "/" : '';
      if (addinfo){
        canvas_tile += 'info.json'
      }
    }
    return canvas_tile
  },
  matchCanvasData: function(imagetitle, canvas, canvases, lang) {
    var title = imagetitle;
    var images = canvas.images ? canvas.images : this.flatten(canvas.items.map(element => element['items']));
    var allimages = images[0].body && images[0].body.items ? this.flatten(images.map(elem => elem['body']['items'])) : images[0].body && images[0].body.source ? this.flatten(images.map(elem => elem['body']['source'])) : images;
    for (var i=0; i<images.length; i++){
      if (images[i]['body'] && images[i]['body']['selector']) {
        allimages[i]['rotation'] = images[i]['body']['selector']['rotation'];
        allimages[i]['section'] = images[i]['body']['selector']['region'] ? images[i]['body']['selector']['region'].split(',').map(elem => parseInt(elem)) : '';
      }
    }
    title = canvas.label;
    title = this.getValueField(title);
    if (title && title.constructor.name == 'Object'){
      var lang = lang ? lang : Object.keys(title)[0];
      title = title[lang]
    }
    title = Array.isArray(title) ? title[0] : title;
    title = title && imagetitle.indexOf(title) == -1 && canvases.length !== 1  ? imagetitle += ': ' + title : imagetitle;
    return {'images': allimages, 'title': title, width: canvas.width || allimages[0].resource.width, height: canvas.height || allimages[0].resource.height}
  },
  getAllCanvases: function(manifest) {
    return manifest['items'] ? this.flatten(manifest['items']) : this.flatten(manifest['sequences'].map(element => element['canvases']));
  },
  getManifestAnnotations: function(canvas) {
    return canvas['otherContent'] ? canvas['otherContent'] : canvas['annotations'];
  },
  matchCanvas: function(manifest, canvas, imagetitle, images, lang) {
    var canvases = manifest.sequences ? manifest.sequences[0].canvases : manifest.items;
    var title = imagetitle;
    if (images){
      return this.matchCanvasData(imagetitle, images, canvases, lang)
    } else {
      for (var i = 0; i< canvases.length; i++){
        var cleancanvas = canvas.split('/canvas').slice(-1)[0];
        var canvregex = cleancanvas ? new RegExp(`${cleancanvas}$`,"g") : new RegExp(`${canvas}$`,"g");
        var cleanexisting = this.getId(canvases[i]).replace("https", "http").replace('/info.json', '');
        if (cleanexisting === canvas.replace("https", "http") || canvregex.test(cleanexisting)) {
          return this.matchCanvasData(imagetitle, canvases[i], canvases, lang)
        }
      }
    }
    return {'images': images, 'title': title}
  },
  getVersion: function(iiifcontent) {
    return iiifcontent['@context'] && iiifcontent['@context'].indexOf('2') == -1 ? '3' : '2';
  },
  //get full image URL
  getImages: function(baseImageUrl, canvasRegion, size, version='2', jpgformat='default.jpg'){
    var regExp = new RegExp("/+$");
    var fullvalue = version == '2' ? 'full' : 'max';
    var imageurlsize = size.split(',').filter(Boolean).length > 1 ? `${size.split(',')[0]},` : size;
    baseImageUrl = baseImageUrl.replace(regExp, "");
    var extension = this.getExtension(baseImageUrl);
    if (canvasRegion.split(',').length > 1 && canvasRegion.indexOf('pct') == -1){
      canvasRegion = canvasRegion.split(',').map(elem => parseInt(elem)).join(",")
    }
    size = size == 'full' ? fullvalue : size;
    imageurlsize = imageurlsize == 'full' ? fullvalue : imageurlsize;
    var imageurl = this.imageextensions.indexOf(extension) > -1 ? baseImageUrl : `${baseImageUrl}/${canvasRegion}/${imageurlsize}/0/${jpgformat}`;
    var fullImage = this.imageextensions.indexOf(extension) > -1 ? baseImageUrl : canvasRegion !== "full" ? `${baseImageUrl}/full/${size}/0/${jpgformat}` : '';
    return {'fullImage':fullImage, 'imageurl': imageurl};
  },
  keyboardShortcuts: function(type, vueinfo){
    var buttons = vueinfo.buttons;
    //openseadragon : a, f, s, d, r, R, w, arrows, 0, -, shift w, shift s,s shift up/down arrows
    //u, w are open
    var shortcuts = {
      'autorun': {'icon': buttons['autorun'], 'label': 'Start/Stop Autorun',
        'shortcut': ['b', '1'], 'function': {'function':'autoRun', 'args': ''}},
      'reload': {'icon': buttons['reload'], 'label': 'Reload',
        'shortcut': ['j', 'shift+1'], 'function': {'function':'reload', 'args': ''}},
      'info': {'icon': buttons['info'], 'label': 'View source image information',
        'shortcut': ['i', '2'], 'function': {'function': 'clickButton', 'args': 'info'}},
      'home' : {'icon': '<i class="fas fa-home"></i>', 'label': 'View full image',
        'shortcut': ['h', '0'], 'function': {'function': 'zoom', 'args': 'home'}},
      'zoomin' : {'icon': '<i class="fas fa-search-plus"></i>', 'label': 'Zoom In',
        'shortcut': ['z', '+', 'shift+ArrowUp'], 'function': {'function': 'zoom', 'args': 'in'}},
      'zoomout' :{'icon': '<i class="fas fa-search-minus"></i>', 'label': 'Zoom Out',
        'shortcut': ['m', '-', 'shift+ArrowDown'], 'function': {'function': 'zoom', 'args': 'out'}},
      'prev' : {'icon': '<i class="fa fa-arrow-left"></i>', 'label': 'Previous Annotation',
        'shortcut': ['p', ',', 'shift+ArrowLeft'], 'function': {'function': 'next', 'args': 'prev'}},
      'next' : {'icon': '<i class="fa fa-arrow-right"></i>', 'label': 'Next Annotation',
        'shortcut': ['n', '.', 'shift+ArrowRight'], 'function':{'function': 'next', 'args': 'next'}},
      'overlay': {'icon': buttons['overlay'], 'label': 'Toggle overlays',
        'shortcut': ['o', '4'], 'function': {'function': 'createOverlay', 'args': ''}},
      'keyboard' : {'icon': buttons['keyboard'], 'label': 'Toggle Keyboard Shortcuts',
        'shortcut': ['s', '8'], 'function': {'function': 'clickButton', 'args': 'keyboard'}},
      'settings': {'icon': buttons['settings'], 'label': 'Change settings',
      'shortcut': ['k', 'q'], 'function': {'function': 'clickButton', 'args': 'settings'}},
      'fullscreen' : {'icon': buttons['fullscreen'], 'label': 'Toggle Fullscreen',
        'shortcut': ['alt+f', ';'], 'function': {'function': 'toggle_fullscreen', 'args': ''}},
      'hide' : {'icon': buttons['hide'], 'label': 'Collapse text',
        'shortcut': ['c', '7'], 'function': {'function': 'hide', 'args': ''}},
      'close' : {'icon': '<i class="fas fa-times"></i>', 'label': 'Close',
        'shortcut': ['x', '6'], 'function': {'function': 'close', 'args': '', 'run': true}}
    }
    if ((type == 'storyboard' && Object.keys(vueinfo.tagslist).length > 0) || (type=='multistoryboard' && vueinfo.tags)){
      shortcuts['tags'] = {'icon': buttons['tags'], 'label': 'Toggle Tags',
        'shortcut': ['t', '3'], 'function': {'function': 'clickButton', 'args': 'tags'}};
    }
    if ((type == 'storyboard' && vueinfo.layerslist.length > 1) || (type=='multistoryboard' && vueinfo.layerslist)){
      shortcuts['layers'] = {'icon': buttons['layers'], 'label': 'View Avaliable Layers',
        'shortcut': ['l', '5'], 'function': {'function': 'clickButton', 'args': 'layers'}};
    }
    if (vueinfo.settings.tts){
      shortcuts['playpause'] = {'icon': buttons['playpause'], 'label': 'Play/Pause',
        'shortcut': ['v', '9'], 'function': {'function': 'playpause', 'args': ''}}
    }

    if(vueinfo.$parent.range && vueinfo.$parent.rangelist.length > 1){
      shortcuts['prevanno'] = {'icon': vueinfo.$parent.buttons.rangeprev, 'label': 'Previous Page',
        'shortcut': ['alt+p', 'alt+,', 'alt+ArrowLeft'], 'function': {'function': 'nextItemRange', 'args': 'prev'}, 'run': true};
      shortcuts['nextanno'] = {'icon': vueinfo.$parent.buttons.rangenext, 'label': 'Next Page',
        'shortcut': ['alt+n', 'alt+.', 'alt+ArrowRight'], 'function': {'function': 'nextItemRange', 'args': 'next'}, 'run': true};
    }
    var annotation = type == 'storyboard' ? vueinfo.annotations : this.flatten(vueinfo.$children.map(board => board.annotations));
    var hasocr = this.flatten(annotation.filter(element=> element && element.ocr && element.ocr.length > 0));
    const hasocrandtext = annotation.some(elem => elem && elem.ocr && elem.ocr.length > 0 && elem.textual_body && elem.textual_body.length > 0 && elem.ocr != elem.textual_body);
    if (hasocr.length > 0){
      shortcuts['textoverlay'] = {'icon': buttons['textoverlay'], 'label': 'Show OCR text overlay settings box',
        'shortcut': ['g', 'alt+z'], 'function': {'function': 'clickButton', 'args': 'textoverlay'}}
      if (hasocrandtext){
        shortcuts['transcription'] = {'icon': buttons.anno, 'label': 'Toggle between transcription/annotation',
          'shortcut': ['e', '`'], 'function': {'function': 'toggletranscription', 'args': ''}};
      }
    }
    if (vueinfo.settings.perpage){
      shortcuts['perpage'] = {'icon': buttons.perpage, 'label': 'Switch the number of pages shown',
          'shortcut': ['y'], 'function': {'function': 'clickButton', 'args': 'perpage'}};
    }
    if (annotation.length == 0) {
      delete shortcuts['prev'];
      delete shortcuts['next'];
      delete shortcuts['overlay'];
      delete shortcuts['autorun'];
    }
    if (vueinfo.settings.perpage){
      if (vueinfo.settings.perpage > 1){
        delete shortcuts['autorun'];
      }
    } else if (vueinfo.settings.continousboard){
      delete shortcuts['autorun'];
    }
    var checkhere = vueinfo.basecompontent && vueinfo.basecompontent.range ? vueinfo.basecompontent : vueinfo;
    checkhere = checkhere.$parent && checkhere.$parent.$options.name == 'storyboard2' ? checkhere.$parent : checkhere;
    var isurl = checkhere.isurl;
    if (isurl == false) {
      delete shortcuts['reload']
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
  },
  getId: function(iddata) {
    return iddata['id'] ? iddata['id'] : iddata['@id'] ? iddata['@id'] : iddata;
  }
}
