let plays = [{
    idPlays: 0,
    state: true,
    game: "RM vs. Barcelona",
    teams: [
        { id: 0, name: "RM", pay: 2.4, quota: true },
        { id: 1, name: "Barcelona", pay: 3.1, quota: true },
        { id: 2, name: "Empate", pay: 3.0, quota: true },
    ],
},
{
    idPlays: 1,
    state: true,
    game: "RM vs. Valencia",
    teams: [
        { id: 0, name: "RM", pay: 1.8, quota: true },
        { id: 1, name: "valencia", pay: 4.2, quota: true },
        { id: 2, name: "Empate", pay: 3.5, quota: true },
    ],
},
{
    idPlays: 2,
    state: true,
    game: "RM vs Atletico",
    teams: [
        { id: 0, name: "RM", pay: 2.0, quota: true },
        { id: 1, name: "Atletico", pay: 3.5, quota: true },
        { id: 2, name: "Empate", pay: 3.2, quota: true },
    ],
},
{
    idPlays: 3,
    state: true,
    game: "Barcelona - Valencia",
    teams: [
        { id: 0, name: "Barcelona", pay: 2.1, quota: true },
        { id: 1, name: "Valencia", pay: 3.8, quota: true },
        { id: 2, name: "Empate", pay: 3.3, quota: true },
    ],
}
]

let bets = [];
let idbet = 1;

function Bet(games, teams, pay) {
    let revenue = 1;
    let arrteams = [];
    let c = 0;
// games[1,0] teams[2,1]
    try {
        if (games.length == teams.length) {
            if (games < 0 || teams < 0 || pay < 0) {
                console.log("entrada no válida");
            } else {
                for (const game of games) {
                    // console.log("plays[game]",plays[game]);
                    if (plays[game].state) {
                        revenue *= plays[game].teams[teams[c]].pay;
        
                        if (plays[game].teams[teams[c]].quota != false) {
                            arrteams.push(
                                {
                                    game: plays[game].game,
                                    teams: plays[game].teams[teams[c]].name,
                                    quota: plays[game].teams[teams[c]].quota
                                }
                            )
                        } else {
                            console.log("la cuota de " + plays[game].teams[teams[c]].name + " cerró, no puedes apostar en ese partido " + plays[game].game);
                        }
                        c++;
                    }else{
                        console.log("no se permite realizar la apuesta porque está cerado");
                    }
                }
    
                revenue = revenue * pay;
                revenueNeta = revenue - pay;
                revenuePorc = ((pay / teams.length) * 100).toFixed(2)
  
                if (games.length < 2) {
                    bets.push({
                        id: idbet++,
                        state: true,
                        typeBet: "simple",
                        teams: arrteams,
                        pay: pay,
                        revenuePotencial: revenue,
                        revenueNeta: revenueNeta,
                        revenuePorc: revenuePorc
                    })
                    return bets;
                } else {
                    bets.push({
                        id: idbet++,
                        state: true,
                        typeBet: "combinada",
                        teams: arrteams,
                        pay: pay,
                        revenuePotencial: revenue,
                        revenueNeta: revenueNeta,
                        revenuePorc: revenuePorc
                    })
                    // revenue = 0;
                    return bets;
                }
            }
        }else{
            console.log("por favor ingresa los valores completos");
            
        }
    } catch (error) {
        console.log("entrada no válida...");
    }

}

function quotaClose(id_Play, id_Quota) {
    try {
        for (const play of plays) {
            if (play.idPlays == id_Play) {
                for (const team of play.teams) {
                    if (team.id == id_Quota) {
                        team.quota = false;
                        return team.quota;
                    }
                }
            }
        }
    } catch (error) {
        console.log("entrada no válida");
    }
}

function closePlay(id_Play) {
    try {
        if (id_Play>=0) {
            for (const play in plays) {
                if (plays[play].idPlays == id_Play) {
                    plays[play].state = false;
                    return plays[play].state;
                }
            }
        }else{
            console.log("ingresa un número válido");
        }
    } catch (error) {
        console.log("ingresa un valor numérico");
    }
}



//se digita el id del partido y de la cuota
// console.log(quotaClose(id_Play = 0, id_Quota = 0));

//aaceptar apuestas simples y combinadas
//partidos, grupos, pago
console.log(Bet(games = [10], teams = [1], bet = 20));

//se digita el id del partido
// console.log(closePlay(id_Play = 0));


// console.log(Bet(games = [0], teams = [1], bet = 20));