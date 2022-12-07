import './App.css';
import { getWrappedImage } from './utils/getWrappedImage';

function App() {
  const src = getWrappedImage()

  return (
    <div className="App">
      <img src={src} style={{ width: '300px', height: '400px'}}/>
    </div>
  );
}

export default App;
