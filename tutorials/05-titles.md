Logged in sessions can access some extra things but not required.

```javascript
const {TAGS} = require("eksi-sozluk");

// today in history
// aka. tarihte bugün
const todayInHistoryTitles = await session.todayInHistory(2018, { page: 1 });
console.log(todayInHistoryTitles);

// today
// aka. bugün
const todayTitles = await session.today({ page: 1 });
console.log(todayTitles);

// rookies
// aka. çaylaklar
const rookieTitles = await session.rookieTitles({ page: 1 });
console.log(rookieTitles);

// untagged titles
// aka. başıboş başlıklar
const untaggedTitles = await session.untaggedTitles({ page: 1 });
console.log(untaggedTitles);

// titles by tag
const sportTitles = await session.titlesByTag(TAGS.SPOR, { page: 1 });
console.log(sportTitles);

// agenda
// aka. gündem
const agendaTitles = await session.agenda({ page: 1 });
console.log(agendaTitles);
```

### Events (aka. Olaylar)

Login required.

```javascript
// list events
const events = await session.events();
console.log(events);

// retrieve a event title
await events.titles[0].entries.retrieve()
console.log(events.titles[0].entries)
```

### Drafts (aka. Kenar)

Login required.

```javascript
// list drafts
const drafts = await session.drafts({ page: 1 });
console.log(drafts);

// retrieve a draft title
await drafts.titles[0].entry.retrieve();
console.log(drafts.titles[0].entry);

// you can manage draft entry via title
await drafts.titles[0].entry.change('Quis adipisicing veniam consequat mollit.');
await drafts.titles[0].entry.dismiss();
await drafts.titles[0].entry.publish();
```

### Followed User Entries and Favorites (aka. Takip)

Login required.

```javascript
// list followed user titles
const followedUserTitles = await session.followedUserTitles({ page: 1 });
console.log(followedUserTitles);

// retrieve a title
await followedUserTitles.titles[0].owner.retrieve();
console.log(followedUserTitles.titles[0].owner);

// list followed user favorites
const followedUserFavoriteEntries = await session.followedUserFavoriteEntries({ page: 1 });
console.log(followedUserFavoriteEntries);

// retrieve a title
await followedUserFavoriteEntries.titles[0].owner.retrieve();
console.log(followedUserFavoriteEntries.titles[0].owner);
console.log(followedUserFavoriteEntries.titles[0].entry);
```

### Manage Title Collections

You can navigate between pages in any title collection.

```javascript
// entry collection current page
console.log(entryCollection.currPage);

// entry collection page count
console.log(entryCollection.pageCount);

// retrieve next page
await entryCollection.next();

// retrieve last page
await entryCollection.last();

// retrieve first page
await entryCollection.first();

// retrieve previous page
await entryCollection.prev();
```
