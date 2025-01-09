'use client';

import { useState } from "react";

export default function Clicker() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <p className="text-4xl">{count}</p>
            <button
             onClick={() => setCount(count + 1)}
             className="text-4xl text-black bg-orange-200 rounded-lg p-4 uppercase">click</button>
        </div>
    );
}