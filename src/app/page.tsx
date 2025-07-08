import VideoPlayer from "../components/VideoPlayer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <video
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="/synthwave-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        style={{
          filter: "blur(12px) brightness(0.4)",
          transition: "opacity 0.5s",
          opacity: 1,
        }}
      />
      <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-white text-5xl font-bold flex justify-center">
            <strong>Play the video and enjoy</strong>
          </h1>
          <VideoPlayer />
        </main>
      </div>
    </div>
  );
}
