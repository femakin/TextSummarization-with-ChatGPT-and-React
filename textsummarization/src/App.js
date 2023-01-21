import logo from './logo.svg';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';
import { useEffect, useState } from 'react';

function App() {

  const [text, setText] = useState('')



  const HandleSubmit = (e) => {
    e.preventDefault()
    console.log(text)
  }



  useEffect(() => {

    const configuration = new Configuration({
      // apiKey: process.env.OPENAI_API_KEY,
      apiKey: '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'
    });
    const openai = new OpenAIApi(configuration);


    console.log(openai, 'apenaiii')

  }, [])



  // export default async function (req, res) {
  //   const { text } = req.body;
  //   const completion = await openai.createCompletion({
  //     model: 'text-davinci-003',
  //     prompt: generatePrompt(text),
  //     temperature: 0.6,
  //     max_tokens: 2048,
  //   });
  //   res.status(200).json({ result: completion.data.choices[0].text });
  // }

  //   const getDetails = async (req, res)=>{
  //   const { text } = req.body;
  //   const completion = await openai.createCompletion({
  //     model: 'text-davinci-003',
  //     prompt: generatePrompt(text),
  //     temperature: 0.6,
  //     max_tokens: 2048,
  //   });
  //   res.status(200).json({ result: completion.data.choices[0].text });
  // }




  function generatePrompt(text) {
    return `Summarize this text into five lines  ${text}.`;
  }



  return (
    <div className="App">



      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <form onSubmit={HandleSubmit}  >

        <textarea placeholder='Put your text' value={text} onChange={(e) => setText(e.target.value)} />



        <button type='submit'   >Summarize</button>




      </form>



    </div>
  );
}

export default App;
