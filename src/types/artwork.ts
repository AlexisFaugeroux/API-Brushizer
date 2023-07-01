export interface Artwork {
    id: number;
    name: string;
    description: string | null;
    artwork_view: number | null;
    image: string;
    price_usd: number;
    price_sol: number;
    collection_id: number;
}
