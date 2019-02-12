export default {
  on_structure: function(anno){
    if (typeof anno['on'] == 'undefined'){
      return 'undefined'
    }
    else if (typeof anno['on'][0] != 'undefined' && typeof anno['on'][0] != 'string'){
      return anno['on'][0]
    } else {
      return anno['on']
    }
  },
  chars: function(anno) {
    var res = anno.body ? anno.body : anno.resource;
    var textual_body = '';
    var tags = [];
    res = [].concat(res);
    for (var i=0; i < res.length; i++){
      var res_data = res[i];
      var value = res_data['value'] ? res_data['value'] : res_data['chars'];
      var type = Object.keys(res_data)[Object.keys(res_data).findIndex(element => element.includes("type"))]
      var purpose = res_data['purpose'] ? res_data['purpose'].split("#").slice(-1)[0] : res_data[type] ? res_data[type] : 'dctypes:text';
      purpose = purpose.toLowerCase()
      if (res_data[type] == 'TextualBody'){
        if (purpose == 'tagging'){
          tags.push(value);
        } else {
          textual_body += '<div class="' + purpose + '">' + value + '</div>';
        }
      } else if (res_data[type] == 'oa:Tag'){
        tags.push(value);
      } else if (res_data[type] != 'cnt:ContentAsText') {
        textual_body += '<div class="' + purpose + '">' + value + '</div>';
      }
    }
    return {'textual_body':textual_body,'tags':tags}
  },
  ocr: function(anno){
    var res = anno.body ? anno.body : anno.resource;
    var chars = res['chars'] && res['@type'] == 'cnt:ContentAsText' ? res['chars'] : '';
    return unescape(encodeURIComponent(chars));
  },
  canvasRegion: function(canvasId){
    if (typeof canvasId != 'string'){
      canvasId = canvasId['id'] ? canvasId['id'] : canvasId['@id'];
    }
    if (canvasId.indexOf("#xywh") > -1){
      var canvasRegion = canvasId.split("#")[1].split("=")[1];
      canvasId = canvasId.split("#")[0];
    } else {
        canvasRegion = "full";
    }
    return {'canvasId':canvasId, 'canvasRegion':canvasRegion};
  },
  manifestlink: function(manifesturl, anno, responsedata) {
    var manifestlink;
    if (manifesturl == undefined){
      var partof = Object.keys(responsedata)[Object.keys(responsedata).findIndex(element => element.toLowerCase().includes("partof"))]
      var on_dict = this.on_structure(anno);
      var manifest_dict = partof ? responsedata[partof] : on_dict.within ? on_dict.within : responsedata['within']['within'];
      manifestlink = manifest_dict['id'] ? manifest_dict['id'] : manifest_dict['@id'];
    } else {
      manifestlink = manifesturl;
    }
    return manifestlink;
  }
}
