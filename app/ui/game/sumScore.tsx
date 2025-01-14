import { useWebSocket } from "@/app/context/useWebSocket";

export default function SumScore() {
    const {sumScore} = useWebSocket();
    

    
    return (
        <p className="text-4xl">{sumScore}</p>
    )

}