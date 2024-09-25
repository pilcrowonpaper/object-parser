import { test, expect } from "vitest";
import { ObjectParser } from "./index.js";

const data1 = {
	foo: "hello",
	bar: {
		baz: "bye",
		foo: {
			bar: "ok"
		}
	},
	baz: undefined
};

test("Nested data with ObjectParser", () => {
	const parser = new ObjectParser(data1);
	expect(parser.get("foo")).toBe("hello");
	expect(parser.get("baz")).toBe(undefined);
	expect(parser.get("bar", "baz")).toBe("bye");
	expect(parser.get("bar", "foo", "bar")).toBe("ok");
	expect(parser.has("foo")).toBe(true);
	expect(parser.has("bar", "baz")).toBe(true);
	expect(parser.has("bar", "foo", "bar")).toBe(true);
	expect(() => parser.get("foo", "bar")).toThrowError();
	expect(parser.has("foo", "bar")).toBe(false);
	expect(parser.has("baz")).toBe(true);
});

const data2 = {
	string: "hello",
	number: 10,
	bigint: 1000000000000n,
	boolean: true,
	array: ["foo", "bar", "baz"],
	object: {
		message: "hello"
	},
	null: null,
	undefined: undefined
};

test("Type checking with ObjectParser", () => {
	const parser = new ObjectParser(data2);
	expect(parser.getString("string")).toBe("hello");
	expect(() => parser.getString("random")).toThrowError();
	expect(() => parser.getString("number")).toThrowError();
	expect(parser.isString("string")).toBe(true);
	expect(parser.isString("number")).toBe(false);
	expect(() => parser.isString("random")).toThrowError();

	expect(parser.getNumber("number")).toBe(10);
	expect(() => parser.getNumber("random")).toThrowError();
	expect(() => parser.getNumber("string")).toThrowError();
	expect(parser.isNumber("number")).toBe(true);
	expect(parser.isNumber("string")).toBe(false);
	expect(() => parser.isNumber("random")).toThrowError();

	expect(parser.getBigInt("bigint")).toBe(1000000000000n);
	expect(() => parser.getBigInt("random")).toThrowError();
	expect(() => parser.getBigInt("string")).toThrowError();
	expect(parser.isBigInt("bigint")).toBe(true);
	expect(parser.isBigInt("string")).toBe(false);
	expect(() => parser.isBigInt("random")).toThrowError();

	expect(parser.getBoolean("boolean")).toBe(true);
	expect(() => parser.getBoolean("random")).toThrowError();
	expect(() => parser.getBoolean("string")).toThrowError();
	expect(parser.isBoolean("boolean")).toBe(true);
	expect(parser.isBoolean("string")).toBe(false);
	expect(() => parser.isBoolean("random")).toThrowError();

	expect(parser.getArray("array")).toStrictEqual(["foo", "bar", "baz"]);
	expect(() => parser.getArray("random")).toThrowError();
	expect(() => parser.getArray("string")).toThrowError();
	expect(parser.isArray("array")).toBe(true);
	expect(parser.isArray("string")).toBe(false);
	expect(() => parser.isArray("random")).toThrowError();

	expect(parser.getObject("object")).toStrictEqual({
		message: "hello"
	});
	expect(() => parser.getObject("random")).toThrowError();
	expect(() => parser.getObject("string")).toThrowError();
	expect(parser.isObject("object")).toBe(true);
	expect(parser.isObject("null")).toBe(false);
	expect(parser.isObject("string")).toBe(false);
	expect(() => parser.isObject("random")).toThrowError();

	expect(parser.isNull("null")).toBe(true);
	expect(parser.isNull("string")).toBe(false);
	expect(() => parser.isNull("random")).toThrowError();

	expect(parser.isUndefined("undefined")).toBe(true);
	expect(parser.isUndefined("string")).toBe(false);
	expect(() => parser.isUndefined("random")).toThrowError();
});
