import { WalletButton } from '@/components/WalletButton';
import './App.css';

function App() {
  return (
    <div className="w-full relative overflow-hidden border border-amber-600 shadow p-20 shadow-amber-600 rounded-lg">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          Web3 Demo
        </h1>
        <p className="text-center text-lg text-muted-foreground mb-8">
          Click the button in the top right to connect
        </p>
        <WalletButton />
      </main>
    </div>
  );
}

export default App;