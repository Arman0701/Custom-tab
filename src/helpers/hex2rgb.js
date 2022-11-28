export default function hex2rgba(hex) {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `${r},${g},${b}`;
}
