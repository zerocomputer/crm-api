"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const DATA_DIR = path.join(process.cwd(), 'data');
let PrismaService = class PrismaService {
    constructor() {
        this.cache = {};
    }
    filePath(collection) {
        if (!fs.existsSync(DATA_DIR))
            fs.mkdirSync(DATA_DIR, { recursive: true });
        return path.join(DATA_DIR, `${collection}.json`);
    }
    read(collection) {
        if (this.cache[collection])
            return this.cache[collection];
        try {
            const data = JSON.parse(fs.readFileSync(this.filePath(collection), 'utf-8'));
            this.cache[collection] = data;
            return data;
        }
        catch {
            return [];
        }
    }
    write(collection, data) {
        this.cache[collection] = data;
        fs.writeFileSync(this.filePath(collection), JSON.stringify(data, null, 2));
    }
    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    create(collection, data) {
        const items = this.read(collection);
        const item = { ...data, id: this.uuid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        items.push(item);
        this.write(collection, items);
        return item;
    }
    update(collection, id, data) {
        const items = this.read(collection);
        const idx = items.findIndex(i => i.id === id);
        if (idx === -1)
            return null;
        items[idx] = { ...items[idx], ...data, updatedAt: new Date().toISOString() };
        this.write(collection, items);
        return items[idx];
    }
    delete(collection, id) {
        const items = this.read(collection);
        const idx = items.findIndex(i => i.id === id);
        if (idx === -1)
            return false;
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
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
class Collection {
    constructor(db, name) {
        this.db = db;
        this.name = name;
    }
    findMany(opts) {
        let items = this.db.read(this.name);
        if (opts?.where) {
            for (const [key, val] of Object.entries(opts.where)) {
                if (typeof val === 'object' && val !== null) {
                    const v = val;
                    if ('contains' in v)
                        items = items.filter(i => String(i[key] || '').toLowerCase().includes(String(v.contains).toLowerCase()));
                    else if ('mode' in v) { }
                }
                else {
                    items = items.filter(i => i[key] === val);
                }
            }
        }
        if (opts?.orderBy) {
            const [key, dir] = Object.entries(opts.orderBy)[0];
            items.sort((a, b) => dir === 'desc' ? new Date(b[key] || 0).getTime() - new Date(a[key] || 0).getTime() : 0);
        }
        if (opts?.skip)
            items = items.slice(opts.skip);
        if (opts?.take)
            items = items.slice(0, opts.take);
        return items;
    }
    findUnique(opts) {
        if (!opts?.where)
            return null;
        const items = this.db.read(this.name);
        const key = Object.keys(opts.where)[0];
        return items.find(i => i[key] === opts.where[key]) || null;
    }
    findFirst(opts) {
        const items = this.findMany({ ...opts, take: 1 });
        return items[0] || null;
    }
    create(opts) { return this.db.create(this.name, opts.data); }
    createMany(opts) {
        for (const item of opts.data)
            this.db.create(this.name, item);
        return { count: opts.data.length };
    }
    update(opts) { return this.db.update(this.name, opts.where.id, opts.data); }
    delete(opts) { return this.db.delete(this.name, opts.where.id); }
    count(opts) { return this.findMany(opts).length; }
    groupBy(opts) {
        const items = this.findMany({ where: opts?.where });
        const groups = {};
        for (const item of items) {
            const key = item[opts.by[0]];
            if (!groups[key])
                groups[key] = [];
            groups[key].push(item);
        }
        return Object.entries(groups).map(([key, g]) => ({ [opts.by[0]]: key, _count: g.length }));
    }
}
//# sourceMappingURL=prisma.service.js.map