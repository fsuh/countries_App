import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
	auth,
	registerWithEmailAndPassword,
	logInWithEmailAndPassword,
} from "../auth/firebase";
import FormRow from "../components/FormRow";
import Wrapper from "../assets/css/RegisterCss";
import { toast } from "react-toastify";
import Logo from "./Logo";

const initialState = {
	name: "",
	email: "",
	password: "",
	isMember: true,
};

const Register = () => {
	const [users, setUsers] = useState(initialState);
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	// const register = () => {
	//   const { name, email, password } = users;
	//   if (!name) toast.error("Please enter name");
	//   registerWithEmailAndPassword(name, email, password);
	// };

	const toogleMember = () => {
		setUsers({ ...users, isMember: !users.isMember });
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUsers({ ...users, [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = users;
		if (!email || !password || (!isMember && !name)) {
			toast.error("Please fill out all fields");
			return;
		}
		if (isMember) {
			logInWithEmailAndPassword(email, password);
			return;
		}
		registerWithEmailAndPassword(name, email, password);
	};

	useEffect(() => {
		if (loading) return;
		if (user) navigate("/");
	}, [user, loading, navigate]);

	return (
		<Wrapper className="full-page">
			<form
				className="form"
				onSubmit={onSubmit}
			>
				<Logo />
				<h3>{users.isMember ? "Login" : " Register"}</h3>
				{!users.isMember && (
					<FormRow
						type="text"
						name="name"
						autocomplete="name"
						value={users.name}
						handleChange={handleChange}
					/>
				)}
				<FormRow
					type="email"
					name="email"
					autocomplete="email"
					value={users.email}
					handleChange={handleChange}
				/>
				<FormRow
					type="password"
					name="password"
					autocomplete="password"
					value={users.password}
					handleChange={handleChange}
				/>
				<button
					type="submit"
					className="btn btn-block"
					disabled={loading}
				>
					{loading ? "loading..." : "submit"}
				</button>
				{/* <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={loading}
          onClick={() =>
            logInWithEmailAndPassword({
              email: "testUser@test.com",
              password: "secret",
            })
          }
        >
          {loading ? "loading.." : "demoUser"}
        </button> */}
				<p>
					{users.isMember ? "Not yet Registered?" : "Already Registered!"}
					<button
						type="button"
						className="member-btn"
						onClick={toogleMember}
					>
						{users.isMember ? "Register" : "Login"}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
