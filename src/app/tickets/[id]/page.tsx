"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TICKET_STATUSES,
  TicketStatus,
  getStatusColor,
} from "@/utils/ticketStatus";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
}

export default function TicketPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/api/tickets?id=${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setTicket(data);
        } else {
          setError("Ticket not found");
        }
      } catch (err) {
        setError("An error occurred while fetching the ticket");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTicket();
  }, [params.id]);

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!ticket) return;
    try {
      const response = await fetch(`/api/tickets?id=${ticket.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
      } else {
        setError("Failed to update ticket status");
      }
    } catch (err) {
      setError("An error occurred while updating the ticket");
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-red-500">{error}</h1>
        <Link
          href="/tickets"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Retour à la liste
        </Link>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{ticket.title}</h1>
      <p className="mb-2">
        <strong>Status:</strong>
        <span
          className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            ticket.status
          )}`}
        >
          {ticket.status}
        </span>
      </p>
      <p className="mb-4">
        <strong>Changer le statut:</strong>
        <select
          value={ticket.status}
          onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
          className="ml-2 p-2 border rounded bg-gray-100 text-gray-800 font-semibold"
          aria-label="Changer le statut du ticket"
        >
          {TICKET_STATUSES.map((status) => (
            <option key={status} value={status} className="bg-white">
              {status}
            </option>
          ))}
        </select>
      </p>
      <p className="mb-4">
        <strong>Description:</strong> {ticket.description}
      </p>
      <Link
        href="/tickets"
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
      >
        Retour à la liste
      </Link>
    </div>
  );
}
