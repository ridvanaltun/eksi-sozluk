**NOTE:** You must to login before proceed handling trash. Guest sessions not will work.

```javascript
// fetch trash entries
const trashEntries = await session.trashEntries({ page: 1 });

// a general look the first trashed entry
console.log(trashEntries[0]);

// retrieve more details of first trashed entry
await trashEntries[0].retrieve();

// delete the first trashed entry
await trashEntries[0].delete();

// recover the first trashed entry
await trashEntries[0].recover();

// empty all your trashed entries
await member.emptyTrash();
```
