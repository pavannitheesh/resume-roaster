import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import pdfToText from 'react-pdftotext';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';
import { Button } from "@/components/ui/button"
function App() {
  const [pdfText, setPdfText] = useState('');
  const [roastText, setRoastText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function extractText(event) {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text) => {
        console.log(text);
        setPdfText(text);
      })
      .catch((error) => console.error("Failed to extract text from pdf"));
  }

  const generateText = async () => {
    if (!pdfText) return;

    setLoading(true);
    console.log(import.meta.env.VITE_GEMINI_API_KEY);

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a savage, no-filter resume roaster. Your job is to tear apart the following resume in plain, raw, and brutally honest language. Don't hold back. Resume: ${pdfText}
      Roast Guidelines:
      - Rip apart every weak point, vague phrase, or generic line
      - Make it darkly funny but straightforward, using basic, raw English
      - Avoid sugarcoating anything—be blunt and ruthless
      - Keep it under 300 words
      - Drop sarcastic career advice that stings but makes sense
    `;

    const result = await model.generateContent(prompt);
    setRoastText(result.response.text());
    setLoading(false);

    // Navigate to the Roast page with the generated roast text
    navigate('/roast', { state: { roastText: result.response.text(), loading: false } });
  };

  return (

    <div className='flex items-center justify-center'>
    <div className="grid w-full max-w-sm  gap-1.5">
      <Label htmlFor="picture">Upload Resume (PDF)</Label>
      <Input id="picture" type="file" accept="application/pdf" onChange={extractText} />
      <Button
        onClick={generateText}
      >
        Roast Me
      </Button>
    </div>
    </div>
  );
}

export default App;
