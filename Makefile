TESTS = test/*.js
TESTTIMEOUT = 1000
REPORTER = progress

test:
	@NODE_ENV=test ./node_modules/.bin/mocha -R $(REPORTER) --timeout $(TESTTIMEOUT) $(TESTS)

.PHONY: test
