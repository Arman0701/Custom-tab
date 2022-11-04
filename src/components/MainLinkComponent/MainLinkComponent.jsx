import { memo, useCallback, useState } from "react";
import Popup from "reactjs-popup";
import MainLinkCtxMenu from "../MainLinkCtxMenu";
import style from "./MainLinkComponent.module.scss";

export default memo(function MainLinkComponent({ link }) {
	const openTabHandler = useCallback(() => {
		window.open(link.address, '_self')
	}, [])

    return (
        <Popup
            trigger={
                <div
                    className={style.linkWrapper}
					onClick={openTabHandler}
                >
                    <span>{link.title}</span>
                </div>
            }
            on={["right-click"]}
            position="right top"
            arrow={false}
			keepTooltipInside
			nested
        >
            <MainLinkCtxMenu link={link} />
        </Popup>
    );
});
