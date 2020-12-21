/*
 * Last Update : 2019. 10. 07 (Monnday)
 * Made By     : JongHeon LEE
 * Description : 가독성을 위해 변수명 수정 및 구조 개선
 *               예외처리 수정
 */

/************************************************************************/
/*                               Requires                               */
/************************************************************************/
var http    = require("http");
var console = require("console");
var config  = require("config");
var tool    = require('tool/tool.js');
var db    = require('lib/database.js');
/************************************************************************/
/*                               Constant                               */
/************************************************************************/
const BASEURL       = 'http://www.op.gg/champion/';
module.exports.function = function tier (position) {
  console.log(db.champName)
  let finalresultList = []
  let firsturl = BASEURL + 'statistics'
  var firstresult = http.getUrl(firsturl, { format: 'text' });
  /************************************************************************/
  /*                              버전                              */
  var versionsplit1 = "class=\"champion-index__message\">"
  var versionsplit2 = "</div>"
  var versionsplit3 = "Version : "
  var patchVersion = firstresult.split(versionsplit1)[1].split(versionsplit2)[1].split(versionsplit3)[1]
  //console.log(patchVersion)
  /************************************************************************/
  /*                               인풋에 따라 나누기                               */

  var positionsplit1 = 'class=\"tabItem champion-trend-tier-TOP\" >'
  var positionsplit2 = 'class=\"tabItem champion-trend-tier-JUNGLE'
  var positionsplit3 = "class=\"tabItem champion-trend-tier-MID"
  var positionsplit4 = "class=\"tabItem champion-trend-tier-ADC"
  var positionsplit5 = "class=\"tabItem champion-trend-tier-SUPPORT"

  if(position == "탑"){
    var splitResult = firstresult.split(positionsplit1)[1].split(positionsplit2)[0]
    var engpostion = "top"
    }
  else if(position == "정글"){
    var splitResult = firstresult.split(positionsplit2)[1].split(positionsplit3)[0]
    var engpostion = "jungle"
    }
  else if(position == "미드"){
    var splitResult = firstresult.split(positionsplit3)[1].split(positionsplit4)[0]
    var engpostion = "mid"
    }
  else if(position == "바텀" || position == "원딜"|| position == "원거리 딜러"|| position == "원 딜"|| position == "원거리"){
    var splitResult = firstresult.split(positionsplit4)[1].split(positionsplit5)[0]
    var engpostion = "adc"
    }
  else if(position == "서폿"|| position == "서포터"){
    var splitResult = firstresult.split(positionsplit5)[1]
    var engpostion = "support"
    }
  else{
    console.log(position)
    return
  }
/************************************************************************/
 /*                               챔피언 이름, 티어                              */
  let champNameList = []
  let tierlist = []
  let imgurlList = []
  var namesplit1 = "class=\"champion-index-table__name\">"
  var namesplit2 = "</div>"
  var tiersplit1 = "icon-champtier-"
  var tiersplit2 = ".png"
  var middlenamesplit = splitResult.split(namesplit1)
  for (let i = 1; i < middlenamesplit.length; i++){
    var r4 = middlenamesplit[i].split(namesplit2)[0]
    var tier = middlenamesplit[i].split(tiersplit1)[1].split(tiersplit2)[0] + " 티어 : "
     if (r4 == "Cho&#039;Gath"){
        var r4 = "Chogath"
        }
      if (r4 == "Dr. Mundo"){
        var r4 = "DrMundo"
        }
      if (r4 == "Tahm Kench"){
        var r4 = "TahmKench"
        }
      if (r4 == "Twisted Fate"){
        var r4 = "TwistedFate"
        }
      if (r4 == "Aurelion Sol"){
        var r4 = "AurelionSol"
        }
      if (r4 == "Vel&#039;Koz"){
        var r4 = "Velkoz"
        }
      if (r4 == "Miss Fortune"){
        var r4 = "MissFortune"
        }
      if (r4 == "Kai&#039;Sa"){
        var r4 = "Kaisa"
        }
      if (r4 == "Kog&#039;Maw"){
        var r4 = "KogMaw"
        }
      if (r4 == "Lee Sin"){
        var r4 = "LeeSin"
        }
      if (r4 == "Xin Zhao"){
        var r4 = "XinZhao"
        }
      if (r4 == "Rek&#039;Sai"){
        var r4 = "RekSai"
        }
      if (r4 == "Kha&#039;Zix"){
        var r4 = "Khazix"
        }
      if (r4 == "Master Yi"){
        var r4 = "MasterYi"
        }
      if (r4 == "Jarvan IV"){
        var r4 = "JarvanIV"
        }
      if (r4 == "Wukong"){
        var r4 = "MonkeyKing"
        }
      if (r4 == "Nunu &amp; Willump"){
        var r4 = "Nunu"
        }
      if (r4 == "LeBlanc"){
        var r4 = "Leblanc"
        }        
    //console.log(r4)
    //console.log(tier)
    
    tierlist.push(tier)
  /************************************************************************/
  /*                               이미지 URL 만들기                             */
    
    var imgurl = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+r4+"_0.jpg"
    imgurlList.push(imgurl)
    champNameList.push(r4)
  }
/************************************************************************/

  for(var k = 0; k < champNameList.length; k++){
    var infochamp = {'engposition' : engpostion,'champName' : champNameList[k],'position' : position}
    var tierResult = {'champName': tool.ChangeName(champNameList[k]),
                   'champTier' : tierlist[k],
                   'champUrl' : imgurlList[k],
                   'position' : position,
                   'patchVersion' : patchVersion,
                   'InfoChamp' : infochamp,
                   //'champInfoResults' : tool.ChampInfo(engpostion, champNameList[k])
                  }
    finalresultList.push(tierResult)
  }
  console.log(finalresultList)
  return finalresultList
}
