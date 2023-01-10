import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import {
  iDataNewPlayer,
  iDataNewTeam,
  iTeamContext,
  iTeamData,
  iTeamProvider,
  iUpdatePlayer,
} from "../types/TeamContextTypes";
import { TournamentContext } from "./TournamentContext";

import { UserContext } from "./UsersContext";

export const TeamContext = createContext({} as iTeamContext);

export const TeamProvider = ({ children }: iTeamProvider) => {
  const { user, token, updateUserTeam } = useContext(UserContext);
  const { setDashboardPage } = useContext(TournamentContext);
  const [disableButton, setDisableButton] = useState(false);
  const [teamData, setTeamData] = useState({} as iTeamData);

  const userId = user.id;
  const teamId = user.teamId;

  const [playerId, setPlayerId] = useState<number | null>(null);

  async function createNewTeam(data: iDataNewTeam) {
    data.userId = userId;
    setDisableButton(true);
    try {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      const requisition = await api.post("teams", data);
      if (requisition.status === 201) {
        toast.success("Time criado com sucesso!");
        console.log(requisition);
        updateUserTeam(requisition.data.id);
        setDashboardPage(15);
      }
    } catch (err) {
      console.log(err);
      toast.error("Ops...algo deu errado!");
    } finally {
      setDisableButton(true);
    }
  }

  async function updateTeam(data: iDataNewTeam) {
    console.log(data);
    data.userId = userId;
    try {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      const requisition = await api.patch(`teams/${teamId}`, data);
      if (requisition.status === 200) {
        toast.success("Alterações no time feitas com sucesso!");
        setDashboardPage(15);
      }
      console.log(requisition);
    } catch (err) {
      console.log(err);
      toast.error("Ops...algo deu errado!");
    }
  }

  async function deleteTeam() {
    let data = {
      userId: userId,
    };

    try {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      const requisition = await api.delete(`teams/${teamId}`, {
        data: data,
      });
      console.log(requisition);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllTeams() {
    try {
      const requisition = await api.get("teams");
      console.log(requisition);
    } catch (err) {
      console.log(err);
    }
  }

  async function createNewPlayer(data: iDataNewPlayer) {
    data.userId = userId;
    data.teamId = teamId;
    setDisableButton(true);
    try {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      const requisition = await api.post("players", data);
      if (requisition.status === 201) {
        toast.success("Jogador criado com sucesso!");
        setDashboardPage(16);
      }
      console.log(requisition);
    } catch (err) {
      console.log(err);
      toast.error("Ops...algo deu errado!");
    } finally {
      setDisableButton(true);
    }
  }

  async function updatePlayer(data: iUpdatePlayer) {
    try {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      const requisition = await api.patch(`players/${playerId}`, data);
      console.log(requisition);
    } catch (err) {
      console.log(err);
    }
  }

  async function deletePlayer() {
    let data = {
      userId: userId,
    };

    try {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      const requisition = await api.delete(`teams/${playerId}`, {
        data: data,
      });
      if (requisition.status === 200) {
        toast.success("Jogador excluído com sucesso!");
        //renderizar a lista de jogadores novamente
      }
      console.log(requisition);
    } catch (err) {
      console.log(err);
      toast.error("Ops...algo deu errado!");
    }
  }

  async function getPlayersFromATeam() {
    try {
      const requisition = await api.get(`players?&teamId=${playerId}`);
      console.log(requisition);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TeamContext.Provider
      value={{
        createNewTeam,
        updateTeam,
        deleteTeam,
        getAllTeams,
        createNewPlayer,
        updatePlayer,
        deletePlayer,
        getPlayersFromATeam,
        setPlayerId,
        disableButton,
        teamId,
        teamData,
        setTeamData,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
