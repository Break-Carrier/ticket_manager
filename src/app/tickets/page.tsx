'use client';

import { useState } from 'react';
import TicketList from '../components/TicketList';
import TicketForm from '../components/TicketForm';
import Link from 'next/link';

export default function TicketsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTicketAdded = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tickets</h1>
      <TicketForm onTicketAdded={handleTicketAdded} />
      <TicketList key={refreshKey} />
      <Link href="/" className="mt-4 inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
