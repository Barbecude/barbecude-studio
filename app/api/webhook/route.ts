import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Louvin Webhook Handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("=== WEBHOOK RECEIVED ===", JSON.stringify(body, null, 2));

    const { event, data } = body;
    const type = body.type || event; 
    const payload = data || body.data || body;
    const merchantRef = payload?.order_id || payload?.reference || payload?.merchant_ref || payload?.id;

    // Menyesuaikan beberapa kemungkinan status sukses dari payment gateway
    if (type === 'payment.settled' || type === 'transaction.success' || payload?.transaction_status === 'settlement' || payload?.status === 'success' || payload?.status === 'PAID') {

      if (!merchantRef) {
        console.error("Webhook Error: Missing reference ID in payload", payload);
        return NextResponse.json({ error: 'Missing reference ID' }, { status: 200 }); // Louvin requires 200
      }

      console.log(`Updating order ${merchantRef} to PAID...`);
      // Update Supabase menggunakan Admin Client (Bypass RLS)
      const { data: updatedData, error } = await supabaseAdmin
        .from('orders')
        .update({ status: 'PAID' })
        .eq('merchant_ref', merchantRef)
        .select();

      if (error) {
        console.error("Failed to update supabase. Error:", error);
        return NextResponse.json({ received: false, error: 'Database error' }, { status: 200 });
      }

      console.log('Pembayaran berhasil diupdate:', merchantRef, updatedData);
    } else if (type === 'payment.failed') {
      if (merchantRef) {
        console.log(`Updating order ${merchantRef} to FAILED...`);
        await supabaseAdmin
          .from('orders')
          .update({ status: 'FAILED' })
          .eq('merchant_ref', merchantRef);
      }
    } else {
      console.log('Ignored webhook event type:', type, 'Status:', payload?.status);
    }

    // PENTING: selalu return 200
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    // PENTING: selalu return 200
    return NextResponse.json({ received: false, error: 'Internal Server Error' }, { status: 200 });
  }
}
