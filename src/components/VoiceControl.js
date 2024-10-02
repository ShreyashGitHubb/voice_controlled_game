import React, { useState, useEffect, useRef, useCallback } from 'react';

const VoiceControl = ({ onCommand }) => {
  const [command, setCommand] = useState('');
  const [listening, setListening] = useState(false);
  const [turn, setTurn] = useState('X'); // Track whose turn it is
  const recognitionRef = useRef(null);

  // Define the recognized voice commands
  const commands = {
    "1st": "cell1", "one": "cell1", "1": "cell1",
    "2nd": "cell2", "two": "cell2", "2": "cell2",
    "3rd": "cell3", "three": "cell3", "3": "cell3",
    "4th": "cell4", "four": "cell4", "4": "cell4",
    "5th": "cell5", "five": "cell5", "5": "cell5",
    "6th": "cell6", "six": "cell6", "6": "cell6",
    "7th": "cell7", "seven": "cell7", "7": "cell7",
    "8th": "cell8", "eight": "cell8", "8": "cell8",
    "9th": "cell9", "nine": "cell9", "9": "cell9"
  };

  useEffect(() => {
    // Initialize Web Speech API once
    if (!recognitionRef.current) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const speechToText = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        setCommand(speechToText);
      };

      recognitionRef.current.onerror = (e) => console.error('Voice Recognition Error:', e);
    }

    if (listening) {
      // Start recognition if it's not already running
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting Speech Recognition:', error);
      }
    } else {
      recognitionRef.current.stop();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [listening]);

  const processCommand = useCallback(() => {
    const cellMatch = Object.keys(commands).find(key => command.includes(key));
    if (cellMatch) {
      const cellIndex = Object.values(commands).indexOf(commands[cellMatch]);
      const player = turn; // Current player ('X' or 'O')
      onCommand({ player, cellIndex }); // Pass the recognized command to the parent component
      setCommand(''); // Clear command after processing

      // Toggle turn
      setTurn(prev => (prev === 'X' ? 'O' : 'X'));
    } else if (command === 'restart') {
      onCommand({ restart: true });
      setCommand(''); // Clear command after processing
      setTurn('X'); // Reset turn to X
    }
  }, [command, onCommand, turn, commands]);

  useEffect(() => {
    if (command) {
      processCommand();
    }
  }, [command, processCommand]);

  return (
    <div>
      <button onClick={() => setListening((prev) => !prev)}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Recognized Command: {command}</p>
      <p>Current Turn: {turn}</p>
      <p>Say commands like: "one", "two", "three", "restart"</p>
    </div>
  );
};

export default VoiceControl;
