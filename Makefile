TESTS = test/*.js
TESTTIMEOUT = 1000
REPORTER = progress
COV = html-cov
test:
	@NODE_ENV=test ./node_modules/.bin/mocha -R $(REPORTER) --timeout $(TESTTIMEOUT) $(TESTS)

test-cov: 
	@JSCOV=1 NODE_ENV=test ./node_modules/.bin/mocha -R $(COV) --timeout $(TESTTIMEOUT) $(TESTS) > coverage.html 

clean:
	@rm -rf lib-cov
	@rm -f coverage.html


.PHONY: test test-cov clean 
