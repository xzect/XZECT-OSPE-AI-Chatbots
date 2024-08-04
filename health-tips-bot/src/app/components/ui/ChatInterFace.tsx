export default function ChatInterface() {
  const suggestions = [
    "What are some healthy breakfast options?",
    "How can I improve my sleep quality?",
    "What exercises are best for weight loss?",
    "How much water should I drink daily?",
  ];

  return (
    <div>
      <header className="w-full bg-blue-500 text-white py-4 flex justify-between items-center px-6">
        <div className="text-2xl font-bold">Health Tips Bot</div>
        <div className="flex items-center space-x-4">
          <button className="bg-white text-blue-500 p-2 rounded hover:bg-gray-200">
            Login
          </button>
          <button className="bg-white text-blue-500 p-2 rounded hover:bg-gray-200"></button>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-md w-full max-w-lg mb-12 mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Ask a Health Question
          </h2>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Ask a health-related question"
              required
              className="border border-gray-300 dark:border-gray-600 p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            ></button>
          </form>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-md w-full max-w-lg mb-12">
          <h3 className="text-xl font-bold mb-2">Suggestions</h3>
          <ul className="list-disc list-inside space-y-2"></ul>
        </div>
      </div>
    </div>
  );
}
