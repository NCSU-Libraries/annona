cp dist/js/* docs/dist/
cp dist/css/* docs/dist/
cd docs
zip -r dist2.zip dist/ -x "*.md"
