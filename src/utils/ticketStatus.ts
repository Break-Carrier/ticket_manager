export const TICKET_STATUSES = ['ouvert', 'en cours', 'fermé'] as const;

export type TicketStatus = typeof TICKET_STATUSES[number];

export const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case 'ouvert': return 'bg-green-200 text-green-800';
    case 'en cours': return 'bg-yellow-200 text-yellow-800';
    case 'fermé': return 'bg-red-200 text-red-800';
    default: return 'bg-gray-200 text-gray-800';
  }
};
