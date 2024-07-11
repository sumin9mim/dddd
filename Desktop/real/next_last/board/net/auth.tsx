import firebaseApp from "./firebaseApp";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default auth;
