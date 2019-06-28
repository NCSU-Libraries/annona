cp dist/js/* docs/stable/
cp dist/css/* docs/stable/
cd docs/stable/
rm dist2.zip
zip -r dist2.zip . -x "*.md"
