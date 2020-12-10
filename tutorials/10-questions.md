Not login required.

```javascript
// questions in agenda
// aka. sorunsallar gündem
const questionsInAgenda = await eksi.questionsInAgenda({ page: 1 });
console.log(questionsInAgenda);

// questions in today
// aka. sorunsallar bugün
const questionsInToday = await eksi.questionsInToday({ page: 1 });
console.log(questionsInToday);
```

### Manage Questions

```javascript
// retrieve next page
await collection.next();

// retrieve last page
await collection.last();

// retrieve first page
await collection.first();

// retrieve previous page
await collection.prev();
```
