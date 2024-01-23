import { Navbar } from "./Components/Navbar/Navbar";
import { useState, createContext } from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About } from "./Components/Content/About";
import { Contact } from "./Components/Content/Contact";
import { Detail } from "./Components/Content/Detail";
import { Home } from "./Components/Content/Home/Home";
import { News } from "./Components/Content/News";
import { NotFound404 } from "./Components/Content/NotFound404";
import { FC, useEffect } from 'react'
import axios from "axios";
import { Manage } from "./Components/Content/Dashboard/Manage";
import { getIpAddress } from "./Apis/APIs";

//interface for context
export interface IFilmsList {
  id: string;
  name: string;
  description: string;
  image: string;
  title: string;
  year: string;
  nation: string;
  trailer: string;
}

export interface IUser {
  name: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface IContext {
  //type of isDarkMode
  isDarkMode: boolean;
  //decalre function, type of state in and return
  setIsDarkMode: (state: boolean) => void;

  //type for film list
  filmsList: Array<IFilmsList>;
  fetchFilm: () => void;

  user: IUser | null;
  setUser: (state: IUser | null) => void;

}

//define type for Context, could be IContext or null
export const Data = createContext<IContext | null>(null);
export const AuthContext = createContext(null);

const App: FC = () => {
  //set type for state only be true or false
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [filmsList, setFilmsList] = useState<Array<IFilmsList> | []>([]);
  const [user, setUser] = useState<IUser | null>(null);

  //! fetch
  const fetchFilm = (): void => {
    axios.get('https://65388587a543859d1bb18661.mockapi.io/khangtng/v1/lab7')
      .then((res) => setFilmsList(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchFilm()

    getIpAddress(null)
  }, [])

  return (
    <Data.Provider value={{ user, setUser, isDarkMode, filmsList, setIsDarkMode, fetchFilm }}>
      <ConfigProvider
        theme={
          isDarkMode
            ? // Dark
            { token: { colorPrimary: "#ab1a13", colorBgElevated:'#5c5c5c', colorTextBase:'#fff', colorBgContainer: '#1f1f1f', colorText: '#fff', colorBorderSecondary:'#303030', boxShadowTertiary:'black'}, }
            : // Light
            { token: { colorPrimary: "#d62d24" } }
        }
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/*" element={<NotFound404 />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </Data.Provider>
  );
}

export default App;
