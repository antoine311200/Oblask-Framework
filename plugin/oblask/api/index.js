var fs = require("fs");
SupCore.system.api.registerPlugin("typescript", "Oblask", {
    code: fs.readFileSync(__dirname + "/Oblask.ts.txt", { encoding: "utf8" }),
    defs: fs.readFileSync(__dirname + "/Oblask.d.ts.txt", { encoding: "utf8" })
});
SupCore.system.api.registerPlugin("typescript", "Oblask.Audio", {
    code: fs.readFileSync(__dirname + "/Oblask.Audio.ts.txt", { encoding: "utf8" }),
    defs: fs.readFileSync(__dirname + "/Oblask.Audio.d.ts.txt", { encoding: "utf8" })
});
SupCore.system.api.registerPlugin("typescript", "Oblask.Interface", {
    code: fs.readFileSync(__dirname + "/Oblask.UI.ts.txt", { encoding: "utf8" }),
    defs: fs.readFileSync(__dirname + "/Oblask.UI.d.ts.txt", { encoding: "utf8" })
});
