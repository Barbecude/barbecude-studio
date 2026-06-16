import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Louvin Webhook Handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { event, data } = body;

    if (event === 'payment.settled') {
      const merchantRef = data.order_id || data.reference;

      if (!merchantRef) {
        return NextResponse.json({ error: 'Missing reference ID' }, { status: 400 });
      }

      // Update Supabase
      const { error } = await supabase
        .from('orders')
        .update({ status: 'PAID' })
        .eq('merchant_ref', merchantRef);

      if (error) {
        console.error("Failed to update supabase:", error);
        // Selalu return 200 untuk webhook Louvin agar tidak dianggap gagal oleh mereka
        return NextResponse.json({ received: false, error: 'Database error' }, { status: 200 });
      }

      console.log('Pembayaran berhasil:', merchantRef);
    }

    // PENTING: selalu return 200
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    // PENTING: selalu return 200
    return NextResponse.json({ received: false, error: 'Internal Server Error' }, { status: 200 });
  }
}
