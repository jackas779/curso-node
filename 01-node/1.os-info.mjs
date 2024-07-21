import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os';

console.log('Informacion del sistema');
console.log('--------------------------');
console.log('nombre del sistema operativo', platform());
console.log('version del sistema operativo', release());
console.log('version del sistema operativo',arch());
console.log('CPUs', cpus());
console.log('Memoria libre',freemem() / 1024 /1024);
console.log('Memoria total',totalmem() / 1024 /1024);
console.log('Uptime',uptime() / 60 /60);