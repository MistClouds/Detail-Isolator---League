const fs = require('fs');
var championList = [
    'Aatrox',
    'Ahri',
    'Akali',
    'Alistar',
    'Amumu',
    'Anivia',
    'Annie',
    'Aphelios',
    'Ashe',
    'AurelionSol',
    'Azir',
    'Bard',
    'Blitzcrank',
    'Brand',
    'Braum',
    'Caitlyn',
    'Camille',
    'Cassiopeia',
    'Chogath',
    'Corki',
    'Darius',
    'Diana',
    'Draven',
    'DrMundo',
    'Ekko',
    'Elise',
    'Evelynn',
    'Ezreal',
    'Fiddlesticks',
    'Fiora',
    'Fizz',
    'Galio',
    'Gangplank',
    'Garen',
    'Gnar',
    'Gragas',
    'Graves',
    'Hecarim',
    'Heimerdinger',
    'Illaoi',
    'Irelia',
    'Ivern',
    'Janna',
    'JarvanIV',
    'Jax',
    'Jayce',
    'Jhin',
    'Jinx',
    'Kaisa',
    'Kalista',
    'Karma',
    'Karthus',
    'Kassadin',
    'Katarina',
    'Kayle',
    'Kayn',
    'Kennen',
    'Khazix',
    'Kindred',
    'Kled',
    'KogMaw',
    'Leblanc',
    'LeeSin',
    'Leona',
    'Lillia',
    'Lissandra',
    'Lucian',
    'Lulu',
    'Lux',
    'Malphite',
    'Malzahar',
    'Maokai',
    'MasterYi',
    'MissFortune',
    'MonkeyKing',
    'Mordekaiser',
    'Morgana',
    'Nami',
    'Nasus',
    'Nautilus',
    'Neeko',
    'Nidalee',
    'Nocturne',
    'Nunu',
    'Olaf',
    'Orianna',
    'Ornn',
    'Pantheon',
    'Poppy',
    'Pyke',
    'Qiyana',
    'Quinn',
    'Rakan',
    'Rammus',
    'RekSai',
    'Renekton',
    'Rengar',
    'Riven',
    'Rumble',
    'Ryze',
    'Samira',
    'Sejuani',
    'Senna',
    'Sett',
    'Shaco',
    'Shen',
    'Shyvana',
    'Singed',
    'Sion',
    'Sivir',
    'Skarner',
    'Sona',
    'Soraka',
    'Swain',
    'Sylas',
    'Syndra',
    'TahmKench',
    'Taliyah',
    'Talon',
    'Taric',
    'Teemo',
    'Thresh',
    'Tristana',
    'Trundle',
    'Tryndamere',
    'TwistedFate',
    'Twitch',
    'Udyr',
    'Urgot',
    'Varus',
    'Vayne',
    'Veigar',
    'Velkoz',
    'Vi',
    'Viktor',
    'Vladimir',
    'Volibear',
    'Warwick',
    'Xayah',
    'Xerath',
    'XinZhao',
    'Yasuo',
    'Yone',
    'Yorick',
    'Yuumi',
    'Zac',
    'Zed',
    'Ziggs',
    'Zilean',
    'Zoe',
    'Zyra'
]
var championTotal = championList.length;
var http = require('http');
var i, j, l, m;
var skinString = '';
var skillString = '';
var count = 0;
var passiveCount = 0;
var skillCount = 0;
/*NOTES
* LAST UPDATED: 26/10/2020
* LAST CHAMPION: SAMIRA
* TGZ FILE TAKEN FROM RIOT API [WITHOUT NEEDING TO LOG INTO DEVELOPER ACCOUNT]
* */

for (i = 0;  i < championTotal; i++){
    var champion = JSON.parse(fs.readFileSync('./Champions/' + championList[i] + '.json', (err, data) => {
        if (err) throw err;
        console.log(data);
    }));

    //Skins
    var championSkinTotal = champion["data"][championList[i]]["skins"].length;
    for (j = 0; j < championSkinTotal; j++){
        var currentSkin = champion["data"][championList[i]]["skins"][j]["name"]
        if (currentSkin  == "default") {
            //console.log(championList[i]);
            //currentSkin = ''; //swap in if skins not needed
            skinString += championList[i] + ', ';   //remove if champ name is not required
            continue;
        }
        count++
        skinString += currentSkin + ', '
    }

    //Passive
    var passiveSkill = champion["data"][championList[i]]["passive"]["name"]
    skillString += passiveSkill + ', '
    passiveCount++

    //Skills
    for(l = 0; l < 4; l++){
        var currentSkill = champion["data"][championList[i]]["spells"][l]["name"]
        skillString += currentSkill + ', '
        skillCount++
    }

}
console.log(skinString);
console.log("\nTotal Skins:" + count);

console.log(skillString);
console.log("\nTotal Passives:" + passiveCount);
console.log("\nTotal Skills:" + skillCount);

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(skillString);
}).listen(8080);