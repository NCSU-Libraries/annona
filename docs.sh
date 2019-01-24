cp dist/*.js* docs/dist/
node-sass src/iiif-annotation.scss docs/dist/iiif-annotation.css
cd docs
zip -r dist2.zip dist/ -x "*.md"


