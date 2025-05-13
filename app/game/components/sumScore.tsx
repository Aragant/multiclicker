import { useSumScore } from "@/app/context/useSumScore";
import { useEffect, useState } from "react";

export default function SumScore() {
    const totalScore = useSumScore();
    const [prevScore, setPrevScore] = useState(0)
    const [isIncreasing, setIsIncreasing] = useState(false)

    useEffect(() => {
        if (totalScore > prevScore) {
            setIsIncreasing(true)
            const timer = setTimeout(() => setIsIncreasing(false), 2000)
            return () => clearTimeout(timer)
        }
        setPrevScore(totalScore)
    }, [totalScore, prevScore])

    return (
        <div className="text-center mb-6">
            <h2 className="text-xl text-violet-600 mb-2 fade-in-down">Total Score</h2>
            <p
                className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 ${isIncreasing ? "pulse" : ""}`}
            >
                {totalScore}
            </p>
        </div>
    )

}