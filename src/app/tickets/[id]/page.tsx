import { notFound } from 'next/navigation';
import Link from 'next/link';
import tickets from '@/data/tickets.json';

export default function TicketPage({ params }: { params: { id: string } }) {
  const ticket = tickets.find((t) => t.id === parseInt(params.id));

  if (!ticket) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{ticket.title}</h1>
      <p className="mb-2"><strong>Status:</strong> {ticket.status}</p>
      <p className="mb-4"><strong>Description:</strong> {ticket.description}</p>
      <Link href="/tickets" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Retour à la liste
      </Link>
    </div>
  );
}
