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
      <h1 className="text-4xl font-bold mb-8 text-center">Gestion des Tickets</h1>
      <TicketForm onTicketAdded={handleTicketAdded} />
      <TicketList key={refreshKey} />
      <div className="mt-8 text-center">
        <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
