import TicketList from '../components/TicketList';
import Link from 'next/link';

export default function TicketsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tickets</h1>
      <TicketList />
      <Link href="/" className="mt-4 inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Retour à l'accueil
      </Link>
    </div>
  );
}
