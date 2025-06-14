import VideoPlayer from '@/app/playground/components/videoPlayer';

export default function Page() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Playground</h1>
      <p className="mb-4">
        This is a playground for testing components and features. You can modify the code and see the results in
        real-time.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <VideoPlayer />
      </div>
    </main>
  );
}