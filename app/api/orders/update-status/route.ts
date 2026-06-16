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

    // 2. Send WA Notification based on status
    if (updatedOrder && updatedOrder.phone) {
      const phone = updatedOrder.phone;
      const customerName = updatedOrder.customer_name || 'Kak';
      const address = updatedOrder.detail_address || '';
      
      let waMessage = '';
      
      switch (status) {
        case 'pending':
          waMessage = `Halo ${customerName},\n\nTerima kasih! Pesanan Anda dengan ID *${orderId}* saat ini sedang menunggu konfirmasi dari tim kami. Kami akan segera memprosesnya.\n\n_Kalau ada pertanyaan seputar pesanan, boleh banget langsung balas pesan ini._`;
          break;
        case 'confirmed':
          waMessage = `Halo ${customerName},\n\nHore! Pesanan Anda dengan ID *${orderId}* telah kami konfirmasi dan akan segera kami kemas. Harap ditunggu ya!\n\n_Kalau ada pertanyaan seputar pesanan, boleh banget langsung balas pesan ini._`;
          break;
        case 'processing':
          waMessage = `Halo ${customerName},\n\nPesanan Anda dengan ID *${orderId}* saat ini sedang kami kemas/proses. Sebentar lagi akan siap untuk dikirim!\n\n_Kalau ada pertanyaan seputar pesanan, boleh banget langsung balas pesan ini._`;
          break;
        case 'shipped':
          waMessage = `Halo ${customerName},\n\nPesanan Anda dengan ID *${orderId}* saat ini sudah masuk ke tahap pengiriman dan sedang menuju ke alamat rumah Anda:\n${address}\n\nMohon ditunggu ya! Terima kasih.\n\n_Kalau ada pertanyaan seputar pesanan, boleh banget langsung balas pesan ini._`;
          break;
        case 'delivered':
          waMessage = `Halo ${customerName},\n\nPesanan Anda dengan ID *${orderId}* telah berhasil dikirim dan statusnya **Telah Diterima**. Semoga Anda suka dengan produknya!\n\n_Kalau ada masalah dengan produk, silakan balas pesan ini._`;
          break;
        case 'cancelled':
          waMessage = `Halo ${customerName},\n\nMohon maaf, pesanan Anda dengan ID *${orderId}* telah dibatalkan oleh sistem/admin kami. Jika Anda merasa ini kesalahan, silakan balas pesan ini ya.\n\n_Terima kasih._`;
          break;
        default:
          waMessage = '';
      }

      if (waMessage) {
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
