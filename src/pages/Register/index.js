import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";

import api from "../../services/api";

import madeWithLove from "../../assets/madewithlove.jpg";

import "./styles.css";

const Register = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState(0);
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [complement, setComplement] = useState("");

  const [cities, setCities] = useState([]);

  const [isVisible, setIsVisible] = useState("password");

  const [placeholder, setPlaceholder] = useState("Confirme sua senha");
  const [confirmed, setConfirmed] = useState(true);

  async function handleSearchAddress() {
    try {
      if(cep) {
        const searchedAddress = await api.post("api/searchAddress", { cep });

        if(searchedAddress) {
          const searchedCity = cities.filter(c => c.name === searchedAddress.data.city);

          setCity(searchedCity[0].id)

          // setCity(searchedAddress.data.city);
          setStreet(searchedAddress.data.street);
          setNeighborhood(searchedAddress.data.neighborhood);

        }
      }
    } catch {
      alert("CEP inválido, tente novamente!");

      setCep("");
    }
  }

  function inputToUpperCase(e) {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    e.target.value = e.target.value.toUpperCase();
    e.target.setSelectionRange(start, end);
  }

  function handleVerifyPassword() {
    if(password !== confirmPassword) {
      setPlaceholder("Senhas não batem");
      setConfirmed(false);
    } else {
      setPlaceholder("Confirme sua senha");
      setConfirmed(true);
    }
  }

  function handleFocus() {
    document.getElementById("confirm").focus();
  }
  
  async function handleLogin(e) {
    e.preventDefault();

    try {
      await api.post("api/customer", {
        name,
        email,
        password,
        whatsapp,
        city_id: Number(city),
        uf,
        cep,
        street,
        number: Number(number),
        neighborhood,
        complement      
      }, {
        headers: {
          Authorization: "af0fb4dadeb3594cd4c9667409c4a44f5571aa46be78344b"
        }
      });

      alert("Cadastrado com sucesso, realize seu login!");

      history.push("/");
    } catch(err) {
      if(err.response.status === 409) {
        alert("E-mail já existe em nossa base, tente novamente!");

        setEmail("");
      } else {
        alert("Erro inesperado, tente novamente!");

        window.location.reload();
      }
    }
  }

  useEffect(() => {
    async function loadCities() {
      try {
        const storedCities = await api.get("api/city");

        if(storedCities.data) {
          setCities(storedCities.data);
        }
      } catch {
        alert("Erro inesperado");
      }
    }

    loadCities();

    async function handleUf() {
      const selectedUf = await api.get(`api/city/${city}`);

      if(selectedUf.data) {
        setUf(selectedUf.data.uf);
      }
    }

    handleUf();
  }, [city]);

  return (
    <div className="container-register">
      <div className="content">
        <section>
          <img src={madeWithLove} alt="Catnip Brechó" className="madewithlove"/>

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre em nossa plataforma
            e aproveite os melhores preços em roupas!
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={18} color="#881f83"/>
            Voltar
          </Link>
        </section>
        
        <form onSubmit={handleLogin}>
          <input
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus={true}
            required
          />

          <input
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />          

          <div className="container-password">
            <input
              placeholder="Senha"
              type={isVisible}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={handleVerifyPassword}
              required
            />  

            <button
              type="button"
              className="button-password"
              onMouseUp={() => setIsVisible("password")}
              onMouseDown={() => setIsVisible("text")}
              onMouseLeave={() => setIsVisible("password")}
              onFocus={handleFocus} 
            >
              {isVisible === "password"
                ? <FiEyeOff
                    size={24} 
                    color="#881f83"
                    style={{marginTop: 8}}
                  />
                : <FiEye 
                    size={24} 
                    color="#881f83"
                    style={{marginTop: 8}}
                  />
              }  
            </button>            
          </div>        

          <div className="container-password" style={confirmed ? undefined : {borderColor: "#ba2e04"}}>
            <input
              id="confirm"
              placeholder={placeholder}
              type={isVisible}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onBlur={handleVerifyPassword}
              spellCheck={false}
              required
            />  

            <button
              type="button"
              className="button-password"
              onMouseUp={() => setIsVisible("password")}
              onMouseDown={() => setIsVisible("text")}
              onMouseLeave={() => setIsVisible("password")}
              hidden
            >
              {isVisible === "password"
                ? <FiEyeOff
                    size={24} 
                    color="#881f83"
                    style={{marginTop: 8}}
                  />
                : <FiEye 
                    size={24} 
                    color="#881f83"
                    style={{marginTop: 8}}
                  />
              }  
            </button>            
          </div>        

          <div className="input-group">
            <input
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              required
            />          

            <input
              placeholder="CEP"
              style={{width: 152}}
              value={cep}
              onChange={e => setCep(e.target.value)}
              required
              onBlur={handleSearchAddress}
            />                
          </div>      

          <div className="input-group">
            <select
              className="select-city"
              value={city}
              onChange={e => setCity(Number(e.target.value))}
              required
              // onBlur={handleUf}
            >
              <option disabled value={0}>Selecione...</option>
              {cities.map(c => (
                <option key={c.id} value={Number(c.id)}>{c.name}</option>
              ))}
            </select>

            <input
              placeholder="UF"
              style={{width: 80}}
              maxLength={2}
              onKeyUp={inputToUpperCase}
              value={uf}
              onChange={e => setUf(e.target.value)}
              required
            />            
          </div>      

          <div className="input-group">
            <input
              placeholder="Rua"
              value={street}
              onChange={e => setStreet(e.target.value)}
              required
            />          

            <input
              placeholder="Nº"
              style={{width: 90}}
              value={number}
              onChange={e => setNumber(e.target.value)}
              required
            />
          </div>        

          <input
            placeholder="Bairro"
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
            required
          />          

          <input
            placeholder="Complemento"
            value={complement}
            onChange={e => setComplement(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>   
        </form>
      </div>
    </div>
  );
};

export default Register;