/*
 * Last Update : 2019. 09. 29 (Sunday)
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
/************************************************************************/
/*                               Constant                               */
/************************************************************************/
const BASEURL       = 'http://www.op.gg/champion/';
module.exports.function = function detailInfo (champName, whatInfo) {
  if (champName == '파이크'){
    let champName = pyke
  }
  champInfoResults = tool.ChampInfo(champName);
  if(whatInfo == '룬'){
    let whatMode = '0'
    let result = champInfoResults.recRune
  }
  else if(whatInfo == '스펠'){
    let whatMode = '1'
    let result = champInfoResults.recSpell
  }
  else if(whatInfo == '스킬'){
    let whatMode = '2'
    let result = champInfoResults.recSkill
  }
  else if(whatInfo == '템트리'){
    let whatMode = '3'
    let result = champInfoResults
  }
console.log(result);
  return result
}
