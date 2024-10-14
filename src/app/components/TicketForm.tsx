'use client';

import { useState } from 'react';

export default function TicketForm({ onTicketAdded }: { onTicketAdded: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, status: 'ouvert' }),
    });

    if (response.ok) {
      setTitle('');
      setDescription('');
      onTicketAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre du ticket"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description du ticket"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Ajouter un ticket
      </button>
    </form>
  );
}
