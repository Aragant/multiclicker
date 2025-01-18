import React, { useState, useEffect, MouseEvent } from "react";
import "./FloatingWindow.css";

interface FloatingWindowProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const FloatingWindow: React.FC<FloatingWindowProps> = ({ title, children, onClose }) => {
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const LocalTitle = title + "FloatingWindowPosition";

    const [position, setPosition] = useState<{ x: number; y: number }>(() => {
        const savedPosition = localStorage.getItem(LocalTitle);
        return savedPosition ? JSON.parse(savedPosition) : { x: 100, y: 100 }; // Position par défaut si aucune donnée
    });


    // Sauvegarder la position dans le Local Storage lorsqu'elle change
    useEffect(() => {
        localStorage.setItem(LocalTitle, JSON.stringify(position));
    }, [position]);

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (dragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div
            className="floating-window"
            style={{
                top: position.y,
                left: position.x,
                position: "absolute",
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
                className="floating-window-header"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <span>{title}</span>
                <button onClick={onClose} className="close-button">
                    ×
                </button>
            </div>
            <div className="floating-window-content">{children}</div>
        </div>
    );
};

export default FloatingWindow;
