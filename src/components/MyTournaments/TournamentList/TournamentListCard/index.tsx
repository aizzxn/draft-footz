import { useContext } from "react";
import { iDataTournament } from "../../../../types/TournamentContextTypes";
import { StyledTournamentListCard } from "./style";
import { FaTrash } from "react-icons/fa"
import { TournamentContext } from "../../../../context/TournamentContext";

interface iTournamentListCard {
    tournament: iDataTournament
}

export const TournamentListCard = ({ tournament }: iTournamentListCard) => {

    const { setReadingTournament } = useContext(TournamentContext);

    return (
        <StyledTournamentListCard onClick={() => { setReadingTournament(tournament) }}>
            <div>
                <img src="trofeu.svg" alt="troféu" />
                <h2> {tournament.name} </h2>
            </div>
            <div>
                <span> {tournament.champion ? "Concluído" : "Em andamento" } </span>
                <FaTrash />
            </div>
        </StyledTournamentListCard>

    );
};