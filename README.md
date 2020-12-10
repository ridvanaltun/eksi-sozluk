# 🍋 Eksi Sozluk NodeJS Client

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://travis-ci.com/ridvanaltun/eksi-sozluk.svg?branch=master)](https://travis-ci.com/ridvanaltun/eksi-sozluk)
[![Coverage Status](https://coveralls.io/repos/github/ridvanaltun/eksi-sozluk/badge.svg?branch=master)](https://coveralls.io/github/ridvanaltun/eksi-sozluk?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

> Consume Eksi Sozluk with NodeJS.

## Installation

```bash
npm install eksi-sozluk --save
```

## Documentation

Technical documentation is automatically created with [JSDoc](https://github.com/jsdoc/jsdoc) after each new release.

[You can find the technical documentation here!](https://ridvanaltun.github.io/eksi-sozluk/)

### Tutorials

**IMPORTANT:** The tutorials are not fully covered for all use cases and its not mention all capabilities of the library, don't forget to check technical documentation if you didn't found anything you looking for.

- [Getting Started](https://ridvanaltun.github.io/eksi-sozluk/tutorial-01-getting-started.html)
- [Profile](https://ridvanaltun.github.io/eksi-sozluk/tutorial-02-profile.html)
- [Trash](https://ridvanaltun.github.io/eksi-sozluk/tutorial-03-trash.html)
- [Account](https://ridvanaltun.github.io/eksi-sozluk/tutorial-04-account.html)
- [Titles](https://ridvanaltun.github.io/eksi-sozluk/tutorial-05-titles.html)
- [Entries & Drafts](https://ridvanaltun.github.io/eksi-sozluk/tutorial-06-entries-and-drafts.html)
- [Users](https://ridvanaltun.github.io/eksi-sozluk/tutorial-07-users.html)
- [Tags](https://ridvanaltun.github.io/eksi-sozluk/tutorial-08-tags.html)
- [Upload & Delete Image](https://ridvanaltun.github.io/eksi-sozluk/tutorial-09-upload-and-delete-image.html)
- [Questions](https://ridvanaltun.github.io/eksi-sozluk/tutorial-10-questions.html)
- [Miscellaneous](https://ridvanaltun.github.io/eksi-sozluk/tutorial-11-miscellaneous.html)

## Development

```bash
# clone the repository
git clone https://github.com/ridvanaltun/eksi-sozluk.git

# go to the project and install depedencies
cd eksi-sozluk & npm i
```

After these steps you can change the code. If you want test your changes; go to `__tests__` folder, find a proper test file or create one if necessary. if the test pass, ensure your code quality and write documantation. All after you are ready to send a PR.

Check [scripts](#npm-scripts) section to learn how to run tests and linter (for [code quality](#code-quality)).

### Commit Messages

Every commit message must be `conventional commits` format.

[What is Conventional Commits?](https://www.conventionalcommits.org/en/v1.0.0/#summary)

If you don't have a time just use `npm run commit` command instead of use Git.

### Code Quality

Keeping code quality as good is a hard job in normally. Therefore, we are using EsLint (linter) and Prettier to keep and track the code quality. Not linted pull requests automatically deny from via Travis (CI/CD). You can lint your code using [scripts](#npm-scripts) section.

In short, run `npm run lint` command.

### NPM Scripts

```bash
# commit your changes with commitizen
npm run commit

# check linter and prettier errors, fix prettier errors in default
npm run lint

# check the linter and prettier errors
npm run lint:check

# run prettier
npm run format

# check prettier errors
npm run format:check

# run all tests
npm run test

# travis uses this script, it handles creating new releases
npm run semantic-release

# travis uses this script, it creates documentation with jsdoc
npm run docs
```

## Special Thanks

I would like to thank [@kucukkanat](https://github.com/kucukkanat) the owner original `eksi-sozluk` package for transferring the package's rights to me. The old package was in security holding status, nobody was using it.

## License

[GNU General Public License v3.0](https://github.com/ridvanaltun/eksi-sozluk/blob/master/LICENSE)
