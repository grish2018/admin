export interface User {
    account: {
        nickname?: string;
        email?: string;
    };
    general: {
        id?: number;
        name?: string;
        closed?: boolean;
        domain?: string;
    };
}
