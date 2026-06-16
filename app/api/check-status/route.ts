import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get('ref');

    if (!ref) {
      return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .select('status')
      .eq('merchant_ref', ref)
      .single();

    if (error) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ status: data.status });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
