import { useSumScore } from "@/app/context/useSumScore";

export default function SumScore() {
    const sumScore = useSumScore();
    

    
    return (
        <p className="text-4xl">{sumScore}</p>
    )

}