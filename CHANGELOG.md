## [5.0.1](https://github.com/ridvanaltun/eksi-sozluk/compare/v5.0.0...v5.0.1) (2021-08-29)


### Bug Fixes

* enforce to a new release ([804b77e](https://github.com/ridvanaltun/eksi-sozluk/commit/804b77ebafc2119a27f66453bc4cd439c2870142))

# [5.0.0](https://github.com/ridvanaltun/eksi-sozluk/compare/v4.1.0...v5.0.0) (2020-12-10)


### Bug Fixes

* **entry-collection:** circular dependency issue ([4828faf](https://github.com/ridvanaltun/eksi-sozluk/commit/4828faf7577de6fbcad5d48fe5e9fbc27ac30f23))
* **general:** fetch agenda titles and titles by tag ([bd77f7b](https://github.com/ridvanaltun/eksi-sozluk/commit/bd77f7b9ec55a64c09eeaa045943d048b20e0e68))
* **login:** auth promise ([195a3a8](https://github.com/ridvanaltun/eksi-sozluk/commit/195a3a80e99da342c9300a6d8185838ef7e9ac1d))
* **models/title-collection:** exit the serializing if divider exist ([59f09c7](https://github.com/ridvanaltun/eksi-sozluk/commit/59f09c711f775fa28ce8094bd2d4b42d6c9fd919))
* **models/user:** badge points and badge names ([418c326](https://github.com/ridvanaltun/eksi-sozluk/commit/418c3260099dfaf3e0c483c5915a0465690d288b))
* **models/user-for-member:** change related model value after call a related function ([e1ff3c7](https://github.com/ridvanaltun/eksi-sozluk/commit/e1ff3c741e3c4881544f487b2568290f41bd24d6))
* fix a constant ([212446c](https://github.com/ridvanaltun/eksi-sozluk/commit/212446c3cd0ee6ec3dab7b414b5f989797c92dd9))
* http client settings ([d3fad93](https://github.com/ridvanaltun/eksi-sozluk/commit/d3fad933bedd2a7146ad29697ca2c72426de30ff))
* move voting functions under member and test creds when login ([63cb136](https://github.com/ridvanaltun/eksi-sozluk/commit/63cb1361063fbbe0c3030035b4100ae111ceacd9))
* title collections ([af3a6d6](https://github.com/ridvanaltun/eksi-sozluk/commit/af3a6d6e09ffa781d096bdadad547a5ddd10c8bc))


### Code Refactoring

* move lib -> class ([045039b](https://github.com/ridvanaltun/eksi-sozluk/commit/045039b5e508216883d9ed87589f42d7c35954ba))
* use models instead of plain objects ([b860a01](https://github.com/ridvanaltun/eksi-sozluk/commit/b860a01ac468250ba5d6ed2e2451457e5f156f48))


### Features

* **drafts:** add date_created and date_modified properties ([23fdb53](https://github.com/ridvanaltun/eksi-sozluk/commit/23fdb536430709f51121b16f0ea82b04c8195843))
* **general:** ability to fetch today questions as title collection ([d5b78a0](https://github.com/ridvanaltun/eksi-sozluk/commit/d5b78a0a89eccc5b95a81c28f7f6eb3b6d767820))
* **general:** ability to search ([81514c1](https://github.com/ridvanaltun/eksi-sozluk/commit/81514c101483a696bcb2dd7aebfeae31a71a2c4a))
* **general:** fetch agenda ([3d563f7](https://github.com/ridvanaltun/eksi-sozluk/commit/3d563f72dbb4cb5e9e390aac1bfe274cf60398db))
* **general:** fetch questions ([7dfdbff](https://github.com/ridvanaltun/eksi-sozluk/commit/7dfdbff441a351cac257205bf63ddef8b982e9ad))
* **general:** fetch tags ([50ef6ca](https://github.com/ridvanaltun/eksi-sozluk/commit/50ef6ca05bc07a1b72f5aaf382ebcb9c0886a0d3))
* **general:** fetch titles by tag ([9bbd0db](https://github.com/ridvanaltun/eksi-sozluk/commit/9bbd0db0d1f59311e60ca26c3a94a39eaf055334))
* **general:** fetch untagged titles ([14bf213](https://github.com/ridvanaltun/eksi-sozluk/commit/14bf213cc0f1e111535afc71830487f05c9885e5))
* **general/agenda:** fetch agenda with page number ([a298a6e](https://github.com/ridvanaltun/eksi-sozluk/commit/a298a6e1e3f94069a6b35dffe4b80b6f1208f4f0))
* **member:** ability select page when fetch today, drafts and rookie entries ([c6b0422](https://github.com/ridvanaltun/eksi-sozluk/commit/c6b04229958bbeef9c3851f3c901278fc430cca4))
* **member:** ability to change email address ([9882966](https://github.com/ridvanaltun/eksi-sozluk/commit/988296617abf2853f8bdafb00eefe1750d50390a))
* **member:** ability to check new messages and new events existence ([2b199a6](https://github.com/ridvanaltun/eksi-sozluk/commit/2b199a65458da64871534d295bb49141ae5fd63e))
* **member:** ability to create backup ([6aba143](https://github.com/ridvanaltun/eksi-sozluk/commit/6aba143bbf8bb59499b6fcd500ec5dde6bd632c9))
* **member:** ability to create entry ([b8a6205](https://github.com/ridvanaltun/eksi-sozluk/commit/b8a620562e9c0b6d2e0c23b10a20d03eae18be3d))
* **member:** ability to empty trash ([82549a3](https://github.com/ridvanaltun/eksi-sozluk/commit/82549a33519c05783665ec634fab071be1d697e2))
* **member:** ability to fetch and manage trash ([cf64acb](https://github.com/ridvanaltun/eksi-sozluk/commit/cf64acbfbbef21235db39866ce09110236604880))
* **member:** ability to fetch followed user favorite entries ([2efb8ab](https://github.com/ridvanaltun/eksi-sozluk/commit/2efb8ab723508d5563d7603f1841ecde8e3de84f))
* **member:** ability to fetch user self profile directly ([26ad284](https://github.com/ridvanaltun/eksi-sozluk/commit/26ad284204943508d340748a1a5ca21085415bba))
* **member:** ability to follow and unfollow tags ([446b267](https://github.com/ridvanaltun/eksi-sozluk/commit/446b267fa65490a41fd38ab36ba14e6f25d596d6))
* **member:** ability to follow and unfollow users ([9b1ecdc](https://github.com/ridvanaltun/eksi-sozluk/commit/9b1ecdc454bedae93f026d3b8e11af8e74f8bbcf))
* **member:** ability to manage account ([e777d9c](https://github.com/ridvanaltun/eksi-sozluk/commit/e777d9c78a18602f23a52db71489f7e2b4e399f6))
* **member:** ability to pin and unpin entry from user profile ([9117a4e](https://github.com/ridvanaltun/eksi-sozluk/commit/9117a4e4b9cc218efbdfaf749f49476c3ec679ff))
* **member:** ability to retrieve, dismiss, publish and change draft entries ([d7559e3](https://github.com/ridvanaltun/eksi-sozluk/commit/d7559e33a791ca63e086d8f32d439d9b3e5ab9b3))
* **member:** ability to upload and delete images ([52fb5ec](https://github.com/ridvanaltun/eksi-sozluk/commit/52fb5ecd77ff9cae1ec8fc680590a041545ca15d))
* **member:** create entry/draft from entry collection model ([aa14812](https://github.com/ridvanaltun/eksi-sozluk/commit/aa148128b5f1ce87cac09c27ec358124b2d1a3b4))
* **member:** fetch drafts ([0ef5425](https://github.com/ridvanaltun/eksi-sozluk/commit/0ef54254efb399861ff626bae4ff7730bafba9c3))
* **member:** fetch events ([d93a27c](https://github.com/ridvanaltun/eksi-sozluk/commit/d93a27c7a50617dd0c86ec21d530821437bc6d44))
* **member:** fetch followed user entries ([d599a5c](https://github.com/ridvanaltun/eksi-sozluk/commit/d599a5c5ae067a5e61816cd74112f01737714e75))
* **member:** fetch rookie entries ([0d9f70d](https://github.com/ridvanaltun/eksi-sozluk/commit/0d9f70d0b99ed87cb40b555549f0033c146ae4cd))
* **member:** fetch today entries ([9a39a35](https://github.com/ridvanaltun/eksi-sozluk/commit/9a39a35e18876e281041a5934784494f74c7ab76))
* **member:** remove vote ([a31c940](https://github.com/ridvanaltun/eksi-sozluk/commit/a31c940c8c11425a8f425907588d6e76738b7a42))
* **member/user:** ability to block and unblock user ([2c00764](https://github.com/ridvanaltun/eksi-sozluk/commit/2c00764ce0c6e9dcf5944269a55f490c58594780))
* **member/user:** ability to block and unblock user titles ([3fdf755](https://github.com/ridvanaltun/eksi-sozluk/commit/3fdf7550d5f469233d88b9e582d40e9f37b10e55))
* **member/user:** ability to send message ([c6d897c](https://github.com/ridvanaltun/eksi-sozluk/commit/c6d897c89a1f3ce52a115e51718086aa29f76166))
* **models:** extend title and followed user title ([40b10a7](https://github.com/ridvanaltun/eksi-sozluk/commit/40b10a7218d8fa9cabaaf99297cf78530ad25349))
* **models:** search results ([312c7b1](https://github.com/ridvanaltun/eksi-sozluk/commit/312c7b1b6a048b5d290d58fb9e4d00f7ac8cb6f3))
* **models/draft-title:** add slug ([a35fdd8](https://github.com/ridvanaltun/eksi-sozluk/commit/a35fdd8093718a8b57d4e372e46194ae2e6ba53a))
* **models/entry-collection:** ability to sorting and filtering entry collections ([410031d](https://github.com/ridvanaltun/eksi-sozluk/commit/410031d101125311473dba73beb3a20557c36513))
* **models/entry-for-member:** ability to favorite and unfavorite entry ([cff6aa4](https://github.com/ridvanaltun/eksi-sozluk/commit/cff6aa45be6d6adf109b85542d16f6708e0c2556))
* **models/entry-for-member:** ability to fetch authors and rookies who favored the entry ([96b5b85](https://github.com/ridvanaltun/eksi-sozluk/commit/96b5b8533e88e0052cc17ce46ef6c395d1b775a7))
* **models/user:** ability to fetch user images ([5840e6e](https://github.com/ridvanaltun/eksi-sozluk/commit/5840e6eac4128e970574b475ecb5df4921a3e54b))
* **models/user-for-member:** ability to change and clear user note ([8847175](https://github.com/ridvanaltun/eksi-sozluk/commit/8847175539ae07cce84aab6067c763c873a73930))
* ability to fetch user ukteler ([dc6d3f3](https://github.com/ridvanaltun/eksi-sozluk/commit/dc6d3f3229aa966a74b1277221420305ffd6c457))
* **models/user:** ability to fetch user favorite authors ([6aeb59c](https://github.com/ridvanaltun/eksi-sozluk/commit/6aeb59c95cb795f93467bbbf672f68af1f0e88bc))
* ability to extend time of token ([61130e7](https://github.com/ridvanaltun/eksi-sozluk/commit/61130e730a5391fcc59886eb32132e7495af3aa1))
* ability to fetch user -latest entries, -favorites, -most favorited & liked entries ([6e84e03](https://github.com/ridvanaltun/eksi-sozluk/commit/6e84e031fd689fe9ba6fbd775d9e2c7c8404d6ad))
* ability to login with credentials and create token ([e699d4d](https://github.com/ridvanaltun/eksi-sozluk/commit/e699d4d7b5d52177d46f7878dd847f8db9a89926))
* **models/followed-user-title:** bind user model as owner ([84165f1](https://github.com/ridvanaltun/eksi-sozluk/commit/84165f1ba3adfc86f2de685b1e8a680a1916edca))
* **models/title:** bind entries with entry collection ([13a2cd4](https://github.com/ridvanaltun/eksi-sozluk/commit/13a2cd4caaf9b299392a330ca2626a08da829267))
* entry collection ([5a166f3](https://github.com/ridvanaltun/eksi-sozluk/commit/5a166f33a0a7323e3196660b25c34d0b1dbc4563))
* title collection ([e66d6a7](https://github.com/ridvanaltun/eksi-sozluk/commit/e66d6a758a467029b5de616f905a5248f111cb37))


### BREAKING CHANGES

* Used camelCase instead of snake_case in returns of objects.
* Voting functions removed for not authorized users.
* The way functions are operated has been changed

# [4.1.0](https://github.com/ridvanaltun/eksi-sozluk/compare/v4.0.1...v4.1.0) (2020-10-27)


### Features

* upvote and downvote ([352ce68](https://github.com/ridvanaltun/eksi-sozluk/commit/352ce68c7a3398b87d80b3b67789c666f88acb90))

## [4.0.1](https://github.com/ridvanaltun/eksi-sozluk/compare/v4.0.0...v4.0.1) (2020-09-23)


### Bug Fixes

* **packages:** update all ([8e72ef3](https://github.com/ridvanaltun/eksi-sozluk/commit/8e72ef3904b98bd99c2b678ba8f5f32618ea81bb))

# [4.0.0](https://github.com/ridvanaltun/eksi-sozluk/compare/v3.0.1...v4.0.0) (2020-06-04)


### Code Refactoring

* response objects, functions, testing and coverage method ([79a3d02](https://github.com/ridvanaltun/eksi-sozluk/commit/79a3d02ae7523806ee5bbfb60b8392f8f4803356))


### BREAKING CHANGES

* All functions switched to Promise API

## [3.0.1](https://github.com/ridvanaltun/eksi-sozluk/compare/v3.0.0...v3.0.1) (2020-06-02)


### Bug Fixes

* enforce ci to publish a new release ([8f37119](https://github.com/ridvanaltun/eksi-sozluk/commit/8f3711988f4e3a58d92ecf0eae64a2f8e370d216))
