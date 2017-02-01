---
layout: post
title:  "UNIST 청소년 슈퍼컴퓨팅 캠프 요약정리"
date:   2016-08-05 08:38:31 +0900
categories: mpi
---

#MPI Traning Course
본 문서는 제 2회 국가청소년슈퍼컴퓨팅캠프에서 있었던 강의의 정리 문서입니다.

##Why Parallellzation?
노드가 여러개 있다고 해서, 무조건 빠른건 아니다.
 
##Hello MPI
MPI는 병렬프로그래밍을 위한 표준화된 데이터 통신 라이브러리다.<br>
먼저 MPI를 간단하게 예제코드를 실행하며 설명하겠다.

**hello_mpi.c 작성**

```C
#include <stdio.h>
#include <mpi.h>

int main (int &argc, &argv){
	/* Initialize the library */
	MPI_Init(&argc, &argv);
	
	printf("Hello World\n");
	
	/* Wrap it up. *
	MPI_Finalize();
	
	return 0;
}

```

**컴파일 및 MPI실행**

```bash
$ mpicc -o hello_mpi.x hello_mpi.c
$ mpirun -np [사용할 프로세스 수] ./hello_mpi.x
```

그러면 조금 추가해서, 어떤 코어에서 프로세스가 동작하는지 확인해 보도록 하겠다.

```C
#include <stdio.h>
#include <mpi.h>

int main (int &argc, &argv){

	int core_capacity, core_id;

	/* Initialize the library */
	MPI_Init(&argc, &argv);
	
	MPI_Comm_size(MPI_COMM_WORLD, &core_capacity);
	MPI_Comm_rank(MPI_COMM_WORLD, &core_id);
	
	printf("Hello MPI!\n core %d of a total of %d core_capacity\n", core_id, core_capacity);
	
	/* Wrap it up. *
	MPI_Finalize();
	
	return 0;
}
```

해당코어가 프로세싱을 했을때, 정지하려면 어떻게 해야할까?

```
MPI_Barrier(MPI_COMM_WORLD);
```

이 함수를 쓰면 멈추게 된다. 이를 응용하여 코어의 id 순서대로 출력하도록 해보자.

```C
#include <stdio.h>
#include <mpi.h>

int main (int &argc, &argv){

	int core_capacity, core_id;

	/* Initialize the library */
	MPI_Init(&argc, &argv);
	
	MPI_Comm_size(MPI_COMM_WORLD, &core_capacity);
	MPI_Comm_rank(MPI_COMM_WORLD, &core_id);
	
	for(int i=0; i<core_capacity; i++){
		if(core_id == i){
			printf("Hello MPI!\n core %d of a total of %d core_capacity\n", core_id, core_capacity);
		}
		MPI_Barrier(MPI_COMM_WORLD);
	}
	
	/* Wrap it up. *
	MPI_Finalize();
	
	return 0;
}

```


>**TIP** for문에서 변수 초기화는 c99버전에서 가능합니다.<br>
>에러가나면 아래와 같이 컴파일 옵션을 설정해주세요.

```bash
$ mpicc -o hello.x hello.c -std=c99
```

##Collective Communication
코어끼리는 다른 코어 프로세스를 바라볼 수 없다.<br>
그래서 코어간의 통신을 하려면 MPI에서 제공하는 함수를 사용해야 한다.

###MPI_Reduce
 `MPI_Reduce()`를 사용해야 한다.

```C
MPI_Reduce(
    void* send_data,
    void* recv_data,
    int count,
    MPI_Datatype datatype,
    MPI_Op op,
    int root,
    MPI_Comm communicator)
```
이를 활용하여 코드를 작성 해 보자.

```C
#include <stdio.h>
#include <mpi.h>

int main (int &argc, &argv){

	int core_capacity, core_id;
	int nsum = 0;

	/* Initialize the library */
	MPI_Init(&argc, &argv);
	
	MPI_Comm_size(MPI_COMM_WORLD, &core_capacity);
	MPI_Comm_rank(MPI_COMM_WORLD, &core_id);
	
	MPI_Reduce(&core_id, &nsum, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);
	printf("SUM of core id's  = %d, my core id  = %d\n", nsum, core_id);
	
	/* Wrap it up. *
	MPI_Finalize();
	
	return 0;
}

```
결과를 보면 마지막 프로세스에 프로세스 id의 합이  전송된 것을 확인할 수 있다.

###MPI_Allreduce

기존 `MPI_Reduce()`와 다르게 다대다 방식이다.

```C
MPI_Allreduce(
    void* send_data,
    void* recv_data,
    int count,
    MPI_Datatype datatype,
    MPI_Op op,
    MPI_Comm communicator)
```

###MPI Gather

#슈퍼컴퓨터와 우주


##일반 상대론으로의 여정
> 시간이란 무엇인가?<br>
> 공간이란 무엇인가?<br>
> 중력의 본질은?

**근본적인 질문**

 - "막대의 길이"와 "시간의 흐름" : 움직이면 달라지는가?
 - 시공간은 물체의 출현에 영향을 받는가?

 예를들어 누군가 펜을 들고 움직인다면, 

##블랙홀과 우주
##중력파
