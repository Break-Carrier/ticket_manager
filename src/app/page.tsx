import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Gestionnaire de Tickets</h1>
      <div className="flex justify-center">
        <Link href="/tickets" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          Voir tous les tickets
        </Link>
      </div>
    </div>
  );
}
