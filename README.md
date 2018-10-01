# iiif-annotation

## Use JavaScript library
# iiif dist

The steps to include the IIIF annotation embedder into any html page is as follows:

1. Add Vue and iiif-annotations.js into html page

`<script src="https://unpkg.com/vue"></script>`

`<script src="https://raw.github.ncsu.edu/doneill/iiif_annotation/master/dist/iiif-annotation.js?token=AAAqrcLLRLd8bYcIDoHDoLpsopKGbtNuks5bu8ITwA%3D%3D"></script>`

2. Add annotation tag and link to annotation url or annotation list url (see example below). If your annotation list does not include the manifest anywhere in the structure, a manifesturl must provided.

`<iiif-annotation annotationurl="annotation_url"></iiif-annotation>`

`<iiif-annotation annotationlist="annotationlist"></iiif-annotation>`

`<iiif-annotation annotationlist="annotationlist" manifesturl="manifesturl"></iiif-annotation>
`

3. Add settings if wanted

`<script id="config" type="application/json">{settings: setting}</script>`

The possible settings are:

		- view_larger
		- view_caption
		- view_full_object
		- view_ocr

By default these are all true. If you want to remove one of these settings enter false into the settings. i.e. if you want to remove everything the script would look as follows:

`<script id="config" type="application/json">{
  "view_larger":false,
  "view_caption":false,
  "view_full_object":false,
  "view_ocr":false
}</script>`

You only need to enter the settings you would like to remove.

## Contribute
### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Builds dist iiif-annotation custom field

```
npm run build-bundle
```
