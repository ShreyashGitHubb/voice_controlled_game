import React, { useState, useEffect, useRef, useCallback } from 'react';

const VoiceControl = ({ onCommand }) => {
  const [command, setCommand] = useState('');
  const [listening, setListening] = useState(false);
  const [turn, setTurn] = useState('X'); // Track whose turn it is
  const recognitionRef = useRef(null);

  // Define the recognized voice commands
  const commands = [
    'one' || '1' || 1, 'two' || '2' || 2, 'three' || '3' || 3, 'four' || '4' || 4, 'five' || '5' || 5, 'six' || '6' || 6, 'seven' || '7' || 7, 'eight' || '8' || 8, 'nine' || '9' || 9,
    'restart'
  ];

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
    const cellMatch = command.match(/(one|two|three|four|five|six|seven|eight|nine)/);
    if (cellMatch) {
      const cellIndex = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].indexOf(cellMatch[0]);
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
  }, [command, onCommand, turn]);

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
