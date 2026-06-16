import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendWhatsAppMessage } from '@/lib/waGateway';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
    }

    // 1. Update database
    const { data: updatedOrder, error } = await supabaseAdmin
      .from('orders')
      .update({ status: status, updated_at: Date.now() })
      .eq('order_id', orderId)
      .select()
      .single();

    if (error) {
      console.error("Failed to update order status in DB:", error);
      return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
    }

    // 2. Send WA Notification if status is 'shipped'
    if (status === 'shipped' && updatedOrder) {
      const phone = updatedOrder.phone;
      const customerName = updatedOrder.customer_name || 'Kak';
      const address = updatedOrder.detail_address || '';
      
      if (phone) {
        const waMessage = `Halo ${customerName},\n\nPesanan Anda dengan ID *${orderId}* saat ini sudah masuk ke tahap pengiriman dan sedang menuju ke alamat rumah Anda:\n${address}\n\nMohon ditunggu ya! Terima kasih.\n\n_Kalau ada pertanyaan seputar pesanan, boleh banget langsung balas pesan ini._`;
        
        // Asynchronous WA send
        sendWhatsAppMessage(phone, waMessage);
      }
    }

    return NextResponse.json({ success: true, order: updatedOrder });

  } catch (error: any) {
    console.error("API Update Status Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
