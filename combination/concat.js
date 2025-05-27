const { concat, of } = require('rxjs');

const dbBackup$ = of('DB backup complete');
const fileUpload$ = of('Files uploaded to cloud');
const cleanup$ = of('Temporary files deleted');

concat(dbBackup$, fileUpload$, cleanup$).subscribe({
    next: msg => console.log(`[SYSTEM] ${msg}`),
    complete: () => console.log('All maintenance tasks done')
});
// Output: Executes tasks sequentially