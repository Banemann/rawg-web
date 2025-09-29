import { Store } from "./entities/Store";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { AppDataSource } from "./data-source";
import * as fs from "fs";
import { Game } from "./entities/Game";

interface GameOriginal {
    id: number;
    name: string;
    background_image?: string;
    metacritic?: number;
    parent_platforms: { platform: ParentPlatform }[];
    genres: Genre[];
    stores: { store: Store }[];
}

async function insertData() {
    await AppDataSource.initialize();
    const rawData = fs.readFileSync("games.json", "utf-8");
    const parsedData = JSON.parse(rawData);
    const gameOriginalData: GameOriginal[] = parsedData.results;

    const gamesData: Game[] = gameOriginalData.map(game => ({
        ...game,
        parent_platforms: game.parent_platforms.map(pp => pp.platform),
        stores: game.stores.map(s => s.store)
    }));

    const gameRepository = AppDataSource.getRepository(Game);
    const genreRepository = AppDataSource.getRepository(Genre);
    const storeRepository = AppDataSource.getRepository(Store);
    const parentPlatformRepository = AppDataSource.getRepository(ParentPlatform);

    await gameRepository.delete({});
    await genreRepository.delete({});
    await storeRepository.delete({});
    await parentPlatformRepository.delete({});
    console.log("Old data cleared");

    for (const game of gamesData) {
        await Promise.all(
            game.genres.map(async (g) => {
                let genre = await genreRepository.findOne({ where: { id: g.id } });
                if (!genre) {
                    await genreRepository.save(g);
                }
                return genre;
            })
        );

        await Promise.all(
            game.stores.map(async (s) => {
                let store = await storeRepository.findOne({ where: { id: s.id } });
                if (!store) {
                    await storeRepository.save(s);
                }
                return store;
            })
        );

        await Promise.all(
            game.parent_platforms.map(async (pp) => {
                let parentPlatform = await parentPlatformRepository.findOne({ where: { id: pp.id } });
                if (!parentPlatform) {
                    await parentPlatformRepository.save(pp);
                }
                return parentPlatform;
            })
        );

        await gameRepository.save(game);
        console.log(`Inserted game: ${game.name}`);
    }
    }

    insertData()
    .then(() => {
        console.log("Data insertion complete");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error during data insertion:", error);
        process.exit(1);
    });