cp dist/js/* docs/dist/
cp dist/css/* docs/dist/
cd docs
rm dist2.zip
zip -r dist2.zip dist/ -x "*.md"
