import React, { useState } from "react";
import "../css/Quiz.css";

export default function Quiz({ trigger, setTrigger, planet}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const planetData = planetsData.find(item => item.id === planet);

    const questions = [
        {
            id: 1,
            text: "Question 1?",
            options: ["Option 1", "Option 2", "Option 3"]
        },
        {
            id: 2,
            text: "Question 2?",
            options: ["Option A", "Option B", "Option C"]
        },
    ];

    const handleNextQuestion = () => {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNextQuestion();
    };

    return trigger ? (
        <div className="flex justify-center items-center mt-32">
            <div className="h-2/5 w-3/5 quiz-container">
                <section key={questions[currentQuestion].id} className="quiz-section active">
                    <main>
                        <div className="bg-gray-500 w-96 flex flex-col justify-center align-middle">
                            <h3 className="self-center">Quiz</h3>
                            <p className="self-center">QUESTION {currentQuestion + 1} OF {questions.length}</p>
                            <p className="self-center">{questions[currentQuestion].text}</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="quiz-options">
                                {questions[currentQuestion].options.map((option, optionIndex) => (
                                    <div key={optionIndex}>
                                        <input type="radio" id={`option-${currentQuestion}-${optionIndex}`} name={`question-${currentQuestion}`} value={option} />
                                        <label htmlFor={`option-${currentQuestion}-${optionIndex}`}>{option}</label>
                                    </div>
                                ))}
                            </div>
                            {currentQuestion === questions.length - 1 ? (
                                <button type="submit" className="submit-button">Submit</button>
                            ) : (
                                <button type="button" onClick={handleNextQuestion} className="submit-button">Next</button>
                            )}
                        </form>
                    </main>
                </section>
            </div>
        </div>
    ) : null;
}

