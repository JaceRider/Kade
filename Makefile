REPORTER      = spec
MOCHA         = ./node_modules/.bin/mocha
JSHINT        = ./node_modules/.bin/jshint
ISTANBUL      = ./node_modules/.bin/istanbul
KARMA         = ./node_modules/karma/bin/karma
PROTRACTOR    = ./node_modules/.bin/protractor
NO_COLOR      = \033[0m
SUCCESS_COLOR = \033[1;34m

ifeq (true,$(COVERAGE))
test: jshint assets coveralls clean
else
test: jshint assets mocha karma protractor clean
endif

mocha:
	@echo ""
	@echo ""
	@echo "$(SUCCESS_COLOR)== Server Unit Tests ===========================================================$(NO_COLOR)"
	@echo ""
	@NODE_ENV=test $(MOCHA) test/server \
	--colors \
  --reporter $(REPORTER) \
  --recursive \

karma:
	@echo ""
	@echo ""
	@echo "$(SUCCESS_COLOR)== Client Unit Tests ===========================================================$(NO_COLOR)"
	@echo ""
	@NODE_ENV=test $(KARMA) start karma.config.js \
	--single-run \

protractor:
	@echo ""
	@echo ""
	@echo "$(SUCCESS_COLOR)== e2e Tests ===================================================================$(NO_COLOR)"
	@echo ""
	@NODE_ENV=test $(PROTRACTOR) protractor.conf.js

assets:
	@echo ""
	@echo ""
	@echo "$(SUCCESS_COLOR)== Generating Assets ===========================================================$(NO_COLOR)"
	@echo ""
	@NODE_ENV=test node -e "require('grunt').tasks(['testAssets']);"

coveralls:
	@echo ""
	@echo ""
	@echo "$(SUCCESS_COLOR)== Client Unit Tests ===========================================================$(NO_COLOR)"
	@echo ""
	@NODE_ENV=test $(KARMA) start karma.config.js \
	--reporters dots,coverage,coveralls \
	--single-run \
	--no-auto-watch \
	--browsers Firefox
	@echo ""
	@echo ""
	@echo "$(SUCCESS_COLOR)== e2e Tests ===================================================================$(NO_COLOR)"
	@echo ""
	@NODE_ENV=test $(PROTRACTOR) protractor.conf.js \
	--browser=firefox
	@echo ""
	@echo ""
	@echo "$(SUCCESS_COLOR)== Server Unit Tests ===========================================================$(NO_COLOR)"
	@echo ""
	@echo "+------------------------------------+"
	@NODE_ENV=test $(ISTANBUL) \
	cover ./node_modules/mocha/bin/_mocha test/server \
	--report lcovonly \
	-- -R $(REPORTER) \
	--recursive && \
	cat ./coverage/**/*.info |\
	 ./node_modules/coveralls/bin/coveralls.js && \
	 rm -rf ./coverage
	 rm -rf ./.tmp

jshint:
	@echo ""
	@echo "$(SUCCESS_COLOR)== Linting Scripts =============================================================$(NO_COLOR)"
	@echo ""
	$(JSHINT) api app test

clean:
	@echo ""
	@echo ""
	@echo "$(SUCCESS_COLOR)== Cleaning Up =================================================================$(NO_COLOR)"
	@echo ""
	rm -rf coverage
	rm -rf .tmp


.PHONY: test mocha assets karma protractor coveralls
