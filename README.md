
Showing that line numbers in stack traces don't come out correctly when using nyc

jump to the bottom to see an example without mocha that was added latest that doesn't
measure coverage in test files

### installation

to get all the same versions as me:

```bash
nvm install 10.15.0
nvm use 10.15.0
npm ci
```

### with mocha
(and measuring coverage in test files)

I guess people usually don't measure test coverage inside their test files, so
people migth not notice.  However, if an error is raised in your sut file, the
same thing will happen I guess.

```bash
# after installing as above
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

### without mocha

(and not measuring coverage in test files)

to run a simple example without mocha go like this:

```bash
# install as in the install section above
npm run simple-test
```
and you get this

```
test negative square root function
~/nyc-line-number-issue/negative-square-root/index.js:2
  if (n < 0) throw new Error(`can't find square root of ${n}`);
             ^

Error: can't find square root of -4
    at module.exports (~/nyc-line-number-issue/negative-square-root/index.js:2:20)
    at Object.<anonymous> (~/nyc-line-number-issue/negative-square-root/test.js:10:14)
```

(those aren't the real paths; it actually puts the full path to my home directory.)

now let's measure coverage

```bash
npm run simple-coverage
```

```
test negative square root function
~/nyc-line-number-issue/negative-square-root/index.js:1
(function (exports, require, module, __filename, __dirname) { var cov_11pux4pth4=function(){var path="~/nyc-line-number-issue/negative-square-root/index.js";var hash="f18b51971dcf4b2f97bacba75ebbca88b84972fb";var Function=function(){}.constructor;var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"~/nyc-line-number-issue/negative-square-root/index.js",statementMap:{"0":{start:{line:1,column:0},end:{line:4,column:1}},"1":{start:{line:2,column:2},end:{line:2,column:63}},"2":{start:{line:2,column:13},end:{line:2,column:63}},"3":{start:{line:3,column:2},end:{line:3,column:23}}},fnMap:{"0":{name:"(anonymous_0)",decl:{start:{line:1,column:17},end:{line:1,column:18}},loc:{start:{line:1,column:29},end:{line:4,column:1}},line:1}},branchMap:{"0":{loc:{start:{line:2,column:2},end:{line:2,column:63}},type:"if",locations:[{start:{line:2,column:2},end:{line:2,column:63}},{start:{line:2,column:2},end:{line:2,column:63}}],line

Error: can't find square root of -4
    at module.exports (~/nyc-line-number-issue/negative-square-root/index.js:1:1411)

```

and you can see where they put it all onto one line

