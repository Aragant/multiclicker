import { useWsContext } from "@/app/context/useWsContext";

export default function SumScore() {
    const {sumScore} = useWsContext();
    

    
    return (
        <p className="text-4xl">{sumScore}</p>
    )

}