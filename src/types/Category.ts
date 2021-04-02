export interface Category {
    id: number;
    title: string;
    desc?: string;
    childs?: Category[];
}
export interface NewCategory {
    id?: number;
    parent?: number;
    title?: string;
    desc?: string;
}
