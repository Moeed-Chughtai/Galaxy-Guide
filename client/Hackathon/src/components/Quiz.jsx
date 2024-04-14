import React, { useState } from "react";
import "../css/Quiz.css";

export default function Quiz({ trigger, setTrigger, planet }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // const planetData = planetsData.find(item => item.id === planet);

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

    const optionLabels = ["A", "B", "C"];

    return (
        <div id = 'quiz' className="flex justify-center items-center mt-32">
            <div className="h-2/5 w-3/5 quiz-container">
                <section key={questions[currentQuestion].id} className="quiz-section active">
                    <main>
                        <div className="w-96 flex flex-col justify-center align-middle">
                            <h3 className="self-center text-5xl font-bold mb-4">Quiz</h3>
                            <p className="self-center text-3xl font-semibold mb-4">QUESTION {currentQuestion + 1} OF {questions.length}</p>
                            <p className="self-center text-2xl font-medium">{questions[currentQuestion].text}</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="quiz-options">
                                {questions[currentQuestion].options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="relative">
                                        <input type="radio" id={`option-${currentQuestion}-${optionIndex}`} name={`question-${currentQuestion}`} value={option} className="sr-only" />
                                        <label htmlFor={`option-${currentQuestion}-${optionIndex}`} className="button-quiz block cursor-pointer border border-transparent hover:border-gradient mt-8 rounded-lg">
                                            <span className="relative z-10">{optionLabels[optionIndex]}: {option}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {currentQuestion === questions.length - 1 ? (
                                <button type="submit" className="button-arounder">Submit</button>
                            ) : (
                                <button type="button" onClick={handleNextQuestion} className="button-arounder">Next</button>
                            )}
                        </form>
                    </main>
                </section>
            </div>
        </div>
    )
}
