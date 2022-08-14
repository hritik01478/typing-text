import { useState } from 'react';
import './home.scss';
import randomWords from 'random-words';
import { useEffect } from 'react';


const Home = () => {

    const NUMBER_OF_WORDS = 200;
    const SECONDS = 60;
    const [words, setWords] = useState([]);
    const [countDown, setCountDown] = useState(SECONDS);
    const [currInput, setCurrInput] = useState("");
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);

    useEffect(() => {
        setWords(randomWords(NUMBER_OF_WORDS))
    }, []);

    const handleTimer = () => {
        let interval = setInterval(() => {
            setCountDown((prevCountDown) => {
                if (prevCountDown === 0) {
                    clearInterval(interval);
                }
                else {
                    return prevCountDown - 1;
                }
            });
        }, 1000)
    }

    const handleKeyDown = ({ keyCode }) => {
        if (keyCode === 32) {
            checkMatch();
            setCurrInput("")
            setCurrWordIndex(currWordIndex + 1)
        }
    }

    const checkMatch = () => {
        const wordToCompare = words[currWordIndex];
        const doesItMatch = wordToCompare === currInput.trim();
        console.log({ doesItMatch })
        if (doesItMatch) {
            setCorrect(correct + 1);
        }
        else {
            setIncorrect(incorrect + 1);
        }
    }

    return (
        <div className="typing">
            <div className="typing-wrapper">
                <div className="typing-timer">{countDown}</div>
                <div className="typing-card">
                    <div className="typing-content">
                        {words.map((word, i) => (
                            <span key={i}>
                                <span>
                                    {word.split("").map((char, idx) => (
                                        < span key={idx}>{char}</span>
                                    ))}
                                </span>
                                <span> </span>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="input-card">
                    <input type="text" className='input-content' placeholder='Type here...' onKeyDown={handleKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)} />
                </div>
                <button className="typing-btn" onClick={handleTimer}>
                    START
                </button>
            </div >
            <div className="result-wrapper">
                <div className="columns">
                    <div className="wpm">
                        <p>Words per minute : </p>
                        <p className='result'>{correct}</p>
                    </div>
                </div>
                <div className="columns">
                    <div className="wpm">
                        <p>Accuracy : </p>
                        <p className='result'>{Math.round((correct) / (correct + incorrect) * 100)} %</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home