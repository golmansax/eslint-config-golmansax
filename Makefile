.PHONY: eslint test

eslint:
	./node_modules/.bin/eslint .

test:
	./node_modules/.bin/mocha --compilers js:babel-core/register -R spec test/**/*
