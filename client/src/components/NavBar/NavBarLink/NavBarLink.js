import React from "react";
import { Link } from "react-router-dom";
import useGlobalState from "../../../useGlobalState";

function NavBarLink(props) {
    const globalState = useGlobalState();

    return(
        <li>
            <Link
                to={props.link}
                onClick={() => globalState.setPage({ page: props.pageName })}
                style={{ textDecoration: "inherit", fontSize: "inherit" }}
            >
                <span className={props.lang + " " + ((props.page===props.pageName) ? props.pageName : "")}>{props.navbar[props.pageName]}</span>
            </Link>
        </li>
    );
}

export default NavBarLink;