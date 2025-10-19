## Usage

### Basic Class Example
```javascript

import VanillaDb, { vanillaDb } from "@vanilladb/main"
import type { DBConfigType } from "@vanilladb/main"

//db configurations
const config:DBConfigType = {
    file: "data.json",
    label: "ddb",
    defaultData: [],
    log: false
}

//create new DB with VanillaDb class
const db = new VanillaDb(config)

//create new DB using vanillaDb function
const db = vanillaDb(config)

//set store new data in db
await db.set({
    id: 0, 
    name: 'john doe'
})

//get returns data in db
const allDatas = await db.get()
const dataFromIndex = await db.get(1)

//update returns data in db
const newData = {foo: "bar"}
const result = await db.update(1, newData)

//querystring query uses querystring to get data from db
const result = await db.query("select where index=2")

const selectAll = await db.query("select where index=all")

const newData = {foo: "bar"}
const done = await db.query("update where index=2", newData)

```