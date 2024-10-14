import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ticketsPath = path.join(process.cwd(), 'src/data/tickets.json');

async function getTickets() {
  const data = await fs.readFile(ticketsPath, 'utf8');
  return JSON.parse(data);
}

async function saveTickets(tickets: any[]) {
  await fs.writeFile(ticketsPath, JSON.stringify(tickets, null, 2));
}

export async function GET() {
  const tickets = await getTickets();
  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const tickets = await getTickets();
  const newTicket = await request.json();
  newTicket.id = tickets.length > 0 ? Math.max(...tickets.map((t: any) => t.id)) + 1 : 1;
  tickets.push(newTicket);
  await saveTickets(tickets);
  return NextResponse.json(newTicket, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  let tickets = await getTickets();
  tickets = tickets.filter((t: any) => t.id !== parseInt(id));
  await saveTickets(tickets);
  return NextResponse.json({ message: 'Ticket deleted successfully' });
}
