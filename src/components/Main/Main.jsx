import style from "./Main.module.scss";
import MessageBox from "../../components/MessageBox";
import { useNetwork } from "../../hooks/useNetwork";
import { useSelector } from "react-redux";

export default function Main({ children }) {
	const [isOnline] = useNetwork()
    return (
        <div className={style.mainComponentWrapper} >
            {children}
            <MessageBox
                trigger={!isOnline}
                message="Please check your connetion and try again."
                customStyles={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    border: "1px solid white",
                    zIndex: "9999",
                }}
            />
        </div>
    );
}
