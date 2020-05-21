export interface AdminState {
    readonly grid: String;
    readonly urlSTAC: String;
    readonly bandsAvailable: string[];
    readonly collection: String;
    readonly startDate: String;
    readonly lastDate: String;
    readonly tiles: String[];
    readonly definitionInfos: DefinitionCube;
    readonly metadata: MetadataCube;
}

export interface DefinitionCube {
    bucket: string;
    name: string;
    resolution: number;
    temporal: string;
    functions: string[];
    bands: string[];
    bandsQuicklook: string[];
}

export interface MetadataCube {
    license: string;
    description: string;
    additional: string;
}