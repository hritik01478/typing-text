import { useState } from 'react';
import './home.scss';
import randomWords from 'random-words';
import { useEffect } from 'react';


const Home = () => {

    const NUMBER_OF_WORDS = 200;
    const SECONDS = 60;
    const [words, setWords] = useState([]);
    const [countDown, setCountDown] = useState(SECONDS);

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
    // const generateWords = () => {
    //     new Array(NUMBER_OF_WORDS).fill(null).map(() => randomWords());
    // }
    // console.log(words)


    return (
        <div className="typing">
            <div className="typing-wrapper">
                <div className="typing-timer">{countDown}</div>
                <div className="typing-card">
                    <div className="typing-content">
                        {words.map((word) => (
                            <>
                                < span > {word}  </span>
                            </>
                        ))}
                    </div>
                </div>
                <div className="input-card">
                    <input type="text" className='input-content' placeholder='Type here...' />
                </div>
                <button className="typing-btn" onClick={handleTimer}>
                    START
                </button>
            </div >
        </div >
    )
}

export default Home