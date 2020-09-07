install: install-deps

install-deps:
	npm ci

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run

run:
	bin/gendiff.js