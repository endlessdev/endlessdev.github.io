---
layout: post
title:  "장고와 라라벨 뭘 써야 하나."
date:   2016-08-05 08:38:31 +0900
categories: mpi
---

#MVC프레임워크 비교 (Django, Laravel)

<img src="https://www.djangoproject.com/m/img/logos/django-logo-positive.png" style="width:49%; display:inline-block;">
<img src="http://blog.legacyteam.info/wp-content/uploads/2014/10/laravel-logo-white.png" style="width:49%; display:inline-block;">

새로운 시크릿차트에 쓰일 프레임워크를 선택하는데에 필요한 리서치 문서이다.<br>
2016년 7월 11일 경 개발팀의 논의결과 Django와 Laravel로 선택의 폭을 줄였으며 이에따라,<br>
두 프레임워크 각각의 기술적인 부분과, 서비스운영에 대한 부분까지 세세하게 다루도록 하겠다.

##Author (작성자)
**시크릿차트 개발팀 Jade(염승우)**<br>
질문사항 있으시면 언제든지  연락주세요.

##언어 측면에서

근본적으로 두 프레임워크는 다른 언어로 개발되어있고, 두 언어에 대한 차이는 상당히 크다. <br>
`Django`는 `Python`으로 개발되었으며,  최신버전인 `1.9는``Python 2.7 ~ 3.5`까지 지원하며,<br> 
`Laravel`같은 경우는 `PHP`로 개발되었으며, `PHP 5.5.9`이상을 지원한다.

###문법적인 차이
`Python`은 세련된 문법과 인간적인 언어로 잘 알려져 있으며, 들여쓰기를 통해 블록 구조를 구성하는 등의 특이한 문법을 가지고 있으며,<br>
`PHP`같은 경우는 근본적으로 `C`의 스타일을 따르지만, 변수, 함수, 클래스 등의 관련 문법이 조금 다르다.

**Python으로 작성된 팩토리얼 재귀함수**

```Python
def factorial(x):
     if x == 0:
         return 1
     else:
         return x * factorial(x - 1)
```

**PHP로 작성된 팩토리얼 재귀함수**

```PHP
function factorial($n) {
  if ($n === 0) { 
     return 1;
  }
  else {
     return $n * fact($n-1);
  }
}
```
주로  `Python`은 비전공자가 소스코드를 읽어도 바로 이해할 정도로의 쉬운 문법을 가지고 있다는 장점이 있다.<br>
그래서 인간다운 언어라고 각광받고 있으나, 그만큼 너무 간결하고 다르다보니 `Java`나  `C++` 등 과 같은 기존의 메이저급(?) 언어를  사용하고 있던 개발자에겐 가독성이 현저히 떨어질 수 밖에 없다.<br>

`PHP`는 기존의 위에서 언급되었던 메이저급 언어를 사용해 왔던 개발자들에겐 그렇게 괴리감느낄 문법은 아닐 것이다.

###런타임 퍼포먼스의 차이

근본적으로 `PHP`는 컴파일 언어고, `Python`은 인터프리터 언어이다. <br>
이에따라 속도적인 측면에서 차이가 조금 있는 것으로 보인다.

**순수 런타임**

**[C++ vs. Python vs. Perl vs. PHP performance benchmark (2016)](https://blog.famzah.net/2016/02/09/cpp-vs-python-vs-perl-vs-php-performance-benchmark-2016/)**

글에 따르면 순수 런타임으로 봤을때는 `PHP 7.0`이 `C++`보다 497% 느리며, `Python 3.5`는 `C++`보다  1591% 느리다는 결과가 나왔다.<br>
두 언어 모두 최신버전이며, 순수 런타임으로 벤치마크를 돌렸을때의 결과라고 한다.

**HHVM VS Pypy**

런타임의 근본적인 문제라서 순정 런타임은 어쩔 수 없는 결과가 나온다.<br>
하지만 서드파티 컴파일러라면 다른 결과가 나온다.

`pypy`는 `C`보다 빠른 런타임을 위해 개발되어왔으며,  `python 2.6` 이하만 지원이 가능한 것으로 보인다. <br>기존코드보다 25배 빠를것이라고 추정된다.<br>

`HHVM`은 `PHP`를 사용하고있는 **Facebook**사 가 만든 VM(Virtual Machine)이다. `Hack`과 `PHP5`를 공식지원하는것으로 보이며,<br>
기존 코드보다 최대 9배 빠를것으로 추정된다.


##유지보수 측면에서

**라라벨 코리아**의 **[어떤 프레임워크를 써야 하는지 고민하시는 분들이라면 한번쯤 생각해 보세요](https://www.laravel.co.kr/posts/237)** 게시글 인용

>사실 특정 프레임워크를 이용해 만든 완성품은 차후에 어떤 개발자가 와도 유지보수가 쉽다는 장점이 있다.<br>
>왜냐면 결국 프레임워크는 개발자를 단순화 시키고 표준모델을 만듬으로서 비용을 절감하기 위해 만들어진 도구이기 때문이다.<br>

이렇듯 인력적인 측면에서 봤을때 프레임워크에서의 유지보수는 무의미 하지만,  REST API, 이미지 캐싱, 데이터베이스 I/O 등 서비스 운영 측면에 있어서는 각각의 프레임워크의 모듈이나 미들웨어가 유지보수에 큰 영향을 끼치는 경우가 많으므로  고려해야할 문제 중 하나이다.

###지원사항의 차이

각 프레임워크의 지원사항 차이는 **[Laravel VS Django (vsChart.com)](http://vschart.com/compare/laravel/vs/django-framework)** 에서 직관적으로 비교가 가능하다.

|      지원사항/프레임워크             | Laravel           | Django                                    |
|-------------------|-------------------|-------------------------------------------|
| 지원언어  |         PHP 5.5.9 이상          |                  Python 2.7 이상                         |
| DB 모델 | 객체지향적 모델   | Object-relational<br> NoSQL<br> Document-oriented |
| 템플릿 엔진       | Blade 템플릿 엔진 | Django 템플릿 엔진<br> Jinja                  |
| REST API|엘로퀀트|restframework 플러그인|
| DB 마이그레이션 |?|빌트인|

###커뮤니티 활성화와 한국어 문서의 차이

####Laravel
 - **[라라벨 한국어 메뉴얼](https://xpressengine.github.io/laravel-korean-docs/)**<br>
Naver D2운영진을 중심으로 깃허브 레포지토리의 다양한 컨트리뷰터에 의해 번역되었다.<br>
튜토리얼은  라우팅, 미들웨어, 컨트롤러 등의 기본적인 것들만 준비가 되어 있다.

 - **[라라벨 코리아](https://www.laravel.co.kr/)**<br>
라라벨 프레임워크를 사용하는 한국사용자 모임이다.<br>
글 리젠율을 보면 그렇게 높이 활성화 되진 않아보인다.

 - **[라라벨 포럼](https://wiki.modernpug.org/display/LAR/questions/all)**<br>
만들어진지 그렇게 오래되진 않아보이지만 질문 답변율도 나름 좋고 상승세로 보이고 있다.<br>
기존 라라벨 커뮤니티가 이쪽으로 모이고 있는 추세라고.. (Tim한테 들었던 얘기)

####Django
 - **[장고걸스의 장고 튜토리얼 한글화 문서](http://tutorial.djangogirls.org/ko/django/)**<br>
장고걸스서울 운영진 및 한국인 자원 봉사자들에 의해 한국어로 번역되었다.<br>
초심자 타겟으로 작성되어 이 문서로 공부하면 습득이 나름 빠를 것으로 예상한다.

 - **[장고걸스 서울 커뮤니티](https://djangogirls.org/seoul/)**<br>
장고걸스 서울 커뮤니티이며, 정모를 해서 정보를 나누는게 주 목적으로 보인다.

 - **[Django 1.4 문서 한국어판](https://django-document-korean.readthedocs.io/en/old_master/)**<br>
정말 오래됬지만 그나마 번역이 잘되어있는 레퍼런스 문서이다.


##성공사례의 측면에서

###Laravel
`Laravel`의 성공사례

####Express Engine
국내에서 유명한 CMS인 **Naver**사의 XpressEngine 에서 `Laravel`을 사용하고 있다.<br>
이에 Naver D2에서 공식적인 한국어 메뉴얼과 커뮤니티를 활성화 시키면서 국내 `Laravel` 사용자가 급증하고 있다.<br>
[라라벨 한국어 메뉴얼](https://xpressengine.github.io/laravel-korean-docs/)

한국시장과 더불어 외국의 성공사례은 아직까지 크게 알려진 곳은 없는 듯 하다.<br>
[Websites using Laravel : 라라벨의 외국사례](http://trends.builtwith.com/websitelist/Laravel)

###Django
`Django`의 성공사례

####Instragram
월간 4억명의 사용자가 사용하고있는  **Instagram**은 `Django`사용의 성공적인 사례다.<br>
인스타그램 엔지니어링팀은 텀블러를 통해 `Django`와 `PostgreSQL`을 사용한다고 밝혔다.<br>

>다음은 요청을 처리하는 애플리케이션 서버입니다. 아마존 High-CPU Extra-Large 머신에 Django를 올려서 사용하고 있습니다.( 역자 주: High-CPU Extra-Large Instance는 7GB 메모리에 20EC2 Compute Unit-각 2.5EC2 Compute Unit의 8 Core 1690GB 에 64bit 플랫폼이며, 시간당 $0.68 입니다.) 사용량이 늘면서 25대 이상을 사용하고 있습니다.

[What Powers Instagram: Hundreds of Instances, Dozens of Technologies](http://instagram-engineering.tumblr.com/post/13649370142/what-powers-instagram-hundreds-of-instances)

####Pinterest

디자인 업계 사람들이 많이 사용한다는 이미지 기반 SNS 서비스인 **Pinterest**의 애플리케이션 계층부분으로 `Django`를 사용했다고 한다.
> We use python + heavily-modified Django at the application layer.  Tornado and (very selectively) node.js as web-servers.  Memcached and 
> membase / redis for object- and logical-caching, respectively.  RabbitMQ as a message queue.  Nginx, HAproxy and Varnish for static-delivery 
> and load-balancing.  Persistent data storage using MySQL.  MrJob on EMR for map-reduce.

####BitBucket
프라이빗 깃 레포지토리로 유명한 서비스 `BitBucket` 이다.<br>
강력한 프레임워크를 무료로 이용할 수 있다는 장점 때문에 Django를 선택했다고 한다.

>**Why did you choose Django?**
>
>We chose Django for several reasons: We have worked with it for years before deciding to do Bitbucket, and it's a wonderful framework where 
you get a lot of things for free, such as URL mappings, form generation/validation, and it of course encourages DRY. It turned out to be an excellent choice, and we've overcome most of the bottlenecks without having to coerce the framework itself.

그 외에도 언론사 사이트 **Washington Post**, 프레젠테이션 서비스로 유명한 **Prezi**, 음악 스티리밍 서비스인 **Sportify** 또한 `Django`를 기반으로 개발되었다고 한다. 

국내에선 **삼성생명**, **LGU+**의 인트라넷 중 사내 콜센터 대응용 업무쪽이 Django를 사용하고 있는걸로 알려져 있다.

##끝으로

**사실 '어느게 더 좋다'라고 딱 정해서 말 할수가 없다고 생각하는게 필자의 생각이다.**<br>
심지어 리서치 하고나서 더욱 더 모르겠다. 게다가 어느 프레임워크가 이미지 가공 효율이 좋고 뭐 그렇다는것도 없다. 

> 이 프레임워크는 이 기능에선 조금 뛰어나고 ~~~

<del>이런게 거의 확인하기가 애매하다. 프론트엔드 프레임워크라면 모를까 백엔드 풀스택 프레임워크라면 더욱 더.</del><br>
두 프레임워크 마다 각각의 강력한 미들웨어와 모듈이 존재하고 각 언어의 장벽도 비슷하다.

###제이드의 사견

Django(Python)의 세련된 문법과 안정적인 서비스 성공사례를 보니 끌리긴 한다.<br>
하지만 팀원 한명한명이 받아들이는게 다르기 때문에 Python의 문법이 정말 괴롭다면 `Laravel`이 조금 더 낫다고 볼 수 있고,<br>
문법을 빨리 습득하고 개발에 바로 투입되는게 가능하다면 `Django`를 사용하는 것도 나쁘지 않다고 본다.
