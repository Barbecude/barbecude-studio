const fs = require('fs');

const envPath = '.env.local';
const envContent = fs.readFileSync(envPath, 'utf8');
let apiKey = '';

envContent.split('\n').forEach(line => {
  if (line.startsWith('LOUVIN_API_KEY=')) {
    apiKey = line.split('=')[1].trim();
  }
});

const payload = {
  reference: `ORD-${Date.now()}-123`,
  amount: 15000,
  payment_type: 'qris',
  customer_name: 'Test',
  customer_email: 'test@example.com',
  description: 'Test order'
};

async function test() {
  const response = await fetch('https://api.louvin.dev/create-transaction', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  const text = await response.text();
  console.log('Status:', response.status);
  console.log('Response:', text);
}

test();
