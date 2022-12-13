export default {
getLangLabel: function(lang) {
    var getLabel = true;
    if (lang.length == 2) {
        lang = Object.keys(this.languages()).filter(elem => elem.split('-')[0] == lang)[0];
        getLabel = false;
    }
    const currentlang = this.languages()[lang];
    const returnvalue = currentlang && getLabel ? currentlang['label'] : currentlang ? currentlang['lang'] : lang;
    return returnvalue;
},
hexDict: function() {
    return {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};
},
languages: function() {
return {
    "ar-SA": {
      "label": "Arabic (Saudi Arabia)",
      "tag": "ar-SA",
      "lang": "Arabic",
      "region": "Saudi Arabia"
    },
    "bn-BD": {
      "label": "Bangla (Bangladesh)",
      "tag": "bn-BD",
      "lang": "Bangla",
      "region": "Bangladesh"
    },
    "bn-IN": {
      "label": "Bangla (India)",
      "tag": "bn-IN",
      "lang": "Bangla",
      "region": "India"
    },
    "cs-CZ": {
      "label": "Czech (Czech Republic)",
      "tag": "cs-CZ",
      "lang": "Czech",
      "region": "Czech Republic"
    },
    "da-DK": {
      "label": "Danish (Denmark)",
      "tag": "da-DK",
      "lang": "Danish",
      "region": "Denmark"
    },
    "de-AT": {
      "label": "Austrian German",
      "tag": "de-AT",
      "lang": "German",
      "region": "Austria"
    },
    "de-CH": {
      "label": "'Swiss' German",
      "tag": "de-CH",
      "lang": "German",
      "region": "Switzerland"
    },
    "de-DE": {
      "label": "Standard German (as spoken in Germany)",
      "tag": "de-DE",
      "lang": "German",
      "region": "Germany"
    },
    "el-GR": {
      "label": "Modern Greek",
      "tag": "el-GR",
      "lang": "Greek",
      "region": "Greece"
    },
    "en-AU": {
      "label": "Australian English",
      "tag": "en-AU",
      "lang": "English",
      "region": "Australia"
    },
    "en-CA": {
      "label": "Canadian English",
      "tag": "en-CA",
      "lang": "English",
      "region": "Canada"
    },
    "en-GB": {
      "label": "British English",
      "tag": "en-GB",
      "lang": "English",
      "region": "United Kingdom"
    },
    "en-IE": {
      "label": "Irish English",
      "tag": "en-IE",
      "lang": "English",
      "region": "Ireland"
    },
    "en-IN": {
      "label": "Indian English",
      "tag": "en-IN",
      "lang": "English",
      "region": "India"
    },
    "en-NZ": {
      "label": "New Zealand English",
      "tag": "en-NZ",
      "lang": "English",
      "region": "New Zealand"
    },
    "en-US": {
      "label": "US English",
      "tag": "en-US",
      "lang": "English",
      "region": "United States"
    },
    "en-ZA": {
      "label": "English (South Africa)",
      "tag": "en-ZA",
      "lang": "English",
      "region": "South Africa"
    },
    "es-AR": {
      "label": "Argentine Spanish",
      "tag": "es-AR",
      "lang": "Spanish",
      "region": "Argentina"
    },
    "es-CL": {
      "label": "Chilean Spanish",
      "tag": "es-CL",
      "lang": "Spanish",
      "region": "Chile"
    },
    "es-CO": {
      "label": "Colombian Spanish",
      "tag": "es-CO",
      "lang": "Spanish",
      "region": "Columbia"
    },
    "es-ES": {
      "label": "Castilian Spanish (as spoken in Central-Northern Spain)",
      "tag": "es-ES",
      "lang": "Spanish",
      "region": "Spain"
    },
    "es-MX": {
      "label": "Mexican Spanish",
      "tag": "es-MX",
      "lang": "Spanish",
      "region": "Mexico"
    },
    "es-US": {
      "label": "American Spanish",
      "tag": "es-US",
      "lang": "Spanish",
      "region": "United States"
    },
    "fi-FI": {
      "label": "Finnish (Finland)",
      "tag": "fi-FI",
      "lang": "Finnish",
      "region": "Finland"
    },
    "fr-BE": {
      "label": "Belgian French",
      "tag": "fr-BE",
      "lang": "French",
      "region": "Belgium"
    },
    "fr-CA": {
      "label": "Canadian French",
      "tag": "fr-CA",
      "lang": "French",
      "region": "Canada"
    },
    "fr-CH": {
      "label": "'Swiss' French",
      "tag": "fr-CH",
      "lang": "French",
      "region": "Switzerland"
    },
    "fr-FR": {
      "label": "Standard French (especially in France)",
      "tag": "fr-FR",
      "lang": "French",
      "region": "France"
    },
    "he-IL": {
      "label": "Hebrew (Israel)",
      "tag": "he-IL",
      "lang": "Hebrew",
      "region": "Israel"
    },
    "hi-IN": {
      "label": "Hindi (India)",
      "tag": "hi-IN",
      "lang": "Hindi",
      "region": "India"
    },
    "hu-HU": {
      "label": "Hungarian (Hungary)",
      "tag": "hu-HU",
      "lang": "Hungarian",
      "region": "Hungary"
    },
    "id-ID": {
      "label": "Indonesian (Indonesia)",
      "tag": "id-ID",
      "lang": "Indonesian",
      "region": "Indonesia"
    },
    "it-CH": {
      "label": "'Swiss' Italian",
      "tag": "it-CH",
      "lang": "Italian",
      "region": "Switzerland"
    },
    "it-IT": {
      "label": "Standard Italian (as spoken in Italy)",
      "tag": "it-IT",
      "lang": "Italian",
      "region": "Italy"
    },
    "ja-JP": {
      "label": "Japanese (Japan)",
      "tag": "ja-JP",
      "lang": "Japanese",
      "region": "Japan"
    },
    "ko-KR": {
      "label": "Korean (Republic of Korea)",
      "tag": "ko-KR",
      "lang": "Korean",
      "region": "Republic of Korea"
    },
    "nl-BE": {
      "label": "Belgian Dutch",
      "tag": "nl-BE",
      "lang": "Dutch",
      "region": "Belgium"
    },
    "nl-NL": {
      "label": "Standard Dutch (as spoken in The Netherlands)",
      "tag": "nl-NL",
      "lang": "Dutch",
      "region": "The Netherlands"
    },
    "no-NO": {
      "label": "Norwegian (Norway)",
      "tag": "no-NO",
      "lang": "Norwegian",
      "region": "Norway"
    },
    "pl-PL": {
      "label": "Polish (Poland)",
      "tag": "pl-PL",
      "lang": "Polish",
      "region": "Poland"
    },
    "pt-BR": {
      "label": "Brazilian Portuguese",
      "tag": "pt-BR",
      "lang": "Portugese",
      "region": "Brazil"
    },
    "pt-PT": {
      "label": "European Portuguese (as written and spoken in Portugal)",
      "tag": "pt-PT",
      "lang": "Portugese",
      "region": "Portugal"
    },
    "ro-RO": {
      "label": "Romanian (Romania)",
      "tag": "ro-RO",
      "lang": "Romanian",
      "region": "Romania"
    },
    "ru-RU": {
      "label": "Russian (Russian Federation)",
      "tag": "ru-RU",
      "lang": "Russian",
      "region": "Russian Federation"
    },
    "sk-SK": {
      "label": "Slovak (Slovakia)",
      "tag": "sk-SK",
      "lang": "Slovak",
      "region": "Slovakia"
    },
    "sv-SE": {
      "label": "Swedish (Sweden)",
      "tag": "sv-SE",
      "lang": "Swedish",
      "region": "Sweden"
    },
    "ta-IN": {
      "label": "Indian Tamil",
      "tag": "ta-IN",
      "lang": "Tamil",
      "region": "India"
    },
    "ta-LK": {
      "label": "Sri Lankan Tamil",
      "tag": "ta-LK",
      "lang": "Tamil",
      "region": "Sri Lanka"
    },
    "th-TH": {
      "label": "Thai (Thailand)",
      "tag": "th-TH",
      "lang": "Thai",
      "region": "Thailand"
    },
    "tr-TR": {
      "label": "Turkish (Turkey)",
      "tag": "tr-TR",
      "lang": "Turkish",
      "region": "Turkey"
    },
    "zh-CN": {
      "label": "Mainland China, simplified characters",
      "tag": "zh-CN",
      "lang": "Chinese",
      "region": "China"
    },
    "zh-HK": {
      "label": "Hong Kong, traditional characters",
      "tag": "zh-HK",
      "lang": "Chinese",
      "region": "Hond Kong"
    },
    "zh-TW": {
      "label": "Taiwan, traditional characters",
      "tag": "zh-TW",
      "lang": "Chinese",
      "region": "Taiwan"
    }
  }
}
}