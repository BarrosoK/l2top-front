import {L2Group} from "@app/types/types";

export namespace Backend {

    type Register = {
        tokens: L2Group.Tokens;
        user: L2Group.User;
    }

}
