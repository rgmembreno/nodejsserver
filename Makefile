ifndef SystemRoot
	MOCHA=./node_modules/.bin/mocha
else
	MOCHA=.\node_modules\.bin\mocha
endif

test:
	$(MOCHA) --recursive -R spec -t 300000 test

.PHONY: test
