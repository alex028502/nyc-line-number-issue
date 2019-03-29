
Showing that line numbers in stack traces don't come out correctly when using nyc

I guess people usually don't measure test coverage inside their test files, so
people migth not notice.  However, if an error is raised in your sut file, the
same thing will happen I guess.

```bash
nvm install 10.15.0
nvm use 10.15.0
npm ci
npm test
```

now look at the line number of the failing assertion

```
      AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:

  assert(ps0 > 0)

      + expected - actual

      -false
      +true
      
      at Context.<anonymous> (example.js:17:5)
```

exactly what we expect because the assertion that fails is on line 17

```
$ nl -ba example.js | tail -n5
    15      assert(ps1 > 0);
    16      // we forgot that the rule will not apply here
    17      assert(ps0 > 0);
    18    });
    19  });
```

now let's measure test coverage two different ways
* running mocha with nyc
* running the original test npm command with nyc

```bash
npm run coverage-1 
```

or

```
npm run coverage-2
```

and we get the following error

```
      AssertionError [ERR_ASSERTION]: false == true
      + expected - actual

      -false
      +true
      
      at Context.<anonymous> (example.js:4:24)
```

wrong line number

Mocha is also unable to to print out the line that failed.

