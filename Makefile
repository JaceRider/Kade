REPORTER = spec
MOCHA = ./node_modules/.bin/mocha
JSHINT = ./node_modules/.bin/jshint
ISTANBUL = ./node_modules/.bin/istanbul
KARMA = ./node_modules/karma/bin/karma
GRUNT = ./node_modules/.bin/grunt
PROTRACTOR = ./node_modules/.bin/protractor

ifeq (true,$(COVERAGE))
test: jshint assets coveralls clean
else
test: jshint mocha assets karma protractor clean
endif

mocha:
	@echo "+------------------------------------+"
	@echo "| Running mocha tests                |"
	@echo "+------------------------------------+"
	@NODE_ENV=test $(MOCHA) test/server \
	--colors \
  --reporter $(REPORTER) \
  --recursive \

karma:
	@echo "+------------------------------------+"
	@echo "| Running karma tests                |"
	@echo "+------------------------------------+"
	@NODE_ENV=test $(KARMA) start karma.config.js \
	--single-run \

protractor:
	@echo "+------------------------------------+"
	@echo "| Running protractor tests           |"
	@echo "+------------------------------------+"
	@NODE_ENV=test $(PROTRACTOR) protractor.conf.js

assets:
	@echo "+------------------------------------+"
	@echo "| Building assets                    |"
	@echo "+------------------------------------+"
	@NODE_ENV=test $(GRUNT) testAssets

coveralls:
	@echo "+------------------------------------+"
	@echo "| Running karma tests with coveralls |"
	@echo "+------------------------------------+"
	@NODE_ENV=test $(KARMA) start karma.config.js \
	--reporters coverage,coveralls \
	--single-run \
	--browsers PhantomJS
	@echo "+------------------------------------+"
	@echo "| Running mocha tests with coveralls |"
	@echo "+------------------------------------+"
	@NODE_ENV=test $(ISTANBUL) \
	cover ./node_modules/mocha/bin/_mocha test/server \
	--report lcovonly \
	-- -R $(REPORTER) \
	--recursive && \
	cat ./coverage/lcov.info |\
	 ./node_modules/coveralls/bin/coveralls.js && \
	 rm -rf ./coverage
	 rm -rf ./.tmp

jshint:
	@echo "+------------------------------------+"
	@echo "| Running linter                     |"
	@echo "+------------------------------------+"
	$(JSHINT) api app test

clean:
	@echo "+------------------------------------+"
	@echo "| Cleaning up                        |"
	@echo "+------------------------------------+"
	rm -rf coverage
	rm -rf .tmp


.PHONY: test mocha assets karma protractor coveralls
