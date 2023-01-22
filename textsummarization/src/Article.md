## Introduction

In today's digital age, the abundance of information can be overwhelming. With the constant stream of news, research papers, social media updates, and online content, it can be tough to keep up and make sense of it all.

Hence, this is where a text summarization app comes in. With a text summarization app, users can quickly and easily condense large amounts of text into a shorter, easier-to-digest format. It can also improve comprehension by highlighting the main points and key takeaways from a piece of content, making it easier to retain information.

Also, Text summarization offers a solution by automating the condensation of lengthy texts into shorter, more manageable versions.


## The Plan

In this tutorial, you will build a text summarization app in React using OpenAI's ChatGPT model.

You will learn how to:

- Set up a React project

- Install necessary dependencies,

- Send a text to the ChatGPT model, and

- Extract the summarized text from the model's response.

Additionally, you will discover ways to enhance the text summarization feature, including customizing summary length, condensing multiple texts at once, and saving and retrieving summaries.

## Prerequisites

As a prerequisite to this tutorial, prior knowledge of React is required, and ensure you have Node.JS version 18+  installed.

Steps we'll cover:

- [Overview of ChatGPT and its capabilities](#overview-of-chatgpt-and-its-capabilities)

- [Bootstrapping React Application](#bootstrapping-react-application)

- [Getting started with ChatGPT](#getting-started-with-chatgpt)

- [Installing dependencies, such as the OpenAI API client library](#installing-dependencies-such-as-the-openai-api-client-library)

- [Implementing the Text Summarization Feature](#implementing-the-text-summarization-feature)

- [Adding Style](#adding-style)

- [Testing the App](#testing-the-app)

- [Project Demo](#project-demo)

- [Conclusion](#conclusion)


## Overview of ChatGPT and its capabilities

Developed by [OpenAI](https://openai.com/), [ChatGPT](https://chat.openai.com/chat) is a large-scale language generation model. It utilizes the GPT-2 architecture and works on diverse datasets of web pages. Using ChatGPT, you can complete text, translate, summarize, and translate human-like text.

ChatGPT can answer complex questions conversationally. Its ability to understand the intended meaning behind human questions makes it groundbreaking.

Among the characteristics of ChatGPT is its ability to generate coherent and contextually appropriate text. Due to the wide variety of input styles and formats the model has learned, it can adapt to different input style formats and generate text that matches the context.

Another important capability of ChatGPT is that it generates grammatically correct and semantically meaningful text. Using the model to summarize a text is the perfect way to ensure it understands its meaning.

Aside from handling massive inputs, ChatGPT can also generate long-form text. Writing essays, articles, and even books is possible with it.

## Bootstrapping React Application

Using [Create React App](https://create-react-app.dev/), let's create a react project by running the following command in your terminal:

```
npx create-react-app text-summarization
cd text-summarization
npm start
```

The command above creates a new React application called text-summarization using the <code>create-react-app</code> tool, navigates into the application, and starts a development server to see the changes you will make to the application in real-time on the browser.

## Getting started with ChatGPT

To get started with ChatGPT and also get your OpenAI API key, follow these steps:

- Log in or create a new account on [OpenAI](https://beta.openai.com/signup)
for a free account. By following the instructions, you'll get to your Dashboard.

- Click on your profile picture to view the menu bar, and then click View API Keys to proceed to the API Keys page.


![View API Keys](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e54ir0xbc933f5jy85a7.png)

-  Click on Create new secret key to create a new API Key.


![Create new secret key](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hk4hbxy8gwgu8y165kla.png)

- Copy the API Key and store it safely to use later in the tutorial.

![API Key](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zy086h404pnyjiw4cn5o.png)



## Installing dependencies such as the OpenAI API client library

The next step is to Install the official OpenAI library.

Navigate into the project directory and run the following command:

```
npm install openai
```
Add the <code>OPENAI_API_KEY</code> in the .env file.

In the project root directory, create a <code>.env</code> file and add the code below:

```
REACT_APP_OPENAI_API_KEY = your-api-key-here
```

> Make sure you use a valid API key you obtained from OpenAI earlier in the tutorial instead of your-API-key-here.

## Implementing the Text Summarization Feature

In the <code>src/App.js</code> file, replace its content with this:

```javaScript

import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [summarizedtext, setsummarizedtext] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const HandleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(text),
        temperature: 0.6,
        max_tokens: 100,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setsummarizedtext(res?.data?.choices[0]?.text);
        }
      })
      .catch((err) => {
        console.log(err, "An error occured");
      });
  };

  function generatePrompt(text) {
    return `Summarize this ${text}. and break them into seperate lines`;
  }

  return (
    <div className="App_">
      <div className="header">
        <h1 className="header_text">
          Text <span className="text_active">Summarizer</span>
        </h1>
        <h2 className="header_summary">
          {" "}
          Summarise your text into a shorter length.
        </h2>
      </div>
      <div className="container">
        <div className="text_form">
          <form>
            <label>Enter your text</label>
            <textarea
              rows={14}
              cols={80}
              placeholder="Put your text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
        </div>
        <div>
          <button type="button" onClick={HandleSubmit}>
            {loading ? "loading..." : "Summarize"}
          </button>
        </div>
        <div className="summarized_text">
          <label>Summarized text</label>
          <textarea
            placeholder="Summarized text"
            cols={80}
            rows={14}
            value={summarizedtext}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

```

The code above creates a form for the user to enter text and displays a summarized version of that text.

<code> import {Configuration, OpenAIApi } from openai </code>
 is a statement that imports two modules, <code>Configuration</code>, and <code>OpenAIApi</code>, from the openai library.

<code>Configuration</code> is a class that allows you to configure the Openai API. You can do this by setting the API key.

<code>OpenAIApi</code> is a class that enables you to interact with the Openai API, such as sending a text for summarization and receiving the summarized text in response. As part of the code, these classes interact with the Openai API to summarize the user's input.

The user's input is tracked using the <code>useState</code> hook and passed to the Openai API for summarization.

The summarized text appears in a separate text area. The function uses the Openai library to interact with the API, and the React Hooks <code>useState()</code> to keep track of the text input, summarized text, and loading state.

The code uses the <code>generatePrompt()</code> function to format the text input for the API. Upon clicking the "Summarize" button, the <code>HandleSubmit</code> is invoked, which sends the text to the API, sets the loading state to true, and displays "loading...". Upon receiving the summarized text, the loading state changed to false, and the summarization was displayed.

## Adding Style

To style the project, replace the custom CSS style in the <code>src/App.css</code> file with the content below:

```CSS

* {
  margin: 0;
  padding: 0;
}

#root {
  background: #61dafb;
}

.App_ {
  margin: 0 auto;
  width: 100%;
  max-width: 70%;
  background: #61dafb;
  height: auto;
}


.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;

}

textarea {
  width: 100%;
  margin-top: 10px;
}


.summarized_text {
  margin-bottom: 30px;
}


.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
}

.header_text {
  font-size: 3.75rem;
  line-height: 1;
  color: #ffffff;
}

.text_active {
  color: tomato;
}

.header_summary {
  font-size: 1.5rem;
  line-height: 2rem;
  color: #ffffff;
}

button {
  padding: 0.75rem 2.5rem;
  border-radius: 0.5rem;
  border: #ffffff;
  background: tomato;
  color: #ffffff;
}

label {
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1.25rem;
  font-weight: 500;


}

```

## Testing the App

To test the project, navigate into your <code>text-summarization</code> directory and run:

```javaScript
npm start
```
Visit <code>localhost:3000</code> in your browser to view your Test Summarization App.
Below is an example of what you should see on the screen:


![Test Summarization App](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p8n5oa14qt04f3sci7wk.png)

## Project Demo

## Conclusion