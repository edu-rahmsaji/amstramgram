import type { User } from "$lib/models/User";
import { writable } from "svelte/store";

export const user = writable<User>();
