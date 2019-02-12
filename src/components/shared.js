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
      var value;
      if (res_data['type'] == 'TextualBody' || res_data['@type'] ==  "dctypes:Text"){
        var purpose = res_data['purpose'] ? res_data['purpose'] : 'dctypes:text';
        value = res_data['value'] ? res_data['value'] : res_data['chars'];
        if (purpose == 'tagging'){
          tags.push(value);
        } else {
          textual_body += '<div class="' + purpose + '">' + value + '</div>';
        }
      } else if (res_data['@type'] == 'oa:Tag'){
        value = res_data['value'] ? res_data['value'] : res_data['chars'];
        tags.push(value);
      }
    }
    return {'textual_body':textual_body,'tags':tags}
  }
}
