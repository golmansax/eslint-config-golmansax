.PHONY: eslint test

eslint:
	./node_modules/.bin/eslint . -c configs/index.json --no-eslintrc

test:
	./node_modules/.bin/mocha --compilers js:babel/register -R spec test/**/*
