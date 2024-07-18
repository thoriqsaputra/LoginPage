import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-[#50b498d1] shadow rounded-3xl p-4 flex w-full justify-between items-center absolute z-1">
      <div className="text-white text-2xl font-bold">FarmIT</div>
      <div className="flex space-x-4" >
        <Link href="/Home" className="transition ease-linear duration-200 delay-100 text-white hover:bg-green-700 px-3 py-2 rounded">
          Home
        </Link>
        <Link href="/Home" className="text-white transition ease-linear duration-200 delay-100 hover:bg-green-700 px-3 py-2 rounded">
          About
        </Link>
      </div>
      <Link href={'/'} className="bg-red-500 hover:bg-red-700 transition ease-linear duration-200 delay-100 text-white font-bold py-2 px-4 rounded">
        Sign Out
      </Link>
    </nav>
  );
};

export default Navbar;
