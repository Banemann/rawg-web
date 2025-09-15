import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Game {
    id: number;
    name: string;
}

interface GameResponse{
    count: number;
    results: Game[];
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        apiClient
            .get<GameResponse>("/games", { signal: controller.signal })
            .then((res: { data: GameResponse }) => {
                setGames(res.data.results);
            })
            .catch((err: { message: string }) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                console.log(err);
            });
        return () => controller.abort();
    }, []);

    return [games, error] as const;
};

export default useGames;