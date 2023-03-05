import Dashboard from './pages/dashboard';
import Header from './shared/components/header';
import './App.scss';
// import ParticlesBg from './shared/components/particles/particlesBg';

function App() {
  return (
    <div>
      {/* <ParticlesBg></ParticlesBg> */}
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
