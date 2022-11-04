import style from "./SettingsFontItem.module.scss";

export default function SettingsFontItem({ item }) {
	const { isActive, name } = item; 
    return <option value={name}>{name}</option>;
}
