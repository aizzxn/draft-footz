import { ReactNode } from "react";
import { iTeamData } from "./TeamContextTypes";

export interface iSubscriptionsProvider {
    children: ReactNode;
};

export interface iSubscriptionsContext {
    subscriptions: iSubscriptionData[];
    getTournamentSubscriptions: (tournamentId: number) => void;
    deleteAllTournamentSubscriptions: (tournamentId: number) => void;
    updateSubscription: (subscriptionId: number, accepted: boolean) => void;
    askToSubscribe: (tournamentId: number, team: iTeamData) => void;
    refreshSubscriptions: () => void;
};

export interface iSubscriptionData {
    team: {
        id: number;
        name: string;
    };
    tournamentId: number;
    accepted: boolean;
    id: number;
};