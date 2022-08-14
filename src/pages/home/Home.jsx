import { useState, useEffect, useRef } from 'react';
import './home.scss';
import { ArrowBackOutlined } from '@mui/icons-material'
import randomWords from 'random-words';
// import { } from 'react';


const Home = () => {

    const NUMBER_OF_WORDS = 200;
    const SECONDS = 60;
    const [words, setWords] = useState([]);
    const [countDown, setCountDown] = useState(SECONDS);
    const [currInput, setCurrInput] = useState("");
    const [play, setPlay] = useState("START");
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(-1);
    const [currChar, setCurrChar] = useState("");
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [status, setStatus] = useState("waiting");
    const textInput = useRef(null);

    useEffect(() => {
        setWords(generateWords())
        // setWords(randomWords(NUMBER_OF_WORDS));
    }, []);
    useEffect(() => {
        if (status === "started") {
            textInput.current.focus();
        }
    }, [status]);

    const generateWords = () => {
        return randomWords(NUMBER_OF_WORDS);
    }

    const handleTimer = () => {
        if (status === "finished") {
            setWords(generateWords());
            setCorrect(0);
            setIncorrect(0);
            setCurrWordIndex(0);
            setPlay("START");
            setStatus("waiting");
            setCurrChar("");
            setCurrCharIndex(-1);
        }

        if (status === "waiting") {
            setStatus("started");
            let interval = setInterval(() => {
                setCountDown((prevCountDown) => {
                    if (prevCountDown === 0) {
                        setPlay("TRY AGAIN")
                        clearInterval(interval);
                        setStatus("finished");
                        setCurrInput("");
                        return SECONDS;
                    }
                    else {
                        return prevCountDown - 1;
                    }
                });
            }, 1000)
        }
    }

    const handleKeyDown = ({ keyCode, key }) => {
        console.log(keyCode);
        if (keyCode === 32) {
            checkMatch();
            setCurrInput("")
            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(-1);
        } else if (keyCode === 8) {
            setCurrCharIndex(currCharIndex - 1);
            setCurrChar("");
        }
        else {
            setCurrCharIndex(currCharIndex + 1);
            setCurrChar(key);
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

    const getCharClass = (WordIdx, CharIdx, char) => {
        if (WordIdx === currWordIndex && CharIdx === currCharIndex && currChar && status !== "finished") {
            if (char === currChar) {
                return "success";
            }
            else {
                return "danger";
            }
        }
        else if (WordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
            return "danger"
        }
        else {
            return ""
        }
    }

    return (
        <div className="typing">
            <div className="back">
                <ArrowBackOutlined />
                back</div>
            <div className="typing-wrapper">
                <div className="typing-timer">{countDown}</div>
                {status === "started" && <div className="typing-card">
                    <div className="typing-content">
                        {words.map((word, i) => (
                            <span key={i}>
                                <span>
                                    {word.split("").map((char, idx) => (
                                        < span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                                    ))}
                                </span>
                                <span> </span>
                            </span>
                        ))}
                    </div>
                </div>}
                <div className="input-card">
                    <input ref={textInput} disabled={status !== "started"} type="text" className='input-content' placeholder='Type here...' onKeyDown={handleKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)} />
                </div>
                <button className="typing-btn" onClick={handleTimer}>
                    {play}
                </button>
            </div >
            {status === "finished" && <div className="result-wrapper">
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
            </div>}
        </div >
    )
}

export default Home