import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Gestionnaire de Tickets</h1>
      <Link href="/tickets" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Voir tous les tickets
      </Link>
    </div>
  );
}
