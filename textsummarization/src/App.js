import './App.css';
import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';

function App() {

  const [text, setText] = useState('')
  const [summarizedtext, setsummarizedtext] = useState('')

  const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: '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'
  });
  const openai = new OpenAIApi(configuration);


  const HandleSubmit = (e) => {
    e.preventDefault()
    openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(text),
      temperature: 0.6,
      max_tokens: 100,
    }).then((res) => {
      setsummarizedtext(res?.data?.choices[0]?.text)
    })
  }


  function generatePrompt(text) {
    return `Summarize this text into five lines  ${text}. and break them into seperate lines`;
  }



  return (
    <div className="App_">
      <div className='header'  >
        <h1 className='header_text' >Text  <span className='text_active'  >Summarizer</span></h1>
        <h2 className='header_summary' > Summarise your text into a shorter length.</h2>
      </div>
      <div className='container' >
        <div className='text_form'  >
          <form   >
            <label>Enter your text</label>
            <textarea rows={14} cols={80} placeholder='Put your text' value={text} onChange={(e) => setText(e.target.value)} />
          </form>
        </div>
        <div>
          <button type='button' onClick={HandleSubmit}  >Summarize</button>
        </div>
        <div className='summarized_text' >
          <label>Summarized text</label>
          <textarea placeholder='Summarized text' cols={80} rows={14} value={summarizedtext} onChange={(e) => setText(e.target.value)} />

        </div>


      </div>
    </div>
  );
}

export default App;
