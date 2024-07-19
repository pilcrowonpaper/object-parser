# Object parser

A small library for parsing objects.

```ts
import { ObjectParser } from "@pilcrowjs/object-parser";

const response = await fetch("https://api.example.com/users/6493");
const result: unknown = await response.json();
const parser = new ObjectParser(result);

if (parser.has("error")) {
	const error = parser.getString("error");
} else {
	const userId = parser.getNumber("id");
	const username = parser.getString("username");
	const profilePicture = parser.getString("icons", "medium");
	const friends = parser.getArray("friends").map((friend) => {
		return new ObjectParser(friend).getString("username");
	});
}
```

```json
{
	"error": "Invalid user ID"
}
```

```json
{
	"id": 6493,
	"username": "pilcrow",
	"icons": {
		"small": "https://images.example.com/user/6493/128px.jpg",
		"medium": "https://images.example.com/user/6493/256px.jpg",
		"large": "https://images.example.com/user/6493/512px.jpg"
	},
	"friends": [
		{
			"id": 4456,
			"username": "lucy"
		}
	]
}
```

## Installation

```
npm install @pilcrowjs/object-parser
```

## API

```ts
class ObjectParser {
	constructor(value: unknown): this;

	has(...path: string[]): boolean;
	get(...path: string[]): unknown;
	getString(...path: string[]): string;
	getNumber(...path: string[]): number;
	getBoolean(...path: string[]): boolean;
	getBigInt(...path: string[]): bigint;
	getObject(...path: string[]): object;
	getArray(...path: string[]): unknown[];
	isNull(...path: string[]): boolean;
	isUndefined(...path: string[]): boolean;
	createParser(...path: string[]): ObjectParser;
}
```
