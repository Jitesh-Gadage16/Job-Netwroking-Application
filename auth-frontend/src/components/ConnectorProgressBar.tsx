"use client";

const LEVELS = [
    { name: "Novice Networker", threshold: 0 },
    { name: "Trusted Connector", threshold: 100 },
    { name: "Mentor", threshold: 250 },
    { name: "Master Level", threshold: 500 },
    { name: "Grandmaster", threshold: 1500 },
];

import { Users, Award, } from 'lucide-react';


function getLevel(points: number) {
    let current = LEVELS[0];
    let next = LEVELS[LEVELS.length - 1];

    for (let i = 0; i < LEVELS.length; i++) {
        if (points >= LEVELS[i].threshold) current = LEVELS[i];
        if (points < LEVELS[i].threshold) {
            next = LEVELS[i];
            break;
        }
    }

    const progress =
        next.threshold === current.threshold
            ? 100
            : ((points - current.threshold) / (next.threshold - current.threshold)) * 100;

    return {
        level: current.name,
        nextLevel: next.name,
        pointsNeeded: next.threshold - points,
        progress: Math.min(100, Math.floor(progress)),
        maxPoints: next.threshold,
    };
}

export default function ConnectorProgressBar({ points }: { points: number }) {
    const { level, nextLevel, progress, pointsNeeded, maxPoints } = getLevel(points);

    return (

        <>


            <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🏆 Connector Level Progress</h3>
                <p className="text-sm font-medium text-gray-700 mb-1">{level}</p>

                <div className="relative w-full h-2 bg-gray-200 rounded-full mb-1 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="text-sm text-gray-500 flex justify-between">
                    <span>
                        {points} / {maxPoints} points to {nextLevel}
                    </span>
                    {pointsNeeded > 0 && (
                        <span className="text-xs text-gray-400">
                            {pointsNeeded} points needed for next level
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}
