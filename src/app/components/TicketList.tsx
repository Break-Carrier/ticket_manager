"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const response = await fetch("/api/tickets");
    const data = await response.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?")) {
      const response = await fetch(`/api/tickets?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchTickets();
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ouvert': return 'bg-green-200 text-green-800';
      case 'en cours': return 'bg-yellow-200 text-yellow-800';
      case 'fermé': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des Tickets</h2>
      <ul className="space-y-4">
        {tickets.map((ticket: any) => (
          <li
            key={ticket.id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition duration-300"
          >
            <div>
              <Link
                href={`/tickets/${ticket.id}`}
                className="text-lg font-semibold text-blue-600 hover:text-blue-800"
              >
                {ticket.title}
              </Link>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>
            <button
              onClick={() => handleDelete(ticket.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
