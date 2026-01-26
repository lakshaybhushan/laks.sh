export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24 md:gap-8 gap-4 px-4 py-16">
     <p>Work in progress, please check back later :D</p>
     <video
       src="/wait.mp4"
       autoPlay
       muted
       loop
       className="md:w-1/2 md:h-1/2 w-full h-full object-cover pointer-events-none"
       tabIndex={-1}
     />
    </main>
  );
}
