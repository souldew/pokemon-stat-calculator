import { statTypes } from "@/constants";
import { natureTypes } from "@/constants/nature";

export type StatType = (typeof statTypes)[number];
export type NatureType = (typeof natureTypes)[number];
