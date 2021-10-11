import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {};

  return (
    <form action="" onSubmit={handleRegister} id="sign-up-form">
      <label htmlFor="pseudo">Pseudo</label>
      <br />
      <input
        type="text"
        name="pseudo"
        id="pseudo"
        onChange={(e) => setPseudo(e.target.value)}
        value={pseudo}
      ></input>
      <br/>
      <div className="pseudo error"></div>
      <br />
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>
      <br/>
      <div className="email error"></div>
      <br />
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <br/>
      <div className="password error"></div>
      <br />
      <br />
      <label htmlFor="password-conf">Confirmer mot de passe</label>
      <input
        type="password"
        name="password"
        id="password-conf"
        onChange={(e) => setControlPassword(e.target.value)}
        value={controlPassword}
      ></input>
      <br/>
      <div className="password-confirm error"></div>
      <br />
      <br />
      <input type="checkbox" id="terms"/>
      <label htmlFor="terms">J'accepte les <a href="/">conditions générales</a></label>
      <input type="submit" value="Valider Inscription"></input>
    </form>
  );
};

export default SignUpForm;
