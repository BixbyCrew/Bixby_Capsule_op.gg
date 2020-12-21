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
var db    = require('lib/database.js');
/************************************************************************/
/*                               Constant                               */
/************************************************************************/
const BASEURL       = 'http://www.op.gg/champion/';

module.exports.ChampInfo = function tool (champName) {
  //let position = InfoChamp.position
  //let champName = champName
  let Resultlist = []
  let url = BASEURL + champName + '/statistics/' 
  var result = http.getUrl(url, { format: 'text' });
  /************************************************************************/
  /*                               추천 스펠 빌드                                */
  let spellList = []
  var spellsplit1 = "Summoner Spells</h2>"
  var spellsplit2 = "</td>"
  var spellsplit3 = "<img src=\""
  var spellsplit4 = "\" title="
  var middlespellsplit = result.split(spellsplit1)[1].split(spellsplit2)[0]
  var recspell1 = middlespellsplit.split(spellsplit3)[1].split(spellsplit4)[0]
  var recspell2 = middlespellsplit.split(spellsplit3)[2].split(spellsplit4)[0]
  spellList.push(recspell1)   //console.log(recspell1) // 첫번째 스펠
  spellList.push(recspell2)   //console.log(recspell2) // 두번빼 스펠
  /************************************************************************/
  /*                               추천 스킬 빌드                                */
  let skillList = []
  var skillsplit1 = "Recommended Skill Builds</h2>"
  var skillsplit2 = "<tbody>"
  var skillsplit3 = "<img src=\""
  var skillsplit4 = "\" alt="
  var skillsplit = result.split(skillsplit1)[1].split(skillsplit2)[1].split(skillsplit3)
  var recskill1 = skillsplit[1].split(skillsplit4)[0]
  var recskill2 = skillsplit[3].split(skillsplit4)[0]
  var recskill3 = skillsplit[5].split(skillsplit4)[0]
  skillList.push(recskill1)// console.log(recskill1)  // 첫번째로 마스터하는 스킬
  skillList.push(recskill2)// console.log(recskill2)  // 두번째로 마스터하는 스킬
  skillList.push(recskill3)// console.log(recskill3)  // 세번째로 마스터하는 스킬
  /************************************************************************/
  /*                               추천 시작아이템 빌드                                */
  let startList = []
  var startItemsplit1 = "Recommended Item Builds</h2>"
  var startItemsplit2 = "</td>"
  var startItemsplit3 = "<img src=\""
  var startItemsplit4 = "\">"
  var middlerecStartItem = result.split(startItemsplit1)[1].split(startItemsplit2)[0].split(startItemsplit3)
  for(var i = 2; i < middlerecStartItem.length; i++){
    startList.push(middlerecStartItem[i].split(startItemsplit4)[0])
  }
  /************************************************************************/
  /*                               추천 메인아이템 빌드                                */
  let mainList = []
  var mainItemsplit1 = "Recommended Builds</th>"
  var mainItemsplit2 = "</td>"
  var mainItemsplit3 = "<img src=\""
  var mainItemsplit4 = "\">"
  var middlerecMainItem = result.split(mainItemsplit1)[1].split(mainItemsplit2)[0]
  var recMainItem1 = middlerecMainItem.split(mainItemsplit3)[1].split(mainItemsplit4)[0]
  var recMainItem2 = middlerecMainItem.split(mainItemsplit3)[3].split(mainItemsplit4)[0]
  var recMainItem3 = middlerecMainItem.split(mainItemsplit3)[5].split(mainItemsplit4)[0]
  mainList.push(recMainItem1)// console.log(recMainItem1)  //첫번째 메인 아이템
  mainList.push(recMainItem2)// console.log(recMainItem2)  //두번째 메인 아이템
  mainList.push(recMainItem3)// console.log(recMainItem3)  //세번째 메인 아이템
  /************************************************************************/
  /*                               추천 신발아이템 빌드                                */
  var bootsItemsplit1 = "Boots</th>"
  var bootsItemsplit2 = "</li>"
  var bootsItemsplit3 = "<img src=\""
  var bootsItemsplit4 = "\">"
  if (champName == "Cassiopeia"){
    var recBootsItem = "None"
  }
  else{
    var middlerecbootsItem = result.split(bootsItemsplit1)[1].split(bootsItemsplit2)[0]
    var recBootsItem = middlerecbootsItem.split(bootsItemsplit3)[1].split(bootsItemsplit4)[0]
  }

  //console.log(recBootsItem) // 추천 신발
  /************************************************************************/
  /*                               추천 룬 빌드                                */
  let runelist1 = []
  let runelist2 = []
  var runesplit = "<div class=\"perk-page\">"
  var firstrunesplit1 = "\" class="
  var firstrunesplit2 = "\""
  var middlefirstrune = result.split(runesplit)[1].split(bootsItemsplit3)
  var middlesecondrune = result.split(runesplit)[2].split(bootsItemsplit3)
  for (let i = 1; i < middlefirstrune.length; i++) {runelist1.push(middlefirstrune[i].split(firstrunesplit2)[0])}
  for (let i = 1; i < middlesecondrune.length; i++) {runelist1.push(middlesecondrune[i].split(firstrunesplit2)[0])}
  //console.log(runelist1) // 메인 룬
  //console.log(runelist2) // 보조 룬
  let ChampionInfo = {
     'recSpell'  : spellList,
     'recSkill'  : skillList,
     'recStartItem' : startList,
     'recMainItem'  : mainList,
     'recBoots'  : recBootsItem,
     'recRune'  : runelist1,
  }
  Resultlist.push(ChampionInfo)
  return ChampionInfo
}

module.exports.ChangeName = function (champName) {
  console.log(champName)
  var champName = champName.toLowerCase();
  console.log(champName)
  let data = db.champName
/*
  var valueName = Object.values(data).indexOf(champName);
  console.log(valueName)
  var changedName = Object.keys(data)[valueName]
  console.log(changedName)
*/
  var valueName = data.indexOf(champName) - 1
  var changedName = data[valueName]
  console.log(valueName)
  console.log(changedName)
  return changedName
}