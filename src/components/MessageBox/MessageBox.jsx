import style from "./MessageBox.module.scss";
import { animated, useTransition } from "react-spring";

export default function MessageBox({
    trigger,
    message,
    buttons,
    allowBtnText = "OK",
    declineBtnText = "Cancel",
    declineFn = Function.prototype,
    allowFn = Function.prototype,
    customStyles,
}) {
    const transition = useTransition(trigger, {
        from: {
            opacity: 0,
			x: "-100%"
        },
        enter: {
            opacity: 1,
			x: "0%"
        },
        leave: {
            opacity: 0,
			x: "-100%"
        },
    });

    return transition((styles, item) =>
        item ? (
            <animated.div className={style.box} style={{...customStyles, ...styles}}>
                <p className={style.boxMessage}>{message}</p>
                {buttons && (
                    <div className={style.buttons}>
                        {declineBtnText && (
                            <div
                                className={style.button}
                                style={{ backgroundColor: "red" }}
                                onClick={declineFn}
                            >
                                {declineBtnText}
                            </div>
                        )}
                        {allowBtnText && (
                            <div
                                className={style.button}
                                style={{ backgroundColor: "green" }}
                                onClick={allowFn}
                            >
                                {allowBtnText}
                            </div>
                        )}
                    </div>
                )}
            </animated.div>
        ) : null
    );
}
