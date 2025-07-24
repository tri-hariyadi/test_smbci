import { sprintf, titleCase } from 'lib/utils.ts';

export class StringSchema {
  private _label?: string;
  private _message?: string;
  private _min?: number;
  private _max?: number;
  private _optional = false;
  private _regex?: RegExp;
  private _email = false;
  private _email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  label(l: string): this {
    this._label = l;
    return this;
  }

  min(n: number, errMsg?: string): this {
    this._min = n;
    this._message = errMsg;
    return this;
  }

  max(n: number, errMsg?: string): this {
    this._max = n;
    this._message = errMsg;
    return this;
  }

  regex(r: RegExp, errMsg?: string): this {
    this._regex = r;
    this._message = errMsg;
    return this;
  }

  email(errMsg?: string): this {
    this._email = true;
    this._message = errMsg;
    return this;
  }

  optional(errMsg?: string): this {
    this._optional = true;
    this._message = errMsg;
    return this;
  }

  validate(value: Any, label?: string): string | undefined {
    this._label = this._label || label || '%label%';
    if (value === undefined || value === null || value === '') {
      return this._optional ? undefined : (this._message ?? sprintf('%v harus diisi', titleCase(this._label)));
    }

    if (typeof value !== 'string') {
      return this._message ?? sprintf('%v harus berupa string', titleCase(this._label));
    }

    if (this._min !== undefined && value.length < this._min) {
      return this._message ?? sprintf('%v minimal %v karakter', titleCase(this._label), this._min);
    }

    if (this._max !== undefined && value.length > this._max) {
      return this._message ?? sprintf('%v maksimal %v karakter', titleCase(this._label), this._max);
    }

    if (this._regex && !this._regex.test(value)) {
      return this._message ?? sprintf('Format %v tidak valid', this._label?.toLowerCase());
    }

    if (this._email && !this._email_regex.test(value)) {
      return this._message ?? sprintf('Format %v tidak valid', this._label?.toLowerCase());
    }

    return undefined;
  }
}

export class NumberSchema {
  private _label?: string;
  private _message?: string;
  private _min?: number;
  private _max?: number;
  private _optional = false;

  label(l: string): this {
    this._label = l;
    return this;
  }

  min(n: number, errMsg?: string): this {
    this._min = n;
    this._message = errMsg;
    return this;
  }

  max(n: number, errMsg?: string): this {
    this._max = n;
    this._message = errMsg;
    return this;
  }

  optional(errMsg?: string): this {
    this._optional = true;
    this._message = errMsg;
    return this;
  }

  validate(value: Any, label?: string): string | undefined {
    this._label = this._label || label || '%label%';
    if (value === undefined || value === null) {
      return this._optional ? undefined : (this._message ?? sprintf('%v nilai wajib diisi', titleCase(this._label)));
    }

    if (typeof value !== 'number' || isNaN(value)) {
      return this._message ?? sprintf('%v harus berupa angka', titleCase(this._label));
    }

    if (this._min !== undefined && value < this._min) {
      return this._message ?? sprintf('%v minimal %v', titleCase(this._label), this._min);
    }

    if (this._max !== undefined && value > this._max) {
      return this._message ?? sprintf('%v maksimal %v', titleCase(this._label), this._max);
    }

    return undefined;
  }
}

class SchemaBuilder {
  string() {
    return new StringSchema();
  }

  number() {
    return new NumberSchema();
  }
}

export const schema = new SchemaBuilder();
