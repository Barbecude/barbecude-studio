async function test() {
  const payload = {
    amount: 15000,
    customerName: "Test Name",
    customerEmail: "test@test.com",
    items: []
  };
  const res = await fetch('http://localhost:3000/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
}
test();
