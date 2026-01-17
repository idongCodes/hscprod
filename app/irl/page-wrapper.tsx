import { Metadata } from "next";
import { metadata } from "./metadata";
import IRLClient from "./page";

export { metadata };

export default function IRLPage() {
  return <IRLClient />;
}
