
export function WelcomeScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-lg">
          D
        </div>
        <h1 className="text-3xl font-bold mb-4 text-foreground">
          How can I help you today?
        </h1>
        <p className="text-lg text-muted-foreground">
          I'm Digit GPT, your AI assistant. Ask me anything and I'll do my best to help.
        </p>
      </div>
    </div>
  );
}
