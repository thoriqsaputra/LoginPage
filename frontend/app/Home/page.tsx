import Navbar from '../Components/Navbar';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="relative">
    <Navbar />
    <main className="bg-[#468585] min-h-screen p-10 grid grid-cols-1 items-center">
      <div className="relative">
        <img
          src="GD/harvest.svg"
          alt="FarmIT"
          className="h-auto w-40 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 mt-[120px]"
        />
        <div className="relative z-10 mt-40 text-center">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">Welcome to FarmIT</h1>
          <p className="text-white mt-5 text-xl">
            Your ultimate farming management solution.
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <Link href="https://www.youtube.com/watch?v=OK986vgCMs8&pp=ygUFd2FyciA%3D" className="bg-amber-500 shadow-md hover:bg-amber-700 transition ease-linear duration-200 delay-100 text-white font-bold py-3 px-6 rounded-full">
                Learn More
            </Link>
            <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D" className="bg-blue-500 shadow-md hover:bg-blue-700 transition ease-linear duration-200 delay-100 text-white font-bold py-3 px-6 rounded-full">
                Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}