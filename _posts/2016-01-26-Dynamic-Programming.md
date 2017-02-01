---
layout: post
title:  "동적계획법(Dynamic Programming)"
date:   2016-01-26 08:38:31 +0900
categories: mpi
---

#동적계획법 (Dynamic Programming)
본 문서는 동적계획법에 대해서 서술된 문서입니다.

##개요
본 문서의 내용은 아래와 같이 서술되어 있습니다.

 - 동적계획법이란 
 - 메모이제이션
 
##동적계획법
동적계획법(Dynamic Programming) 이란, 프로그래밍 대회 문제에 가장 자주 출현하는 디자인 페러다임 중 하나이다. '동적계획법'이란 이름으론 무엇을 뜻하는지 알 수 없다. 이름과는 다르게 딱히 다이나믹한 부분도 없고, 그냥 여러 개의 문제로 나누어서 해결하는 방법을 말하는 뜻이다.
<del>동적 계획법의 고안자인 벨만(Richard E. Bellman)은 dynamic이라는 단어가 멋있어서 선택했다고 한다.<del/>

위에서 언급했듯, 한마디로 정의하자면 **문제를 여러부분으로 나누어 해결하는 방법** 이라고 말할 수 있겠다.

##메모이제이션
메모이제이션을 설명하기 전에, 먼저 소스코드로 메모이제이션의 필요성을 예를들어 설명하고자 한다.

```C++
#include <iostream>

using namespace std;

int getFibonacci(int targetNumber) {
    cout << "fibonacci(" << targetNumber << ")" << endl;
    if (targetNumber == 0) return 0;
    else if (targetNumber == 1) return 1;
    else return getFibonacci(targetNumber - 1) + getFibonacci(targetNumber - 2);
}

int main() {
    int targetNumber;
    cin >> targetNumber;
    cout << getFibonacci(targetNumber) << endl;
}

```

위 소스는 평범하게 재귀함수(Recursive Function)로 피보나치 수열을 출력하는 함수이다.

재귀로 계속탐색하면서 어떤 값(targetNumber)으로 함수가 호출되었을때, 출력하고 마지막에 결과를 출력한다.

**예제입력**

<pre>
7
</pre>

**예제출력**

<pre>
fibonacci(7)
fibonacci(6)
fibonacci(5)
fibonacci(4)
fibonacci(3)
fibonacci(2)
fibonacci(1)
fibonacci(0)
fibonacci(1)
fibonacci(2)
fibonacci(1)
fibonacci(0)
fibonacci(3)
fibonacci(2)
fibonacci(1)
fibonacci(0)
fibonacci(1)
fibonacci(4)
fibonacci(3)
fibonacci(2)
fibonacci(1)
fibonacci(0)
fibonacci(1)
fibonacci(2)
fibonacci(1)
fibonacci(0)
fibonacci(5)
fibonacci(4)
fibonacci(3)
fibonacci(2)
fibonacci(1)
fibonacci(0)
fibonacci(1)
fibonacci(2)
fibonacci(1)
fibonacci(0)
fibonacci(3)
fibonacci(2)
fibonacci(1)
fibonacci(0)
fibonacci(1)
13
</pre>

무엇이 이상한지, 여기서 눈치채야한다. 분명 13이라는 수 자체는 피보나치 수열의 7번째 있는 수열의 항목이 맞긴 하다.
하지만, 똑같은 값으로 여러번 호출되는 상황이 발생했다. 즉 **두 번 이상 계산되는 부분 문제를 중복되는 부분문제가 발생한 것 이다.**

이 알고리즘의 시간복잡도는 거듭제곱 시간복잡도의 알고리즘이고 비효율적인 알고리즘이라고 볼 수 있다.

이러한 중복되는 부분을 해결하는 열쇠를 메모이제이션으로 꼽을 수 있다.

메모이제이션이란  **동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다.**

즉 우리가 흔히 알고있는 캐시(Cache)와 비슷한 역할을 하는것이라고 볼 수 있다. 이러한 메모이제이션은 동적계획법의 핵심이 되는 기술이다.


**기존의 함수에 메모이제이션을 적용**

```C++
#include <iostream>

using namespace std;

int getFibonacci(int targetNumber) {
    static int cacheSpace[100];
    if (cacheSpace[targetNumber] != 0)
        return cacheSpace[targetNumber];
    cout << "fibonacci(" << targetNumber << ")" << endl;
    if (targetNumber == 1 || targetNumber == 2)
        return cacheSpace[targetNumber] = 1;
    int ret = getFibonacci(targetNumber - 1) + getFibonacci(targetNumber - 2);
    return cacheSpace[targetNumber] = ret;
}

int main() {
    int targetNumber;
    cin >> targetNumber;
    cout << getFibonacci(targetNumber) << endl;
}
```


**예제입력**

<pre>
7
</pre>

**예제출력**

<pre>
fibonacci(7)
fibonacci(6)
fibonacci(5)
fibonacci(4)
fibonacci(3)
fibonacci(2)
fibonacci(1)
13
</pre>

함수안에 기존 계산값을 저장하는 공간을 따로 만들어, 재귀로 순환하며 기존의 계산된 값과 일치한 수가 공간에 있으면 계산을 안하고 그냥 넘겼다.

위 알고리즘의 시간복잡도는 O(n)이므로 기존의 알고리즘보다 훨신 더 효율적인 알고리즘이라고 볼 수 있다.

##참고

 - 구종만님의 '프로그래밍 대회에서 배우는 알고리즘 문제 해결 전략'
 - 위키피디아, 나무위키 등의 위키위키 서비스
 - 스터디 학습내용