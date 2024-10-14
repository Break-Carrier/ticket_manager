import Link from 'next/link';
import tickets from '@/data/tickets.json';

export default function TicketList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id} className="mb-2">
            <Link href={`/tickets/${ticket.id}`} className="text-blue-500 hover:underline">
              {ticket.title} - {ticket.status}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
