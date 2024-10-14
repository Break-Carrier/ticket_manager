import { NextResponse } from 'next/server';
import tickets from '@/data/tickets.json';

export async function GET() {
  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const newTicket = await request.json();
  newTicket.id = tickets.length + 1;
  tickets.push(newTicket);
  return NextResponse.json(newTicket, { status: 201 });
}
