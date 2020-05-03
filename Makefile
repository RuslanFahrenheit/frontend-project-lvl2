install:
	npm install

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run

run:
	npx babel-node src/bin/gendiff.js
