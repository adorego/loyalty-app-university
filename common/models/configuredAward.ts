import { Award } from "./award";

export interface ConfiguredAward{
    award:Award;
    requiredPoints:string;
    detailedValue:string | null;
}