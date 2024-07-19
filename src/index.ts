export class ObjectParser {
	private value: unknown;

	constructor(value: unknown) {
		this.value = value;
	}

	public has(...path: string[]): boolean {
		if (path.length < 1) {
			throw new TypeError("Invalid path");
		}
		let value = this.value;
		for (let i = 0; i < path.length; i++) {
			if (typeof value !== "object" || value === null) {
				return false;
			}
			if (!(path[i] in value)) {
				return false;
			}
			value = value[path[i] as keyof typeof value];
		}
		return true;
	}

	public get(...path: string[]): unknown {
		if (path.length < 1) {
			throw new TypeError("Invalid path");
		}
		let value = this.value;
		for (let i = 0; i < path.length; i++) {
			if (typeof value !== "object" || value === null) {
				throw new Error(`Value in path ${path.slice(0, i + 1).join(".")} is not an object`);
			}
			if (!(path[i] in value)) {
				throw new Error(`Path ${path.slice(0, i + 1).join(".")} does not exist`);
			}
			value = value[path[i] as keyof typeof value];
		}
		return value;
	}

	public getString(...path: string[]): string {
		const value = this.get(...path);
		if (typeof value !== "string") {
			throw new Error(`Value in path ${path.join(".")} is not a string`);
		}
		return value;
	}

	public getNumber(...path: string[]): number {
		const value = this.get(...path);
		if (typeof value !== "number") {
			throw new Error(`Value in path ${path.join(".")} is not a string`);
		}
		return value;
	}

	public getBoolean(...path: string[]): boolean {
		const value = this.get(...path);
		if (typeof value !== "boolean") {
			throw new Error(`Value in path ${path.join(".")} is not a boolean`);
		}
		return value;
	}

	public getBigInt(...path: string[]): bigint {
		const value = this.get(...path);
		if (typeof value !== "bigint") {
			throw new Error(`Value in path ${path.join(".")} is not a bigint`);
		}
		return value;
	}

	public getObject(...path: string[]): object {
		const value = this.get(...path);
		if (typeof value !== "object" || value === null) {
			throw new Error(`Value in path ${path.join(".")} is not a object`);
		}
		return value;
	}

	public getArray(...path: string[]): object {
		const value = this.get(...path);
		if (!Array.isArray(value)) {
			throw new Error(`Value in path ${path.join(".")} is not a object`);
		}
		return value;
	}

	public isNull(...path: string[]): boolean {
		const value = this.get(...path);
		return value === null;
	}

	public isUndefined(...path: string[]): boolean {
		const value = this.get(...path);
		return value === undefined;
	}

	public createParser(...path: string[]): ObjectParser {
		return new ObjectParser(this.getObject(...path));
	}
}
