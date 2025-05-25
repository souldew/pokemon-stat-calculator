import { StatTypes } from "@/constants";
import { NatureTypes } from "@/constants/nature";

export type StatType = (typeof StatTypes)[number];
export type NatureType = (typeof NatureTypes)[number];
