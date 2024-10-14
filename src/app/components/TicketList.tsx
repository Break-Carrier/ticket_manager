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
    const response = await fetch(`/api/tickets?id=${id}`, { method: "DELETE" });
    if (response.ok) {
      fetchTickets();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des Tickets</h2>
      <ul>
        {tickets.map((ticket: any) => (
          <li
            key={ticket.id}
            className="mb-2 flex justify-between items-center"
          >
            <Link
              href={`/tickets/${ticket.id}`}
              className="text-blue-500 hover:underline"
            >
              {ticket.title} - {ticket.status}
            </Link>
            <button
              onClick={() => handleDelete(ticket.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
