const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook = XLSX.readFile('c:/Users/Gubell/Documents/ACCP2026-FIX-Frontend-Ver.02-main/ACCP2026_Web_GSheet_Version_UPDATED.xlsx');
    const result = {};

    workbook.SheetNames.forEach(name => {
        const sheet = workbook.Sheets[name];
        // Convert to array of arrays first to see structure, or json
        // Using sheet_to_json with header:1 gives array of arrays (rows)
        // Using default gives object with headers
        result[name] = XLSX.utils.sheet_to_json(sheet);
    });

    fs.writeFileSync('requirements_dump.json', JSON.stringify(result, null, 2));
    console.log('Successfully wrote requirements_dump.json');
} catch (e) {
    console.error('Error reading excel:', e);
}
