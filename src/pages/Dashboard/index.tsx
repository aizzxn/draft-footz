import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
// import React, { useState } from "react";
import { MyTeamBlank } from "../../components/MyTeamBlank";
import { MyTeamDetails } from "../../components/MyTeamDetails";
import { MyTournaments } from "../../components/MyTournaments";
import { TournamentCreation } from "../../components/TournamentCreation";
import { Welcome } from "../../components/Welcome";
import { TournamentProvider } from "../../context/TournamentContext";
import { api } from "../../services/api";
import { ButtonMenu } from "../../styles/Buttons/style";
import { FigureBackgroundDashboard } from "../../styles/Figures/style";
import {
  ButtonLogout,
  DivButtonLogout,
  DivLogoAndButtons,
  DivMenu,
  FigureLogo,
  Main,
  SectionDashboard,
} from "./style";
import { TournamentsViewPage } from "./TournamentsViewPage";

export const DashboardPage = () => {
  // // APAGAR ASSIM QUE FINALIZAR

  useEffect(() => {
    const loginData = {
      email: "user@test.com",
      password: "test123",
    };

    async function autoLogin() {
      try {
        const request = await api.post("/login", loginData);

        localStorage.setItem("@AcessToken", request.data.accessToken);
      } catch (error) {
        console.error(error);
      }
    }

    autoLogin();
  }, []);

  // APAGAR ASSIM QUE FINALIZAR

  const [value, setValue] = useState(5);

  return (
    <>
      <FigureBackgroundDashboard>
        <img src="/bg-dashboard.png" alt="" />
      </FigureBackgroundDashboard>
      <Main>
        <SectionDashboard>
          <DivMenu>
            <DivLogoAndButtons>
              <FigureLogo>
                <img src="/logo.svg" alt="" />
              </FigureLogo>
              <ButtonMenu onClick={() => setValue(0)}>Criar torneio</ButtonMenu>
              <ButtonMenu onClick={() => setValue(1)}>Meus torneios</ButtonMenu>
              <ButtonMenu onClick={() => setValue(2)}>Meu time</ButtonMenu>
            </DivLogoAndButtons>
            <DivButtonLogout>
              <ButtonLogout>
                <img src="/logout.png" alt="" />
                <p>Fazer logout</p>
              </ButtonLogout>
            </DivButtonLogout>
          </DivMenu>
          <TournamentProvider>
            {value === 0 && <div />}
            {value === 1 && <TournamentCreation />}
            {value === 2 && <Welcome />}
            {value === 5 && <MyTournaments />}
          </TournamentProvider>
        </SectionDashboard>
      </Main>
    </>
  );
};
