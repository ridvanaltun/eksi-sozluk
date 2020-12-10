You don't have to login to fetch any user information, if you logged in;

You can do some extra things such as sending messages, follow/unfollow the user and many many more.

```javascript
// fetch user with username
const username = 'ssg';
const user = await session.user(username);
console.log(user);
```

### Data You Can Get From An User

```javascript
// fetch user's entries
const entries = await user.entries({ page: 1 })
console.log(entries)

// fetch user's favorites
// aka. favori entry'leri
const favorites = await user.favorites({ page: 1 })
console.log(favorites)

// fetch user's favorited entries
// aka. en çok favorilenen entry'leri
const favoritedEntries = await user.favoritedEntries({ page: 1 })
console.log(favoritedEntries)

// fetch user last voted entries
// aka. son oylananları
const lastVotedEntries = await user.lastVotedEntries({ page: 1 })
console.log(lastVotedEntries)

// fetch user self favorited entries
// aka. el emeği göz nuru
const selfFavoritedEntries = await user.selfFavoritedEntries({ page: 1 })
console.log(selfFavoritedEntries)

// fetch user's most liked entries
// aka. en beğenilenleri
const mostLikedEntries = await user.mostLikedEntries({ page: 1 })
console.log(mostLikedEntries)

// fetch user's images
// aka. görseller
const images = await user.images()
console.log(images)

// fetch user's favorite authors in last month
// aka. favori yazarları
const favoriteAuthors = await user.favoriteAuthors()
await favoriteAuthors.users[0].retrieve()
console.log(favoriteAuthors)

// fetch user's wishes of filling titles of another author
// aka. ukteler
const ukteler = await user.ukteler()
console.log(ukteler)
```

### Logged In Session Capabilities

```javascript
// follow user
await user.follow();

// unfollow user
await user.unfollow();

// block user
await user.block();

// unblock user
await user.unblock();

// block user titles
await user.blockTitles();

// unblock user titles
await user.unblockTitles();

// send message to user
await user.sendMessage('a test message!');

// set a note for the user
await user.setNote('a note');

// clear note from user
await user.clearNote();
```
