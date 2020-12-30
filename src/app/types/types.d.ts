export namespace L2Group {

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
