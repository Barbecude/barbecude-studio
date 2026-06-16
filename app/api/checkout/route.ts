import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const LOUVIN_API_KEY = process.env.LOUVIN_API_KEY || '';
const LOUVIN_API_URL = 'https://api.louvin.dev/create-transaction';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, customerName, customerEmail, customerPhone, items, address } = body;

    // 1. Generate unique merchant reference
    const merchantRef = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 2. Prepare payload for Louvin
    const louvinPayload = {
      reference: merchantRef,
      amount: amount,
      payment_type: 'qris',
      customer_name: customerName || 'Pelanggan Barbecude',
      customer_email: customerEmail || 'customer@example.com',
      customer_phone: customerPhone || '',
      description: `Order ${merchantRef}`
    };

    // Data lengkap untuk disimpan di database kita (dibutuhkan oleh Webhook)
    const fullCheckoutData = {
      ...louvinPayload,
      items: items || [],
      address: address || null
    };

    // 3. Request QRIS to Louvin
    const response = await fetch(LOUVIN_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': LOUVIN_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(louvinPayload)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("Louvin Error:", data);
      return NextResponse.json({ error: 'Gagal membuat transaksi Louvin', details: data }, { status: 400 });
    }

    const qrString = data.payment?.qr_string || '';
    const louvinRef = data.transaction?.id || '';

    // 4. Store order in Supabase
    const { error: dbError } = await supabase
      .from('orders')
      .insert({
        merchant_ref: merchantRef,
        louvin_reference: louvinRef,
        amount: amount,
        status: 'UNPAID',
        customer_name: customerName,
        qris_url: qrString,
        raw_checkout_data: fullCheckoutData
      });

    if (dbError) {
      console.error("Supabase Error:", dbError);
    }

    // 5. Return response to frontend
    return NextResponse.json({
      success: true,
      reference: louvinRef,
      merchant_ref: merchantRef,
      qr_string: qrString
    });

  } catch (error: any) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
