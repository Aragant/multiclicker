import { useClientClan } from "@/app/context/useClientClan"
import { WebSocketContext } from "@/app/context/webSocket/webSocketConstext"
import { useContext } from "react"

export default function clientClan() {
    const clientClan = useClientClan()
    const webSocketContext = useContext(WebSocketContext)

    function test() {
        console.log('test')

        console.log(webSocketContext)
    }
    return (
        <div>
            <p>Your are in clan : {clientClan}</p>
            <button onClick={test} >test</button>
        </div>
    )
}