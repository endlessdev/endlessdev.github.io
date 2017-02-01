---
layout: post
title:  "jQuery 핵심원리"
date:   2016-10-11 08:38:31 +0900
categories: mpi
---

#jQuery $.ajax() 메서드

본 포스트는 **`jQuery 핵심원리`** 프로젝트의 문서입니다.<br>
작성일 기준 jQuery 최신버전인 3.1.1버전을 기준으로 설명합니다.


##AJAX란?(MDN 문서 인용)
>AJAX란 비동기 JavaScript와 XML을 말합니다. 간단히 말하면, 서버측 Scripts와 통신하기 위한 XMLHttpRequest객체를 사용하는 것을 말합니다. 서버측으로 다양한 형식(JSON, XML, HTML 및 일반 텍스트 형식 등)의 정보를 주고 받을 수 있습니다. AJAX의 강력한 특징은 페이지 전체를 리프레쉬 하지 않고서도 수행 되는 "비동기성"입니다. 이러한 비동기성을 통해 사용자의 Event가 있으면 전체 페이지가 아닌 일부분만을 업데이트 할 수 있게 해줍니다.

위 인용글대로 XMLHttpRequest객체를 사용하여 비동기적으로 서버사이드 API와 통신 할 수 있습니다. <br><br>예를들어 현재 페이지에서 마지막까지 스크롤하여 새로고침 없이 다음 페이지를 보여줄 때 다음 페이지의 정보를 가져오는 API를 호출하고 Response를 가공하여 동적으로 DOM에 뷰를 추가하는 사례를 예로 들 수 있습니다. (페이스북 담벼락, 트위터 타임라인 같은 사례이며, 흔히 EndlessScrolling 라고 부릅니다. 주로 window.onscroll 이벤트 함수로 처리합니다.)

##$.ajax()
자바스크립트 비동기 통신인 AJAX(Asynchronous JavaScript and XML)를 쉽게 사용하기 위해 만들어졌습니다.<br>
$.ajax() 메서드 역시 XMLHttpRequest 객체를 사용합니다. 

>jQuery 소스 중 일부 발췌
>
>```JavaScript
>jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

>```

###Parameter ( $.ajax(url[,setting]) )
필요한 파라미터는 크게 **url**과 **setting** 2개로 볼 수 있습니다.<br>



 - **url(String 타입)** 
	 - 호출할 API의 엔드포인트
 - **setting(PlainObject 타입)**
 	- key와 value체계로 이루어져 있는 PlainObject 타입으로서, Ajax 리퀘스트를 설정하는데 사용되는 파라미터 입니다.<br> 모든 값은 옵셔널이며, 기본값은 $.ajaxSetup()메서드로 미리 정할 수 있습니다.
	 - **async (기본값 true)**
		 - 비동기/동기 전송을 정할 수 있는 파라미터로서, 기본값인 true면 비동기식으로 전송되고  false면 동기식으로 전송됩니다.<br> 만약 동기식으로 전송될 경우 통신을 시작하면, 웹 도큐먼트에서 사용하는 자바스크립트 코드의 실행이 중지 됩니다.
	 - **beforeSend (Function(jqXhr jqXhr, PlainObject settings))**
		 - AJAX 통신을 하기 전, jqXHR를 수정할 수 있습니다.<br>보통 xhr에 setRequestHeader 메서드로 헤더값을 전송하거나, 통신 하기 전의 이벤트를 핸들링할때 콜백함수로 사용됩니다.
	 - **complete (Function( jqXHR jqXHR, String textStatus))**
		 - AJAX 통신이 끝난 후 발생되는 이벤트를 핸들링 할 수 있도록 콜백함수를 제공합니다. 
	 - **contentType (기본값: application/x-www-form-urlencoded; charset=UTF-8)**

		  - 데이터를 서버로 전송할때, 이 content type 을 사용합니다. 기본값은 `application/x-www-form-urlencoded; charset=UTF-8` 이며, 대부분의 경우 괜찮다.
	 - ****