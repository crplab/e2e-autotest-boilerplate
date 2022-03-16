import * as fs from "fs";
import {JSON_STORAGE_FILE_PATH} from "src/resources/constants";

let instance: JsonStorageService;

export class JsonStorageService {
  private data: any = {};

  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;

    this.upload();
  }

  setItem(name: string, data: any): void {
    this.data[name] = data;
    this.save();
  }

  getItem(name: string): any {
    return this.data[name];
  }

  removeItem(name: string): void {
    delete this.data[name];
    this.save();
  }

  private save(): void {
    fs.writeFileSync(JSON_STORAGE_FILE_PATH, JSON.stringify(this.data));
  }

  private upload(): void {
    if (fs.existsSync(JSON_STORAGE_FILE_PATH)) {
      this.data = JSON.parse(fs.readFileSync(JSON_STORAGE_FILE_PATH, 'utf8'));
    } else {
      this.data = {};
    }
  }
}
