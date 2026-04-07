'use client';

import { useEffect, useState } from 'react';

interface TypeWriterTextProps {
    lines: string[];
    speed?: number;
    delay?: number;
    className?: string;
    goldClassName?: string;
    afterTypeDelay?: number;
    loop?: boolean;
}

export default function TypeWriterText({
    lines,
    speed = 40,
    delay = 800,
    afterTypeDelay = 2000,
    loop = false,
    className = '',
    goldClassName = '',
}: TypeWriterTextProps) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [isBlinking, setIsBlinking] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        // Initialize
        setDisplayedLines(lines.map(() => ''));
        setCurrentLine(0);
        setCurrentChar(0);
        setIsBlinking(true);
        setShowCursor(true);
        setIsDone(false);
    }, [lines]);

    useEffect(() => {
        if (currentLine >= lines.length) {
            // Finished typing all lines
            if (loop) {
                const timer = setTimeout(() => {
                    setDisplayedLines(lines.map(() => ''));
                    setCurrentLine(0);
                    setCurrentChar(0);
                    setIsDone(false);
                }, afterTypeDelay * 2);
                return () => clearTimeout(timer);
            } else {
                setIsDone(true);
                // Keep cursor blinking for a few more seconds, then hide
                const timer = setTimeout(() => {
                    setShowCursor(false);
                    setIsBlinking(false);
                }, 4000);
                return () => clearTimeout(timer);
            }
            return;
        }

        const timer = setTimeout(() => {
            if (currentChar < lines[currentLine].length) {
                const newLines = [...displayedLines];
                newLines[currentLine] = lines[currentLine].substring(0, currentChar + 1);
                setDisplayedLines(newLines);
                setCurrentChar(currentChar + 1);
            } else {
                // Move to next line
                setCurrentLine(currentLine + 1);
                setCurrentChar(0);
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [currentChar, currentLine, displayedLines, lines, speed, loop, afterTypeDelay]);

    return (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            <div className="px-6 text-center">
                {displayedLines.map((line, i) => {
                    const isGold = i === 1;
                    const isLastLine = i === lines.length - 1;
                    const showCursorForThis = isLastLine && !isDone && isBlinking && showCursor;

                    return (
                        <div
                            key={i}
                            className={`${isGold ? goldClassName : className}`}
                        >
                            {line}
                            {showCursorForThis && (
                                <span className="inline-block w-[2px] h-[0.9em] bg-[#C1A674] ml-[3px] -mb-1 animate-pulse" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
