type LogType = "success" | "error" | "info" | "warning";
type colorCodeType = {
    [key: string]: string;
}

const colorCodes: colorCodeType = {
    // Other
    ["Reset"]: "\x1b[0m",
    ["Bright"]: "\x1b[1m",
    ["Dim"]: "\x1b[2m",
    ["Underscore"]: "\x1b[4m",
    ["Blink"]: "\x1b[5m",
    ["Reverse"]: "\x1b[7m",
    ["Hidden"]: "\x1b[8m",

    // Foreground
    ["FgBlack"]: "\x1b[30m",
    ["FgRed"]: "\x1b[31m",
    ["FgGreen"]: "\x1b[32m",
    ["FgYellow"]: "\x1b[33m",
    ["FgBlue"]: "\x1b[34m",
    ["FgMagenta"]: "\x1b[35m",
    ["FgCyan"]: "\x1b[36m",
    ["FgWhite"]: "\x1b[37m",
    ["FgGray"]: "\x1b[90m",

    // Background
    ["BgBlack"]: "\x1b[40m",
    ["BgRed"]: "\x1b[41m",
    ["BgGreen"]: "\x1b[42m",
    ["BgYellow"]: "\x1b[43m",
    ["BgBlue"]: "\x1b[44m",
    ["BgMagenta"]: "\x1b[45m",
    ["BgCyan"]: "\x1b[46m",
    ["BgWhite"]: "\x1b[47m",
    ["BgGray"]: "\x1b[100m",
}

const log = (message: string, type: string): void => {
    const logTypes: colorCodeType = {
        "success": `${colorCodes.Reset}[${colorCodes.FgGreen}SUCCESS${colorCodes.Reset}]`,
        "error": `${colorCodes.Reset}[${colorCodes.FgRed}ERROR${colorCodes.Reset}]`,
        "info": `${colorCodes.Reset}[${colorCodes.FgBlue}INFO${colorCodes.Reset}]`,
        "warning": `${colorCodes.Reset}[${colorCodes.FgYellow}WARNING${colorCodes.Reset}]`,
    }
    const hhmmss = new Date().toISOString().slice(11, 19);
    console.log(`[${hhmmss}] ${logTypes[type]} ${message}`);
};

export { log };