export namespace L2Group {


    type Tokens = {
        access: {
            token: string;
            expires: string;
        };
        refresh: {
            token: string;
            expires: string;
        }
    }

    type User = {
        email: string;
        id: string;
        name: string;
        role: string;
    }


    type ServerRate = {
        xp: number;
        sp: number;
        drop: number;
        adena: number;
    }

    type ServerInformation = {
        description: string;
        promotionLink?: string;
        safeEnchant: number;
        maxEnchant: number;
        enchantRate: number;
        blessedEnchantRate: number;
        hasCustom: boolean;
    }

    type Server = {
        name: string;
        votes: number;
        ip: string;
        version: string;
        location: string;
        website: string;
        owner: string;
        addedDate: string;
        rates: ServerRate;
        information: ServerInformation;
    }

}
