const mongoose = require('mongoose');
const connectionString = process.env.ATLAS_URI;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(connectionString);
}