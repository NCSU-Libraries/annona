rm -r docs/latest/
mkdir docs/latest/
cp -R dist/js/* docs/latest/
cp dist/css/* docs/latest/
cd docs/latest
zip -r dist2.zip . -x "*.md"
