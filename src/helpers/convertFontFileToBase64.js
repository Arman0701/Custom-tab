export default async function convertFontFiletoBase64(file) {
    const result_base64 = await new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });
    return result_base64;
}
