import { AWSClientAdapter } from "./AWSClientAdapter";
import { CustomClientAdapter } from "./CustomClientAdapter";
import { DefaultClientAdapter } from "./DefaultClientAdapter";
import { EdgeStoreClientAdapter } from "./EdgeStoreClientAdapter";
import { FirebaseClientAdapter } from "./FirebaseClientAdapter";
import { GoogleDriveClientAdapter } from "./GoogleDriveClientAdapter";
import { RefugeClientAdapter } from "./RefugeClientAdapter";

export * from "./AWSClientAdapter";
export * from "./CustomClientAdapter";
export * from "./DefaultClientAdapter";
export * from "./EdgeStoreClientAdapter";
export * from "./FirebaseClientAdapter";
export * from "./GoogleDriveClientAdapter";
export * from "./RefugeClientAdapter";

export const AWS = AWSClientAdapter;

export const EdgeStore = EdgeStoreClientAdapter;

export const Firebase = FirebaseClientAdapter;

export const GoogleDrive = GoogleDriveClientAdapter;

export const Custom = CustomClientAdapter;

export const Refuge = RefugeClientAdapter;

export default DefaultClientAdapter;

export const Adapters = {
  AWS,
  EdgeStore,
  Firebase,
  GoogleDrive,
  Custom,
  Refuge,
  default: DefaultClientAdapter,
};
