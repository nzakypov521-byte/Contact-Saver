export interface Contact {
    id: string,
    name: string,
    surname: string,
    phone: string,
    image?: string
}

export interface IdFromPOSTFetch {
    name: string,
}

export type DataFromGETFetch = Record<string, Contact>
