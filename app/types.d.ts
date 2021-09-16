export interface TypeParams {
    url?: string,
    bg?: string,
    width?: number,
    height?: number,
    blur?: number,
}

export interface OwnInterface {
    fetchImage(url: string, image_path: string): Promise<any>;
    getPath(hex: string): string
}