Logged in sessions can access some extra things but not required.

```javascript
// fetch entries
const collection = await session.entries('pena');
console.log(collection);
```

### Searching and Sorting

Search entries which using `COLLECTION TYPES`.

```javascript
const {COLLECTION_TYPES} = require("eksi-sozluk");
```

Search for entries which contain images:

```javascript
const collection = await session.entries('pena', { page: 1, type: COLLECTION_TYPES.IMAGES });
console.log(collection);
```

Search for entries which contain links:

```javascript
const collection = await session.entries('pena', { page: 1, type: COLLECTION_TYPES.LINKS });
console.log(collection);
```

Search for entries which created from buddies, **login required**:

```javascript
const collection = await session.entries('pena', { page: 1, type: COLLECTION_TYPES.BUDDY });
console.log(collection);
```

Fetch entries by most liked:

```javascript
const entryCollection = await session.entries('pena', { page: 1, type: COLLECTION_TYPES.NICE })
console.log(collection);
```

Fetch entries by today most liked ones:

```javascript
const collection = await session.entries('pena', { page: 1, type: COLLECTION_TYPES.DAILY_NICE })
console.log(collection);
```

Search for entries for by author:

```javascript
const collection = await session.entries('pena', { page: 1, type: COLLECTION_TYPES.AUTHOR, author: 'ssg' })
console.log(collection);
```

Search for entries which given text:

```javascript
const collection = await session.entries('pena', { page: 1, type: COLLECTION_TYPES.FIND, search: 'ifade etmek' })
console.log(collection);
```

### Manage Entry Collection

Navigate between pages.

```javascript
// navigate to next page
await entryCollection.next();

// navigate to previous page
await entryCollection.prev();

// navigate to first page
await entryCollection.first();

// navigate to last page
await entryCollection.last();
```

Create an entry, **login required**:

```javascript
// plain entry
await entryCollection.createEntry('Eu ex aliqua cillum et.');

// as draft
await entryCollection.createEntry('Ipsum laboris dolore ipsum cupidatat.', { saveAsDraft: true })
```

### Entry By Id

Directly access an entry.

```javascript
const entry = await session.entryById(1);
console.log(entry);
```

Vote entry, **login required**:

```javascript
// upvote
await entry.upvote();

// downvote
await entry.downvote();

// remove vote
await entry.removevote();
```

Some other actions, **login required**:

```javascript
// recover from trash if entry trashed
await entry.recoverFromTrash();

// permanently delete entry if trashed
await entry.deleteFromTrash();

// favorite entry
await entry.favorite();

// unfavorite entry
await entry.unfavorite();

// author list which favorite the entry
const favoritedAuthors = await entry.listFavoritedAuthors();
console.log(favoritedAuthors);

// rookie list which favorite the entry
const favoritedRookies = await entry.listFavoritedRookies();
console.log(favoritedRookies);
```

### Debe Entries

Debe entries are different from entry collection. Check technical documentation to learn more.

```javascript
// list debe entries
const debeEntries = await session.debeEntries();
console.log(debeEntries);

// retrieve details of an entry
await debeEntries[0].retrieve();
```
