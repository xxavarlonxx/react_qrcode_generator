import './App.css';
import { useState } from 'react';

function App() {
  const [url, setURL] = useState('');
  const [generateQRCode, setGenerateQRCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setURL(e.target.value);
  };

  const onGenerate = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url, size: 500 }),
    };

    const response = await fetch(
      'http://localhost:3000/api/qrcode/generate',
      requestOptions
    );
    const data = await response.json();
    const generateQRCode = data.qrcodeURL;
    setGenerateQRCode(generateQRCode);
    setLoading(false);
  };

  return (
    <div className='app'>
      <div className='container'>
        <h1>QR-Code Generator!</h1>
        <input
          type='text'
          name='url'
          id='url'
          placeholder='URL'
          value={url}
          onChange={onChange}
        />
        <button className='btn' onClick={onGenerate}>
          Generate
        </button>
        {loading ? (
          <h2>Generating...</h2>
        ) : (
          <img src={generateQRCode} className='qrImage' alt='' />
        )}
      </div>
    </div>
  );
}

export default App;
