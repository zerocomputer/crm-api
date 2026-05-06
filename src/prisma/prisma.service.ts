import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

@Injectable()
export class PrismaService {
  cache: Record<string, any[]> = {};

  filePath(collection: string): string {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    return path.join(DATA_DIR, `${collection}.json`);
  }

  read<T>(collection: string): T[] {
    if (this.cache[collection]) return this.cache[collection] as T[];
    try {
      const data = JSON.parse(fs.readFileSync(this.filePath(collection), 'utf-8'));
      this.cache[collection] = data;
      return data;
    } catch { return []; }
  }

  write(collection: string, data: any[]) {
    this.cache[collection] = data;
    fs.writeFileSync(this.filePath(collection), JSON.stringify(data, null, 2));
  }

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  create(collection: string, data: any) {
    const items = this.read<any>(collection);
    const item = { ...data, id: this.uuid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    items.push(item);
    this.write(collection, items);
    return item;
  }

  update(collection: string, id: string, data: any) {
    const items = this.read<any>(collection);
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...data, updatedAt: new Date().toISOString() };
    this.write(collection, items);
    return items[idx];
  }

  delete(collection: string, id: string) {
    const items = this.read<any>(collection);
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    items.splice(idx, 1);
    this.write(collection, items);
    return true;
  }

  get user() { return new Collection(this, 'users'); }
  get client() { return new Collection(this, 'clients'); }
  get task() { return new Collection(this, 'tasks'); }
  get deal() { return new Collection(this, 'deals'); }
  get company() { return new Collection(this, 'companies'); }
  get activityLog() { return new Collection(this, 'activity_logs'); }
}

class Collection {
  constructor(private db: PrismaService, private name: string) {}

  findMany(opts?: any) {
    let items = this.db.read<any>(this.name);
    if (opts?.where) {
      for (const [key, val] of Object.entries(opts.where)) {
        if (typeof val === 'object' && val !== null) {
          const v = val as any;
          if ('contains' in v) items = items.filter(i => String(i[key]||'').toLowerCase().includes(String(v.contains).toLowerCase()));
          else if ('mode' in v) {}
        } else {
          items = items.filter(i => i[key] === val);
        }
      }
    }
    if (opts?.orderBy) {
      const [key, dir] = Object.entries(opts.orderBy)[0];
      items.sort((a, b) => dir === 'desc' ? new Date(b[key]||0).getTime() - new Date(a[key]||0).getTime() : 0);
    }
    if (opts?.skip) items = items.slice(opts.skip);
    if (opts?.take) items = items.slice(0, opts.take);
    return items;
  }

  findUnique(opts: any) {
    if (!opts?.where) return null;
    const items = this.db.read<any>(this.name);
    const key = Object.keys(opts.where)[0];
    return items.find(i => i[key] === opts.where[key]) || null;
  }

  findFirst(opts?: any) {
    const items = this.findMany({ ...opts, take: 1 });
    return items[0] || null;
  }

  create(opts: any) { return this.db.create(this.name, opts.data); }
  createMany(opts: any) {
    for (const item of opts.data) this.db.create(this.name, item);
    return { count: opts.data.length };
  }
  update(opts: any) { return this.db.update(this.name, opts.where.id, opts.data); }
  delete(opts: any) { return this.db.delete(this.name, opts.where.id); }
  count(opts?: any) { return this.findMany(opts).length; }
  groupBy(opts: any) {
    const items = this.findMany({ where: opts?.where });
    const groups: Record<string, any[]> = {};
    for (const item of items) {
      const key = item[opts.by[0]];
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    }
    return Object.entries(groups).map(([key, g]) => ({ [opts.by[0]]: key, _count: g.length }));
  }
}
