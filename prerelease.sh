cp dist/js/* docs/latest/
cp dist/css/* docs/latest/
cd docs/latest
rm dist2.zip
zip -r dist2.zip . -x "*.md"
