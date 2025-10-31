/* eslint-env node */
const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

console.log('🛰️ Fetching latest satellite data...');

https.get('https://api.wheretheiss.at/v1/satellites/25544', (res) => {
  let data = '';
  res.on('data', chunk => (data += chunk));
  res.on('end', () => {
    const filePath = path.join(outputDir, 'iss_data.json');
    fs.writeFileSync(filePath, data);
    console.log('✅ Satellite data updated successfully!');
  });
}).on('error', (err) => {
  console.error('❌ Error fetching data:', err.message);
});
