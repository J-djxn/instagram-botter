const fs = require('fs');
const path = require('path');

try {
  const androidDir = path.join(__dirname, '..', 'android');
  if (!fs.existsSync(androidDir)) {
    fs.mkdirSync(androidDir);
  }
} catch (e) {}

