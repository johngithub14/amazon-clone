import { useReducer, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utilities/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/Context/Context";
import { Bars } from "react-loader-spinner";

// Styles
import styles from "./Auth.module.css";

// Assets
import logo from "../../assets/amazon_logo_si.png";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Type } from "../../Utilities/action.type";

const initialState = {
    email: "",
    password: "",
    error: "",
    showPassword: false,
    isLoading: false,
    isCreateLoading: false,
};

const ACTIONS = {
    ADD_EMAIL: "add_email",
    ADD_PASSWORD: "add_password",
    SET_ERROR: "set_error",
    TOGGLE_SHOW_PASSWORD: "toggle_show_password",
    TOGGLE_IS_LOADING: "toggle_is_loading",
    TOGGLE_IS_CREATE_LOADING: "toggle_is_create_loading",
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_EMAIL:
            return { ...state, email: action.payload };
        case ACTIONS.ADD_PASSWORD:
            return { ...state, password: action.payload };
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload };
        case ACTIONS.TOGGLE_SHOW_PASSWORD:
            return { ...state, showPassword: !state.showPassword };
        case ACTIONS.TOGGLE_IS_LOADING:
            return { ...state, isLoading: !state.isLoading };
        case ACTIONS.TOGGLE_IS_CREATE_LOADING:
            return { ...state, isCreateLoading: !state.isCreateLoading };
        default:
            return state;
    }
};

const Auth = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [{ user }, dispatchFromContext] = useContext(DataContext);
    const navigate = useNavigate();

    const navStateData = useLocation();

    console.log(navStateData);

    console.log(user);

    const handleEmailChange = (e) => {
        dispatch({ type: ACTIONS.ADD_EMAIL, payload: e.target.value });
    };

    const handlePasswordChange = (e) => {
        dispatch({ type: ACTIONS.ADD_PASSWORD, payload: e.target.value });
    };

    const handleToggleShowPassword = () => {
        dispatch({ type: ACTIONS.TOGGLE_SHOW_PASSWORD });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        dispatch({ type: ACTIONS.TOGGLE_IS_LOADING });

        try {
            const userInfo = await signInWithEmailAndPassword(
                auth,
                state.email,
                state.password
            );

            dispatchFromContext({
                type: Type.SET_USER,
                payload: {
                    user: userInfo.user,
                },
            });

            navigate(navStateData?.state?.redirect || "/");
        } catch (error) {
            dispatch({
                type: ACTIONS.SET_ERROR,
                payload: error.message,
            });
            console.log(error.message);
        } finally {
            dispatch({ type: ACTIONS.TOGGLE_IS_LOADING });
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        dispatch({ type: ACTIONS.TOGGLE_IS_CREATE_LOADING });

        try {
            const userInfo = await createUserWithEmailAndPassword(
                auth,
                state.email,
                state.password
            );

            dispatchFromContext({
                type: Type.SET_USER,
                payload: {
                    user: userInfo.user,
                },
            });

            navigate(navStateData?.state?.redirect || "/");
        } catch (error) {
            dispatch({
                type: ACTIONS.SET_ERROR,
                payload: error.message,
            });
            console.log(error.message);
        } finally {
            dispatch({ type: ACTIONS.TOGGLE_IS_CREATE_LOADING });
        }
    };

    return (
        <section className={styles.authContainer}>
            <div className={styles.logoContainer}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            <div className={styles.signInContainer}>
                <form onSubmit={handleSignIn}>
                    <h1>Sign in</h1>

                    {navStateData?.state && (
                        <p className={styles.protectionErr}>{navStateData?.state?.message}</p>
                    )}

                    {state.error && (
                        <p className={styles.errorMessage}>{state.error}</p>
                    )}

                    <span>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={state.email}
                            onChange={handleEmailChange}
                        />
                    </span>

                    <span className={styles.passwordContainer}>
                        <label htmlFor="password">Password</label>
                        <input
                            type={state.showPassword ? "text" : "password"}
                            name="password"
                            value={state.password}
                            onChange={handlePasswordChange}
                        />
                        <FontAwesomeIcon
                            icon={state.showPassword ? faEye : faEyeSlash}
                            size="sm"
                            className={styles.showHideIcon}
                            onClick={handleToggleShowPassword}
                        />
                    </span>

                    <br />

                    <button type="submit">
                        {state.isLoading ? (
                            <Bars
                                height="20"
                                width="40"
                                color="#000000"
                                ariaLabel="bars-loading"
                                wrapperClass={styles.loaderIcon}
                                visible={true}
                            />
                        ) : (
                            <p>Continue</p>
                        )}
                    </button>

                    <span className={styles.policyContainer}>
                        <p>
                            By continuing, you agree to Amazon's{" "}
                            <Link to="#">Conditions of Use</Link> and{" "}
                            <Link to="#">Privacy Notice</Link>.
                        </p>
                    </span>
                </form>
            </div>

            <hr />

            <div className={styles.newAccContainer}>
                <p className={styles.newMessage}>New to Amazon?</p>
                <form onSubmit={handleSignUp}>
                    <button type="submit">
                        {state.isCreateLoading ? (
                            <Bars
                                height="20"
                                width="40"
                                color="#000000"
                                ariaLabel="bars-loading"
                                wrapperClass={styles.loaderIcon}
                                visible={true}
                            />
                        ) : (
                            <p>Create your Amazon account</p>
                        )}
                    </button>
                </form>
            </div>

            <div className={styles.copyrightContainer}>
                <div>
                    <ul>
                        <li>
                            <Link to="#">Conditions of Use</Link>
                        </li>
                        <li>
                            <Link to="#">Privacy Notice</Link>
                        </li>
                        <li>
                            <Link to="#">Help</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
                </div>
            </div>
        </section>
    );
};

export default Auth;
