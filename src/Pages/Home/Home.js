import React, { useState } from "react";
import api from "../../constants/api"
import { cepMask } from "../../components/Mask";
import "./HomeStyle.css";
import SendIcon from '@material-ui/icons/Send';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import netPlano from "../../assets/netPlano.png"

const Home = () => {
    const [cep, setCep] = useState("");
    const [dados, setDados] = useState("");
    const [errorDataCep, setErrorDataCep] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        // validators client side
        if (cep.length < 9) {
            setDados("");
            setErrorDataCep("Por favor, digite um CEP válido");
            return
        }

        // request server side
        const response = await api.get(`/${cep}/json`);
        const data = response.data;
        setDados(data);

        // errors server side
        if (data.erro) {
            setDados("");
            setErrorDataCep("Este CEP não está cadastrado em nossa Base de Dados");
            return
        }

        // ok !
        setDados(data);
        setErrorDataCep("");
    }

    function handleChange(event) {
        setCep(cepMask(event.target.value));
    }

    function clearContent(event) {
        setCep("");
        setDados("");
        setErrorDataCep("");
    }

    return (
        <div className="container">
            <img className="banner" src={netPlano} alt="banner-apresentacao-internet"/>
            <h2 className="boas-vindas">Somos a líder em satisfação em pesquisa realizada pela Anatel. </h2>
            <h4 className="boas-vindas-subtitulo">Para consultar nossos planos, digite seu CEP:</h4>
            <div className="component-search">
                <form onSubmit={handleSubmit}>
                    <input
                        id="input-cep"
                        label="Consulte o CEP"
                        placeholder={"Ex:57071-100"}
                        value={cep}
                        onChange={handleChange}
                        maxLength="9"
                        autoFocus
                    ></input>
                    <button variant="contained" type="submit" className="btn-find">
                        <SendIcon className="icon-send" />
                    </button>
                    <button color="inherit" variant="contained" type="button" className="btn-clean" onClick={clearContent}>
                        <DeleteForeverIcon className="icon-clean" />
                    </button>
                </form>
            </div>

            <div className="component-response">
                {dados && (
                    <>
                        <span className="data-list">{dados.cep}</span>
                        <span className="data-list">{dados.logradouro}</span>
                        <span className="data-list">{dados.bairro}</span>
                        <span className="data-list">{dados.localidade}</span>
                        <span className="data-list">{dados.uf}</span>
                    </>
                )}
                {errorDataCep && (
                    <span className="data-list error-data-cep">
                        {errorDataCep}
                    </span>
                )}
            </div>
        </div>
    );
}

export default Home;
