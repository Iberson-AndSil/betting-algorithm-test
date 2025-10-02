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
    // console.log(plays);

    let revenue = 1;
    let arrteams = [];
    let c = 0;

    try {
        if (games < 0 || teams < 0 || pay < 0) {
            console.log("entrada no válida");
        } else {
            for (const game of games) {
                revenue *= plays[game].teams[teams[c]].pay;

                if (plays[game].teams[teams[c]].quota!=false) {
                    arrteams.push(
                        {
                            game: plays[game].game,
                            teams: plays[game].teams[teams[c]].name,
                            quota: plays[game].teams[teams[c]].quota
                        }
                    )
                }else{
                    console.log("la cuota de "+ plays[game].teams[teams[c]].name+" cerró");
                }
                c++;
            }

            revenue = revenue * pay;
            revenueNeta = revenue - pay;
            revenuePorc = (pay / 3) * 100
            revenuePorc = revenuePorc.toFixed(2)

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
                revenue = 0;
                return bets;
            }
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
                        // this.plays[id_Play].teams[id_Quota].quota = false;
                        return team.quota;
                    }
                }
            }
        }
    } catch (error) {
        console.log("entrada no válida");
    }
}

function closPlay(id_Play){
    for (const play in plays) {
        // console.log(play);
        
        if (plays[play].idPlays == id_Play) {
            plays[play].state=false;
            return plays[play].state;            
        }
    }
}

console.log(closPlay(id_Play=1));


//se digita el id de la cuota
console.log(quotaClose(id_Play = 1, id_Quota = 1));

//aaceptar bets simples y combinadas
//plays, teams, bet
console.log(Bet(games = [0, 1], teams = [0, 1], bet = 20));

// console.log(plays);
