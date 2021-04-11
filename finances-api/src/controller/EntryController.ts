import { getManager } from 'typeorm';
import { Entry } from "../entity/Entry";

export class EntryController {
    async save(entry: Entry) {
        const savedEntry = await getManager().save(entry)
        return savedEntry
    }
}