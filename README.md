# Bixby_Capsule_op.gg
<!-- Made By     : 2_tuna_97 -->

<!-- 빅스비 크루 로고 -->
<p align="center">
    <img width="300px" src="https://user-images.githubusercontent.com/50114556/103166141-8331b580-4862-11eb-810f-279c94adc030.png">
</p>

<!-- 숭실대 Bixby Crew사진 -->
<p align="center">
    <img width="300px" src="https://user-images.githubusercontent.com/50114556/103166155-9d6b9380-4862-11eb-92d7-397f2505e456.jpg">
</p>

<!-- 이미지 -->
<p align="center">
 <a href="#"><img src="https://img.shields.io/badge/build-passing-success"></a>
 <a href="https://bixbydevelopers.com/"><img src="https://img.shields.io/badge/platform-Bixby-blue"></a>
 <a href="https://github.com/BixbyCrew/Bixby_Capsule_op.gg/releases/tag/0.2.2"><img src="https://img.shields.io/badge/version-0.2.2-important"></a>
 <a href="#"><img src="https://img.shields.io/badge/language-javascript-yellow"></a>
 <a href="https://github.com/BixbyCrew/Bixby_Capsule_op.gg/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green"></a>
</p>

<!-- Capsule Store사진 -->
<p align="center">
    <img width="500px" src="https://user-images.githubusercontent.com/50114556/103176526-cb2df800-48b5-11eb-9daf-165699bc2e8a.jpg">
</p>

## Capsule Structure
---
> Bixby Capsule은 다음과 같이 3가지로 구성되어 있습니다.
1. javascript <br>
    여기서는 액션에서 받은 정보를 가지고 정보를 실행 또는 처리하는것인데요. API를 사용해서 정보를 받아오거나 이미 저장되어있는 데이터 값을 불러오는 등 다양한 역할을 하게 됩니다.

2. Models <br>
    Bixby의 뼈대를 이루고 있으며 `Action`과 `Concept`로 이루어져 있습니다.
    `Action`은 `input`을 받아서 js에 기능을 실행해라 하는 명령을 내리게 됩니다. 그럼 js에서 데이터값, 즉 정보를 받아 컨셉으로 전달합니다. <br>
    `Concept`은 개념은 프로그래밍 할때의 변수 유형 및 구조와 비슷합니다.
    ```
    boolean - true, false
    decimal - 소수
    enum - 사전을 구축하기 위해 사용할 수 있는 문자열 중 하나(name, text와 같은 개념)
    name - 유니코드 사용 변수이름
    integer - 소수빼고 모든 수
    qualified - 정규식, 패턴
    ```

3. Layout & Traning <br>
    js에서 받아서 컨셉에 저장되어있는 정보를 어떻게 보여줄지에 대한 부분이 `Layout`이며, 사용자의 발화를 정확하게 인식하여 어떤 기능을 실행할 지에 대한 지표가 되는 부분입니다. <br> `Goal`은 어느 정보를 `output`으로 둘건지 설정이고 두번째는 앞서 말했던 `input` 값입니다. 사용자가 발화할 때 빅스비가 어떤 부분에서 인식해야하는지에 대한 지표.

<br>

## 개발 목표
* 롤을 하면서 힘들게 op.gg를 찾아가면서 룬과 티어를 보면서, 말 한마디로 확인하고자 제작하게 되었습니다.

<br>

## Capsule update시 갱신할 부분
---
### capsule.bxb
```javascript
capsule {
	id (playground.opggtier) //활용도를 만족시키기 위한 playground설정
	version (0.2.2) // Store에서 update & submit하려면 매번 버전을 업그레이드 하여야 함. 동일버전은 승인 X
	format (3)
	targets {
		target (bixby-mobile-ko-KR) //사용 언어 선택
		target (bixby-mobile-en-US) {enabled (false)}
	}
	
	runtime-version (8) { //업데이트 시 Fix할 것
	}
	
	store-countries { //Store Open 장소
		only {
			allow (KR)
		}
	}

	store-sections { //Store Section 선택
    section (Productivity)
    section (GamesAndFun) {
    visibility-constraints {
        country-constraints {
        allowed-list {
            allow (KR)
        }
        }
      }
    }
  }
```

> [viv.core 버전 업데이트 명시](https://bixbydevelopers.com/dev/docs/dev-guide/developers/library)

<br>

### capsule-info.bxb
```javascript
capsule-info{
  ...
  display-name (롤하자)
  developer-name (BixbyCrew)
  ...
  description ("이제 빅스비로 손쉽게 롤 정보를 알아보자! \n\n 챔피언을 픽 할 때, 룬을 세팅할 때, 템트리를 알고 싶을 때, 힘들게 인터넷 창 열어서 일일이 찾아보는 롤 생활은 이제 그만! \n\n 빅스비 캡슐 '롤 하자'를 통해 빠르고 정확하게 롤 정보를 검색하세요!")
  ...
  dispatch-name (롤하자)
}

```

## Usage (대표 발화)
---
* "미드 티어 알려줘"
* "원서폿 티어 알려줘"
* "원딜 티어 알려줄래"
* "정글 트렌드 알려줄래"

본 캡슐은 발화에 따라 3가지의 `Action`으로 동작합니다. <br>
`DetailInfo`와 `champInfo`, `tier`로 이루어져 있습니다. `DetailInfo`는 세부 챔피언 정보 탐색할때, `champInfo`는 클릭하면 나오는 챔피언의 정보를, `tier`는 크롤링을 하여 정보롤 받아옵니다.

## 개발에 참고해야하는 사이트
* [https://bixbydevelopers.com](https://bixbydevelopers.com)

## Developer (Bixby Crew SSU)

<table>
    <tr>
        <td align="center" width="135px">
            <a href="https://github.com/97tuna"><img height="100px" width="100px" src="https://avatars3.githubusercontent.com/u/50114556?s=400&v=4"></img></a><br />
            <sub> <b> 97tuna </b> </sub>
        </td>
        <td align="center" width="135px">
            <a href="https://github.com/tony9402"><img height="100px" width="100px" src="https://avatars1.githubusercontent.com/u/30228292?s=460&u=1ff865fa5aee04bc2c09fc2e08042b1f4367c469&v=4"></img></a><br />
            <sub> <b> tony9402 </b> </sub>
        </td>
        <td align="center" width="135px">
            <a href="https://github.com/ika9810"><img height="100px" width="100px" src="https://avatars0.githubusercontent.com/u/44824398?s=400&v=4"></img></a><br />
            <sub> <b> ika9810 </b> </sub>
        </td>
        <td align="center" width="135px">
            <sub> <b> dldudwns </b> </sub>
        </td>
    </tr>
</table>

<!-- 2020.12.27(SUN) [MOD] update README.md -->

