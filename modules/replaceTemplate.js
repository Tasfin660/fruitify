module.exports = (temp, data) => {
    let output = temp.replace(/{%ID%}/g, data.id);
    output = output.replace(/{%FRUITNAME%}/g, data.fruitName);
    output = output.replace(/{%DESCRIPTION%}/g, data.description);
    output = output.replace(/{%SEASON%}/g, data.season);
    output = output.replace(/{%ABOUT%}/g, data.about);
    output = output.replace(/{%HISTORY%}/g, data.history);
    output = output.replace(/{%CULTIVATION%}/g, data.cultivation);
    output = output.replace(/{%PRODUCTION%}/g, data.production);

    return output;
}