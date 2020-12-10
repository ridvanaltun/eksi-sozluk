Login required to follow and unfollow tags.

```javascript
// list tags
const tags = await session.tags();
console.log(tags);

// follow tag
await tags[1].follow();

// unfollow tag
await tags[1].unfollow();
```
