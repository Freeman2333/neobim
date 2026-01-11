export interface Point {
    x: number;
    y: number;
}

export interface ITrussSpecification {
    topChords: [Point, Point][];
    verticalMembers: [Point, Point][];
    diagonalMembers: [Point, Point][];
    bottomChord: [Point, Point];
}