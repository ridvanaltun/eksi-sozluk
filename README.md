<!-- omit in toc -->
# 🍋 Unofficial Ek$i Sozluk Client for Node.js

[![npm version](https://img.shields.io/npm/v/eksi-sozluk.svg)](https://npmjs.com/package/eksi-sozluk)
[![npm downloads](https://img.shields.io/npm/dt/eksi-sozluk.svg)](https://npmjs.com/package/eksi-sozluk)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://travis-ci.com/ridvanaltun/eksi-sozluk.svg?branch=master)](https://travis-ci.com/ridvanaltun/eksi-sozluk)
[![Coverage Status](https://coveralls.io/repos/github/ridvanaltun/eksi-sozluk/badge.svg?branch=master)](https://coveralls.io/github/ridvanaltun/eksi-sozluk?branch=master)
[![license](https://img.shields.io/npm/l/eksi-sozluk.svg)](https://github.com/ridvanaltun/eksi-sozluk/blob/master/LICENSE)

> **This library help you to conquer the Eksi Sozluk in Node.js.**

<!-- omit in toc -->
# Table of Contents

- [Installation](#installation)
- [Documentation](#documentation)
  - [Tutorials](#tutorials)
- [Development](#development)
  - [Commit Messages](#commit-messages)
  - [Code Quality](#code-quality)
  - [Testing](#testing)
  - [Available Scripts](#available-scripts)
- [Special Thanks](#special-thanks)
- [License](#license)

# Installation

```bash
npm install eksi-sozluk --save
```

# Documentation

Technical documentation is automatically created with [JSDoc](https://github.com/jsdoc/jsdoc) after each new release.

[You can find the technical documentation here!](https://ridvanaltun.github.io/eksi-sozluk/)

## Tutorials

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

# Development

```bash
# clone the repository
git clone https://github.com/ridvanaltun/eksi-sozluk.git

# go to the project and install dependencies
cd eksi-sozluk & npm i
```

After these steps you can change the code. If you want test your changes; go to `__tests__` folder, find a proper test file or create one if necessary. if the test pass, ensure your code quality and write documentation. All after you are ready to send a PR.

Check [scripts](#available-scripts) section to learn how to run tests and linter (for [code quality](#code-quality)).

## Commit Messages

Every commit message must be `conventional commits` format.

[What is Conventional Commits?](https://www.conventionalcommits.org/en/v1.0.0/#summary)

If you don't have a time just use `npm run commit` command instead of use Git.

## Code Quality

Keeping code quality as good is a hard job in normally. Therefore, we are using EsLint (linter) and Prettier to keep and track the code quality. Not linted pull requests automatically deny from via Travis (CI/CD). You can lint your code using [scripts](#available-scripts) section.

In short, run `npm run lint` command.

## Testing

Writing tests is boring but also necessary. If you want to write a test look at other tests and don't forget apply proxy over Travis because of ridvanaltun/eksi-sozluk#16. The proxy server running over my local environment therefore sometimes it is not reacable, test fails on Travis when my local environment is turned off or the proxy server is turned off.

I accept PRs by myself anyway so running tests over Travis is not a problem for a contributor. You can run tests on your local anytime.

## Available Scripts

```bash
# commit your changes with commitizen
npm run commit

# check eslint issues
npm run lint

# fix eslint issues
npm run lint:fix

# run eslint-nibble
npm run lint:active

# run all tests
npm run test

# travis uses this script, it handles creating new releases
npm run semantic-release

# travis uses this script, it creates documentation with jsdoc
npm run docs
```

# Special Thanks

I would like to thank [@kucukkanat](https://github.com/kucukkanat) the owner original `eksi-sozluk` package for transferring the package's rights to me. The old package was in security holding status, nobody was using it.

# License

[GNU General Public License v3.0](https://github.com/ridvanaltun/eksi-sozluk/blob/master/LICENSE)
