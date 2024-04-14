import React, { useState, useEffect } from "react";
import planetsQuestions from '../data/quizzes.json';
import axios from 'axios';
import "../css/Quiz.css";

export default function Quiz({ trigger, setTrigger, planet }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(10); // Timer set to 10 seconds initially
    const [showResults, setShowResults] = useState(false); // State to control showing results
    const [answered, setAnswered] = useState(false); // State to track if the question is answered
    const planetQuestions = planetsQuestions.find(item => item.id === 4);

    const questions = [
        {
            id: 1,
            text: planetQuestions.question1,
            options: [planetQuestions.answers1[0], planetQuestions.answers1[1], planetQuestions.answers1[2]],
            correct: planetQuestions.answers1[3]
        },
        {
            id: 2,
            text: planetQuestions.question2,
            options: [planetQuestions.answers2[0], planetQuestions.answers2[1], planetQuestions.answers2[2]],
            correct: planetQuestions.answers2[3]
        },
        {
            id: 3,
            text: planetQuestions.question3,
            options: [planetQuestions.answers3[0], planetQuestions.answers3[1], planetQuestions.answers3[2]],
            correct: planetQuestions.answers3[3]
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0 && !answered) {
                setTimeLeft(timeLeft - 1);
            } else {
                handleNextQuestion(); // Time's up or question answered, move to next question
            }
                    }, 1000);
            
                    // Clear timeout if the component unmounts or if a new question is loaded
                    return () => clearTimeout(timer);
                }, [timeLeft, currentQuestion, answered]); // Run useEffect every time timeLeft, currentQuestion, or answered changes
            
                const handleNextQuestion = () => {
                    // Check if the selected option is correct and update state
                    setShowResults(true); // Show results
                    setAnswered(true); // Set the question as answered
                    // Reset timer for the next question
                    const timeRemaining = timeLeft;
                    axios.post('http://localhost:3000/score/Hamza', { score: timeRemaining });
                    setTimeLeft(10);
                };
            
                const handleOptionSelect = (option) => {
                    setSelectedOption(option);
                    handleNextQuestion();
                };
            
                const handleNextButtonClick = () => {
                    setCurrentQuestion(prevQuestion => prevQuestion + 1);
                    setShowResults(false); // Hide results for the next question
                    setAnswered(false); // Reset answered state
                    setSelectedOption(null); // Reset selected option
                };
            
                const optionLabels = ["A", "B", "C"];
            
                return (
                    <div id='quiz' className="flex justify-center items-center mt-32 z-50">
                        <div className="quiz-container">
                            <section key={questions[currentQuestion].id} className="quiz-section active">
                                <main>
                                    <div className="w-96 flex flex-col justify-center align-middle">
                                        <h3 className="self-center text-5xl font-bold mb-4 quiz-title">Quiz</h3>
                                        <p className="self-center text-3xl font-semibold mb-4">QUESTION {currentQuestion + 1} OF {questions.length}</p>
                                        <p className="self-center text-2xl font-medium">{questions[currentQuestion].text}</p>
                                        <p className="self-center text-xl font-medium">Time left: {timeLeft} seconds</p>
                        </div>
                        <form>
                            <div className="quiz-options">
                                {questions[currentQuestion].options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="relative">
                                        <input
                                            type="radio"
                                            id={`option-${currentQuestion}-${optionIndex}`}
                                            name={`question-${currentQuestion}`}
                                            value={option}
                                            className="sr-only"
                                            onChange={() => handleOptionSelect(option)}
                                        />
                                        <label
                                            htmlFor={`option-${currentQuestion}-${optionIndex}`}
                                            className={`button-quiz block cursor-pointer border rounded-lg mt-8 ${
                                                (showResults && option === questions[currentQuestion].correct) ? 'bg-green-400' :
                                                (showResults && option !== questions[currentQuestion].correct && selectedOption === option) ? 'bg-red-400' :
                                                'border-transparent'
                                            }`}
                                            >
                                                <span className="relative z-10">{optionLabels[optionIndex]}: {option}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={handleNextButtonClick} className="button-arounder">Next</button>
                            </form>
                        </main>
                    </section>
                </div>
            </div>
        )
    }