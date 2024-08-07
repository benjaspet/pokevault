import {ISetImage} from "./IImage.ts";
import {ILegality} from "./ILegality.ts";

export interface ISet {
    id: string;
    images: ISetImage;
    legalities: ILegality;
    name:  string;
    printedTotal: number;
    ptcgoCode: string;
    releaseDate: string;
    series:  string;
    total: number;
    updatedAt: string;
}