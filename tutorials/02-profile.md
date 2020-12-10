**NOTE:** You must to login before proceed handling profile. Guest sessions not will work.

### A General Look Into Profile

After login process you can access a general information about the logged in user.

```javascript
// username
console.log(session.username);

// is new message exist, true or false
console.log(session.isNewMessageAvailable);

// check new message existence after login
const isNewMessageAvailable = await session.isNewMessageExist();
console.log(isNewMessageAvailable);

// is new event exist, true or false
console.log(member.isNewEventAvailable);

// check new event existence after login
const isNewEventAvailable = await session.isNewEventExist();
console.log(isNewEventAvailable);
```

### Retrieve Profile

Go to the [Users](../docs/tutorial-07-users.html) section to see what can you do with an user object.

More information not necessary.

```javascript
// retrieve user object of logged in user
const me = await session.me();
console.log(me);
```

### Pin/Unpin Entry

```javascript
// pin an entry to your profile with entry id which the user owned
const entryId = 123456;
await session.pinEntry(entryId);

// remove the pin
await session.removePin();
```
