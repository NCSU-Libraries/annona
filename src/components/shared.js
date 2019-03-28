export default {
  on_structure: function(anno){
    if (typeof anno['on'] === 'undefined'){
      return 'undefined';
    }
    else if (typeof anno['on'][0] !== 'undefined' && typeof anno['on'][0] !== 'string'){
      return anno['on'][0];
    } else {
      return anno['on'];
    }
  },
  getsettings: function(styling) {
    var settings = {};
    if (document.getElementById("config") !== null && document.getElementById("config").innerHTML != ''){
      settings = JSON.parse(document.getElementById("config").innerHTML);
    }
    if (styling) {
      settings = {}
      var items = styling.split(";");
      for (var j=0; j<items.length; j++){
        var keyvalue = items[j].split(":")
        var value = keyvalue[1].trim();
        value = value == 'false' ? false : value;
        value = value == 'true' ? true : value;
        value = parseInt(value) && parseInt(value).toString().length == value.length ? parseInt(value) : value;
        settings[keyvalue[0].trim()] = value;
      }
    }
    return settings;
  },
  chars: function(anno) {
    var res = anno.body ? anno.body : anno.resource;
    var textual_body = '';
    var tags = [];
    res = [].concat(res);
    for (var i=0; i < res.length; i++){
      var res_data = res[i];
      var value = res_data['value'] ? res_data['value'] : res_data['chars'];
      var type = Object.keys(res_data)[Object.keys(res_data).findIndex(element => element.includes("type"))];
      var purpose = res_data['purpose'] ? res_data['purpose'].split("#").slice(-1)[0] : res_data[type] ? res_data[type] : 'dctypes:text';
      purpose = purpose.toLowerCase()
      if (res_data[type] === 'TextualBody'){
        if (purpose === 'tagging'){
          tags.push(value);
        } else {
          textual_body += '<div class="' + purpose + '">' + value + '</div>';
        }
      } else if (res_data[type] === 'oa:Tag'){
        tags.push(value);
      } else if (res_data[type] !== 'cnt:ContentAsText') {
        textual_body += '<div class="' + purpose + '">' + value + '</div>';
      }
    }
    return {'textual_body':textual_body,'tags':tags};
  },
  ocr: function(anno){
    var res = anno.body ? anno.body : anno.resource;
    var chars = res['chars'] && res['@type'] === 'cnt:ContentAsText' ? res['chars'] : '';
    return unescape(encodeURIComponent(chars));
  },
  canvasRegion: function(canvasId){
    var canvasRegion;
    if (typeof canvasId !== 'string'){
      if (canvasId['source']){
        canvasRegion = canvasId.selector.value.split("=").slice(-1)[0];
        canvasId = canvasId.source;
      } else {
        canvasId = canvasId['id'] ? canvasId['id'] : canvasId['@id'];
      }
    }
    if (canvasId.indexOf("#xywh") > -1){
      canvasRegion = canvasId.split("#")[1].split("=")[1];
      canvasId = canvasId.split("#")[0];
    } else if (!canvasRegion) {
        canvasRegion = "full";
    }
    return {'canvasId':canvasId, 'canvasRegion':canvasRegion};
  },
  manifestlink: function(manifesturl, anno, responsedata) {
    var manifestlink;
    if (manifesturl === undefined){
      var target_dict = anno['target'] ? anno['target'] : this.on_structure(anno);
      var partof = Object.keys(target_dict)[Object.keys(target_dict).findIndex(element => element.toLowerCase().includes("partof"))];
      var partofmain = Object.keys(responsedata)[Object.keys(responsedata).findIndex(element => element.toLowerCase().includes("partof"))];
      var manifest_dict = partof ? target_dict[partof] : partofmain ? responsedata[partofmain] : this.on_structure(anno)['within'] ? this.on_structure(anno)['within'] : responsedata['within']['within'];
      manifestlink = manifest_dict['id'] ? manifest_dict['id'] : manifest_dict['@id'] ?  manifest_dict['@id'] : manifest_dict;
    } else {
      manifestlink = manifesturl;
    }
    return manifestlink;
  }
}