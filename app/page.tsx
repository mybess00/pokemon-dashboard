import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://th.bing.com/th/id/R.de8a0f82f1449b48f71828ede116ecd9?rik=gwf9F0ZL90b0tw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpokemon-logo-png-pokemon-logo-text-png-1428-1390.png&ehk=xcPPKSYiaFwoVSTL9JMZq%2foHXfffz%2bbO4RjmbqQ5b6I%3d&risl=&pid=ImgRaw&r=0"
          alt="Pokemon logo"
          width={360}
          height={76}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Welcome to Pokemon Database
          </li>
          <li>Got to dashboard or login.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/dashboard"
            rel="noopener noreferrer"
          >
            Dahsboard
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/auth"
            rel="noopener noreferrer"
          >
            Login
          </a>
        </div>
      </main>
    </div>
  );
}
