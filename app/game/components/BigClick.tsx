import { EventType } from "@/app/context/eventType";
import { useWebSocket } from "@/app/context/useWebSocket";
import Storage from "@/app/utils/Storage";
import { useState } from "react";


export default function BigClick() {
    const websocket = useWebSocket();
    const [isClicking, setIsClicking] = useState(false)
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([])
    const [particleId, setParticleId] = useState(0)

    function handleClick() {
        console.log(websocket)
        console.log(Storage.getPlayerId())
        const event = {
            type: EventType.CLICK,
        }
        websocket?.send(JSON.stringify(event));

        setIsClicking(true)
        setTimeout(() => setIsClicking(false), 300)

        const newParticles = Array.from({ length: 10 }, () => ({
            id: particleId + Math.random(),
            x: Math.random() * 60 - 30, // -30 to 30
            y: Math.random() * -50 - 10, // -60 to -10
            size: Math.random() * 8 + 4, // 4 to 12
            color: getRandomColor(),
        }))

        setParticleId((prev) => prev + 1)
        setParticles([...particles, ...newParticles])

        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)))
        }, 1000)
    }


    function getRandomColor() {
        const colors = ["bg-orange-300", "bg-orange-400", "bg-yellow-300", "bg-yellow-400", "bg-amber-300", "bg-amber-400"]
        return colors[Math.floor(Math.random() * colors.length)]
    }

    return (
        <div className="relative  flex  justify-center  ">
            {/* Particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className={`absolute rounded-full ${particle.color} particle-animation`}
                    style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        left: `calc(50% + ${particle.x}px)`,
                        bottom: `calc(50% + ${particle.y}px)`,
                        transform: "translate(-50%, 50%)",
                    }}
                />
            ))}

            <button
                onClick={handleClick}
                className={`text-4xl text-black bg-gradient-to-r from-orange-300 to-orange-200 rounded-lg p-6 uppercase font-bold shadow-lg button-scale ${isClicking ? "shake" : ""} transition-all duration-300 hover:shadow-orange-200/50 relative z-10`}
            >
                click
            </button>
        </div>
    );
}